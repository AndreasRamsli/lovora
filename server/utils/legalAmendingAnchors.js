const AMENDING_VERSION_TYPES = new Set(["amending_act", "amending_regulation"]);

function isAmendingFullDocument(row = {}) {
  if (String(row.subsection || "").trim()) return false;

  return (
    AMENDING_VERSION_TYPES.has(row.versionType) &&
    row.section === "full-document"
  );
}

function normalizeSectionAnchor(section) {
  return String(section || "")
    .replace(/\s+/g, "")
    .replace(/[.:,;]+$/, "")
    .trim();
}

function hasAmendingSectionContext({ before, after, hasNewOperation }) {
  const beforeText = before.trim();
  const afterText = after.trim();

  if (/\b(jf\.?|jfr\.?|etter|av|i|til|fra|med)\s*$/iu.test(beforeText)) {
    return false;
  }

  if (!beforeText) {
    return (
      hasNewOperation ||
      /^\./u.test(afterText) ||
      /\b(skal\s+lyd[ea]|oppheves|endres)\b/iu.test(afterText)
    );
  }

  return /\bskal\s*$/iu.test(beforeText) && /^lyd[ea]\b/iu.test(afterText);
}

function extractAmendingSectionAnchors(text = "") {
  const anchors = [];
  const seen = new Set();
  const spacedSuffixLookahead =
    "skal|forste|første|annet|andre|tredje|fjerde|femte|sjette|" +
    "sjuende|syvende|attende|åttende|niende|tiende|punktum|ledd|nr\\.?|bokstav";
  const sectionPattern = new RegExp(
    "(ny(?:tt)?\\s+)?§(?!§)\\s*" +
      "([0-9]+(?:-[0-9]+)*(?:[a-z]|\\s+[a-z](?=\\s+(?:" +
      spacedSuffixLookahead +
      ")\\b|[.:,;]))?)",
    "giu"
  );

  for (const line of String(text).split(/\r?\n/u)) {
    for (const match of line.matchAll(sectionPattern)) {
      const before = line.slice(0, match.index);
      const after = line.slice(match.index + match[0].length);

      if (
        !hasAmendingSectionContext({
          before,
          after,
          hasNewOperation: Boolean(match[1]),
        })
      ) {
        continue;
      }

      const section = normalizeSectionAnchor(match[2]);
      if (!section || seen.has(section)) continue;
      seen.add(section);
      anchors.push(section);
    }
  }

  return anchors;
}

function buildVirtualAmendingRows(row = {}) {
  if (!isAmendingFullDocument(row)) return [];

  return extractAmendingSectionAnchors(row.text).map((section) => {
    const canonicalSectionId = `${row.jurisdiction || "NO"}:${
      row.corpus
    }:${row.documentId}:amending-section:${section}`;

    return {
      ...row,
      section,
      subsection: "",
      subsectionLabel: "",
      segmentType: "virtual_amending_section",
      canonicalSectionId,
      canonicalSourceId: canonicalSectionId,
      canonicalSourceIds: [canonicalSectionId],
      matchReason: "amending_act_section_match",
      isVirtualAmendingSection: true,
    };
  });
}

module.exports = {
  buildVirtualAmendingRows,
  extractAmendingSectionAnchors,
  isAmendingFullDocument,
};
