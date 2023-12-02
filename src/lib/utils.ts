import { SHA256 } from "crypto-js";

export function generateIdHash(input: string): string {
  // Combine the input string with the seed
  const seed = process.env.DB_ID_SEED;
  const combined = seed + input;

  // Generate the hash
  const hash = SHA256(combined).toString();

  return hash;
}
