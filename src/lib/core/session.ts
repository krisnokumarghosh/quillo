"use server"

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user ?? null;
};

type UserRole = "admin" | "user";

export const requireRole = async (role: UserRole) => {
  const user = await getUserSession();
  if (!user) {
    return redirect("/login");
  }
  if (user?.role !== role) {
    return redirect("/unauthorized");
  }
};
