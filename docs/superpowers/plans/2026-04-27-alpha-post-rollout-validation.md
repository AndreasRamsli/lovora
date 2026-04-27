# Alpha Post-Rollout Validation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prove the deployed alpha is ready for real-user testing by validating retrieval, answer quality, citation style, cold-start behavior, and rollout hygiene.

**Architecture:** Treat production validation as a repeatable release gate. Run deterministic retrieval checks first, run live answer checks second, review generated answers manually for legal quality, inspect operational logs, then clean up git/deploy hygiene only after the evidence is good.

**Tech Stack:** Node.js CLI scripts, AnythingLLM workspace API, Lovora alpha workspace, Docker Compose on Hetzner, JSON/Markdown reports in `test-results/`, GitHub branches, manual legal review checklist.

---

## File Structure

- Read: `scripts/benchmarks/lovora_alpha_exact_section_watch.json`  
  Exact legal-reference watch cases for canonical section and ledd retrieval.

- Read: `scripts/benchmarks/lovora_alpha_user_questions.json`  
  Realistic alpha user questions for live answer evaluation.

- Run: `scripts/evaluate-retrieval.cjs`  
  Produces production retrieval reports with canonical source IDs and retrieval reason codes.

- Run: `scripts/evaluate-alpha-retrieval-watch.cjs`  
  Converts retrieval reports into pass/fail watch reports.

- Run: `scripts/run-alpha-answer-eval.cjs`  
  Calls the live workspace chat API and captures answers plus source metadata.

- Read: `test-results/alpha-prod-*.json` and `test-results/alpha-prod-*.md`  
  Evidence artifacts used to decide whether alpha is ready.

- Inspect: `deploy/hetzner/docker-compose.yml` and production Docker logs  
  Confirms the deployed image, health state, memory behavior, and retrieval artifact loading.

---

## Success Gates

- Retrieval exact-section watch: `0` failures and `0` warnings.
- Live answer contract: `0` failures on the 10-question alpha user set.
- Manual legal review: every answer is in Norwegian, cites source-backed law references with `§`, and avoids unsupported legal conclusions.
- Ops review: server, collector, and caddy are healthy; no repeated restarts; no repeated legal artifact load failures; no out-of-memory events.
- Hygiene: both pushed branches are either merged or intentionally left open; local unrelated `TODOS.md` change is either committed separately or explicitly preserved; old Docker images are pruned only after a stable window.

---

### Task 1: Snapshot Production State

**Files:**
- Read: `deploy/hetzner/docker-compose.yml`
- Output: `test-results/alpha-prod-post-rollout-state.md`

- [ ] **Step 1: Confirm deployed commit and image**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora &&
   printf "commit: " && git rev-parse --short HEAD &&
   printf "branch: " && git branch --show-current &&
   cd deploy/hetzner &&
   docker compose -f docker-compose.yml ps --format "table {{.Name}}\t{{.Image}}\t{{.Status}}"'
```

Expected:

```text
commit: 0534f32f
branch: codex/targeted-legal-chunk-tuning
lovora-hetzner-server-1      lovora-hetzner-runtime:git-0534f32f-...   Up ... (healthy)
lovora-hetzner-collector-1   lovora-hetzner-runtime:git-0534f32f-...   Up ... (healthy)
lovora-hetzner-caddy-1       caddy:2.8                                 Up ... (healthy)
```

- [ ] **Step 2: Confirm public health endpoints**

Run:

```bash
curl -fsS https://app.lovora.no/api/health
curl -fsS https://app.lovora.no/v1/api/health
curl -fsS https://app.lovora.no/api/setup-complete
```

Expected:

```text
"success":true
"ready":true
"DefaultWorkspaceSlug":"lovora-alpha"
"DefaultWorkspaceReady":true
```

- [ ] **Step 3: Write the production state note**

Create `test-results/alpha-prod-post-rollout-state.md` with:

```markdown
# Alpha Production State

- Date:
- Deployed commit:
- Runtime image:
- Server status:
- Collector status:
- Caddy status:
- Health endpoints:
  - /api/health:
  - /v1/api/health:
  - /api/setup-complete:
