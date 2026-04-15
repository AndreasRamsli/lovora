import { API_BASE } from "@/utils/constants";

const AuthBridge = {
  exchange: async () => {
    return fetch(`${API_BASE}/auth/bridge/exchange`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
    })
      .then(async (res) => {
        const payload = await res.json().catch(() => ({}));
        if (!res.ok) {
          return {
            valid: false,
            user: null,
            token: null,
            message: payload?.message || `Exchange failed (${res.status})`,
          };
        }
        return payload;
      })
      .catch((error) => ({
        valid: false,
        user: null,
        token: null,
        message: error.message,
      }));
  },
  session: async () => {
    return fetch(`${API_BASE}/auth/bridge/session`, {
      method: "GET",
      cache: "no-store",
      credentials: "include",
    })
      .then(async (res) => {
        const payload = await res.json().catch(() => ({}));
        if (!res.ok) {
          return {
            valid: false,
            user: null,
            message: payload?.message || `Session check failed (${res.status})`,
          };
        }
        return payload;
      })
      .catch((error) => ({
        valid: false,
        user: null,
        message: error.message,
      }));
  },
};

export default AuthBridge;
