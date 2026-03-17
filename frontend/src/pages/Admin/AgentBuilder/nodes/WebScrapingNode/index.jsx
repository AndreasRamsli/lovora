import Toggle from "@/components/lib/Toggle";
import { useTranslation } from "react-i18next";

export default function WebScrapingNode({
  config,
  onConfigChange,
  renderVariableSelect,
}) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-theme-text-primary mb-2">
          {t("agent_builder.web_scraping.url")}
        </label>
        <input
          type="url"
          value={config?.url || ""}
          onChange={(e) =>
            onConfigChange({
              ...config,
              url: e.target.value,
            })
          }
          className="w-full border-none bg-theme-settings-input-bg text-theme-text-primary placeholder:text-theme-settings-input-placeholder text-sm rounded-lg focus:outline-primary-button active:outline-primary-button outline-none p-2.5"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-theme-text-primary mb-2">
          {t("agent_builder.web_scraping.capture_as")}
        </label>
        <select
          value={config.captureAs}
          onChange={(e) =>
            onConfigChange({ ...config, captureAs: e.target.value })
          }
          className="w-full border-none bg-theme-settings-input-bg text-theme-text-primary text-sm rounded-lg focus:outline-primary-button active:outline-primary-button outline-none p-2.5"
        >
          {[
            {
              label: t("agent_builder.web_scraping.capture_options.text"),
              value: "text",
            },
            {
              label: t("agent_builder.web_scraping.capture_options.html"),
              value: "html",
            },
            {
              label: t("agent_builder.web_scraping.capture_options.selector"),
              value: "querySelector",
            },
          ].map((captureAs) => (
            <option
              key={captureAs.value}
              value={captureAs.value}
              className="bg-theme-settings-input-bg"
            >
              {captureAs.label}
            </option>
          ))}
        </select>
      </div>

      {config.captureAs === "querySelector" && (
        <div>
          <label className="block text-sm font-medium text-theme-text-primary mb-2">
            {t("agent_builder.web_scraping.query_selector")}
          </label>
          <p className="text-xs text-theme-text-secondary mb-2">
            {t("agent_builder.web_scraping.query_selector_help")}
          </p>
          <input
            value={config.querySelector}
            onChange={(e) =>
              onConfigChange({ ...config, querySelector: e.target.value })
            }
            placeholder=".article-content, #content, .main-content, etc."
            className="w-full border-none bg-theme-settings-input-bg text-theme-text-primary text-sm rounded-lg focus:outline-primary-button active:outline-primary-button outline-none p-2.5"
          />
        </div>
      )}

      <Toggle
        size="md"
        variant="horizontal"
        label={t("agent_builder.content_summarization.label")}
        hint="content-summarization-tooltip"
        enabled={config.enableSummarization ?? true}
        onChange={(checked) =>
          onConfigChange({ ...config, enableSummarization: checked })
        }
      />
      <div>
        <label className="block text-sm font-medium text-theme-text-primary mb-2">
          {t("agent_builder.web_scraping.result_variable")}
        </label>
        {renderVariableSelect(
          config.resultVariable,
          (value) => onConfigChange({ ...config, resultVariable: value }),
          t("agent_builder.common.select_or_create_variable"),
          true
        )}
      </div>
    </div>
  );
}
