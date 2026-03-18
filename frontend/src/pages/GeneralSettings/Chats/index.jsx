import { useEffect, useState } from "react";
import Sidebar from "@/components/SettingsSidebar";
import { isMobile } from "react-device-detect";
import * as Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import System from "@/models/system";
import showToast from "@/utils/toast";

const PAGE_SIZE = 20;

function formatDate(value) {
  if (!value) return "--";
  return new Date(value).toLocaleString();
}

function formatJoined(values = []) {
  if (!Array.isArray(values) || values.length === 0) return "--";
  return values.join(", ");
}

function StatusBadge({ value = "safe" }) {
  const styles = {
    safe: "bg-emerald-500/15 text-emerald-300 light:text-emerald-700",
    review: "bg-amber-500/15 text-amber-300 light:text-amber-700",
    open: "bg-amber-500/15 text-amber-300 light:text-amber-700",
    dismissed: "bg-slate-500/15 text-slate-200 light:text-slate-700",
    resolved: "bg-sky-500/15 text-sky-300 light:text-sky-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${styles[value] || styles.safe}`}
    >
      {value}
    </span>
  );
}

function Pager({ offset, canNext, setOffset, loading }) {
  return (
    <div className="flex items-center justify-end gap-2 pt-4">
      <button
        disabled={loading || offset === 0}
        onClick={() => setOffset((current) => Math.max(current - 1, 0))}
        className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-theme-text-secondary disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <button
        disabled={loading || !canNext}
        onClick={() => setOffset((current) => current + 1)}
        className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-theme-text-secondary disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="min-w-[160px] rounded-2xl border border-white/10 bg-theme-bg-container p-4">
      <div className="text-xs uppercase tracking-wide text-theme-text-secondary">
        {label}
      </div>
      <div className="pt-2 text-2xl font-semibold text-theme-text-primary">
        {value}
      </div>
    </div>
  );
}

function SectionShell({ title, description, actions = null, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-theme-bg-container p-4">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-theme-text-primary">
            {title}
          </h2>
          <p className="pt-2 text-sm text-theme-text-secondary">
            {description}
          </p>
        </div>
        {actions}
      </div>
      <div className="pt-4">{children}</div>
    </section>
  );
}

function ErrorPanel({ message, code = null }) {
  const diagnostic =
    code === "conversation_metadata_unavailable"
      ? "Conversation oversight is unavailable until the moderation migration is applied."
      : null;

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-theme-text-primary">
      <div className="font-semibold">Infrastructure issue</div>
      <div className="pt-2 text-theme-text-secondary">
        {message || "This admin surface is temporarily unavailable."}
      </div>
      {diagnostic ? (
        <div className="pt-2 text-theme-text-secondary">{diagnostic}</div>
      ) : null}
    </div>
  );
}

