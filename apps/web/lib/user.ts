import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function loginUser() {
  const cookieStore = cookies();
  const userId = cookieStore.get("uid");

  if (!userId) redirect("/login");
  return {
    uid: parseInt(userId.value),
  } as const;
}
