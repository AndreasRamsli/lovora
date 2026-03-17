import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import {
  BooleanInput,
  ChatModeSelection,
  NumberInput,
  PermittedDomains,
  WorkspaceSelection,
  enforceSubmissionSchema,
} from "../../NewEmbedModal";
import Embed from "@/models/embed";
import showToast from "@/utils/toast";
import { safeJsonParse } from "@/utils/request";
import { Trans, useTranslation } from "react-i18next";

export default function EditEmbedModal({ embed, closeModal }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    setError(null);
    e.preventDefault();
    const form = new FormData(e.target);
    const data = enforceSubmissionSchema(form);
    const { success, error } = await Embed.updateEmbed(embed.id, data);
    if (success) {
      showToast(t("embeddable_modal.update_success"), "success", {
        clear: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
    setError(error);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative w-full max-w-2xl bg-theme-bg-secondary rounded-lg shadow border-2 border-theme-modal-border">
        <div className="relative p-6 border-b rounded-t border-theme-modal-border">
          <div className="w-full flex gap-x-2 items-center">
            <h3 className="text-xl font-semibold text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
              {t("embeddable_modal.update_title", { id: embed.id })}
            </h3>
          </div>
          <button
            onClick={closeModal}
            type="button"
            className="absolute top-4 right-4 transition-all duration-300 bg-transparent rounded-lg text-sm p-1 inline-flex items-center hover:bg-theme-modal-border hover:border-theme-modal-border hover:border-opacity-50 border-transparent border"
          >
            <X size={24} weight="bold" className="text-white" />
          </button>
        </div>
        <div className="px-7 py-6">
          <form onSubmit={handleUpdate}>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              <WorkspaceSelection defaultValue={embed.workspace.id} />
              <ChatModeSelection defaultValue={embed.chat_mode} />
              <PermittedDomains
                defaultValue={
                  safeJsonParse(embed.allowlist_domains, null) || []
                }
              />
              <NumberInput
                name="max_chats_per_day"
                title={t("embeddable_modal.max_chats_per_day_title")}
                hint={t("embeddable_modal.max_chats_per_day_hint")}
                defaultValue={embed.max_chats_per_day}
              />
              <NumberInput
                name="max_chats_per_session"
                title={t("embeddable_modal.max_chats_per_session_title")}
                hint={t("embeddable_modal.max_chats_per_session_hint")}
                defaultValue={embed.max_chats_per_session}
              />
              <NumberInput
                name="message_limit"
                title={t("embeddable_modal.message_limit_title")}
                hint={t("embeddable_modal.message_limit_hint")}
                defaultValue={embed.message_limit}
              />
              <BooleanInput
                name="allow_model_override"
                title={t("embeddable_modal.model_override_title")}
                hint={t("embeddable_modal.model_override_hint")}
                defaultValue={embed.allow_model_override}
              />
              <BooleanInput
                name="allow_temperature_override"
                title={t("embeddable_modal.temperature_override_title")}
                hint={t("embeddable_modal.temperature_override_hint")}
                defaultValue={embed.allow_temperature_override}
              />
              <BooleanInput
                name="allow_prompt_override"
                title={t("embeddable_modal.prompt_override_title")}
                hint={t("embeddable_modal.prompt_override_hint")}
                defaultValue={embed.allow_prompt_override}
              />

              {error && (
                <p className="text-red-400 text-sm">
                  {t("embeddable_modal.error", { error })}
                </p>
              )}
              <p className="text-white text-opacity-60 text-xs md:text-sm">
                <Trans
                  i18nKey="embeddable_modal.script_help"
                  components={{
                    code: (
                      <code className="border-none bg-theme-settings-input-bg text-white mx-1 px-1 rounded-sm" />
                    ),
                  }}
                />
              </p>
            </div>
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-theme-modal-border">
              <button
                onClick={closeModal}
                type="button"
                className="ui-btn-ghost transition-all duration-300 text-white px-4 py-2 rounded-lg text-sm"
              >
                {t("embeddable_modal.cancel")}
              </button>
              <button
                type="submit"
                className="transition-all duration-300 bg-white text-black hover:opacity-60 px-4 py-2 rounded-lg text-sm"
              >
                {t("embeddable_modal.update")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
