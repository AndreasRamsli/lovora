# Pricing Gate Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing chat pricing gate with the new three-card design while keeping the current Stripe checkout behavior intact.

**Architecture:** Rework the existing `PricingGate` component in place so its public API and checkout flow stay unchanged. Port the new visual layout and interaction patterns selectively, but keep the current valid backend plan keys, loading state, close button behavior, and error handling.

**Tech Stack:** React 18, Vite, Tailwind CSS v3, existing local shadcn-style UI primitives, lucide-react

---

### Task 1: Preserve current billing behavior and map it onto the new layout

**Files:**
- Modify: `frontend/src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx`

- [ ] **Step 1: Define the refreshed pricing tier data around the existing checkout keys**

```jsx
const PRICING_TIERS = [
  {
    key: "month_pass",
    name: "Month Pass",
    description: "Full access for 1 month without recurring billing.",
    price: "$19",
    suffix: "one-time",
    featured: false,
  },
  {
    key: "monthly_subscription",
    name: "Monthly Subscription",
    description: "Recurring monthly access for active daily use.",
    price: "$15",
    suffix: "per month",
    featured: true,
  },
  {
    key: "student_exam_monthly",
    name: "Student Exam",
    description: "Discounted monthly plan for students during exams.",
    price: "50% off",
    suffix: "exam period",
    featured: false,
  },
];
```

- [ ] **Step 2: Keep the current checkout handler and error state**

Run: `sed -n '1,220p' frontend/src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx`
Expected: Existing `handleCheckout(planKey)` logic still posts `planKey` and `workspaceSlug` to `Billing.createCheckoutSession`.

### Task 2: Replace the current card layout with the new pricing section styling

**Files:**
- Modify: `frontend/src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx`

- [ ] **Step 1: Port the new visual structure into the existing component**

```jsx
<div className="grid gap-4 xl:grid-cols-3">
  {PRICING_TIERS.map((tier) => (
    <Card key={tier.key} className="rounded-3xl p-8">
      {/* tier heading */}
      {/* stylized price block */}
      {/* features list */}
      {/* CTA wired to handleCheckout(tier.key) */}
    </Card>
  ))}
</div>
```

- [ ] **Step 2: Preserve loading and close interactions in the new CTA area**

```jsx
<Button
  className="w-full rounded-full h-12"
  onClick={() => handleCheckout(tier.key)}
  disabled={Boolean(submittingPlan)}
>
  {isLoading ? "Redirecting..." : tier.ctaLabel}
</Button>
```

- [ ] **Step 3: Keep the shared wrapper behavior intact**

Run: `sed -n '1,260p' frontend/src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx`
Expected: `centered`, `onClose`, and the alert error message are still supported by the refreshed UI.

### Task 3: Verify the frontend workspace after the component refresh

**Files:**
- Modify: `frontend/src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx`

- [ ] **Step 1: Run lint on the updated file through the frontend workspace**

Run: `npm run lint:check -- src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx`
Expected: No ESLint errors from the refreshed pricing gate.

- [ ] **Step 2: Run a production build**

Run: `npm run build`
Expected: Vite build completes successfully.
