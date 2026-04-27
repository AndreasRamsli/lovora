const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  artifactPathsForWorkspace,
  hasLegalRetrievalArtifacts,
  loadLegalRetrievalStore,
  materializeCanonicalText,
  readJsonl,
} = require("../../utils/legalRetrievalStore");

function withArtifacts(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "lovora-legal-store-"));
  try {
    const artifactDir = path.join(dir, "legal-retrieval", "lovora-alpha");
    fs.mkdirSync(artifactDir, { recursive: true });
    fs.writeFileSync(
      path.join(artifactDir, "canonical_section_index.jsonl"),
      [
        JSON.stringify({
          canonicalSourceId: "NO:NL:LOV-2005-06-17-67:section:9-3:ledd:1",
          canonicalSectionId: "NO:NL:LOV-2005-06-17-67:section:9-3",
          documentId: "LOV-2005-06-17-67",
          canonicalTitle: "skattebetalingsloven",
          aliases: ["skattebetalingsloven", "lov 17. juni 2005 nr. 67"],
          section: "9-3",
          subsection: "ledd:1",
          text: "Alpha",
        }),
      ].join("\n") + "\n",
      "utf8"
    );
    fs.writeFileSync(
      path.join(artifactDir, "embedding_manifest.jsonl"),
      [
        JSON.stringify({
          embeddingChunkId: "NO:EMBED:NL:nl-20050617-067:bundle:21",
          canonicalSourceIds: ["NO:NL:LOV-2005-06-17-67:section:9-3:ledd:1"],
        }),
      ].join("\n") + "\n",
      "utf8"
    );
    fn(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

describe("legalRetrievalStore", () => {
  test("computes artifact paths for a workspace", () => {
    const paths = artifactPathsForWorkspace({
      workspaceSlug: "lovora-alpha",
      storageDir: "/tmp/storage",
    });

    expect(paths.canonicalSectionIndexPath).toBe(
      "/tmp/storage/legal-retrieval/lovora-alpha/canonical_section_index.jsonl"
    );
    expect(paths.embeddingManifestPath).toBe(
      "/tmp/storage/legal-retrieval/lovora-alpha/embedding_manifest.jsonl"
    );
  });

  test("reads jsonl records", () => {
    const file = path.join(os.tmpdir(), `lovora-jsonl-${Date.now()}.jsonl`);
    fs.writeFileSync(file, '{"a":1}\n\n{"b":2}\n', "utf8");
    try {
      expect(readJsonl(file)).toEqual([{ a: 1 }, { b: 2 }]);
    } finally {
      fs.rmSync(file, { force: true });
    }
  });

  test("reads jsonl records split across tiny chunks", () => {
    const file = path.join(os.tmpdir(), `lovora-jsonl-chunked-${Date.now()}.jsonl`);
    fs.writeFileSync(
      file,
      [
        JSON.stringify({ text: "alpha".repeat(20) }),
        JSON.stringify({ text: "beta".repeat(20) }),
      ].join("\n") + "\n",
      "utf8"
    );
    try {
      expect(readJsonl(file, { chunkSize: 11 }).map((row) => row.text)).toEqual([
        "alpha".repeat(20),
        "beta".repeat(20),
      ]);
    } finally {
      fs.rmSync(file, { force: true });
    }
  });

  test("loads canonical and embedding lookup maps", () => {
    withArtifacts((storageDir) => {
      const store = loadLegalRetrievalStore({
        workspaceSlug: "lovora-alpha",
        storageDir,
      });

      expect(
        materializeCanonicalText(
          store.canonicalBySourceId.get(
            "NO:NL:LOV-2005-06-17-67:section:9-3:ledd:1"
          )
        )
      ).toBe("Alpha");
      expect(
        store.canonicalBySectionId.get(
          "NO:NL:LOV-2005-06-17-67:section:9-3"
        )
      ).toHaveLength(1);
      expect(store.canonicalBySection.get("9-3")).toHaveLength(1);
      expect(
        store.embeddingByChunkId.get("NO:EMBED:NL:nl-20050617-067:bundle:21")
      ).toBeTruthy();
      expect(store.aliasToDocumentIds.get("skattebetalingsloven")).toEqual(
        new Set(["LOV-2005-06-17-67"])
      );
    });
  });

  test("detects installed legal retrieval artifacts", () => {
    withArtifacts((storageDir) => {
      expect(
        hasLegalRetrievalArtifacts({
          workspaceSlug: "lovora-alpha",
          storageDir,
        })
      ).toBe(true);
      expect(
        hasLegalRetrievalArtifacts({
          workspaceSlug: "missing",
          storageDir,
        })
      ).toBe(false);
    });
  });
});
