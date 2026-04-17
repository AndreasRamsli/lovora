# Lovora Pricing Visual Refinement Design

## Goal

Refine the existing inline pricing gate so its visuals match the compact, minimal pricing reference the user provided, while preserving Lovora's current plan names, pricing content, billing behavior, and student callout structure.

## Scope

- Restyle the three main pricing cards in `frontend/src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx`.
- Keep the current pricing catalog content and plan actions intact.
- Preserve the separate student callout below the three-card ladder.
- Reuse the project's existing shadcn-style UI primitives (`Card`, `Button`, `Separator`, `Switch`) and local utility patterns.

## Non-Goals

- Changing plan names, prices, features, or action destinations.
- Changing billing keys or checkout behavior.
- Turning the student callout into a fourth main card.
- Performing a broad theme-system refactor outside the pricing gate.

## Current Problem

The pricing gate already has the correct content structure and interactions, but the presentation is still roomier and brighter than the desired reference:

- Cards are taller and more spacious than the target compact ladder.
- The visual hierarchy is too glow-heavy, especially on highlighted elements.
- Outer-card text and icons compete too much with the dark card backgrounds.
- The toggle and CTA proportions feel larger and softer than the reference.

## Proposed Approach

### 1. Keep the current component structure and data model

The implementation should stay inside the existing `PricingGate` component and continue to render from `PRICING_LADDER` plus `STUDENT_CALLOUT`.

This keeps scope tight and avoids adding new abstractions for a single inline surface. The pricing catalog remains the source of truth, and the existing checkout/link behavior stays unchanged.

### 2. Rebuild the visual language of the three-card ladder

The main pricing cards should move closer to the reference by adopting a denser, calmer layout:

- reduce card height and vertical padding,
- tighten spacing between header, price, features, and CTA,
- reduce corner radius slightly,
- use thinner, quieter separators,
- darken the neutral cards into near-black surfaces,
- give the middle highlighted card a restrained blue gradient instead of a glow-forward treatment.

The middle card remains the only strong color accent so the emphasis is obvious without extra noise.

### 3. Tighten the header utility row

The title, subtitle, badge/toggle, and right-aligned utility labels should feel smaller and more editorial:

- smaller utility typography,
- reduced weight and padding for the highlight badge,
- a compact annual toggle pill for the middle card,
- consistent right-edge alignment across all three cards.

This should mirror the reference's restrained top row rather than the current larger, more decorative treatment.

### 4. Reduce price-block and feature-list weight

The price area should remain prominent, but supporting copy should step back:

- main prices keep the strongest contrast,
- supporting notes use softer gray-blue text,
- feature rows tighten vertically,
- icon containers become smaller and less bright,
- feature text uses muted but still readable foreground values.

This change is important for visual coherence because the current icon/text brightness is too close to CTA emphasis.

### 5. Match the reference CTA proportions

The CTA buttons should become shorter, flatter pill buttons with less visual mass:

- slightly shorter height,
- flatter surface treatment,
- brighter blue fill only on the highlighted middle plan,
- subdued charcoal fills on the outer plans.

The student callout CTA should also tighten so it feels related to the same system, even though the callout remains a separate row below the ladder.

## Component-Level Changes

### PricingCard

`PricingCard` remains the main rendering unit, but its internals will be visually rebalanced:

- card shell styles updated for compact height and revised surfaces,
- highlighted card gradient simplified and softened,
- header row spacing reduced,
- toggle shell shrunk,
- separators thinned and lowered in contrast,
- feature bullet treatment made smaller and calmer,
- CTA button height reduced.

No behavior changes are needed inside the card.

### Student Callout

The student callout remains below the main cards as a separate supporting block.

It should be tightened visually so it feels like part of the same pricing system:

- slightly denser padding,
- calmer supporting text color,
- compact CTA proportions,
- dark surface that complements rather than competes with the main ladder.

### Pricing Catalog

`pricingCatalog.js` should not require content changes for this task unless minor visual metadata becomes necessary. The plan copy, prices, and actions should stay as they are.

## Data Flow and Behavior

There are no expected changes to data flow.

- `PRICING_LADDER` still defines the three main cards.
- `STUDENT_CALLOUT` still defines the lower callout.
- `getPrimaryAction` behavior stays unchanged.
- `Billing.createCheckoutSession({ planKey, workspaceSlug })` remains the checkout entry point.
- Team contact behavior remains link-based.

## Error Handling

The existing error message behavior should remain exactly as it is today.

Only minor visual touch-ups are acceptable if needed to keep the error state consistent with the refined card styling.

## Testing Strategy

This is primarily a presentation change, so testing should focus on regression protection and verification:

- keep existing pricing catalog tests passing,
- add or update tests only if any catalog metadata changes,
- run ESLint on the touched pricing files,
- build the frontend to catch JSX or Tailwind class issues.

Visual verification should confirm:

- cards are visibly shorter and denser than before,
- the middle card carries the blue-gradient emphasis,
- outer-card icon/text contrast is coherent on dark backgrounds,
- the toggle feels compact,
- the student callout still sits below the ladder as a separate block.

## Risks and Mitigations

### Risk: visual drift away from current theme primitives

Because the target reference is more polished and specific, there is a risk of hard-coded styling that feels disconnected from the rest of the app.

Mitigation:

- reuse existing `Card`, `Button`, `Separator`, and `Switch` primitives,
- keep changes scoped to pricing-gate classes,
- prefer semantic composition over broad primitive rewrites.

### Risk: reduced readability from lower-contrast styling

The reference uses subdued text and icons, which can become too dim if copied too literally.

Mitigation:

- keep primary text and prices high-contrast,
- lower contrast only for secondary labels and feature adornments,
- verify readability across all three cards.

## Success Criteria

The work is successful when:

- the pricing ladder reads as compact and minimal,
- the middle card clearly has a restrained blue gradient emphasis,
- typography and icon colors feel coherent against each card background,
- CTA buttons and toggle match the tighter proportions of the reference,
- the student callout remains below the cards and feels visually related,
- no billing or pricing-content behavior changes are introduced.
