import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { prisma } from "./prisma";
import type { Role } from "@prisma/client";

const COOKIE_NAME = "campus_session";
type SessionPayload = { id: string; role: Role; exp: number };

function getSecret() { return process.env.AUTH_SECRET || "dev-secret-change-me"; }
function sign(data: string) { return crypto.createHmac("sha256", getSecret()).update(data).digest("base64url"); }

export function createSessionToken(payload: Omit<SessionPayload, "exp">) {
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function setSession(payload: Omit<SessionPayload, "exp">) {
  cookies().set(COOKIE_NAME, createSessionToken(payload), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
}

export function clearSession() { cookies().delete(COOKIE_NAME); }

export function readSession(): SessionPayload | null {
  const raw = cookies().get(COOKIE_NAME)?.value;
  if (!raw) return null;
  const [body, signature] = raw.split(".");
  if (!body || !signature || sign(body) !== signature) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch { return null; }
}

export async function getCurrentUser() {
  const session = readSession();
  if (!session) return null;
  return prisma.user.findUnique({ where: { id: session.id }, select: { id: true, name: true, email: true, role: true, course: true, createdAt: true } });
}

export async function requireUser(roles?: Role[]) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (roles && !roles.includes(user.role)) redirect("/dashboard");
  return user;
}
