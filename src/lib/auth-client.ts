import { createAuthClient } from "better-auth/react";
import {
  anonymousClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [anonymousClient(), inferAdditionalFields()],
});
