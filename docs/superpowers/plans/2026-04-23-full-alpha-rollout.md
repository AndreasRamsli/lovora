# Full Alpha Rollout Plan

Created: 2026-04-23
Branch context: `codex/chat-privacy-gauntlet`
Base branch: `master`

## Goal

Take Lovora from "internally hardened and partially production-ready" to a real full-alpha service on the Hetzner production stack, with trustworthy privacy boundaries, a repeatable rollout path, a stable legal corpus pipeline, and enough product confidence to onboard external alpha users without manual heroics.

## What changed recently

Recent work has materially improved the production baseline:

- the canonical Hetzner deployment path is now explicit
- rollout recovery and image pinning are in place
- backup and restore runbooks exist
- billing and quota gates have moved closer to production shape
- API-key impersonation hard-deny landed
- repo-wide API authorization invariants are being tightened
- the chat privacy gauntlet branch is actively expanding the proof surface

This means the next step is not "more vague hardening." The next step is controlled convergence:

1. merge the hardening and gauntlet work into the production story
2. prove the legal corpus and retrieval path are healthy
3. define the alpha operating model
4. open the door carefully

## Current state

### Strengths

- Production boundary is simple and legible: `deploy/hetzner`, Caddy, Compose, app runtime, storage, backup root.
- Recent security work is aimed at real failure modes, not performative checklists.
- There is already a retrieval and corpus toolchain in `ops/corpus/` and benchmark/eval scripts in `scripts/`.
- Pricing and quota work suggests the app is already moving toward a gated external rollout model.

### Gaps blocking full alpha

- The privacy gauntlet is on a branch, not yet part of the default release posture.
- The legal corpus and embedding path is not yet trustworthy enough to call "live":
  - the latest LRA post-run report showed duplicate corpus records
  - workspace attachment lagged expected corpus size
  - retrieval QA was effectively broken with search returning server errors
- The product still needs a stronger operator loop for "deploy -> verify -> observe -> recover."
- External-alpha readiness is not yet expressed as a single release gate with clear entry criteria.

## Premises

1. Lovora's first full-alpha users are trust-sensitive and legal-workflow-sensitive, so privacy and source correctness matter more than raw feature breadth.
2. Hetzner remains the canonical production environment for alpha, and we should avoid introducing new infrastructure during this rollout.
3. The privacy gauntlet is not optional polish. It is a release gate.
4. The alpha legal corpus is intentionally narrow: only `NL` and `SF` are in scope for first launch.
5. Full alpha should begin with controlled admission, not an unrestricted public launch.

## Dream state

### Current

Lovora is close to operationally credible, but pieces of trust are split across branches, scripts, and reports. Security is improving. Deployment is improving. Corpus handling exists. Retrieval quality is still not proving itself.

### This plan

Lovora becomes a controlled full-alpha service with:

- one canonical production rollout path
- one merged privacy and authorization baseline
- one repeatable `NL` and `SF` corpus preparation and embedding workflow
- one retrieval acceptance gate
- one operator checklist for deploy, rollback, restore, and incident response
- one explicit alpha admission policy

### 12-month ideal

Lovora runs as a dependable legal workspace product with stronger observability, mature corpus versioning, a stable evaluation pipeline, and enough confidence to expand beyond alpha without re-arguing its trust model every release.

## Recommended rollout mode

Selective expansion.

We should boil the lake inside the alpha blast radius:

- privacy and auth boundaries
- deployment and recovery
- corpus/embedding correctness
- retrieval quality
- operator readiness
- alpha admissions and support loop

We should not expand into unrelated platform work:

- new infrastructure platform migrations
- enterprise account models
- org-wide RBAC redesign
- broad UI redesign work
- public-launch marketing surfaces

## The alpha sequence

### Phase 1: Land the trust baseline

Objective: make the merged codebase worthy of real alpha traffic.

Includes:

