import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const verifiSession = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signup");

  return session;
};