- Notes:
```

Commit is not required for this evidence file unless we decide to keep eval artifacts in git.

---

### Task 2: Run Exact Retrieval Watch

**Files:**
- Read: `scripts/benchmarks/lovora_alpha_exact_section_watch.json`
- Output: `test-results/alpha-prod-exact-section-report.json`
- Output: `test-results/alpha-prod-exact-section-report.md`
- Output: `test-results/alpha-prod-exact-section-watch.json`
- Output: `test-results/alpha-prod-exact-section-watch.md`

- [ ] **Step 1: Run production retrieval eval with the deployed runtime image**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora &&
   mkdir -p test-results &&
   docker run --rm --entrypoint node \
       --env-file deploy/hetzner/anythingllm.env \
       -e STORAGE_DIR=/app/server/storage \
       -v /srv/lovora/lovora/scripts:/app/scripts:ro \
       -v /srv/lovora/lovora/test-results:/app/test-results \
       -v /srv/lovora/lovora/.data/hetzner/server/storage:/app/server/storage \
       -w /app \
       lovora-hetzner-runtime:git-0534f32f-20260427145843-1731809 \
     scripts/evaluate-retrieval.cjs \
       --workspace lovora-alpha \
       --benchmark scripts/benchmarks/lovora_alpha_exact_section_watch.json \
       --modes default \
       --topNs 4 \
       --thresholds 0.25 \
       --report-json test-results/alpha-prod-exact-section-report.json \
       --report-md test-results/alpha-prod-exact-section-report.md'
```

Expected:

```text
failed: 0
```

- [ ] **Step 2: Run the watch evaluator**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora &&
   docker run --rm --entrypoint node \
       --env-file deploy/hetzner/anythingllm.env \
       -e STORAGE_DIR=/app/server/storage \
       -v /srv/lovora/lovora/scripts:/app/scripts:ro \
       -v /srv/lovora/lovora/test-results:/app/test-results \
       -v /srv/lovora/lovora/.data/hetzner/server/storage:/app/server/storage \
       -w /app \
       lovora-hetzner-runtime:git-0534f32f-20260427145843-1731809 \
     scripts/evaluate-alpha-retrieval-watch.cjs \
       --retrieval-report test-results/alpha-prod-exact-section-report.json \
       --watchlist scripts/benchmarks/lovora_alpha_exact_section_watch.json \
       --report-json test-results/alpha-prod-exact-section-watch.json \
       --report-md test-results/alpha-prod-exact-section-watch.md \
       --fail-on-warning'
```

Expected:

```text
Passed: 3
Warnings: 0
Failed: 0
```

- [ ] **Step 3: Smoke-test plural section parsing on production**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora &&
   docker run --rm --entrypoint node \
       --env-file deploy/hetzner/anythingllm.env \
       -e STORAGE_DIR=/app/server/storage \
       -v /srv/lovora/lovora/scripts:/app/scripts:ro \
       -v /srv/lovora/lovora/.data/hetzner/server/storage:/app/server/storage \
       -w /app \
       lovora-hetzner-runtime:git-0534f32f-20260427145843-1731809 \
     - <<'"'"'NODE'"'"'
const { parseLegalCitationQuery } = require("./server/utils/legalCitationQuery");
const { resolveLegalReferences } = require("./server/utils/legalReferenceResolver");
const hits = resolveLegalReferences({
  parsedQuery: parseLegalCitationQuery("tvisteloven §§ 20-2 og 20-3"),
  workspaceSlug: "lovora-alpha",
  limit: 4,
});
console.log(hits.map((hit) => hit.canonicalSourceId).join("\n"));
NODE'
```

Expected first two lines:

```text
NO:NL:LOV-2005-06-17-90:section:20-2
NO:NL:LOV-2005-06-17-90:section:20-3
```

- [ ] **Step 4: Pull reports locally for review**

Run:

```bash
mkdir -p /Users/andreas/fun/lovora/lovora/test-results
rsync -az -e 'ssh -i ~/.ssh/andreas_hetzner' \
  lovora@178.104.225.174:/srv/lovora/lovora/test-results/alpha-prod-exact-section-\* \
  /Users/andreas/fun/lovora/lovora/test-results/
```

Expected files:

```text
test-results/alpha-prod-exact-section-report.json
test-results/alpha-prod-exact-section-report.md
test-results/alpha-prod-exact-section-watch.json
test-results/alpha-prod-exact-section-watch.md
```

---

### Task 3: Run Live Alpha Answer Eval

**Files:**
- Read: `scripts/benchmarks/lovora_alpha_user_questions.json`
- Output: `test-results/alpha-prod-user-answers-after-retrieval.json`
- Output: `test-results/alpha-prod-user-answer-report-after-retrieval.json`
- Output: `test-results/alpha-prod-user-answer-report-after-retrieval.md`

