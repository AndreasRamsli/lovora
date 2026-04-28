const ORDINAL_LEDD = new Map([
  ["første", 1],
  ["fyrste", 1],
  ["andre", 2],
  ["annet", 2],
  ["anna", 2],
  ["tredje", 3],
  ["fjerde", 4],
  ["femte", 5],
  ["sjette", 6],
  ["sjuende", 7],
  ["syvende", 7],
  ["åttende", 8],
  ["niende", 9],
  ["tiende", 10],
]);
const SHORT_DOCUMENT_TITLE =
  "[a-zæøå][a-zæøå0-9-]*(?:loven|lova|forskriften|forskrifta)";
const DOCUMENT_HINT_PATTERN =
  new RegExp(
    `\\b((?:endringslov(?:en)?|endringsforskrift(?:en)?)\\s+til\\s+${SHORT_DOCUMENT_TITLE}|(?:lov|forskrift)\\s+om\\s+endring(?:er)?\\s+i\\s+${SHORT_DOCUMENT_TITLE}|${SHORT_DOCUMENT_TITLE})\\s*$`,
    "g"
  );

function normalizeLegalCitationText(value = "") {
  return String(value)
    .normalize("NFKC")
    .replace(/[–—−]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function normalizeSectionRef(value = "") {
  const text = normalizeLegalCitationText(value);
  const match = text.match(/(?:§+\s*)?(\d+[a-zæøå]?(?:-\d+[a-zæøå]?)?)/i);
  return match ? match[1] : "";
}

function normalizeDocumentHint(hint = "") {
  const text = normalizeLegalCitationText(hint);
  const amendmentMatch = text.match(
    /^(lov|forskrift)\s+om\s+endring(?:er)?\s+i\s+(.+)$/
  );
  if (!amendmentMatch) {
    return text.replace(
      /^(endringslov|endringsforskrift)en(\s+til\b)/,
      "$1$2"
    );
  }

  const [, sourceType, targetTitle] = amendmentMatch;
  return `${
    sourceType === "forskrift" ? "endringsforskrift" : "endringslov"
  } til ${targetTitle}`;
}

function preferredVersionTypeForHint(hint = "") {
  const text = normalizeDocumentHint(hint);
  return /^(?:endringslov(?:en)?|endringsforskrift(?:en)?)(?:\s+til\b|\b)/.test(
    text
  )
    ? "amending"
    : "current";
}

function lastMatch(pattern, text) {
  let result = null;
  for (const match of text.matchAll(pattern)) result = match;
  return result;
}

function parseLedd(afterSection = "") {
  const match = normalizeLegalCitationText(afterSection).match(
    /^\s*(?:(første|fyrste|andre|annet|anna|tredje|fjerde|femte|sjette|sjuende|syvende|åttende|niende|tiende)|(\d+)\.?)\s+ledd\b/
  );
  if (!match) return { subsections: [], rawSuffix: "" };
  const number = match[2] ? Number(match[2]) : ORDINAL_LEDD.get(match[1]);
  if (!number) return { subsections: [], rawSuffix: "" };
  const label = `${match[1] || `${number}.`} ledd`;
  return {
    subsections: [{ type: "ledd", number, label }],
    rawSuffix: match[0].trim(),
  };
}

function parseBareContinuationReferences({
  text,
  documentHints,
  datedSourceHints,
  preferredVersionType,
}) {
  const references = [];
  let remaining = text;

  while (true) {
    const match = normalizeLegalCitationText(remaining).match(
      /^\s*(?:,|og|eller)\s+(?!§)(\d+[a-zæøå]?(?:-\d+[a-zæøå]?)?)/
    );
    if (!match) break;

    const section = normalizeSectionRef(match[1]);
    const consumed = match[0].length;
    const after = remaining.slice(consumed, consumed + 40);
    const ledd = parseLedd(after);
    references.push({
      raw: [section, ledd.rawSuffix].filter(Boolean).join(" ").trim(),
      documentHints,
      datedSourceHints,
      preferredVersionType:
        preferredVersionType ||
        preferredVersionTypeForHint((documentHints || [])[0]),
      section,
      subsections: ledd.subsections,
    });
    remaining = remaining.slice(consumed + ledd.rawSuffix.length);
  }

  return references;
}

function parseLegalCitationQuery(query = "") {
  const normalized = normalizeLegalCitationText(query);
  const references = [];
  let inheritedDocumentHints = [];
  let inheritedDatedSourceHints = [];
  let inheritedPreferredVersionType = "current";
  const sectionPattern = /§+\s*(\d+[a-zæøå]?(?:-\d+[a-zæøå]?)?)/gi;

  for (const match of normalized.matchAll(sectionPattern)) {
    const section = normalizeSectionRef(match[0]);
    const before = normalized.slice(0, match.index).slice(-140);
    const after = normalized.slice(
      match.index + match[0].length,
      match.index + match[0].length + 40
    );
    const datedMatch = lastMatch(
      /\b(?:lov|forskrift)\s+\d{1,2}\.\s+[a-zæøå]+\s+\d{4}\s+nr\.\s+\d+/g,
      before
    );
    const documentMatch = lastMatch(
      DOCUMENT_HINT_PATTERN,
      before
    );
    let activeDocumentMatch = documentMatch;
    let activeDatedMatch = datedMatch;
    if (documentMatch && datedMatch) {
      if (documentMatch.index > datedMatch.index) activeDatedMatch = null;
      else activeDocumentMatch = null;
    }

    const documentHints = activeDocumentMatch
      ? [normalizeDocumentHint(activeDocumentMatch[1])]
      : activeDatedMatch
        ? []
        : inheritedDocumentHints;
    const datedSourceHints = activeDatedMatch
      ? [activeDatedMatch[0].trim()]
      : activeDocumentMatch
        ? []
        : inheritedDatedSourceHints;
    const preferredVersionType = activeDocumentMatch
      ? preferredVersionTypeForHint(activeDocumentMatch[1])
      : activeDatedMatch
        ? "current"
        : inheritedPreferredVersionType;
    const ledd = parseLedd(after);
    const rawPrefix =
      datedSourceHints[0] ||
      (activeDocumentMatch ? activeDocumentMatch[1].trim() : "");
    const raw = [rawPrefix, match[0].trim(), ledd.rawSuffix]
      .filter(Boolean)
      .join(" ")
      .trim();

    references.push({
      raw,
      documentHints,
      datedSourceHints,
      preferredVersionType,
      section,
      subsections: ledd.subsections,
    });
    references.push(
      ...parseBareContinuationReferences({
        text: normalized.slice(
          match.index + match[0].length + ledd.rawSuffix.length
        ),
        documentHints,
        datedSourceHints,
        preferredVersionType,
      })
    );

    if (documentHints.length) {
      inheritedDocumentHints = documentHints;
      inheritedPreferredVersionType = preferredVersionType;
    }
    if (datedSourceHints.length) {
      inheritedDatedSourceHints = datedSourceHints;
      if (!documentHints.length) inheritedPreferredVersionType = "current";
    }
  }

  return {
    hasLegalReference: references.length > 0,
    references,
  };
}

module.exports = {
  normalizeDocumentHint,
  normalizeLegalCitationText,
  normalizeSectionRef,
  parseLegalCitationQuery,
  preferredVersionTypeForHint,
};
