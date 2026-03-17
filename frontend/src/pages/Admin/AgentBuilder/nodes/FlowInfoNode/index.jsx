/* eslint-disable react-hooks/refs */
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";

const FlowInfoNode = forwardRef(({ config, onConfigChange }, refs) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-theme-text-primary mb-2">
          {t("agent_builder.flow_info.name")}
        </label>
        <div className="flex flex-col text-xs text-theme-text-secondary mt-2 mb-3">
          <p className="">{t("agent_builder.flow_info.name_help")}</p>
          <p>{t("agent_builder.flow_info.examples")}</p>
        </div>
        <input
          id="agent-flow-name-input"
          ref={refs?.nameRef}
          type="text"
          placeholder={t("agent_builder.flow_info.name_placeholder")}
          value={config?.name || ""}
          onChange={(e) =>
            onConfigChange({
              ...config,
              name: e.target.value,
            })
          }
          className="w-full border-none bg-theme-settings-input-bg text-theme-text-primary placeholder:text-theme-settings-input-placeholder text-sm rounded-lg focus:outline-primary-button active:outline-primary-button outline-none p-2.5"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-theme-text-primary mb-2">
          {t("agent_builder.flow_info.description")}
        </label>
        <div className="flex flex-col text-xs text-theme-text-secondary mt-2 mb-3">
          <p className="">{t("agent_builder.flow_info.description_help")}</p>
        </div>
        <textarea
          ref={refs?.descriptionRef}
          value={config?.description || ""}
          onChange={(e) =>
            onConfigChange({
              ...config,
              description: e.target.value,
            })
          }
          className="w-full border-none bg-theme-settings-input-bg text-theme-text-primary placeholder:text-theme-settings-input-placeholder text-sm rounded-lg focus:outline-primary-button active:outline-primary-button outline-none p-2.5"
          rows={3}
          placeholder={t("agent_builder.flow_info.description_placeholder")}
        />
      </div>
    </div>
  );
});

FlowInfoNode.displayName = "FlowInfoNode";
export default FlowInfoNode;
