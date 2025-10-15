import "server-only";

import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const verifiSession = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signup");

  return session;
};

export const verifiSessionForAPI = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session;
};
