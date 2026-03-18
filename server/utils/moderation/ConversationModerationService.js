const RULES = [
  {
    id: "secret.api_key",
    category: "secrets_credentials",
    patterns: [
      /\bsk-[a-z0-9]{16,}\b/i,
      /\b(api|access|secret)[ _-]?key\b/i,
      /\bprivate[ _-]?key\b/i,
      /\bbearer\s+[a-z0-9._-]{16,}\b/i,
      /\b(password|passcode)\s*(is|=|:)\s*\S+/i,
    ],
  },
  {
    id: "pii.contact",
    category: "pii",
    patterns: [
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
      /\b\d{3}-\d{2}-\d{4}\b/,
      /\b(?:\d[ -]*?){13,16}\b/,
      /\b(?:\+?\d{1,3}[ -]?)?(?:\(?\d{2,4}\)?[ -]?)?\d{3,4}[ -]?\d{4}\b/,
    ],
  },
  {
    id: "fraud.credential_theft",
    category: "phishing_fraud",
    patterns: [
      /\bphishing\b/i,
      /\bcredential stuffing\b/i,
      /\bsteal (?:their |user )?(?:passwords?|credentials?)\b/i,
      /\bbypass (?:2fa|mfa|otp)\b/i,
      /\bfake (?:login|bank|invoice|support)\b/i,
    ],
  },
  {
    id: "malware.exploit",
    category: "malware_exploit",
    patterns: [
      /\bransomware\b/i,
      /\bkeylogger\b/i,
      /\breverse shell\b/i,
      /\bmalware\b/i,
      /\bexploit\b/i,
      /\bpayload\b/i,
    ],
  },
  {
    id: "prompt_injection.system_override",
    category: "prompt_injection",
    patterns: [
      /\bignore (?:all |any )?(?:previous|prior) instructions\b/i,
      /\breveal (?:the )?(?:system prompt|developer message)\b/i,
      /\bbypass (?:your |the )?(?:safeguards|guardrails|policies)\b/i,
      /\bshow me (?:the )?(?:hidden|internal) prompt\b/i,
      /\bdeveloper message\b/i,
    ],
  },
];

class ConversationModerationService {
  static classify(message = "") {
    const text = String(message || "").trim();
    if (!text) {
      return {
        disposition: "safe",
        riskLevel: "safe",
        categories: [],
        matchedRules: [],
      };
    }

    const matchedRules = RULES.filter(({ patterns }) =>
      patterns.some((pattern) => pattern.test(text))
    ).map(({ id, category }) => ({ id, category }));

    const categories = [...new Set(matchedRules.map(({ category }) => category))];
    const review = matchedRules.length > 0;

    return {
      disposition: review ? "review" : "safe",
      riskLevel: review ? "review" : "safe",
      categories,
      matchedRules,
    };
  }
}

module.exports = {
  ConversationModerationService,
};
