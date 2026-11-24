import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/** One editor (Naju). The session token is an HMAC-signed expiry, kept in an httpOnly cookie. */
export const SESSION_COOKIE = "naju_session";
export const EDITOR_USER_ID = "naju";
const MAX_AGE_S = 60 * 60 * 24 * 30;

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) throw new Error("SESSION_SECRET is missing or too short");
  return s;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSessionToken(): string {
  const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE_S);
  return `${exp}.${sign(exp)}`;
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  const expected = Buffer.from(sign(exp));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  return Number(exp) > Date.now() / 1000;
}

export function checkPassword(input: string): boolean {
  const pw = process.env.EDITOR_PASSWORD ?? "";
  if (!pw) return false;
  const a = Buffer.from(createHmac("sha256", "pw").update(input).digest());
  const b = Buffer.from(createHmac("sha256", "pw").update(pw).digest());
  return timingSafeEqual(a, b);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE_S,
};
