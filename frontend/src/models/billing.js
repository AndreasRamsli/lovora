import { API_BASE } from "../utils/constants";
import { baseHeaders } from "../utils/request";

const Billing = {
  status: async function () {
    return await fetch(`${API_BASE}/billing/status`, {
      method: "GET",
      headers: baseHeaders(),
    })
      .then(async (res) => {
        const payload = await res.json().catch(() => ({}));
        if (res.ok) return payload;
        return {
          ...payload,
          success: false,
          error: payload?.error || payload?.message || "Failed to fetch status",
        };
      })
      .catch((e) => ({ success: false, error: e.message }));
  },

  createCheckoutSession: async function ({
    planKey,
    workspaceSlug,
    successUrl = null,
    cancelUrl = null,
  }) {
    return await fetch(`${API_BASE}/billing/checkout-session`, {
      method: "POST",
      headers: baseHeaders(),
      body: JSON.stringify({
        planKey,
        workspaceSlug,
        successUrl,
        cancelUrl,
      }),
    })
      .then(async (res) => {
        const payload = await res.json().catch(() => ({}));
        if (res.ok) return payload;
        return {
          ...payload,
          success: false,
          error:
            payload?.error ||
            payload?.message ||
            "Failed to create checkout session",
        };
      })
      .catch((e) => ({ success: false, error: e.message }));
  },
};

export default Billing;
