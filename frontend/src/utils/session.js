import {
  API_BASE,
  AUTH_TIMESTAMP,
  AUTH_TOKEN,
  AUTH_USER,
  LAST_VISITED_WORKSPACE,
  PENDING_HOME_MESSAGE,
  USER_PROMPT_INPUT_MAP,
} from "./constants";
import { baseHeaders } from "./request";
import paths from "./paths";

// Checks current localstorage and validates the session based on that.
export default async function validateSessionTokenForUser() {
  const isValidSession = await fetch(`${API_BASE}/system/check-token`, {
    method: "GET",
    cache: "default",
    headers: baseHeaders(),
  })
    .then((res) => res.status === 200)
    .catch(() => false);

  return isValidSession;
}

export function clearStoredSession() {
  window.localStorage.removeItem(AUTH_USER);
  window.localStorage.removeItem(AUTH_TOKEN);
  window.localStorage.removeItem(AUTH_TIMESTAMP);
  window.localStorage.removeItem(LAST_VISITED_WORKSPACE);
  window.localStorage.removeItem(USER_PROMPT_INPUT_MAP);
  window.sessionStorage.removeItem(PENDING_HOME_MESSAGE);
}

export function logoutCurrentUser(redirectTo = paths.login(true)) {
  clearStoredSession();
  window.location.replace(redirectTo);
}
