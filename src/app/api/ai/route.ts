import { generateIdHash } from "@/lib/utils";
import { kv } from "@vercel/kv";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { headers } from "next/headers";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
  const headersList = headers();
  const pagelink = headersList.get("pagelink");

  if (!pagelink)
    return new Response("Unauthorized", {
      status: 401,
    });

  const pageContent = await kv.hget(
    `page:${generateIdHash(pagelink)}`,
    "content",
  );

  if (pageContent) {
    return new StreamingTextResponse(stringToReadableStream(`${pageContent}`));
  }

  const messages: any = [
    {
      role: "system",
      content: `
Generate a long wiki page using the wikitext format.
Drop some funny stuff in the article.
Make the article really funny in comedy style of Dave Chappelle. (Do not say your are doing it tho and don't make it obvious at all.)
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
    model: "gpt-4-1106-preview",
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
}
