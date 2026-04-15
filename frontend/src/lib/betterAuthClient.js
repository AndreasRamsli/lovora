import { createAuthClient } from "better-auth/client";
import { dashClient } from "@better-auth/infra/client";

const baseURL = import.meta.env.VITE_BETTER_AUTH_URL || window.location.origin;

export const betterAuthClient = createAuthClient({
  baseURL,
  plugins: [dashClient()],
  fetchOptions: {
    credentials: "include",
  },
});
