import React, { useEffect, useState } from "react";
import { X, Copy, Check } from "@phosphor-icons/react";
import Admin from "@/models/admin";
import paths from "@/utils/paths";
import { userFromStorage } from "@/utils/request";
import System from "@/models/system";
import showToast from "@/utils/toast";
import { useTranslation } from "react-i18next";
import { buildCreateApiKeyPayload } from "./apiKeyFormState";

export default function NewApiKeyModal({ closeModal, onSuccess }) {
  const { t } = useTranslation();
  const [apiKey, setApiKey] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    principalType: "management",
    workspaceId: "",
  });

  useEffect(() => {
    async function fetchWorkspaces() {
      const user = userFromStorage();
      const Model = !!user ? Admin : System;
      const workspaceOptions = await Model.getApiKeyWorkspaces();
      setWorkspaces(workspaceOptions);
    }

    fetchWorkspaces();
  }, []);

  const handleCreate = async (e) => {
    setError(null);
    e.preventDefault();
    const user = userFromStorage();
    const Model = !!user ? Admin : System;

    const { apiKey: newApiKey, error } = await Model.generateApiKey(
      buildCreateApiKeyPayload(formState)
    );
    if (!!newApiKey) {
      setApiKey(newApiKey);
      onSuccess();
    }
    setError(error);
  };

  const copyApiKey = async () => {
    if (!apiKey?.secret) return false;

    try {
      await window.navigator.clipboard.writeText(apiKey.secret);
      setCopied(true);
      showToast(t("api_keys.modal.copied"), "success", {
        clear: true,
      });
      return true;
    } catch (error) {
      console.error(error);
      showToast("Failed to copy API key", "error", {
        clear: true,
      });
      return false;
    }
  };

  useEffect(() => {
    function resetStatus() {
      if (!copied) return false;
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
    resetStatus();
  }, [copied]);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative w-full max-w-2xl bg-theme-bg-secondary rounded-lg shadow border-2 border-theme-modal-border">
        <div className="relative p-6 border-b rounded-t border-theme-modal-border">
          <div className="w-full flex gap-x-2 items-center">
            <h3 className="text-xl font-semibold text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
              {t("api_keys.modal.title")}
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
          <form onSubmit={handleCreate}>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {error && (
                <p className="text-red-400 text-sm">
                  {t("api_keys.modal.error", { error })}
                </p>
              )}
              {!apiKey ? (
                <>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-y-1">
                      <label
                        htmlFor="api-key-name"
                        className="block text-sm font-medium text-white"
                      >
                        Name
                      </label>
                      <input
                        id="api-key-name"
                        type="text"
                        value={formState.name}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                        className="border-none bg-theme-settings-input-bg text-white placeholder:text-theme-settings-input-placeholder text-sm rounded-lg outline-none block w-full p-2.5"
                        placeholder="Case intake"
                      />
                    </div>

                    <div className="flex flex-col gap-y-1">
                      <label
                        htmlFor="api-key-principal-type"
                        className="block text-sm font-medium text-white"
                      >
                        Type
                      </label>
                      <select
                        id="api-key-principal-type"
                        value={formState.principalType}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            principalType: event.target.value,
                            workspaceId:
                              event.target.value === "workspace_service"
                                ? current.workspaceId
                                : "",
                          }))
                        }
                        className="border-none bg-theme-settings-input-bg text-white placeholder:text-theme-settings-input-placeholder text-sm rounded-lg outline-none block w-full p-2.5"
                      >
                        <option value="management">Management</option>
                        <option value="workspace_service">
                          Workspace service
                        </option>
                      </select>
                    </div>

                    {formState.principalType === "workspace_service" ? (
                      <div className="flex flex-col gap-y-1">
                        <label
                          htmlFor="api-key-workspace"
                          className="block text-sm font-medium text-white"
                        >
                          Workspace
                        </label>
                        <select
                          id="api-key-workspace"
                          value={formState.workspaceId}
                          onChange={(event) =>
                            setFormState((current) => ({
                              ...current,
                              workspaceId: event.target.value,
                            }))
                          }
                          required={
                            formState.principalType === "workspace_service"
                          }
                          className="border-none bg-theme-settings-input-bg text-white placeholder:text-theme-settings-input-placeholder text-sm rounded-lg outline-none block w-full p-2.5"
                        >
                          <option value="">Select workspace</option>
                          {workspaces.map((workspace) => (
                            <option key={workspace.id} value={workspace.id}>
                              {workspace.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : null}
                  </div>
                  <p className="text-white text-opacity-60 text-xs md:text-sm">
                    {t("api_keys.modal.description")}
                  </p>
                  <a
                    href={paths.apiDocs()}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {t("api_keys.modal.read_docs")} &rarr;
                  </a>
                </>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    defaultValue={`${apiKey.secret || ""}`}
                    disabled={true}
                    className="border-none bg-theme-settings-input-bg text-white placeholder:text-theme-settings-input-placeholder text-sm rounded-lg outline-none block w-full p-2.5 pr-10"
                  />
                  <button
                    type="button"
                    onClick={copyApiKey}
                    disabled={copied || !apiKey.secret}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-theme-modal-border transition-all duration-300"
                  >
                    {copied ? (
                      <Check
                        size={20}
                        className="text-green-400"
                        weight="bold"
                      />
                    ) : (
                      <Copy size={20} className="text-white" weight="bold" />
                    )}
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-end items-center mt-6 pt-6 border-t border-theme-modal-border">
              {!apiKey ? (
                <>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="ui-btn-ghost transition-all duration-300 text-white px-4 py-2 rounded-lg text-sm mr-2"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="transition-all duration-300 bg-white text-black hover:opacity-60 px-4 py-2 rounded-lg text-sm"
                  >
                    {t("api_keys.modal.create")}
                  </button>
                </>
              ) : (
                <button
                  onClick={closeModal}
                  type="button"
                  className="ui-btn-ghost transition-all duration-300 text-white px-4 py-2 rounded-lg text-sm"
                >
                  {t("common.close")}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
