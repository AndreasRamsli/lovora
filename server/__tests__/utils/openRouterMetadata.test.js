/* eslint-env jest */
const mockCreate = jest.fn();

jest.mock("openai", () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate,
        },
      },
    })),
  };
}, { virtual: true });

jest.mock("uuid", () => ({ v4: () => "uuid-123" }), { virtual: true });

jest.mock("../../utils/EmbeddingEngines/native", () => ({
  NativeEmbedder: class {},
}));

jest.mock("../../utils/helpers/chat/responses", () => ({
  writeResponseChunk: jest.fn(),
  clientAbortedHandler: jest.fn(),
  formatChatHistory: jest.fn().mockReturnValue([]),
}));

jest.mock("../../utils/http", () => ({
  safeJsonParse: (value, fallback) => {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  },
}));

jest.mock("../../utils/helpers/chat/LLMPerformanceMonitor", () => ({
  LLMPerformanceMonitor: {
    measureAsyncFunction: jest.fn(async (promise) => ({
      output: await promise,
      duration: 1,
    })),
    measureStream: jest.fn(async ({ func }) => func),
  },
}));

describe("OpenRouter metadata forwarding", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env.OPENROUTER_API_KEY = "test-openrouter-key";
  });

  test("passes user and session_id for sync chat completions", async () => {
    const { OpenRouterLLM } = require("../../utils/AiProviders/openRouter");
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: "ok" } }],
      usage: {
        prompt_tokens: 1,
        completion_tokens: 1,
        total_tokens: 2,
      },
    });

    const llm = new OpenRouterLLM({}, "openrouter/test-model");
    llm.isValidChatCompletionModel = jest.fn().mockResolvedValue(true);

    await llm.getChatCompletion(
      [{ role: "user", content: "Hello" }],
      {
        temperature: 0.3,
        user: { id: 42, username: "alice" },
        sessionId: "workspace:test:user:42:default",
      }
    );

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        user: "user-42",
        session_id: "workspace:test:user:42:default",
      })
    );
  });
});
