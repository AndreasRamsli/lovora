import useScrollActiveItemIntoView from "@/hooks/useScrollActiveItemIntoView";
import Workspace from "@/models/workspace";
import paths from "@/utils/paths";
import showToast from "@/utils/toast";
import {
  ArrowCounterClockwise,
  DotsThree,
  PencilSimple,
  Trash,
  X,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const THREAD_CALLOUT_DETAIL_WIDTH = 26;
export default function ThreadItem({
  idx,
  activeIdx,
  isActive,
  workspace,
  thread,
  onRemove,
  toggleMarkForDeletion,
  hasNext,
  ctrlPressed = false,
}) {
  const { t } = useTranslation();
  const { slug: urlSlug, threadSlug = null } = useParams();
  const workspaceSlug = workspace?.slug ?? urlSlug;
  const optionsContainer = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const linkTo = thread.virtual
    ? "/"
    : !thread.slug
      ? paths.workspace.chat(workspaceSlug)
      : paths.workspace.thread(workspaceSlug, thread.slug);

  const { ref } = useScrollActiveItemIntoView({
    isActive,
    behavior: "instant",
    block: "center",
  });
  return (
    <div
      className="w-full relative flex h-[38px] items-center border-none rounded-lg"
      role="listitem"
    >
      {/* Curved line Element and leader if required */}
      <div
        style={{ width: THREAD_CALLOUT_DETAIL_WIDTH / 2 }}
        className={`${
          isActive
            ? "border-l-2 border-b-2 border-theme-text-primary z-[2]"
            : "border-l border-b border-zinc-500 light:border-infinite-night/20 z-[1]"
        } h-[50%] absolute top-0 left-3 rounded-bl-lg`}
      ></div>
      {/* Downstroke border for next item */}
      {hasNext && (
        <div
          style={{ width: THREAD_CALLOUT_DETAIL_WIDTH / 2 }}
          className={`${
            idx <= activeIdx && !isActive
              ? "border-l-2 border-theme-text-primary z-[2]"
              : "border-l border-zinc-500 light:border-infinite-night/20 z-[1]"
          } h-[100%] absolute top-0 left-3`}
        ></div>
      )}

      {/* Curved line inline placeholder for spacing - not visible */}
      <div
        style={{ width: THREAD_CALLOUT_DETAIL_WIDTH + 8 }}
        className="h-full"
      />
      <div
        className={`flex w-full items-center justify-between pr-2 group relative ${isActive ? "bg-[var(--theme-sidebar-thread-selected)] light:bg-[#EDE8D8]" : "hover:bg-theme-sidebar-subitem-hover light:hover:bg-[#E5DFC9]"} rounded-[4px]`}
      >
        {thread.deleted ? (
          <div className="w-full flex justify-between">
            <div className="w-full pl-2 py-1">
              <p
                className={`text-left text-sm text-slate-400/50 light:text-infinite-night/55 italic`}
              >
                {t("active_workspaces.threads.deleted")}
              </p>
            </div>
            {ctrlPressed && (
              <button
                type="button"
                className="border-none"
                onClick={() => toggleMarkForDeletion(thread.id)}
              >
                <ArrowCounterClockwise
                  className="text-doctor/75 hover:text-white light:text-theme-text-secondary hover:light:text-theme-text-primary"
                  size={18}
                />
              </button>
            )}
          </div>
        ) : (
          <a
            ref={ref}
            href={
              window.location.pathname === linkTo || ctrlPressed ? "#" : linkTo
            }
            data-tooltip-id="workspace-thread-name"
            data-tooltip-content={thread.name}
            className="w-full pl-2 py-1 overflow-hidden"
            aria-current={isActive ? "page" : ""}
          >
            <p
              className={`text-left text-sm truncate max-w-[150px] ${
                isActive
                  ? "font-semibold text-theme-text-primary light:text-infinite-night"
                  : "text-theme-text-primary font-medium light:text-infinite-night"
              }`}
            >
              {thread.name}
            </p>
          </a>
        )}
        {!!thread.slug && !thread.deleted && !thread.virtual && (
          <div ref={optionsContainer} className="flex items-center">
            {" "}
            {/* Added flex and items-center */}
            {ctrlPressed ? (
              <button
                type="button"
                className="border-none"
                onClick={() => toggleMarkForDeletion(thread.id)}
              >
                <X
                  className="text-doctor/75 light:text-theme-text-secondary hover:text-white hover:light:text-theme-text-primary"
                  weight="bold"
                  size={18}
                />
              </button>
            ) : (
              <div className="flex items-center w-fit group-hover:visible md:invisible gap-x-1">
                <button
                  type="button"
                  className="border-none"
                  onClick={() => setShowOptions(!showOptions)}
                  aria-label={t("active_workspaces.threads.options")}
                >
                  <DotsThree
                    className="text-doctor/75 light:text-theme-text-secondary hover:text-white hover:light:text-theme-text-primary"
                    size={25}
                  />
                </button>
              </div>
            )}
            {showOptions && (
              <OptionsMenu
                containerRef={optionsContainer}
                workspace={workspace}
                thread={thread}
                onRemove={onRemove}
                close={() => setShowOptions(false)}
                currentThreadSlug={threadSlug}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function OptionsMenu({
  containerRef,
  workspace,
  thread,
  onRemove,
  close,
  currentThreadSlug,
}) {
  const { t } = useTranslation();
  const menuRef = useRef(null);

  // Ref menu options
  const outsideClick = (e) => {
    if (!menuRef.current) return false;
    if (
      !menuRef.current?.contains(e.target) &&
      !containerRef.current?.contains(e.target)
    )
      close();
    return false;
  };

  const isEsc = (e) => {
    if (e.key === "Escape" || e.key === "Esc") close();
  };

  function cleanupListeners() {
    window.removeEventListener("click", outsideClick);
    window.removeEventListener("keyup", isEsc);
  }
  // end Ref menu options

  useEffect(() => {
    function setListeners() {
      if (!menuRef?.current || !containerRef.current) return false;
      window.document.addEventListener("click", outsideClick);
      window.document.addEventListener("keyup", isEsc);
    }

    setListeners();
    return cleanupListeners;
  }, [menuRef.current, containerRef.current]);

  const renameThread = async () => {
    const name = window
      .prompt(t("active_workspaces.threads.rename_prompt"))
      ?.trim();
    if (!name || name.length === 0) {
      close();
      return;
    }

    const { message } = await Workspace.threads.update(
      workspace.slug,
      thread.slug,
      { name }
    );
    if (!!message) {
      showToast(
        t("active_workspaces.threads.update_failed", { message }),
        "error",
        {
          clear: true,
        }
      );
      close();
      return;
    }

    thread.name = name;
    close();
  };

  const handleDelete = async () => {
    if (!window.confirm(t("active_workspaces.threads.delete_confirm"))) return;
    const success = await Workspace.threads.delete(workspace.slug, thread.slug);
    if (!success) {
      showToast(t("active_workspaces.threads.delete_failed"), "error", {
        clear: true,
      });
      return;
    }
    if (success) {
      showToast(t("active_workspaces.threads.deleted_success"), "success", {
        clear: true,
      });
      onRemove(thread.id);
      // Redirect if deleting the active thread
      if (currentThreadSlug === thread.slug) {
        window.location.href = paths.workspace.chat(workspace.slug);
      }
      return;
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute w-fit z-[20] top-[25px] right-[10px] bg-theme-bg-popup-menu border border-theme-modal-border rounded-lg p-1 shadow-lg"
    >
      <button
        onClick={renameThread}
        type="button"
        className="w-full rounded-md flex items-center p-2 gap-x-2 hover:bg-theme-action-menu-item-hover text-theme-text-primary"
      >
        <PencilSimple size={18} />
        <p className="text-sm">{t("active_workspaces.threads.rename")}</p>
      </button>
      <button
        onClick={handleDelete}
        type="button"
        className="w-full rounded-md flex items-center p-2 gap-x-2 hover:bg-red-500/20 text-theme-text-primary hover:text-red-100"
      >
        <Trash size={18} />
        <p className="text-sm">{t("active_workspaces.threads.delete")}</p>
      </button>
    </div>
  );
}
