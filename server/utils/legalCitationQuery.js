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
      /\b([a-zæøå][a-zæøå0-9-]*(?:loven|forskriften))\s*$/g,
      before
    );

    const documentHints = documentMatch
      ? [documentMatch[1].trim()]
      : inheritedDocumentHints;
    const datedSourceHints = datedMatch
      ? [datedMatch[0].trim()]
      : inheritedDatedSourceHints;
    const ledd = parseLedd(after);
    const rawPrefix =
      datedSourceHints[0] || (documentMatch ? documentMatch[1].trim() : "");
    const raw = [rawPrefix, match[0].trim(), ledd.rawSuffix]
      .filter(Boolean)
      .join(" ")
      .trim();

    references.push({
      raw,
      documentHints,
      datedSourceHints,
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
      })
    );

    if (documentHints.length) inheritedDocumentHints = documentHints;
    if (datedSourceHints.length) inheritedDatedSourceHints = datedSourceHints;
  }

  return {
    hasLegalReference: references.length > 0,
    references,
  };
}

module.exports = {
  normalizeLegalCitationText,
  normalizeSectionRef,
  parseLegalCitationQuery,
};
