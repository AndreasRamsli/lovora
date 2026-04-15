import { API_BASE } from "@/utils/constants";

const AuthBridge = {
  exchange: async () => {
    return fetch(`${API_BASE}/auth/bridge/exchange`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
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
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((error) => ({
        valid: false,
        user: null,
        message: error.message,
      }));
  },
};

export default AuthBridge;