function ReviewConversation({ review, loading, error, onClose }) {
  return (
    <SectionShell
      title="Flagged Conversation"
      description="This view is the only place raw conversation content is available to moderators. Access ends when the case is dismissed or resolved."
      actions={
        review ? (
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-theme-text-secondary"
          >
            Close
          </button>
        ) : null
      }
    >
      {loading ? (
        <Skeleton.default
          height="260px"
          width="100%"
          highlightColor="var(--theme-bg-primary)"
          baseColor="var(--theme-bg-secondary)"
          count={1}
          className="w-full rounded-2xl"
          containerClassName="flex w-full"
        />
      ) : !review ? (
        error ? (
          <ErrorPanel message={error.error} code={error.code} />
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-theme-text-secondary">
            Open a flagged case from the review queue to inspect the full
            thread.
          </div>
        )
      ) : (
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 p-4">
              <div className="text-xs uppercase tracking-wide text-theme-text-secondary">
                Case
              </div>
              <div className="pt-2 text-sm font-semibold text-theme-text-primary">
                #{review.caseId}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <div className="text-xs uppercase tracking-wide text-theme-text-secondary">
                Workspace
              </div>
              <div className="pt-2 text-sm font-semibold text-theme-text-primary">
                {review.workspace?.name || "deleted workspace"}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <div className="text-xs uppercase tracking-wide text-theme-text-secondary">
                Thread
              </div>
              <div className="pt-2 text-sm font-semibold text-theme-text-primary">
                {review.thread?.name || "Default thread"}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <div className="text-xs uppercase tracking-wide text-theme-text-secondary">
                Categories
              </div>
              <div className="pt-2 text-sm font-semibold text-theme-text-primary">
                {formatJoined(review.flag?.categories)}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {review.messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-2xl border p-4 ${message.isFlaggedChat ? "border-amber-500/40" : "border-white/10"}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-theme-text-secondary">
                      Chat #{message.id}
                    </span>
                    {message.isFlaggedChat && <StatusBadge value="review" />}
                  </div>
                  <div className="text-xs text-theme-text-secondary">
                    {formatDate(message.createdAt)}
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-theme-bg-secondary p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-theme-text-secondary">
                      User
                    </div>
                    <pre className="whitespace-pre-wrap break-words pt-3 text-sm text-theme-text-primary">
                      {message.prompt}
                    </pre>
                  </div>
                  <div className="rounded-xl bg-theme-bg-secondary p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-theme-text-secondary">
                      Assistant
                    </div>
                    <pre className="whitespace-pre-wrap break-words pt-3 text-sm text-theme-text-primary">
                      {message.responseText || "--"}
                    </pre>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3 text-xs text-theme-text-secondary">
                  <span>Provider: {message.provider || "--"}</span>
                  <span>Model: {message.model || "--"}</span>
                  <span>
                    Attachments:{" "}
                    {message.attachments?.length
                      ? message.attachments
                          .map((attachment) => attachment.name)
                          .join(", ")
                      : "--"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
}

function FlagTable({
  flags,
  loading,
  error,
  offset,
  setOffset,
  canNext,
  status,
  setStatus,
  onOpenReview,
  onDismiss,
  onSuspend,
  onUnsuspend,
}) {
  const onAction = async (handler, flag) => {
    const reviewNote = window.prompt(
      "Optional review note",
      flag.reviewNote || ""
    );
    if (reviewNote === null) return;
    await handler(flag.id, reviewNote);
  };

  return (
    <SectionShell
      title="Review Queue"
      description="These cases are created from deterministic moderation rules. Raw thread access is available only from the dedicated flagged conversation viewer."
      actions={
        <select
          value={status}
          onChange={(event) => {
            setOffset(0);
            setStatus(event.target.value);
          }}
          className="rounded-lg border border-white/10 bg-theme-bg-secondary px-3 py-2 text-sm text-theme-text-primary"
        >
          <option value="open">Open only</option>
          <option value="all">All cases</option>
          <option value="dismissed">Dismissed</option>
          <option value="resolved">Resolved</option>
        </select>
      }
    >
      {loading ? (
        <Skeleton.default
          height="240px"
          width="100%"
          highlightColor="var(--theme-bg-primary)"
          baseColor="var(--theme-bg-secondary)"
          count={1}
          className="w-full rounded-2xl"
          containerClassName="flex w-full"
        />
      ) : error ? (
        <ErrorPanel message={error.error} code={error.code} />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-spacing-0 text-left text-xs">
              <thead className="border-b border-white/10 text-theme-text-secondary">
                <tr>
                  <th className="px-4 py-3">Case</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Workspace</th>
                  <th className="px-4 py-3">Categories</th>
                  <th className="px-4 py-3">Rules</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Reviewed</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {flags.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-6 text-center text-sm text-theme-text-secondary"
                    >
                      No review cases on this page.
                    </td>
                  </tr>
                ) : (
                  flags.map((flag) => (
                    <tr
                      key={flag.id}
                      className="border-b border-white/10 text-theme-text-primary"
                    >
                      <td className="px-4 py-3 align-top">
                        <div>#{flag.id}</div>
                        <div className="pt-1 text-theme-text-secondary">
                          Chat #{flag.chatId}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div>{flag.user?.username || "unknown user"}</div>
                        <div className="pt-1">
                          <StatusBadge
                            value={flag.user?.suspended ? "resolved" : "safe"}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div>{flag.workspace?.name || "deleted workspace"}</div>
                        <div className="pt-1 text-theme-text-secondary">
                          {flag.thread?.name || "Default thread"}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        {formatJoined(flag.categories)}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {flag.matchedRules.map((rule) => rule.id).join(", ") ||
                          "--"}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex items-center gap-2">
                          <StatusBadge value={flag.status} />
                          <StatusBadge value={flag.riskLevel} />
                        </div>
                        <div className="pt-1 text-theme-text-secondary">
                          {flag.resolution}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div>{flag.reviewedBy?.username || "Not reviewed"}</div>
                        <div className="pt-1 text-theme-text-secondary">
                          {formatDate(flag.reviewedAt)}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex flex-wrap gap-2">
                          {flag.status === "open" && (
                            <button
                              onClick={() => onOpenReview(flag.id)}
                              className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-theme-text-secondary"
                            >
                              Open flagged conversation
                            </button>
                          )}
                          {flag.status === "open" && (
                            <button
                              onClick={() => onAction(onDismiss, flag)}
                              className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-theme-text-secondary"
                            >
                              Dismiss
                            </button>
                          )}
                          <button
                            onClick={() =>
                              flag.user?.suspended
                                ? onAction(onUnsuspend, flag)
                                : onAction(onSuspend, flag)
                            }
                            className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-theme-text-secondary"
                          >
                            {flag.user?.suspended
                              ? "Unsuspend"
                              : "Suspend user"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pager
            offset={offset}
            canNext={canNext}
            setOffset={setOffset}
            loading={loading}
          />
        </>
      )}
    </SectionShell>
  );
}

function MetadataTable({ chats, loading, error, offset, setOffset, canNext }) {
  return (
    <SectionShell
      title="Conversation Metadata"
      description="This view exposes conversation context for oversight only. Prompt text, response text, attachments, and exports are intentionally unavailable."
    >
      {loading ? (
        <Skeleton.default
          height="300px"
          width="100%"
          highlightColor="var(--theme-bg-primary)"
          baseColor="var(--theme-bg-secondary)"
          count={1}
          className="w-full rounded-2xl"
          containerClassName="flex w-full"
        />
      ) : error ? (
        <ErrorPanel message={error.error} code={error.code} />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-spacing-0 text-left text-xs">
              <thead className="border-b border-white/10 text-theme-text-secondary">
                <tr>
                  <th className="px-4 py-3">Chat</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Workspace</th>
                  <th className="px-4 py-3">Thread</th>
                  <th className="px-4 py-3">Provider</th>
                  <th className="px-4 py-3">Model</th>
                  <th className="px-4 py-3">Attachments</th>
                  <th className="px-4 py-3">Risk</th>
                  <th className="px-4 py-3">Open flags</th>
                  <th className="px-4 py-3">User status</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {chats.length === 0 ? (
                  <tr>
                    <td
                      colSpan={11}
                      className="px-4 py-6 text-center text-sm text-theme-text-secondary"
                    >
                      No conversations on this page.
                    </td>
                  </tr>
                ) : (
                  chats.map((chat) => (
                    <tr
                      key={chat.id}
                      className="border-b border-white/10 text-theme-text-primary"
                    >
                      <td className="px-4 py-3">#{chat.chatId}</td>
                      <td className="px-4 py-3">{chat.user?.username}</td>
                      <td className="px-4 py-3">{chat.workspace?.name}</td>
                      <td className="px-4 py-3">
                        {chat.thread?.name || "Default thread"}
                      </td>
                      <td className="px-4 py-3">{chat.provider || "--"}</td>
                      <td className="px-4 py-3">{chat.model || "--"}</td>
                      <td className="px-4 py-3">{chat.attachmentCount}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <StatusBadge value={chat.riskLevel} />
                        </div>
                        <div className="pt-1 text-theme-text-secondary">
                          {formatJoined(chat.categories)}
                        </div>
                      </td>
                      <td className="px-4 py-3">{chat.repeatFlagCount}</td>
                      <td className="px-4 py-3">
                        {chat.userSuspended ? "Suspended" : "Active"}
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(chat.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pager
            offset={offset}
            canNext={canNext}
            setOffset={setOffset}
            loading={loading}
          />
        </>
      )}
    </SectionShell>
  );
}

export default function WorkspaceChats() {
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingFlags, setLoadingFlags] = useState(true);
  const [loadingReview, setLoadingReview] = useState(false);
  const [chatOffset, setChatOffset] = useState(0);
  const [flagOffset, setFlagOffset] = useState(0);
  const [flagStatus, setFlagStatus] = useState("open");
  const [chats, setChats] = useState([]);
  const [flags, setFlags] = useState([]);
  const [review, setReview] = useState(null);
  const [chatHasPages, setChatHasPages] = useState(false);
  const [flagHasPages, setFlagHasPages] = useState(false);
  const [totalChats, setTotalChats] = useState(0);
  const [totalFlags, setTotalFlags] = useState(0);
  const [chatError, setChatError] = useState(null);
  const [flagError, setFlagError] = useState(null);
  const [reviewError, setReviewError] = useState(null);
  const summaryUnavailable = Boolean(chatError || flagError);

  const fetchChats = async () => {
    setLoadingChats(true);
    const response = await System.chats(chatOffset);
    if (response?.success === false) {
      setChats([]);
      setChatHasPages(false);
      setChatError({
        error: response.error || "Unable to load conversation metadata.",
        code: response.code || null,
      });
      setLoadingChats(false);
      return;
    }

    setChats(response?.chats || []);
    setChatHasPages(Boolean(response?.hasPages));
    setTotalChats(response?.totalChats || 0);
    setChatError(null);
    setLoadingChats(false);
  };

  const fetchFlags = async () => {
    setLoadingFlags(true);
    const response = await System.conversationFlags({
      offset: flagOffset,
      limit: PAGE_SIZE,
      status: flagStatus,
    });
    if (response?.success === false) {
      setFlags([]);
      setFlagHasPages(false);
      setFlagError({
        error: response.error || "Unable to load review queue.",
        code: response.code || null,
      });
      setLoadingFlags(false);
      return;
    }

    setFlags(response?.flags || []);
    setFlagHasPages(Boolean(response?.hasPages));
    setTotalFlags(response?.totalFlags || 0);
    setFlagError(null);
    setLoadingFlags(false);
  };

  useEffect(() => {
    fetchChats();
  }, [chatOffset]);

  useEffect(() => {
    fetchFlags();
  }, [flagOffset, flagStatus]);

  const refreshAll = async () => {
    await Promise.all([fetchChats(), fetchFlags()]);
  };

  const openReview = async (flagId) => {
    setLoadingReview(true);
    const response = await System.flaggedConversationReview(flagId);
    if (!response?.success || !response?.review) {
      showToast(
        response?.error || "Unable to open the flagged conversation.",
        "error",
        { clear: true }
      );
      setReview(null);
      setReviewError({
        error: response?.error || "Unable to open the flagged conversation.",
        code: response?.code || null,
      });
      setLoadingReview(false);
      return;
    }

    setReview(response.review);
    setReviewError(null);
    setLoadingReview(false);
  };

  const handleFlagAction = async (action, flagId, reviewNote) => {
    const { success, error } = await action(flagId, reviewNote);
    if (!success) {
      showToast(error || "Action failed.", "error", { clear: true });
      return;
    }

    if (review?.caseId === flagId) setReview(null);
    showToast("Review action saved.", "success", { clear: true });
    await refreshAll();
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-theme-bg-container">
      <Sidebar />
      <div
        style={{ height: isMobile ? "100%" : "calc(100% - 32px)" }}
        className="relative h-full w-full overflow-y-scroll bg-theme-bg-secondary p-4 md:my-[16px] md:ml-[2px] md:mr-[16px] md:rounded-[16px] md:p-0"
      >
        <div className="flex w-full flex-col gap-6 px-1 py-16 md:pl-6 md:pr-[50px] md:py-6">
          {summaryUnavailable ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-theme-text-primary">
              <div className="font-semibold">
                Conversation oversight is partially unavailable
              </div>
              <div className="pt-2 text-theme-text-secondary">
                Summary counts are hidden until the metadata services recover.
              </div>
            </div>
          ) : null}
          <div className="flex flex-wrap gap-4">
            <SummaryCard
              label="Tracked conversations"
              value={chatError ? "--" : totalChats}
            />
            <SummaryCard
              label="Review cases"
              value={flagError ? "--" : totalFlags}
            />
            <SummaryCard
              label="Open cases on page"
              value={
                flagError
                  ? "--"
                  : flags.filter((flag) => flag.status === "open").length
              }
            />
          </div>

          <ReviewConversation
            review={review}
            loading={loadingReview}
            error={reviewError}
            onClose={() => setReview(null)}
          />

          <FlagTable
            flags={flags}
            loading={loadingFlags}
            error={flagError}
            offset={flagOffset}
            setOffset={setFlagOffset}
            canNext={flagHasPages}
            status={flagStatus}
            setStatus={setFlagStatus}
            onOpenReview={openReview}
            onDismiss={(flagId, reviewNote) =>
              handleFlagAction(
                System.dismissConversationFlag,
                flagId,
                reviewNote
              )
            }
            onSuspend={(flagId, reviewNote) =>
              handleFlagAction(
                System.suspendUserFromConversationFlag,
                flagId,
                reviewNote
              )
            }
            onUnsuspend={(flagId, reviewNote) =>
              handleFlagAction(
                System.unsuspendUserFromConversationFlag,
                flagId,
                reviewNote
              )
            }
          />

          <MetadataTable
            chats={chats}
            loading={loadingChats}
            error={chatError}
            offset={chatOffset}
            setOffset={setChatOffset}
            canNext={chatHasPages}
          />
        </div>
      </div>
    </div>
  );
}