- merge the privacy gauntlet work that proves chat-content isolation across user, API, admin, delegated, logging, and error boundaries
- finish and merge the repo-wide API authorization invariant work
- keep API-key impersonation hard-denied everywhere
- run the canonical production-hardening checks on the combined branch

Exit criteria:

- privacy gauntlet suites pass in CI
- no known authz holes remain open in the rollout path
- release notes clearly state the enforced trust boundaries

### Phase 2: Make corpus and embeddings production-grade

Objective: turn document ingestion from "it usually works" into something we can trust.

Includes:

- freeze the initial alpha corpus to `NL` and `SF` before trying to perfect every document family
- run a fast refinement pass on `NL` and `SF` source docs only, and explicitly defer every other corpus
- reconcile the current `NL` and `SF` legal corpus inventory and eliminate duplicate records
- define one canonical manifest for the `NL` and `SF` alpha corpus
- run a clean corpus prepare/upload/audit cycle using `ops/corpus/`
- fix the retrieval/search failure mode that caused the latest LRA report to return 500s
- make corpus version, embedding model, and upload timestamp first-class release metadata

Exit criteria:

- corpus counts reconcile at source, prepared, and workspace-attached layers
- only `NL` and `SF` are present in the first alpha corpus release
- retrieval evals run cleanly on the chosen alpha benchmark set
- no 500s on vector search for benchmark cases
- each alpha workspace can be tied to a known corpus release identifier

### Phase 3: Harden the production operating loop

Objective: make deployment boring.

Includes:

- use the Hetzner bundle as the only live deployment path
- run preflight, rollout, smoke, backup, and rollback drills end to end
- verify restore from backup on a realistic snapshot, not just a happy-path smoke
- confirm image pinning and prior-release rollback actually work on the host
- define pause criteria and a simple kill-switch posture for alpha expansion
- define the daily operator review: deploy health, retrieval health, privacy health, billing health
- define the on-call/operator checklist for alpha incidents

Exit criteria:

- a full dry-run deploy succeeds from current branch to Hetzner
- rollback to the prior good image is verified
- restore from backup is verified
- the operator can answer "what happens if deploy fails halfway?" without improvising

### Phase 4: Define the product alpha envelope

Objective: make the service usable and understandable for the first external cohort.

Includes:

- decide who gets in: invite-only, named cohort, or partner pilots
- set a hard cap for the first cohort before launch day
- define workspace defaults, quota defaults, and support expectations
- make pricing and quota messaging honest about alpha status
- confirm user-visible trust signals:
  - citations/source metadata
  - billing/quota state
  - clear failure messaging when retrieval or upload is unhealthy
- choose the initial alpha corpus/workspace set instead of exposing everything
- state plainly that alpha answers are backed by the `NL` and `SF` corpus release only

Exit criteria:

- alpha users know what the product is for and what it is not for
- support and escalation paths are defined
- no misleading "fully live" posture exists in-product

### Phase 5: Open controlled external alpha

Objective: go live without pretending we are already at public-scale maturity.

Includes:

- deploy the approved alpha release to Hetzner
- onboard a deliberately small first cohort
- track usage, failures, retrieval misses, upload pain, and privacy anomalies daily
- run a weekly alpha review loop on product usefulness, not just infrastructure health

Exit criteria:

- external users can complete the core legal-document workflow repeatedly
- operator burden is manageable
- retrieval quality is good enough that usage creates signal, not noise

## Full-alpha release gate

Lovora should not be called "full alpha" until all of these are true:

1. Privacy gauntlet merged and passing.
2. Authz invariant work merged and passing.
3. Hetzner deploy, rollback, and restore all verified on the canonical bundle.
4. Legal corpus manifest reconciled with no unresolved duplicate or attachment drift.
5. Retrieval eval pass threshold defined and met on the alpha benchmark set.
6. Alpha quota, billing, and access defaults set intentionally.
7. An incident response path exists for privacy, retrieval, billing, and deploy failures.
8. A named initial `NL` + `SF` alpha corpus release and an initial cohort cap are both set.
9. Pause criteria exist for retrieval regressions, privacy regressions, and operator overload.

