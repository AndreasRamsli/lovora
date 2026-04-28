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
  hasCanonicalSection,
} = require("../../../scripts/build-alpha-source-question-set.cjs");
const {
  parseArgs: parsePromptArgs,
  buildWorkspaceUpdateRequest,
  promptDigest,
} = require("../../../scripts/apply-alpha-system-prompt.cjs");
const {
  sha256File: sha256InstalledArtifact,
} = require("../../../scripts/install-legal-retrieval-artifacts.cjs");
const {
  evaluateConfig: evaluateRetrievalConfig,
  rankOfFirstMatch: rankOfRetrievalMatch,
} = require("../../../scripts/evaluate-retrieval.cjs");

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

  test("source question builder skips non-canonical exact sections from full-document amending chunks", () => {
    const cases = buildQuestionCases(
      [
        {
          corpus: "NL",
          doc_id: "nl-20250606-029",
          documentId: "LOV-2025-06-06-29",
          title: "Lov om endringer i havressurslova",
          shortTitle: "Endringslov til havressurslova",
          url: "https://lovdata.no/dokument/LTI/lov/2025-06-06-29",
          docType: "amending_act",
          section: "full-document",
          text:
            "I lov 6. juni 2008 nr. 37 om havressurslova skal § 46 lyde:\n" +
            "§ 46. Fiskeridirektoratet kan beslaglegge umerket fiskeredskap.\n" +
            "II Loven trer i kraft fra den tid Kongen bestemmer.",
        },
      ],
      {
        limit: 5,
        canonicalSections: new Set(["LOV-2025-06-06-29:full-document"]),
      }
    );

    const ids = cases.map((item) => item.id);
    expect(ids.some((id) => id.includes("section_46"))).toBe(false);
    expect(ids).toEqual(
      expect.arrayContaining([
        "nl_20250606_029_effective_date",
        "nl_20250606_029_amendment_summary",
      ])
    );
  });

  test("source question builder keeps exact section cases exposed by the canonical index", () => {
    const cases = buildQuestionCases(
      [
        {
          corpus: "NL",
          doc_id: "nl-20251222-120",
          documentId: "LOV-2025-12-22-120",
          title: "Lov om endringer i skattebetalingsloven",
          shortTitle: "Endringslov til skattebetalingsloven",
          url: "https://lovdata.no/dokument/LTI/lov/2025-12-22-120",
          docType: "amending_act",
          text:
            "Ny § 9-3 skal lyde:\n" +
            "§ 9-3. Betalingsutsettelse for formuesskatt\n" +
            "Personlig eier av virksomhet kan kreve utsettelse.",
        },
      ],
      {
        limit: 5,
        canonicalSections: new Set(["LOV-2025-12-22-120:9-3"]),
      }
    );

    expect(cases.some((item) => item.id.includes("section_9_3"))).toBe(true);
  });

  test("source question builder checks canonical sections across Lovdata ID shapes", () => {
    const canonicalSections = new Set(["LOV-2025-12-22-120:9-3"]);

    for (const record of [
      { documentId: "LOV-2025-12-22-120" },
      { doc_id: "nl-20251222-120" },
      { lovdataId: "nl-20251222-120" },
      { url: "https://lovdata.no/dokument/LTI/lov/2025-12-22-120" },
    ]) {
      expect(hasCanonicalSection(record, "§ 9-3", canonicalSections)).toBe(
        true
      );
    }
  });

  test("source question builder reserves canonical section cases before broad amending cases", () => {
    const broadRecords = Array.from({ length: 6 }, (_, index) => ({
      corpus: "NL",
      doc_id: `nl-2026010${index + 1}-00${index + 1}`,
      documentId: `LOV-2026-01-0${index + 1}-${index + 1}`,
      title: `Lov om endringer i testloven ${index + 1}`,
      shortTitle: `Endringslov ${index + 1}`,
      url: `https://lovdata.no/dokument/LTI/lov/2026-01-0${index + 1}-${
        index + 1
      }`,
      docType: "amending_act",
      text:
        "I loven skal følgende endres.\n" +
        "§ 1 skal lyde:\n" +
        "§ 1. Midlertidig prioritet for bred endring.\n" +
        "Loven trer i kraft straks.",
    }));
    const cases = buildQuestionCases(
      [
        ...broadRecords,
        {
          corpus: "NL",
          doc_id: "nl-20251222-120",
          documentId: "LOV-2025-12-22-120",
          title: "Lov om endringer i skattebetalingsloven",
          shortTitle: "Endringslov til skattebetalingsloven",
          url: "https://lovdata.no/dokument/LTI/lov/2025-12-22-120",
          docType: "amending_act",
          text:
            "Ny § 9-3 skal lyde:\n" +
            "§ 9-3. Betalingsutsettelse for formuesskatt\n" +
            "Personlig eier av virksomhet kan kreve utsettelse.",
        },
      ],
      {
        limit: 5,
        canonicalSections: new Set(["LOV-2025-12-22-120:9-3"]),
      }
    );

    expect(cases.map((item) => item.id)).toContain(
      "nl_20251222_120_section_9_3"
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

  test("alpha system prompt requires Norwegian output and lawyer-style citations", () => {
    const promptPath = path.resolve("scripts/prompts/lovora_alpha_system_prompt.txt");
    const prompt = fs.readFileSync(promptPath, "utf8");

    expect(prompt).toContain("Output language is Norwegian Bokmal");
    expect(prompt).toContain("tvisteloven § 20-2 første ledd");
    expect(prompt).toContain("forskrift 16. januar 2026 nr. 54 § 11-1");
    expect(prompt).toContain("[CONTEXT n]");
    expect(prompt).toMatch(/Do not use raw Lovdata IDs/i);
  });

  test("alpha user-question benchmark captures realistic citation expectations", () => {
    const benchmark = JSON.parse(
      fs.readFileSync(
        path.resolve("scripts/benchmarks/lovora_alpha_user_questions.json"),
        "utf8"
      )
    );

    expect(benchmark.length).toBeGreaterThanOrEqual(8);
    expect([...new Set(benchmark.flatMap((item) => item.tags))]).toEqual(
      expect.arrayContaining(["user-style", "citation-style"])
    );
    expect(benchmark).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "user_sakskostnader_tvisteloven_20_2",
          requiredCitationPatterns: expect.arrayContaining([
            "tvisteloven § 20-2",
          ]),
        }),
        expect.objectContaining({
          id: "user_gebyr_statens_vegvesen_11_1",
          requiredCitationPatterns: expect.arrayContaining([
            "forskrift 16. januar 2026 nr. 54",
            "§ 11-1",
          ]),
        }),
      ])
    );
  });

  test("exact section watch benchmark captures canonical retrieval blockers", () => {
    const benchmark = JSON.parse(
      fs.readFileSync(
        path.resolve("scripts/benchmarks/lovora_alpha_exact_section_watch.json"),
        "utf8"
      )
    );

    expect(benchmark.map((item) => item.id)).toEqual([
      "exact_tvisteloven_20_3",
      "exact_skattebetalingsloven_9_3",
      "exact_skattebetalingsloven_10_51_fjerde_ledd",
    ]);
    expect(benchmark[2].expect).toEqual(
      expect.objectContaining({
        canonicalSourceId:
          "NO:NL:LOV-2005-06-17-67:section:10-51:ledd:4",
        retrievalReason: "exact_section_subsection_match",
      })
    );
  });

  test("retrieval evaluator matches canonical IDs and reason codes", () => {
    const rank = rankOfRetrievalMatch(
      [
        {
          canonicalSourceId: "wrong",
          retrievalReasons: ["vector_fallback"],
          text: "31. mai i det tredje året etter fastsettingsåret.",
        },
        {
          canonicalSourceId:
            "NO:NL:LOV-2005-06-17-67:section:10-51:ledd:4",
          canonicalSectionId: "NO:NL:LOV-2005-06-17-67:section:10-51",
          retrievalReasons:
            '["title_alias_match","exact_section_subsection_match"]',
          text: "31. mai i det tredje året etter fastsettingsåret.",
        },
      ],
      {
        canonicalSourceId: "NO:NL:LOV-2005-06-17-67:section:10-51:ledd:4",
        retrievalReason: "exact_section_subsection_match",
        textIncludes: "31. mai",
      }
    );

    expect(rank).toBe(2);
  });

  test("retrieval evaluator uses shared workspace context retriever", async () => {
    const retrieveContext = jest.fn().mockResolvedValue({
      sources: [
        {
          canonicalSourceId: "NO:NL:LOV-2005-06-17-90:section:20-3",
          retrievalReasons: ["exact_section_match"],
          text: "Medhold av betydning.",
        },
      ],
    });

    const result = await evaluateRetrievalConfig({
      workspace: { slug: "lovora-alpha", topN: 4 },
      benchmark: [
        {
          id: "exact_tvisteloven_20_3",
          query: "Hva sier tvisteloven § 20-3?",
          tags: [],
          expect: {
            canonicalSourceId: "NO:NL:LOV-2005-06-17-90:section:20-3",
            retrievalReason: "exact_section_match",
          },
        },
      ],
      vectorDb: {},
      llmProvider: {},
      config: {
        id: "rerank-top4-thr0_25",
        rerank: true,
        topN: 4,
        similarityThreshold: 0.25,
      },
      retrieveContext,
    });

    expect(retrieveContext).toHaveBeenCalledWith(
      expect.objectContaining({
        query: "Hva sier tvisteloven § 20-3?",
        workspaceSlug: "lovora-alpha",
        topN: 4,
        includeHistoryBackfill: false,
      })
    );
    expect(result.caseResults[0]).toEqual(
      expect.objectContaining({ matched: true, rank: 1 })
    );
  });

  test("artifact installer hashes files with streaming checksum helper", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "lovora-artifact-hash-"));
    const filePath = path.join(dir, "canonical_section_index.jsonl");
    const body = "canonical-row\n".repeat(10_000);
    fs.writeFileSync(filePath, body, "utf8");
    try {
      expect(sha256InstalledArtifact(filePath)).toBe(
        require("crypto").createHash("sha256").update(body).digest("hex")
      );
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  test("alpha prompt apply CLI builds a management update request without leaking keys", () => {
    const prompt = "System prompt";
    const args = parsePromptArgs([
      "--workspace",
      "lovora-alpha",
      "--api-base",
      "https://app.lovora.no/api/",
      "--management-api-key",
      "secret-management-key",
      "--prompt-file",
      "scripts/prompts/lovora_alpha_system_prompt.txt",
      "--dry-run",
    ]);

    const request = buildWorkspaceUpdateRequest(args, prompt);

    expect(args.dryRun).toBe(true);
    expect(request.url).toBe("https://app.lovora.no/api/v1/workspace/lovora-alpha/update");
    expect(request.options.method).toBe("POST");
    expect(request.options.headers.Authorization).toBe("Bearer secret-management-key");
    expect(JSON.parse(request.options.body)).toEqual({ openAiPrompt: prompt });
    expect(promptDigest(prompt)).toMatch(/^[a-f0-9]{64}$/);
    expect(JSON.stringify(request.options.body)).not.toContain("secret-management-key");
  });
});
