"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jose from "node-jose";

export async function setKey(key: string) {
  if (!process.env.JWE_SECRET) return "error";

  cookies().delete("aijwe");

  const keystore = jose.JWK.createKeyStore();
  const jwkKey = await keystore.add({
    k: jose.util.base64url.encode(process.env.JWE_SECRET),
    kty: "oct",
  });

  const expirationTime = 60 * 60 * 24 * 1000; // 1000 DAYS

  const extendedPayload = {
    aikey: key,
    exp: Math.floor(Date.now() / 1000) + expirationTime,
  };

  const aijwe = await jose.JWE.createEncrypt({ format: "compact" }, jwkKey)
    .update(JSON.stringify(extendedPayload))
    .final();

  cookies().set("aijwe", aijwe, { maxAge: expirationTime });
  redirect("/");
}