## What already exists to leverage

- Canonical production docs and runbooks:
  - `docs/architecture.md`
  - `ops/runbooks/deploy.md`
  - `ops/runbooks/rollback.md`
  - `ops/runbooks/restore.md`
- Corpus tooling:
  - `ops/corpus/prepare_legal_corpus.py`
  - `ops/corpus/upload_legal_corpus.py`
  - `ops/corpus/audit_legal_corpus.py`
- Retrieval evaluation:
  - `scripts/evaluate-retrieval.cjs`
  - benchmark JSON files in `scripts/benchmarks/`
- Corpus scope helpers:
  - `ops/corpus/prepare_legal_corpus.py --corpus NL --corpus SF`
  - `ops/corpus/manifest.schema.json`
- Security/privacy foundation:
  - `docs/superpowers/plans/2026-04-22-chat-privacy-gauntlet.md`
  - `docs/superpowers/plans/2026-04-23-api-key-impersonation-hard-deny.md`
  - `docs/superpowers/plans/2026-04-23-repo-wide-api-authz-invariant.md`
- Production hardening baseline:
  - `docs/superpowers/plans/2026-04-22-production-hardening-program.md`

## Failure modes registry

| Area | Failure mode | User impact | Prevention | Rescue |
|---|---|---|---|---|
| Privacy | Control-plane or API path leaks chat content | Trust collapse, possible legal exposure | Merge gauntlet, enforce route policy and authz invariants | Revoke access path, audit logs, contain affected scope, roll forward with patch |
| Retrieval | Vector search returns 500s or low-quality hits | Users lose trust in answers and citations | Corpus audit plus retrieval eval gate before alpha | Disable broken workspace/corpus slice, reindex, redeploy |
| Corpus | Duplicate or unattached `NL`/`SF` documents drift from manifest | Users get stale or inconsistent sources | Manifest-based prepare/upload/audit pipeline | Rebuild affected `NL`/`SF` corpus release and reattach cleanly |
| Deploy | Rollout succeeds partially and leaves broken live state | Downtime or silent instability | Preflight, smoke, image pinning, rollback drill | Roll back to prior image, restore runtime data if needed |
| Billing/quota | Wrong access state blocks or over-allows users | Churn, confusion, support debt | Deterministic billing access rules and smoke coverage | Reconcile billing state, repair affected users, communicate clearly |
| Alpha ops | Too many users too early overwhelm support loop | Noise, slow fixes, bad first impressions | Invite-only cohort and explicit admission cap | Pause admissions and stabilize before reopening |

## Error and rescue registry

| Trigger | Immediate action | Owner surface |
|---|---|---|
| Privacy gauntlet regression in CI | Block merge and fix before rollout | Engineering |
| Retrieval eval failure | Do not promote corpus release | Engineering + corpus ops |
| Hetzner smoke failure | Roll back to prior healthy image | Ops |
| Restore drill failure | Freeze alpha expansion until fixed | Ops |
| Support queue shows repeated citation/retrieval confusion | Narrow corpus or improve trust signals before cohort expansion | Product + engineering |

## Not in scope

- public launch
- major rebrand cleanup
- broad frontend redesign
- new cloud or database platform migration
- enterprise admin features beyond alpha essentials
- new product pillars unrelated to legal corpus trust and alpha usability

## Recommended first 30 days

### Week 1

- merge privacy gauntlet essentials and authz invariant work
- cut one combined staging branch for trust-baseline verification
- define the alpha benchmark set for `NL` and `SF` retrieval acceptance

### Week 2

- run clean corpus prepare/upload/audit against `NL` and `SF` only
- fix every benchmark-blocking retrieval/search issue
- stamp a named corpus release for alpha

### Week 3

- run a full Hetzner deploy, rollback, and restore rehearsal
- verify billing/quota defaults and user access flows on the live-like stack
- finalize the operator checklist and alpha admission policy

### Week 4

