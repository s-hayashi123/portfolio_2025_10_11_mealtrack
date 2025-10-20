import "server-only";

import { headers } from "next/headers";
import { auth } from "./auth";

export const verifiSession = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session;
};

export const verifiSessionForAPI = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session;
};
