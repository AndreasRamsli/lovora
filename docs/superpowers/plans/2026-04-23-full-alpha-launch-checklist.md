# Full Alpha Launch Checklist

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Launch Lovora full alpha fast, with only the `NL` and `SF` corpora in scope, while preserving the trust gates that matter.

**Architecture:** Keep the launch path brutally simple. Merge the trust baseline, refine only the `NL` and `SF` source documents, prepare one named alpha corpus release, prove retrieval on that release, rehearse the Hetzner deploy/rollback/restore loop, then open a small cohort immediately. Anything outside that path waits.

**Tech Stack:** Hetzner deployment bundle, Docker Compose, Caddy, Better Auth, privacy gauntlet suites, `ops/corpus/*`, `scripts/evaluate-retrieval.cjs`

---

## Launch posture

- Corpus in scope: `NL` and `SF` only
- Launch style: aggressive but gated
- Cohort style: invite-only, small first wave
- Default answer when a gate fails: pause, fix, resume

## Non-negotiable gates

- [ ] Privacy gauntlet merged and passing on the release branch
- [ ] Repo-wide API authz invariant merged and passing
- [ ] API-key impersonation hard-deny present in release branch
- [ ] `NL` and `SF` source refinement pass completed
- [ ] `NL` and `SF` manifest reconciled with no unresolved duplicate drift
- [ ] Retrieval eval threshold met on the alpha benchmark set
- [ ] Hetzner deploy rehearsal passed
- [ ] Hetzner rollback rehearsal passed
- [ ] Hetzner restore rehearsal passed
- [ ] First-cohort cap set before launch

## Aggressive sequence

### Track 1: Trust merge

- [ ] Merge or cherry-pick the privacy gauntlet essentials into the release branch
- [ ] Merge or cherry-pick the API authz invariant work into the release branch
- [ ] Run the required CI/privacy suites on the combined branch
- [ ] Stop immediately if any trust boundary test regresses

### Track 2: `NL` and `SF` refinement

- [ ] Review `NL` source quality only
- [ ] Review `SF` source quality only
- [ ] Fix obvious formatting, duplication, or parsing defects that would poison embeddings
- [ ] Explicitly defer every other corpus family

### Track 3: Corpus release

- [ ] Prepare only `NL` and `SF`

```bash
cd /Users/andreas/fun/lovora/lovora
python ops/corpus/prepare_legal_corpus.py --corpus NL --corpus SF
```

- [ ] Audit the prepared manifest and output set

```bash
cd /Users/andreas/fun/lovora/lovora
python ops/corpus/audit_legal_corpus.py --manifest ../legal_embedding_ready/_manifest.jsonl
```

- [ ] Upload the prepared `NL` and `SF` release into the alpha workspace
- [ ] Name the corpus release and record the exact manifest used

### Track 4: Retrieval gate

- [ ] Run the alpha retrieval benchmark on the exact release candidate

```bash
cd /Users/andreas/fun/lovora/lovora
node scripts/evaluate-retrieval.cjs --benchmark scripts/benchmarks/lovora_alpha_reset_legal.json
```

- [ ] Treat any search `500`, duplicate-driven mismatch, or citation failure as a launch blocker
- [ ] Do not expand corpus scope to compensate for a bad retrieval result

### Track 5: Hetzner rehearsal

- [ ] Run preflight on the exact release candidate
- [ ] Run a full rollout rehearsal
- [ ] Run smoke verification
- [ ] Rehearse rollback to the prior image
- [ ] Rehearse restore from backup
- [ ] Confirm the operator can explain the recovery path without improvising

### Track 6: Launch

- [ ] Set the first-cohort cap
- [ ] Deploy the approved release to Hetzner
- [ ] Onboard the first alpha cohort the same day if all gates are green
- [ ] Review retrieval health, privacy health, billing health, and support noise daily for the first week

## Explicit pause conditions

Pause rollout expansion immediately if any of these happen:

- privacy gauntlet regression
- authz regression
- retrieval benchmark drops below the agreed threshold
- vector search returns `500`
- manifest drift or duplicate drift reappears in the live `NL`/`SF` release
- operator cannot roll back or restore confidently
- support load becomes mostly confusion instead of product signal

## What "aggressive" means here

Aggressive does not mean reckless.

It means:

- no extra corpus families before `NL` and `SF` are clean
- no extra planning rounds once the gates are defined
- no waiting for a big public-ready polish pass
- launch the first cohort as soon as trust, retrieval, and operability are green at the same time

It does **not** mean:

- shipping with known search `500`s
- hand-waving duplicate drift
- calling partial privacy coverage "good enough"
- opening the doors wider just to preserve momentum

## Recommended next move

- [ ] Create one release branch for full alpha
- [ ] Pull in the trust-baseline changes first
- [ ] Spend the next push on `NL` and `SF` refinement plus corpus audit
- [ ] Run retrieval evals immediately after upload
- [ ] Rehearse Hetzner rollout the same day the retrieval gate goes green
- [ ] Launch the first cohort as soon as all gates are green together