- deploy the approved alpha release
- onboard the first small cohort
- review daily signal for retrieval quality, upload reliability, and privacy confidence
- pause expansion immediately if the agreed alpha gate starts failing in production

## Success metrics

- privacy gauntlet pass rate: 100% on required suites
- retrieval benchmark pass threshold: explicitly set and met before alpha
- deploy-to-smoke verification completes without manual repair
- rollback and restore drills complete successfully
- first alpha cohort can complete the core workflow without staff intervention on every case
- cohort growth only happens when retrieval, privacy, and support signals remain within the agreed alpha limits

## Review summary

### CEO review

- The core framing is right: this is a trust-and-correctness rollout, not a feature sprint.
- The strongest part of the plan is sequencing privacy, corpus quality, and operability before cohort expansion.
- The main strategic risk was pretending "full alpha" could mean broad availability. The plan now rejects that and treats alpha as controlled admission.

### Engineering review

- The plan matches the actual repo boundary well: Hetzner deploy bundle, corpus tooling, retrieval eval script, and privacy/authz plans already exist.
- The biggest technical risk is not missing infrastructure. It is shipping with an unhealthy corpus/retrieval path. The LRA report makes that explicit.
- Narrowing the first release to `NL` and `SF` is the right move. It keeps the blast radius small enough to move fast without lying about corpus coverage.
- The runbooks are good for rollout mechanics, but sparse for ongoing alpha operations. That is why pause criteria and daily operator review are now explicit release requirements.

### Design review

- No major new UI system is being proposed in this plan.
- The user-facing design requirement is narrow and important: users must see honest trust signals around citations, quota/billing state, and unhealthy retrieval or uploads.

### DX review

- Primary DX review is out of scope because the product is not being positioned as a developer platform in this rollout.
- Operational clarity still matters, so deploy, rollback, restore, and alpha-review loops are treated as operator experience work inside the release gate.

## Cross-phase themes

- Narrow the initial alpha surface area on purpose.
- Narrow the initial alpha corpus on purpose.
- Do not separate privacy readiness from retrieval readiness. Users need both.
- "We can fix it live" is not a plan. The operator loop has to be defined before the first external cohort.

## Decision audit trail

| # | Phase | Decision | Classification | Principle | Rationale | Rejected |
|---|---|---|---|---|---|---|
| 1 | CEO | Treat privacy gauntlet as a hard release gate | Mechanical | Completeness | Legal alpha users will not forgive trust ambiguity | Making privacy a post-launch hardening item |
| 2 | CEO | Keep Hetzner as the alpha production boundary | Mechanical | Pragmatic | The canonical deploy path already exists and works | Adding new infra during rollout |
| 3 | CEO | Open with controlled admission instead of broad public alpha | Mechanical | Bias toward action | Small cohorts create signal without flooding support | Unrestricted public launch |
| 4 | CEO | Keep focus on trust, corpus quality, and operability | Mechanical | DRY | These are the real blockers already exposed by repo history and reports | Expanding into unrelated platform work |
| 5 | Eng | Freeze the initial alpha corpus to `NL` and `SF` before wider expansion | Mechanical | Boil lakes | A narrow clean corpus beats a wide broken one | Trying to perfect every corpus family before alpha |
| 6 | Eng | Add pause criteria and daily operator review to the release gate | Mechanical | Completeness | Runbooks cover rollouts, but alpha needs an operating rhythm too | Launching without explicit stop conditions |
| 7 | Product | Add a hard first-cohort cap | Mechanical | Explicit over clever | Capacity should be a deliberate knob, not a vibe | Soft or implicit admission limits |

## Recommendation

Call the next milestone "full alpha" only after privacy, retrieval, and operability are all true at once.

If we skip the corpus and retrieval gate, we will ship a secure-looking product that still fails the real user job.
If we skip the privacy gauntlet merge, we will ship a useful-looking product without the trust proof needed for legal workflows.

The whole game is convergence. One trusted stack. One corpus release story. One alpha gate. Then open carefully.
