# Pricing Gate Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up the inline pricing gate UI and remove local duplication in the surrounding chat container without changing checkout behavior.

**Architecture:** Keep the current `showPricingGate` trigger and inline placement model, but tighten the `PricingGate` component structure and extract the repeated pricing-versus-prompt conditional in `ChatContainer`. This is a two-file cleanup focused on presentation and maintainability, not a billing or routing refactor.

**Tech Stack:** React 18, Vite, Tailwind CSS v3, local shadcn-style UI primitives, lucide-react

---

### Task 1: Clean up the pricing gate component structure and presentation

**Files:**
- Modify: `frontend/src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx`

- [ ] **Step 1: Tighten the pricing tier presentation model**

```jsx
const PRICING_TIERS = [
  {
    key: "month_pass",
    name: "Month Pass",
    label: "Flexible",
    price: "$19",
    priceSuffix: "one-time payment",
    description: "Full access for 1 month without recurring billing.",
    ctaLabel: "Buy 1 Month",
    tone: "default",
  },
];
```

- [ ] **Step 2: Reduce repeated JSX inside the card UI**

```jsx
function FeatureRow({ icon: Icon, text }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/5 text-[#95a9cb]">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="leading-6">{text}</span>
    </li>
  );
}
```

- [ ] **Step 3: Refine the section framing for centered and inline layouts**

```jsx
<div
  className={cn(
    "w-full",
    centered ? "mt-5 max-w-[1080px]" : "border-t border-theme-sidebar-border px-4 pb-4 pt-5 md:px-6 md:pb-6"
  )}
>
```

- [ ] **Step 4: Keep checkout wiring unchanged**

Run: `sed -n '1,260p' frontend/src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx`
Expected: `handleCheckout(planKey)` still calls `Billing.createCheckoutSession({ planKey, workspaceSlug })`, preserves loading state, and renders inline errors.

### Task 2: Remove duplicated pricing/prompt rendering in the chat container

**Files:**
- Modify: `frontend/src/components/WorkspaceChat/ChatContainer/index.jsx`

- [ ] **Step 1: Extract the shared composer render helper**

```jsx
  function renderComposer(centered = false) {
    if (showPricingGate) {
      return (
        <PricingGate
          workspaceSlug={workspace.slug}
          onClose={() => setShowPricingGate(false)}
          centered={centered}
        />
      );
    }

    return (
      <PromptInput
        submit={handleSubmit}
        isStreaming={loadingResponse}
        sendCommand={sendCommand}
        attachments={files}
        centered={centered}
      />
    );
  }
```

- [ ] **Step 2: Replace both duplicated ternaries with the helper**

```jsx
{renderComposer(true)}
```

```jsx
{renderComposer(false)}
```

- [ ] **Step 3: Keep layout-specific shells untouched**

Run: `sed -n '340,490p' frontend/src/components/WorkspaceChat/ChatContainer/index.jsx`
Expected: empty-chat and active-chat wrappers still differ as before; only the pricing-versus-prompt duplication is removed.

### Task 3: Verify the cleanup in the frontend workspace

**Files:**
- Modify: `frontend/src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx`
- Modify: `frontend/src/components/WorkspaceChat/ChatContainer/index.jsx`

- [ ] **Step 1: Run ESLint on the touched files**

Run: `npm run lint:check -- src/components/WorkspaceChat/ChatContainer/index.jsx src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx`
Expected: no ESLint errors for the touched files.

- [ ] **Step 2: Run a production build**

Run: `npm run build`
Expected: Vite build completes successfully.
