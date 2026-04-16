# Pricing Gate Cleanup Design

## Goal

Clean up the newly integrated pricing section and its immediate container so the experience feels intentional, maintainable, and visually balanced, without changing the current billing behavior or when the gate appears.

## Scope

This cleanup is intentionally limited to the pricing experience and its immediate render path inside the chat container.

In scope:

- Refine the inline pricing gate UI in the chat experience.
- Remove first-pass duplication and presentation cruft in the pricing component.
- Reduce local duplication in the parent chat container where the pricing gate and prompt input are conditionally rendered.
- Preserve existing checkout behavior, loading state, close behavior, and error handling.

Out of scope:

- Changing the backend billing catalog or Stripe plan keys.
- Converting the pricing gate into a modal, drawer, or a new route.
- Refactoring unrelated chat container behavior.
- Broad theming work outside the pricing gate area.

## Current State

The pricing gate currently works, but it still carries some integration-stage roughness:

- `frontend/src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx` mixes data definition, visual rendering, and minor one-off styling choices in a single file.
- The card metadata is more repetitive than it needs to be, which makes future content changes noisier.
- The gate appears in two different parent layouts in `frontend/src/components/WorkspaceChat/ChatContainer/index.jsx`, and both branches repeat the same conditional pattern for `PricingGate` versus `PromptInput`.
- The active-chat and empty-chat placements are functionally correct, but their spacing and visual framing can be tightened so the pricing section feels native to both contexts.

## Proposed Approach

### 1. Keep the pricing gate inline and preserve the current trigger flow

The current interaction model stays the same:

- `showPricingGate` continues to control whether the pricing gate is shown.
- The gate still replaces the prompt input in both the empty-chat and active-chat layouts.
- `PricingGate` continues to receive `workspaceSlug`, `onClose`, and `centered`.

This avoids behavioral risk and keeps the billing flow stable.

### 2. Clean up `PricingGate` by separating structure from repetition

The pricing component should remain a single focused component, but the internal structure will be tightened:

- Keep a single local pricing catalog, since only this component uses it.
- Normalize repetitive tier content so the UI reads as curated rather than copied.
- Extract tiny presentational helpers only where they remove real duplication, such as a shared feature row or a small card header pattern.
- Keep all checkout logic in the main component so behavior remains easy to audit.

This keeps the file understandable without over-engineering it.

### 3. Tighten the visual design around placement and hierarchy

The pricing section should feel like a deliberate interruption rather than a pasted block.

Visual direction:

- Refined dark editorial look that matches the current application tone.
- Slightly calmer background and border treatment so the cards stand out without feeling disconnected from the chat shell.
- Stronger top-level hierarchy for the gate heading and supporting text.
- More consistent vertical rhythm between heading, grid, CTA zones, and error state.
- Cleaner treatment of the empty-state centered layout so the gate sits like a designed panel rather than a raw full-width insert.

### 4. Remove duplication in `ChatContainer` without changing behavior

The parent component will be cleaned up by extracting the shared conditional block that currently appears in both branches:

- Replace repeated `showPricingGate ? <PricingGate /> : <PromptInput />` blocks with a small local renderer or JSX variable.
- Keep each branch’s layout-specific props intact, especially the `centered` flag.
- Avoid moving unrelated chat-history or wrapper logic.

This improves readability while staying low risk.

## File-Level Design

### `frontend/src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx`

Planned changes:

- Trim presentation duplication in tier rendering.
- Polish copy and layout rhythm.
- Refine card and container styling.
- Preserve:
  - valid plan keys
  - `handleCheckout`
  - loading button state
  - close button behavior
  - inline error rendering

### `frontend/src/components/WorkspaceChat/ChatContainer/index.jsx`

Planned changes:

- Introduce a small shared pricing/prompt render helper or JSX variable.
- Keep the empty-chat and active-chat layout shells intact.
- Only touch the branches necessary to reduce local duplication and improve pricing placement clarity.

## Data and Behavior Constraints

These constraints must remain true after cleanup:

- `month_pass`, `monthly_subscription`, and `student_exam_monthly` remain the only checkout keys sent to the frontend billing model.
- `Billing.createCheckoutSession({ planKey, workspaceSlug })` remains the checkout entry point.
- The student plan continues to rely on backend availability rules.
- No new global CSS dependencies are introduced.

## Testing Strategy

Because this is a UI cleanup inside an existing frontend workspace, verification should focus on regression safety:

- Run ESLint against the touched pricing gate and parent container files.
- Run a production frontend build.
- Manually inspect diffs to confirm no unrelated chat behavior moved.

If a lightweight component-level test path already exists nearby, it can be extended, but the cleanup should not invent a new testing framework just for this pass.

## Risks and Mitigations

### Risk: accidental billing regression

Mitigation:

- Keep checkout logic local and unchanged except for wiring cleanup.
- Preserve existing plan keys exactly.

### Risk: layout regressions between empty-chat and active-chat states

Mitigation:

- Treat `centered={true}` and default inline placement as first-class design targets.
- Avoid collapsing the two shells into one larger refactor.

### Risk: cleanup becomes an unnecessary component split

Mitigation:

- Only extract helpers that remove clear duplication.
- Keep the feature scoped to the two existing files unless a third file becomes obviously necessary.

## Success Criteria

This cleanup is successful if:

- the pricing gate code is easier to read and update,
- the parent chat container no longer repeats the pricing-versus-prompt conditional unnecessarily,
- the pricing section looks more polished in both empty and active chat states,
- checkout behavior remains unchanged,
- and the frontend lint/build verification still passes.
