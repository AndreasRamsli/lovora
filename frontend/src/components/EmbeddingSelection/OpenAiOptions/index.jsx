import { Info } from "@phosphor-icons/react";
import { Tooltip } from "react-tooltip";

export default function OpenAiOptions({ settings }) {
  return (
    <div className="w-full flex flex-col gap-y-6">
      <div className="w-full flex items-center gap-[36px] mt-1.5">
        <div className="flex flex-col w-60">
          <label className="text-white text-sm font-semibold block mb-3">
            API Key
          </label>
          <input
            type="password"
            name="OpenAiKey"
            className="border-none bg-theme-settings-input-bg text-white placeholder:text-theme-settings-input-placeholder text-sm rounded-lg focus:outline-primary-button active:outline-primary-button outline-none block w-full p-2.5"
            placeholder="OpenAI API Key"
            defaultValue={settings?.OpenAiKey ? "*".repeat(20) : ""}
            required={true}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col w-60">
          <label className="text-white text-sm font-semibold block mb-3">
            Model Preference
          </label>
          <select
            name="EmbeddingModelPref"
            required={true}
            className="border-none bg-theme-settings-input-bg border-gray-500 text-white text-sm rounded-lg block w-full p-2.5"
          >
            <optgroup label="Available embedding models">
              {[
                "text-embedding-ada-002",
                "text-embedding-3-small",
                "text-embedding-3-large",
              ].map((model) => {
                return (
                  <option
                    key={model}
                    value={model}
                    selected={settings?.EmbeddingModelPref === model}
                  >
                    {model}
                  </option>
                );
              })}
            </optgroup>
          </select>
        </div>
      </div>
      <div className="flex flex-col w-60">
        <div
          data-tooltip-id="embedding-output-dimensions-tooltip"
          className="flex gap-x-1 items-center mb-3"
        >
          <label className="text-white text-sm font-semibold block">
            Output dimensions
          </label>
          <Info
            size={16}
            className="text-theme-text-secondary cursor-pointer"
          />
          <Tooltip
            id="embedding-output-dimensions-tooltip"
            place="top"
            delayShow={300}
            className="tooltip !text-xs !opacity-100"
            style={{
              maxWidth: "250px",
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
          >
            For OpenAI embedding models that support it, this shortens the
            output vector size.
            <br />
            <br />
            Leave blank to use the model default, for example 3072 dimensions
            for text-embedding-3-large.
          </Tooltip>
        </div>
        <input
          type="number"
          name="EmbeddingOutputDimensions"
          className="border-none bg-theme-settings-input-bg text-white placeholder:text-theme-settings-input-placeholder text-sm rounded-lg focus:outline-primary-button active:outline-primary-button outline-none block w-full p-2.5"
          placeholder="Assume default dimensions"
          min={1}
          onScroll={(e) => e.target.blur()}
          defaultValue={settings?.EmbeddingOutputDimensions}
          required={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
