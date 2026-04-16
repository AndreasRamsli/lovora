# Lovora Pricing Ladder Design

## Goal

Replace the placeholder pricing content in the chat pricing gate with a credible Lovora-specific pricing ladder that matches the product's intended market position: accessible for students and individuals, valuable for serious solo professionals, and expandable to small legal teams.

The result should give Lovora a clear self-serve commercial story without pretending the current billing backend supports more than it actually does today.

## Scope

In scope:

- Redefine the pricing content and hierarchy for the existing three-card pricing gate.
- Shift the pricing story from generic website-builder copy to Lovora-specific legal AI use cases.
- Standardize the display format to use `kr` after the price instead of `NOK`.
- Preserve the current visual direction of the pricing gate while refining the card structure and emphasis rules.
- Add a separate student discount callout outside the main three-card ladder.
- Keep the middle card highlighted as the primary conversion target.
- Define how the current billing keys map to the new pricing story.

Out of scope:

- Implementing a fourth main pricing card.
- Replacing the backend billing system.
- Introducing a full comparison table in this first pass.
- Building team billing or multi-seat checkout in the backend unless explicitly scoped later.
- Changing when the pricing gate appears in the chat product.

## Product Positioning

Lovora is a Norwegian legal AI assistant, so the pricing should communicate value in terms of legal workflow speed, document-grounded answers, and practical legal research support rather than abstract SaaS features.

The ladder should target a mixed audience:

1. entry-level users who need low-friction access,
2. serious individual professionals who use Lovora repeatedly,
3. small firms or teams that want shared usage and future collaboration features.

This mixed ladder is the right fit because it preserves a wide top-of-funnel while still presenting a credible professional upgrade path.

## Pricing Strategy

### Main three-tier ladder

#### 1. Personal Entry

Primary recurring price:

- `149 kr / month`

Secondary one-time option inside the same card:

- `249 kr / 30 days`

Target users:

- law students,
- private individuals,
- casual legal-research users,
- non-lawyers with light personal legal needs.

Role in the ladder:

- low-friction acquisition,
- low-risk first purchase,
- clear on-ramp into Lovora.

#### 2. Serious Individual

Recurring price:

- `599 kr / month`

Annual option:

- `5,390 kr / year`

Target users:

- solo lawyers,
- freelancers,
- in-house legal professionals,
- repeat users who rely on Lovora as an ongoing work tool.

Role in the ladder:

- main self-serve revenue tier,
- highlighted "Most popular" plan,
- strongest conversion target in the UI.

#### 3. Professional / Team

Displayed price structure:

- `999 kr / month` for 1 user
- `+399 kr` per extra user
- `899 kr / user / month` for 3+ users

Target users:

- small law firms,
- teams of 2 to 20,
- legal groups that want shared knowledge and administration.

Role in the ladder:

- future-ready expansion tier,
- signals Lovora can grow beyond solo use,
- should include clearly labeled `coming soon` items where needed.

## UI Structure

### Main cards

The pricing gate should keep exactly three main cards shown side-by-side:

- `Personal Entry`
- `Serious Individual`
- `Professional / Team`

The middle card remains visually highlighted.

### Secondary pricing elements

The additional offers should not become separate main cards.

#### Month Pass

The `249 kr / 30 days` offer belongs inside the `Personal Entry` card as an alternate purchase path, because it serves the same buyer mindset: low commitment, light usage, easy trial.

#### Student discount

The student offer should appear as a separate secondary callout below or near the main ladder, not inside the main card stack as a fourth tier.

Suggested treatment:

- `Student plan from 149 kr / month`
- short supporting note about verification

This keeps the main ladder clean while still preserving the student acquisition path.

## Content Design

The pricing cards should stay in English for now, but the language should be plain and modular enough to localize into Norwegian later without needing a rewrite.

### Personal Entry

Recommended card framing:

- Name: `Personal Entry`
- Subtitle: `For students, private individuals, and light legal work`

Recommended benefits:

- Ask Lovora legal questions in Norwegian
- Search across your uploaded legal material
- Limited monthly queries for light use
- Limited monthly document uploads
- Save time on first-pass legal research

Recommended CTA:

- `Start with Entry`

Recommended supporting note:

- `Student plan available with verification`

### Serious Individual

Recommended card framing:

