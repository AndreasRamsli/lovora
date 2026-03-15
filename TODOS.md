# TODOs

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
