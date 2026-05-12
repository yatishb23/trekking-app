import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const ADMIN_SESSION_KEY = "admin_session";

export async function setAdminSession() {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  (await cookies()).set(ADMIN_SESSION_KEY, "true", {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export async function getAdminSession() {
  return (await cookies()).get(ADMIN_SESSION_KEY)?.value === "true";
}

export async function logoutAdmin() {
  (await cookies()).delete(ADMIN_SESSION_KEY);
}

export async function verifyAdmin(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.isAdmin) return false;

  return bcrypt.compare(password, user.password);
}
