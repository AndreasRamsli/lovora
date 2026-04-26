const path = require("path");
const fs = require("fs");
const os = require("os");
const {
  parseArgs: parseAnswerArgs,
  readJson: readAnswerJson,
  writeAnswerTemplate,
} = require("../../../scripts/evaluate-alpha-answer-contract.cjs");
const {
  readJson: readRetrievalJson,
} = require("../../../scripts/evaluate-alpha-retrieval-watch.cjs");
const {
  parseArgs: parseRunAnswerArgs,
  buildChatRequestBody,
  runAnswerEval,
} = require("../../../scripts/run-alpha-answer-eval.cjs");
const {
  buildQuestionCases,
} = require("../../../scripts/build-alpha-source-question-set.cjs");

describe("legal alpha CLI input errors", () => {
  test("answer contract CLI can write an answer template", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "lovora-alpha-answer-"));
    const outputPath = path.join(dir, "alpha-answers.json");

    writeAnswerTemplate(outputPath, [
      {
        id: "alpha_case",
        question: "Hva sier kilden?",
        tags: ["answer-contract"],
      },
    ]);

    expect(JSON.parse(fs.readFileSync(outputPath, "utf8"))).toEqual([
      {
        id: "alpha_case",
        question: "Hva sier kilden?",
        response: "",
      },
    ]);
  });

  test("answer contract CLI parses init-template without requiring answers", () => {
    const args = parseAnswerArgs([
      "--init-template",
      "test-results/alpha-answers.json",
    ]);

    expect(args.initTemplate).toBe(
      path.resolve("test-results/alpha-answers.json")
    );
    expect(args.answers).toBeNull();
  });

  test("answer contract CLI explains placeholder answer paths", () => {
    const placeholderPath = path.resolve("path/to/alpha-answers.json");

    expect(() => readAnswerJson(placeholderPath)).toThrow(
      /Replace `path\/to\/alpha-answers\.json`/
    );
  });

  test("retrieval watch CLI explains placeholder report paths", () => {
    const placeholderPath = path.resolve("path/to/retrieval-report.json");

    expect(() => readRetrievalJson(placeholderPath)).toThrow(
      /Replace `path\/to\/retrieval-report\.json`/
    );
  });

  test("source question builder creates questions from legal source text", () => {
    const cases = buildQuestionCases(
      [
        {
          corpus: "NL",
          doc_id: "nl-20251222-120",
          title: "Lov om endringer i skattebetalingsloven",
          shortTitle: "Endringslov til skattebetalingsloven",
          url: "https://lovdata.no/dokument/LTI/lov/2025-12-22-120",
          text:
            "Ny § 9-3 skal lyde:\n§ 9-3 . Betalingsutsettelse for formuesskatt\n" +
            "Personlig eier av virksomhet kan kreve å utsette betalingen av formuesskatt på virksomhetsformue.\n" +
            "§ 10-51 nytt fjerde ledd skal lyde:\n" +
            "Utsatt formuesskatt og renter etter § 9-3 forfaller til betaling 31. mai i det tredje året etter fastsettingsåret.",
        },
      ],
      { limit: 5 }
    );

    expect(cases[0]).toEqual(
      expect.objectContaining({
        id: expect.stringContaining("nl_20251222_120"),
        sourceType: "source_mined",
        question: expect.stringContaining("§ 9-3"),
        requiredCitationPatterns: expect.arrayContaining(["§ 9-3"]),
        minContextRefs: 1,
      })
    );
  });

  test("answer runner posts benchmark questions and evaluates captured answers", async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "lovora-alpha-run-"));
    const benchmarkPath = path.join(dir, "benchmark.json");
    const answersPath = path.join(dir, "answers.json");
    const reportJson = path.join(dir, "report.json");
    const reportMd = path.join(dir, "report.md");
    fs.writeFileSync(
      benchmarkPath,
      JSON.stringify([
        {
          id: "alpha_case",
          question: "Hva sier husleieloven § 12-5?",
          requiredTerms: ["Husleietvistutvalget"],
          requiredCitationPatterns: ["husleieloven § 12-5"],
          minContextRefs: 1,
        },
      ])
    );

    const args = parseRunAnswerArgs([
      "--workspace",
      "lovora-alpha",
      "--api-base",
      "http://localhost:3001/api",
      "--workspace-api-key",
      "secret-key",
      "--benchmark",
      benchmarkPath,
      "--answers-out",
      answersPath,
      "--report-json",
      reportJson,
      "--report-md",
      reportMd,
    ]);
    const calls = [];
    const report = await runAnswerEval(args, {
      fetch: async (url, options) => {
        calls.push({ url, options });
        return {
          ok: true,
          json: async () => ({
            id: "chat-id",
            type: "textResponse",
            textResponse:
              "Kort svar: Husleietvistutvalget er omtalt i husleieloven § 12-5 [CONTEXT 0]. Kildegrunnlag: husleieloven § 12-5 [CONTEXT 0].",
            sources: [{ title: "Husleieloven" }],
            error: null,
          }),
        };
      },
      now: () => new Date("2026-04-26T12:00:00.000Z"),
      logger: { log: jest.fn() },
    });

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe("http://localhost:3001/api/v1/workspace/lovora-alpha/chat");
    expect(JSON.parse(calls[0].options.body)).toEqual(
      expect.objectContaining({
        message: "Hva sier husleieloven § 12-5?",
        mode: "query",
        reset: true,
      })
    );
    expect(calls[0].options.headers.Authorization).toBe("Bearer secret-key");
    expect(JSON.stringify(JSON.parse(fs.readFileSync(answersPath, "utf8")))).not.toContain(
      "secret-key"
    );
    expect(report.summary.failed).toBe(0);
  });

  test("answer runner request body keeps chat in query mode", () => {
    expect(
      buildChatRequestBody({
        id: "case-a",
        question: "Hva sier kilden?",
      }, "prefix")
    ).toEqual({
      message: "Hva sier kilden?",
      mode: "query",
      sessionId: "prefix-case-a",
      reset: true,
    });
  });
});
