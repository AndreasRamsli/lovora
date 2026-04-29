# TODOs

## Frontend: Signup Explainer Wizard

**What:** Add a short 3-step onboarding wizard that appears when people sign up and explains what Lovora is, what users can do first, and how to get value from the app.

**Why:** New users should understand Lovora immediately after signup instead of landing cold in the product. A focused wizard can set expectations, reduce confusion, and guide users toward the first useful action without adding heavy setup friction.

**Pros:** Improves first-run clarity; gives Lovora a more intentional onboarding moment; keeps explanation lightweight by limiting the flow to three steps.

**Cons:** Adds one more signup-path surface to design, localize/copy-edit, and test. The wizard should avoid blocking experienced users or turning into a long setup flow.

**Context:** Keep this as a lightweight product explanation, not a configuration wizard. Suggested steps: (1) what Lovora is, (2) how to ask questions or use workspace context, (3) the recommended first action after signup. Include skip/dismiss behavior and persist completion so returning users are not shown the wizard again.

**Depends on:** Existing signup/session flow and a clear place to persist "onboarding completed" state for the user.

---

## Frontend: Citation Sidebar Toggle Tests

**What:** Add React Testing Library tests for `Citations` component covering the `activeCitationId` toggle behavior.

**Why:** The "click same citation closes, click different citation opens" logic lives in `Citation/index.jsx` and depends on `SourcesSidebarContext.activeCitationId`. Currently verified only manually. A future upstream merge that changes the context API could silently break this without any test failure.

**Pros:** Catches regressions before they reach production; documents the intended toggle contract.

**Cons:** Requires mocking `SourcesSidebarContext`; RTL setup for this component may need a bit of scaffolding.

**Context:** `Citations` at `frontend/src/components/WorkspaceChat/ChatContainer/ChatHistory/Citation/index.jsx`. The click handler is: `sidebarOpen && activeCitationId === citationId ? closeSidebar() : openSidebar(sources, citationId)`. The context is provided by `SourcesSidebarProvider` in `ChatContainer/index.jsx`. Tests should cover: (1) clicking opens sidebar, (2) clicking same citation ID closes sidebar, (3) clicking different citation ID switches sources.

**Depends on:** Nothing — can be added any time.

---

## Frontend: ToolsMenu `autoOpenedToolsRef` Interaction Test

**What:** Add a React Testing Library test for `PromptInput` verifying that typing any character after pressing "/" auto-closes the ToolsMenu via `autoOpenedToolsRef`.

**Why:** `autoOpenedToolsRef` is a ref-based side-channel that coordinates between `captureEnterOrUndo` (sets `autoOpenedToolsRef.current = true` when "/" toggles menu) and `handleChange` (reads it to auto-dismiss). This interaction is invisible to React's rendering model and easy to silently break on future merges — especially since the ref is not a state value and won't cause re-renders that might surface the bug.

**Pros:** Documents the intended UX contract; ref-based logic is particularly regression-prone.

**Cons:** PromptInput is a complex component with many dependencies (`usePromptInputStorage`, `SpeechToText`, `ToolsMenu`, etc.) — the test setup may be non-trivial. Consider extracting the `autoOpenedToolsRef` logic into a custom hook first.

**Context:** Logic lives in `frontend/src/components/WorkspaceChat/ChatContainer/PromptInput/index.jsx`. Key spots: `captureEnterOrUndo` (sets `autoOpenedToolsRef.current = !prev` when "/" pressed), `handleChange` (checks `autoOpenedToolsRef.current && showTools && value !== "/"` to close menu). Tests should cover: (1) "/" opens menu, (2) typing a char while menu open closes it, (3) manually clicking ToolsButton sets `autoOpenedToolsRef.current = false` so typing doesn't auto-close.

**Depends on:** Nothing blocking — but easier after any PromptInput refactor that extracts the keyboard logic.
