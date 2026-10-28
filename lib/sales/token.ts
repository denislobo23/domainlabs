import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

// A purchase request is stored inside an encrypted token in the confirmation
// link, so no database is needed and the buyer's details aren't readable in the URL.

export type PurchaseRequest = {
  domain: string;
  price: number; // ex GST, as listed when they submitted
  name: string;
  business: string;
  abn: string;
  email: string;
  mobile: string;
  requestedAt: string; // ISO timestamp
};

const TOKEN_LIFETIME_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

function key(): Buffer {
  const secret = process.env.PURCHASE_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("PURCHASE_SECRET is not set (needs at least 16 characters).");
  }
  return createHash("sha256").update(secret).digest();
}

export function createToken(request: PurchaseRequest): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify(request), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, body]).toString("base64url");
}

export function readToken(token: string): PurchaseRequest | null {
  try {
    const raw = Buffer.from(token, "base64url");
    if (raw.length < 29) return null;
    const iv = raw.subarray(0, 12);
    const tag = raw.subarray(12, 28);
    const body = raw.subarray(28);
    const decipher = createDecipheriv("aes-256-gcm", key(), iv);
    decipher.setAuthTag(tag);
    const json = Buffer.concat([decipher.update(body), decipher.final()]).toString("utf8");
    const request = JSON.parse(json) as PurchaseRequest;
    const age = Date.now() - new Date(request.requestedAt).getTime();
    if (!(age >= 0 && age <= TOKEN_LIFETIME_MS)) return null;
    return request;
  } catch {
    return null;
  }
}