- Name: `Serious Individual`
- Subtitle: `For solo lawyers and professionals who rely on Lovora weekly`

Recommended benefits:

- Everything in Entry
- Higher or unlimited monthly query usage
- Larger monthly document capacity
- Priority support
- Export and reusable outputs
- Faster workflow for real case preparation

Recommended CTA:

- `Start with Serious Individual`

Recommended badge:

- `Most popular`

### Professional / Team

Recommended card framing:

- Name: `Professional / Team`
- Subtitle: `For small firms and legal teams`

Recommended benefits:

- Everything in Serious Individual
- Shared team workspace
- Shared legal knowledge library
- Admin and seat management
- Usage visibility for team leads
- `SSO (coming soon)`
- `Usage analytics (coming soon)`

Recommended CTA:

- If backend team billing is not implemented yet: `Contact sales` or `Join waitlist`
- If team checkout is implemented later: `Start with Team`

This card must not imply that full team billing is already live unless the backend supports it.

## Limits and Packaging

These limits should be treated as the recommended first-pass commercial packaging for Lovora.

### Personal Entry

- `300 queries / month`
- `50 document uploads / month`
- Norwegian legal chat
- search across uploaded material

### Serious Individual

- unlimited queries
- `500 document uploads / month`
- priority support
- export and reusable outputs

### Professional / Team

- everything in Serious Individual
- team-oriented collaboration and admin capabilities
- clearly separated live versus `coming soon` items

The exact enforcement model is a follow-up implementation concern, but the UI copy should not claim technical enforcement that the product does not yet perform unless that enforcement is added in the same project.

## Visual and Copy Rules

These rules should guide the updated pricing gate:

- Use `kr` after the number rather than `NOK`.
- Use the brighter highlight color for:
  - price text,
  - icons,
  - primary CTA buttons,
  - key emphasis text.
- Use the softer muted shadow tone for:
  - subtitles,
  - supporting notes,
  - explanatory text,
  - secondary pricing notes.
- Give `Personal Entry` and `Professional / Team` the same subtle border highlight treatment already used on the middle card, while keeping the middle card visually strongest overall.
- Keep all primary buttons horizontally aligned across the row.
- Keep the card aspect ratio wider and more compact than the tall placeholder versions.
- Use Inter for the pricing gate typography.

## Billing Truthfulness and Backend Constraints

The current backend only exposes these checkout plan keys:

- `month_pass`
- `monthly_subscription`
- `student_exam_monthly`

That means the first implementation must distinguish between:

1. pricing story shown to the user,
2. plans that can actually be self-serve purchased today.

### Required mapping rules

- `Personal Entry` can map to the lightweight self-serve path.
- `Serious Individual` should map to the main recurring self-serve subscription path.
- `Student discount` should map to the existing student exam billing path where applicable.
- `Professional / Team` should not use misleading self-serve copy if backend seat-based billing does not yet exist.

If team billing is not added in the same project, the card should become a sales-led path with clearly truthful CTA behavior.

## Implementation Direction

The existing pricing gate component should be updated rather than replaced with a new pricing surface.

Recommended implementation boundaries:

- Update `frontend/src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx` for new content, pricing formatting, card hierarchy, and student-callout handling.
- Keep `frontend/src/components/WorkspaceChat/ChatContainer/index.jsx` unchanged unless small layout adjustments are required for alignment or card aspect ratio.
- Update backend billing only if the implementation explicitly chooses to support the new commercial mapping more accurately.

## Risks

### Risk: overpromising team features

Mitigation:

- label non-live features as `coming soon`,
- use a truthful non-checkout CTA if needed.

### Risk: mismatch between pricing copy and current plan keys

Mitigation:

- define explicit mapping in implementation,
- avoid silent reuse of unrelated backend plans without clear business intent.

### Risk: crowded pricing UI

Mitigation:

- keep the three-card ladder primary,
- keep the month pass inside Entry,
- keep student pricing as a small secondary callout.

## Success Criteria

This redesign is successful if:

- the pricing gate reads like a real Lovora commercial offer rather than placeholder content,
- the three-tier ladder is understandable at a glance,
- `Serious Individual` clearly acts as the main conversion tier,
- student pricing and month pass are visible without turning into extra primary cards,
- price formatting uses `kr`,
- visual hierarchy is stronger and more polished,
- and the final content remains truthful about what Lovora can actually sell today.