- [ ] **Step 1: Verify workspace API key is available on the server**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora &&
   docker run --rm --entrypoint node \
       --env-file deploy/hetzner/anythingllm.env \
       -w /app \
       lovora-hetzner-runtime:git-0534f32f-20260427145843-1731809 \
     -e "if (!process.env.ANYTHINGLLM_WORKSPACE_API_KEY && !process.env.ANYTHINGLLM_API_KEY) process.exit(1); console.log(\"workspace api key present\")"'
```

Expected:

```text
workspace api key present
```

- [ ] **Step 2: Run the 10-question live answer eval**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora &&
   mkdir -p test-results &&
   docker run --rm --entrypoint node \
       --env-file deploy/hetzner/anythingllm.env \
       -e ANYTHINGLLM_BASE_URL=https://app.lovora.no/api \
       -v /srv/lovora/lovora/scripts:/app/scripts:ro \
       -v /srv/lovora/lovora/test-results:/app/test-results \
       -w /app \
       lovora-hetzner-runtime:git-0534f32f-20260427145843-1731809 \
     scripts/run-alpha-answer-eval.cjs \
       --workspace lovora-alpha \
       --benchmark scripts/benchmarks/lovora_alpha_user_questions.json \
       --answers-out test-results/alpha-prod-user-answers-after-retrieval.json \
       --report-json test-results/alpha-prod-user-answer-report-after-retrieval.json \
       --report-md test-results/alpha-prod-user-answer-report-after-retrieval.md \
       --delay-ms 750 \
       --session-prefix alpha-post-rollout'
```

Expected:

```text
[alpha-answer] wrote answers to test-results/alpha-prod-user-answers-after-retrieval.json
[alpha-answer] wrote JSON report to test-results/alpha-prod-user-answer-report-after-retrieval.json
[alpha-answer] wrote Markdown report to test-results/alpha-prod-user-answer-report-after-retrieval.md
```

Pass gate:

```text
summary.failed === 0
```

- [ ] **Step 3: Pull answer reports locally**

Run:

```bash
rsync -az -e 'ssh -i ~/.ssh/andreas_hetzner' \
  lovora@178.104.225.174:/srv/lovora/lovora/test-results/alpha-prod-user-\*after-retrieval\* \
  /Users/andreas/fun/lovora/lovora/test-results/
```

Expected files:

```text
test-results/alpha-prod-user-answers-after-retrieval.json
test-results/alpha-prod-user-answer-report-after-retrieval.json
test-results/alpha-prod-user-answer-report-after-retrieval.md
```

---

### Task 4: Manual Legal Citation Review

**Files:**
- Read: `test-results/alpha-prod-user-answers-after-retrieval.json`
- Create: `test-results/alpha-prod-manual-legal-review.md`

- [ ] **Step 1: Generate a review worksheet**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
node - <<'NODE'
const fs = require("fs");
const answers = JSON.parse(fs.readFileSync("test-results/alpha-prod-user-answers-after-retrieval.json", "utf8"));
const lines = ["# Alpha Manual Legal Review", ""];
for (const item of answers) {
  lines.push(`## ${item.id}`);
  lines.push("");
  lines.push(`Question: ${item.question || ""}`);
  lines.push("");
  lines.push("- [ ] Norwegian answer");
  lines.push("- [ ] Cites legal sources with `§` where applicable");
  lines.push("- [ ] Backs material claims with source context");
  lines.push("- [ ] Distinguishes current law from amendment/history when relevant");
  lines.push("- [ ] Does not invent court-style authority or source references");
  lines.push("- [ ] Gives useful legal caveat without becoming vague");
  lines.push("");
  lines.push("Reviewer notes:");
  lines.push("");
  lines.push("```text");
  lines.push("");
  lines.push("```");
  lines.push("");
}
fs.writeFileSync("test-results/alpha-prod-manual-legal-review.md", lines.join("\n"));
NODE
```

Expected:

```text
test-results/alpha-prod-manual-legal-review.md
```

- [ ] **Step 2: Review every answer**

Open:

```bash
open /Users/andreas/fun/lovora/lovora/test-results/alpha-prod-manual-legal-review.md
```

Pass gate:

```text
Every checklist item is checked, or the issue is classified as:
- prompt issue
- retrieval issue
- source gap
- eval-contract issue
```

- [ ] **Step 3: Convert findings into next actions**

If review finds citation wording issues only, create a prompt-only follow-up:

```text
Fix alpha system prompt citation style.
```

If review finds missing exact sources, create a retrieval follow-up:

```text
Add/repair canonical section benchmark and source index mapping.
```

If review finds answer eval false positives, create an eval follow-up:

```text
Tighten or relax answer contract checks with a real failing example.
```

---

### Task 5: Operational Cold-Start And Log Review

**Files:**
- Output: `test-results/alpha-prod-ops-review.md`

- [ ] **Step 1: Inspect restart state and memory**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora/deploy/hetzner &&
   docker compose -f docker-compose.yml ps &&
   docker stats --no-stream lovora-hetzner-server-1 lovora-hetzner-collector-1'
```

