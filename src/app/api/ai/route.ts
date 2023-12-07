import { generateIdHash } from "@/lib/utils";
import { kv } from "@vercel/kv";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { headers } from "next/headers";
import OpenAI from "openai";
import jose from "node-jose";
import { cookies } from "next/headers";

export const runtime = "edge";

const decryptJWE = async (encryptedToken: string, secret: string) => {
  const keystore = jose.JWK.createKeyStore();
  const jwkKey = await keystore.add({
    k: jose.util.base64url.encode(secret),
    kty: "oct",
  });

  try {
    const result = await jose.JWE.createDecrypt(jwkKey).decrypt(encryptedToken);
    const decryptedPayload = JSON.parse(result.payload.toString());

    // Check for expiration
    if (
      decryptedPayload.exp &&
      decryptedPayload.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return decryptedPayload;
  } catch (error) {
    return null;
  }
};

function stringToReadableStream(pageContent: string): ReadableStream {
  return new ReadableStream({
    start(controller) {
      // Convert the string to a Uint8Array
      const encoder = new TextEncoder();
      const uint8array = encoder.encode(pageContent);

      // Enqueue the encoded data into our stream
      controller.enqueue(uint8array);

      // Close the stream
      controller.close();
    },
  });
}

export async function POST() {
  const cookieStore = cookies();
  const aijwe = cookieStore.get("aijwe");
  if (!process.env.JWE_SECRET) {
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
  const headersList = headers();
  const pagelink = headersList.get("pagelink");

  if (!pagelink) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const pageContent = await kv.hget(
    `page:${generateIdHash(pagelink)}`,
    "content",
  );

  if (pageContent) {
    return new StreamingTextResponse(stringToReadableStream(`${pageContent}`));
  }

  if (!aijwe?.value) {
    return new StreamingTextResponse(stringToReadableStream(`setup-your-key`));
  }

  const decodedaijwe = await decryptJWE(aijwe.value, process.env.JWE_SECRET);

  if (!decodedaijwe) {
    return new StreamingTextResponse(stringToReadableStream(`setup-your-key`));
  }

  const { aikey } = decodedaijwe as {
    aikey: string;
  };

  if (!aikey || aikey.length < 5 || aikey.length > 200) {
    return new StreamingTextResponse(stringToReadableStream(`setup-your-key`));
  }

  try {
    const openai = new OpenAI({
      apiKey: aikey,
    });

    const messages: any = [
      {
        role: "system",
        content: `
Generate a long wiki page using the wikitext format.
Make the article witty with a very condescending tone and some jokes here and there.
Base the content of the page as if it were hosted on this link: "https://en.wikipedia.org/wiki/${pagelink}".
Only output the page contents, do not say/output anything else outside of the raw wiki page content.
DO NOT wrap the wikitext Fenced Code Blocks like so \`\`\`wikitext \`\`\`. NEVER DO IT.
NEVER put external links.
NEVER put references.
NEVER put images.
Make sure the infobox has a decent amount of info.
ALWAYS put a "See Also" section that links to other wiki pages.
`,
      },
    ];

    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      stream: true,
    });

    const stream = OpenAIStream(res, {
      async onCompletion(completion) {
        const title = pagelink;
        const id = generateIdHash(pagelink);
        const createdAt = Date.now();
        const payload = {
          id,
          title,
          createdAt,
          content: completion,
        };
        await kv.hset(`page:${id}`, payload);
        await kv.zadd("pagesByCreation", { score: createdAt, member: id });
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    return new StreamingTextResponse(stringToReadableStream(`setup-your-key`));
  }
}
