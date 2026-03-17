import { MagnifyingGlass } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

export default function LLMSelectorSidePanel({
  availableProviders,
  selectedLLMProvider,
  onSearchChange,
  onProviderClick,
}) {
  const { t } = useTranslation();

  return (
    <div className="w-[40%] h-full flex flex-col gap-4 p-2 border-r border-theme-modal-border">
      <div className="relative shrink-0 mx-2">
        <MagnifyingGlass
          size={14}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-doctor/55 light:text-infinite-night/40"
          weight="bold"
        />
        <input
          id="llm-search-input"
          type="search"
          placeholder={t("chat_window.workspace_llm_manager.search")}
          onChange={onSearchChange}
          className="bg-theme-settings-input-bg text-theme-text-primary placeholder:text-theme-settings-input-placeholder text-sm rounded-lg pl-8 pr-2.5 h-8 w-full outline-none border border-transparent"
        />
      </div>
      <div className="flex flex-col gap-0 overflow-y-auto min-h-0 flex-1">
        {availableProviders.map((llm) => (
          <button
            key={llm.value}
            type="button"
            data-llm-value={llm.value}
            className={`border-none cursor-pointer flex gap-2 items-center px-2.5 py-1.5 rounded-md transition-colors ${
              selectedLLMProvider === llm.value
                ? "bg-theme-action-menu-item-hover"
                : "hover:bg-theme-action-menu-item-hover bg-transparent"
            }`}
            onClick={() => onProviderClick(llm.value)}
          >
            <img
              src={llm.logo}
              alt={`${llm.name} logo`}
              className="w-6 h-6 rounded"
            />
            <span className="text-sm text-theme-text-primary">{llm.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