Pass gate:

```text
server: healthy
collector: healthy
no restart loop
server memory leaves comfortable host headroom
```

- [ ] **Step 2: Inspect recent server logs for retrieval errors**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora/deploy/hetzner &&
   docker compose -f docker-compose.yml logs --since=2h server |
   grep -Ei "legal|retrieval|canonical|jsonl|out of memory|heap|fatal|error" || true'
```

Pass gate:

```text
No repeated legal artifact load errors
No out-of-memory or heap fatal errors
No repeated API 500s during eval
```

- [ ] **Step 3: Record ops review**

Create `test-results/alpha-prod-ops-review.md`:

```markdown
# Alpha Ops Review

- Date:
- Server image:
- Server health:
- Collector health:
- Caddy health:
- Server memory:
- Collector memory:
- Legal retrieval artifact logs:
- Errors observed:
- Decision:
```

Decision values:

```text
GO: no operational blockers
WATCH: acceptable, monitor first users
NO-GO: fix before inviting users
```

---

### Task 6: Git, PR, And Deploy Hygiene

**Files:**
- Read: local git status in `/Users/andreas/fun/lovora`
- Read: local git status in `/Users/andreas/fun/lovora/lovora`

- [ ] **Step 1: Confirm local repo state**

Run:

```bash
cd /Users/andreas/fun/lovora
git status --short --branch

cd /Users/andreas/fun/lovora/lovora
git status --short --branch
```

Expected:

```text
corpus repo: clean
app repo: only known local TODOS.md change, unless new test-results are intentionally untracked
```

- [ ] **Step 2: Decide what to do with local `TODOS.md`**

If `TODOS.md` is user notes, leave it uncommitted and mention it in handoff.

If `TODOS.md` is product truth, commit it separately:

```bash
cd /Users/andreas/fun/lovora/lovora
git add TODOS.md
git commit -m "docs: update alpha TODOs"
git push origin codex/targeted-legal-chunk-tuning
```

- [ ] **Step 3: Open or update PRs**

Run:

```bash
cd /Users/andreas/fun/lovora
gh pr create \
  --base codex/citation-reader-chunk-first \
  --head codex/citation-reader-chunk-first \
  --title "Emit canonical legal retrieval artifacts" \
  --body "Adds canonical section and embedding manifests from the source-of-truth corpus pipeline."
```

Only run the corpus PR command if this repo actually uses PRs against this feature branch. If `codex/citation-reader-chunk-first` is the deployment branch, skip PR creation and record that.

Run for the app repo:

```bash
cd /Users/andreas/fun/lovora/lovora
gh pr create \
  --base master \
  --head codex/targeted-legal-chunk-tuning \
  --title "Add canonical legal reference retrieval" \
  --body "Adds deterministic legal citation parsing, canonical section resolution, shared workspace retrieval orchestration, alpha eval gates, and production retrieval artifact installation."
```

- [ ] **Step 4: Prune old Docker images after a stable window**

Wait at least one successful alpha eval cycle and one hour of stable health before pruning.

Then run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'docker image ls "lovora-hetzner-runtime" &&
   docker image prune -f'
```

Pass gate:

```text
Current image lovora-hetzner-runtime:git-0534f32f-... remains present
Old dangling build layers are removed
```

---

## Final Launch Decision

After Tasks 1-6, make the alpha call:

```text
GO:
- Exact retrieval watch passed.
- Live answer eval passed.
- Manual legal review has no blockers.
- Ops review is GO or WATCH.

NO-GO:
- Any exact-section watch failure.
- Any answer missing a required legal source.
- Any answer inventing unsupported legal authority.
- Any repeated production retrieval or memory failure.
```

If `GO`, invite the first alpha users with a narrow test brief:

```text
Ask concrete Norwegian legal questions with specific law/section references when possible.
Report answers that cite the wrong paragraph, cite old law as current, or fail to show source grounding.
```
