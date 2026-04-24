/* eslint-env jest, node */
const { OpenAICompatibleChat } = require('../../../utils/chats/openaiCompatible');
const { getVectorDbClass, getLLMProvider } = require('../../../utils/helpers');
const { extractTextContent, extractAttachments } = require('../../../endpoints/api/openai/helpers');
const {
  buildProviderSessionId,
  persistAndModerateConversation,
} = require('../../../utils/chats/persistence');

// Mock dependencies
jest.mock('../../../utils/helpers');
jest.mock('../../../utils/chats/persistence');
jest.mock('../../../utils/DocumentManager', () => ({
  DocumentManager: class {
    constructor() {
      this.pinnedDocs = jest.fn().mockResolvedValue([]);
    }
  }
}));

describe('OpenAICompatibleChat', () => {
  let mockWorkspace;
  let mockPrincipal;
  let mockVectorDb;
  let mockLLMConnector;
  let mockResponse;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Setup mock workspace
    mockWorkspace = {
      id: 1,
      slug: 'test-workspace',
      chatMode: 'chat',
      chatProvider: 'openai',
      chatModel: 'gpt-4',
    };
    mockPrincipal = {
      kind: 'workspace_service',
      apiKeyId: 42,
      workspaceId: 1,
      scopes: ['workspace:api_sessions:write'],
    };

    // Setup mock VectorDb
    mockVectorDb = {
      hasNamespace: jest.fn().mockResolvedValue(true),
      namespaceCount: jest.fn().mockResolvedValue(1),
      performSimilaritySearch: jest.fn().mockResolvedValue({
        contextTexts: [],
        sources: [],
        message: null,
      }),
    };
    getVectorDbClass.mockReturnValue(mockVectorDb);

    // Setup mock LLM connector
    mockLLMConnector = {
      promptWindowLimit: jest.fn().mockReturnValue(4000),
      compressMessages: jest.fn().mockResolvedValue([]),
      getChatCompletion: jest.fn().mockResolvedValue({
        textResponse: 'Mock response',
        metrics: {},
      }),
      streamingEnabled: jest.fn().mockReturnValue(true),
      streamGetChatCompletion: jest.fn().mockResolvedValue({
        metrics: {},
      }),
      handleStream: jest.fn().mockResolvedValue('Mock streamed response'),
      defaultTemp: 0.7,
    };
    getLLMProvider.mockReturnValue(mockLLMConnector);

    buildProviderSessionId.mockReturnValue(
      'workspace:test-workspace:api:42'
    );
    persistAndModerateConversation.mockResolvedValue({
      chat: { id: 'mock-chat-id' },
      error: null,
      moderationResult: {
        disposition: 'safe',
        riskLevel: 'safe',
        categories: [],
        matchedRules: [],
      },
    });

    // Setup mock response object for streaming
    mockResponse = {
      write: jest.fn(),
    };
  });

  describe('chatSync', () => {
    test('should handle OpenAI vision multimodal messages', async () => {
      const multiModalPrompt = [
        {
          type: 'text',
          text: 'What do you see in this image?'
        },
        {
          type: 'image_url',
          image_url: {
            url: 'data:image/png;base64,abc123',
            detail: 'low'
          }
        }
      ];

      const prompt = extractTextContent(multiModalPrompt);
      const attachments = extractAttachments(multiModalPrompt);
      const result = await OpenAICompatibleChat.chatSync({
        principal: mockPrincipal,
        workspace: mockWorkspace,
        prompt,
        attachments,
        systemPrompt: 'You are a helpful assistant',
        history: [
          { role: 'user', content: 'Previous message' },
          { role: 'assistant', content: 'Previous response' }
        ],
        temperature: 0.7
      });

      // Verify chat was saved with correct format
      expect(persistAndModerateConversation).toHaveBeenCalledWith(
        expect.objectContaining({
          workspace: mockWorkspace,
          apiSessionId: '42',
          prompt: multiModalPrompt[0].text,
          response: expect.objectContaining({
            text: 'Mock response',
            attachments: [{
              name: 'uploaded_image_0',
              mime: 'image/png',
              contentString: multiModalPrompt[1].image_url.url
            }]
          })
        })
      );
      expect(mockLLMConnector.getChatCompletion).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({
          sessionId: 'workspace:test-workspace:api:42',
        })
      );

      // Verify response format
      expect(result).toEqual(
        expect.objectContaining({
          object: 'chat.completion',
          choices: expect.arrayContaining([
            expect.objectContaining({
              message: expect.objectContaining({
                role: 'assistant',
                content: 'Mock response',
              }),
            }),
          ]),
        })
      );
    });

    test('should handle regular text messages in OpenAI format', async () => {
      const promptString = 'Hello world';
      const result = await OpenAICompatibleChat.chatSync({
        principal: mockPrincipal,
        workspace: mockWorkspace,
        prompt: promptString,
        systemPrompt: 'You are a helpful assistant',
        history: [
          { role: 'user', content: 'Previous message' },
          { role: 'assistant', content: 'Previous response' }
        ],
        temperature: 0.7
      });

      // Verify chat was saved without attachments
      expect(persistAndModerateConversation).toHaveBeenCalledWith(
        expect.objectContaining({
          workspace: mockWorkspace,
          apiSessionId: '42',
          prompt: promptString,
          response: expect.objectContaining({
            text: 'Mock response',
            attachments: []
          })
        })
      );

      expect(result).toBeTruthy();
    });
  });

  describe('streamChat', () => {
    test('should handle OpenAI vision multimodal messages in streaming mode', async () => {
      const multiModalPrompt = [
        {
          type: 'text',
          text: 'What do you see in this image?'
        },
        {
          type: 'image_url',
          image_url: {
            url: 'data:image/png;base64,abc123',
            detail: 'low'
          }
        }
      ];

      const prompt = extractTextContent(multiModalPrompt);
      const attachments = extractAttachments(multiModalPrompt);
      await OpenAICompatibleChat.streamChat({
        principal: mockPrincipal,
        workspace: mockWorkspace,
        response: mockResponse,
        prompt,
        attachments,
        systemPrompt: 'You are a helpful assistant',
        history: [
          { role: 'user', content: 'Previous message' },
          { role: 'assistant', content: 'Previous response' }
        ],
        temperature: 0.7
      });

      // Verify streaming was handled
      expect(mockLLMConnector.streamGetChatCompletion).toHaveBeenCalled();
      expect(mockLLMConnector.handleStream).toHaveBeenCalled();

      // Verify chat was saved with attachments
      expect(persistAndModerateConversation).toHaveBeenCalledWith(
        expect.objectContaining({
          workspace: mockWorkspace,
          apiSessionId: '42',
          prompt: multiModalPrompt[0].text,
          response: expect.objectContaining({
            text: 'Mock streamed response',
            attachments: [{
              name: 'uploaded_image_0',
              mime: 'image/png',
              contentString: multiModalPrompt[1].image_url.url
            }]
          })
        })
      );
      expect(mockLLMConnector.streamGetChatCompletion).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({
          sessionId: 'workspace:test-workspace:api:42',
        })
      );
    });

    test('should handle regular text messages in streaming mode', async () => {
      const promptString = 'Hello world';
      await OpenAICompatibleChat.streamChat({
        principal: mockPrincipal,
        workspace: mockWorkspace,
        response: mockResponse,
        prompt: promptString,
        systemPrompt: 'You are a helpful assistant',
        history: [
          { role: 'user', content: 'Previous message' },
          { role: 'assistant', content: 'Previous response' }
        ],
        temperature: 0.7
      });

      // Verify streaming was handled
      expect(mockLLMConnector.streamGetChatCompletion).toHaveBeenCalled();
      expect(mockLLMConnector.handleStream).toHaveBeenCalled();

      // Verify chat was saved without attachments
      expect(persistAndModerateConversation).toHaveBeenCalledWith(
        expect.objectContaining({
          workspace: mockWorkspace,
          apiSessionId: '42',
          prompt: promptString,
          response: expect.objectContaining({
            text: 'Mock streamed response',
            attachments: []
          })
        })
      );
    });
  });
});
