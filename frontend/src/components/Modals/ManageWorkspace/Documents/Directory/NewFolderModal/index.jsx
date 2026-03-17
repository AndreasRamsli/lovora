import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import Document from "@/models/document";

export default function NewFolderModal({ closeModal, files, setFiles }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [folderName, setFolderName] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);
    if (folderName.trim() !== "") {
      const newFolder = {
        name: folderName,
        type: "folder",
        items: [],
      };
      const { success } = await Document.createFolder(folderName);
      if (success) {
        setFiles({
          ...files,
          items: [...files.items, newFolder],
        });
        closeModal();
      } else {
        setError(t("connectors.directory.new_folder_failed"));
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative w-full max-w-2xl bg-theme-bg-secondary rounded-lg shadow border-2 border-theme-modal-border">
        <div className="relative p-6 border-b rounded-t border-theme-modal-border">
          <div className="w-full flex gap-x-2 items-center">
            <h3 className="text-xl font-semibold text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
              {t("connectors.directory.create_new_folder")}
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
        <div className="p-6">
          <form onSubmit={handleCreate}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="folderName"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  {t("connectors.directory.folder_name")}
                </label>
                <input
                  name="folderName"
                  type="text"
                  className="border-none bg-theme-settings-input-bg w-full text-white placeholder:text-theme-settings-input-placeholder text-sm rounded-lg focus:outline-primary-button active:outline-primary-button outline-none block w-full p-2.5"
                  placeholder={t(
                    "connectors.directory.folder_name_placeholder"
                  )}
                  required={true}
                  autoComplete="off"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm">
                  {t("connectors.manage.error_with_message", { error })}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-theme-modal-border">
              <button
                onClick={closeModal}
                type="button"
                className="ui-btn-ghost transition-all duration-300 text-white px-4 py-2 rounded-lg text-sm"
              >
                {t("common.cancel")}
              </button>
              <button
                type="submit"
                className="transition-all duration-300 bg-white text-black hover:opacity-60 px-4 py-2 rounded-lg text-sm"
              >
                {t("connectors.directory.create_folder")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
