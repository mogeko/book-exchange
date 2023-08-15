"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginedUserStatus() {
  const cookieStore = cookies();
  const uidCookie = cookieStore.get("uid");

  if (!uidCookie) redirect("/login");
  return {
    uid: parseInt(uidCookie.value),
  } as const;
}
