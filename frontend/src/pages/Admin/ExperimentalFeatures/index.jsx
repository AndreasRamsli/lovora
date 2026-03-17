import { useEffect, useState } from "react";
import Sidebar from "@/components/SettingsSidebar";
import { isMobile } from "react-device-detect";
import Admin from "@/models/admin";
import { FullScreenLoader } from "@/components/Preloader";
import { CaretRight, Flask } from "@phosphor-icons/react";
import { configurableFeatures } from "./features";
import ModalWrapper from "@/components/ModalWrapper";
import paths from "@/utils/paths";
import showToast from "@/utils/toast";
import { Trans, useTranslation } from "react-i18next";

export default function ExperimentalFeatures() {
  const { t } = useTranslation();
  const [featureFlags, setFeatureFlags] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState(
    "experimental_live_file_sync"
  );

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      const { settings } = await Admin.systemPreferencesByFields([
        "feature_flags",
      ]);
      setFeatureFlags(settings?.feature_flags ?? {});
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const refresh = async () => {
    const { settings } = await Admin.systemPreferencesByFields([
      "feature_flags",
    ]);
    setFeatureFlags(settings?.feature_flags ?? {});
  };

  if (loading) {
    return (
      <div
        style={{ height: isMobile ? "100%" : "calc(100% - 32px)" }}
        className="relative md:ml-[2px] md:mr-[16px] md:my-[16px] md:rounded-[16px] w-full h-full flex justify-center items-center"
      >
        <FullScreenLoader />
      </div>
    );
  }

  return (
    <FeatureLayout>
      <div className="flex-1 flex gap-x-6 p-4 mt-10">
        {/* Feature settings nav */}
        <div className="flex flex-col gap-y-[18px]">
          <div className="text-white flex items-center gap-x-2">
            <Flask size={24} />
            <p className="text-lg font-medium">
              {t("experimental_features.title")}
            </p>
          </div>
          {/* Feature list */}
          <div className="bg-theme-bg-secondary text-white rounded-xl min-w-[360px] w-fit">
            {Object.values(configurableFeatures).map((feature, index) => {
              const isFirst = index === 0;
              const isLast =
                index === Object.values(configurableFeatures).length - 1;
              return (
                <FeatureItem
                  key={feature.key}
                  feature={feature}
                  isSelected={selectedFeature === feature.key}
                  isActive={featureFlags[feature.key]}
                  handleClick={setSelectedFeature}
                  borderClass={[
                    ...(isFirst ? ["rounded-t-xl"] : []),
                    ...(isLast
                      ? ["rounded-b-xl"]
                      : ["border-b border-white/10"]),
                  ].join(" ")}
                />
              );
            })}
          </div>
        </div>

        {/* Selected feature setting panel */}
        <FeatureVerification>
          <div className="flex-[2] flex flex-col gap-y-[18px] mt-10">
            <div className="bg-theme-bg-secondary text-white rounded-xl flex-1 p-4">
              {selectedFeature ? (
                <SelectedFeatureComponent
                  feature={configurableFeatures[selectedFeature]}
                  settings={featureFlags}
                  refresh={refresh}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white/60">
                  <Flask size={40} />
                  <p className="font-medium">
                    {t("experimental_features.select_feature")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </FeatureVerification>
      </div>
    </FeatureLayout>
  );
}

function FeatureLayout({ children }) {
  return (
    <div
      id="workspace-feature-settings-container"
      className="w-screen h-screen overflow-hidden bg-theme-bg-container flex md:mt-0 mt-6"
    >
      <Sidebar />
      <div
        style={{ height: isMobile ? "100%" : "calc(100% - 32px)" }}
        className="relative md:ml-[2px] md:mr-[16px] md:my-[16px] md:rounded-[16px] w-full h-full flex"
      >
        {children}
      </div>
    </div>
  );
}

function FeatureItem({
  feature = {},
  isSelected = false,
  isActive = false,
  handleClick = () => {},
  borderClass = "border-b border-white/10",
}) {
  const { t } = useTranslation();
  return (
    <div
      key={feature.key}
      className={`py-3 px-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-white/5 ${borderClass} ${
        isSelected ? "bg-white/10 light:bg-theme-bg-sidebar" : ""
      }`}
      onClick={() => {
        if (feature?.href) window.location = feature.href;
        else handleClick?.(feature.key);
      }}
    >
      <div className="text-sm font-light">
        {feature.titleKey ? t(feature.titleKey) : feature.title}
      </div>
      <div className="flex items-center gap-x-2">
        {feature.autoEnabled ? (
          <>
            <div className="text-sm text-theme-text-secondary font-medium">
              {t("experimental_features.on")}
            </div>
            <div className="w-[14px]" />
          </>
        ) : (
          <>
            <div className="text-sm text-theme-text-secondary font-medium">
              {isActive
                ? t("experimental_features.on")
                : t("experimental_features.off")}
            </div>
            <CaretRight
              size={14}
              weight="bold"
              className="text-theme-text-secondary"
            />
          </>
        )}
      </div>
    </div>
  );
}

function SelectedFeatureComponent({ feature, settings, refresh }) {
  const Component = feature?.component;
  return Component ? (
    <Component
      enabled={settings[feature.key]}
      feature={feature.key}
      onToggle={refresh}
    />
  ) : null;
}

function FeatureVerification({ children }) {
  const { t } = useTranslation();
  if (
    !window.localStorage.getItem("anythingllm_tos_experimental_feature_set")
  ) {
    function acceptTos(e) {
      e.preventDefault();

      window.localStorage.setItem(
        "anythingllm_tos_experimental_feature_set",
        "accepted"
      );
      showToast(t("experimental_features.enabled_reload"), "success");
      setTimeout(() => {
        window.location.reload();
      }, 2_500);
      return;
    }

    return (
      <>
        <ModalWrapper isOpen={true}>
          <div className="w-full max-w-2xl bg-theme-bg-secondary rounded-lg shadow border-2 border-theme-modal-border overflow-hidden">
            <div className="relative p-6 border-b rounded-t border-theme-modal-border">
              <div className="flex items-center gap-2">
                <Flask size={24} className="text-theme-text-primary" />
                <h3 className="text-xl font-semibold text-white">
                  {t("experimental_features.modal.title")}
                </h3>
              </div>
            </div>
            <form onSubmit={acceptTos}>
              <div className="py-7 px-9 space-y-4 flex-col">
                <div className="w-full text-white text-md flex flex-col gap-y-4">
                  <p>
                    <Trans
                      i18nKey="experimental_features.modal.intro"
                      components={{ bold: <b /> }}
                    />
                  </p>

                  <div>
                    <p>{t("experimental_features.modal.risks_intro")}</p>
                    <ul className="list-disc ml-6 text-sm font-mono mt-2">
                      <li>{t("experimental_features.modal.data_loss")}</li>
                      <li>{t("experimental_features.modal.quality_change")}</li>
                      <li>{t("experimental_features.modal.storage")}</li>
                      <li>{t("experimental_features.modal.resources")}</li>
                      <li>{t("experimental_features.modal.cost")}</li>
                      <li>{t("experimental_features.modal.bugs")}</li>
                    </ul>
                  </div>

                  <div>
                    <p>{t("experimental_features.modal.conditions_intro")}</p>
                    <ul className="list-disc ml-6 text-sm font-mono mt-2">
                      <li>{t("experimental_features.modal.may_not_exist")}</li>
                      <li>{t("experimental_features.modal.unstable")}</li>
                      <li>
                        {t("experimental_features.modal.future_versions")}
                      </li>
                      <li>
                        <Trans
                          i18nKey="experimental_features.modal.privacy_honored"
                          components={{ bold: <b /> }}
                        />
                      </li>
                      <li>
                        {t("experimental_features.modal.conditions_change")}
                      </li>
                    </ul>
                  </div>

                  <p>
                    <Trans
                      i18nKey="experimental_features.modal.learn_more"
                      components={{
                        docs: (
                          <a
                            href="https://docs.anythingllm.com/beta-preview/overview"
                            className="underline text-blue-500"
                          />
                        ),
                        email: (
                          <a
                            href="mailto:team@mintplexlabs.com"
                            className="underline text-blue-500"
                          />
                        ),
                      }}
                    />
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-between items-center p-6 space-x-2 border-t border-theme-modal-border rounded-b">
                <a
                  href={paths.home()}
                  className="transition-all duration-300 bg-transparent text-white hover:bg-red-500/50 light:hover:bg-red-300/50 px-4 py-2 rounded-lg text-sm border border-theme-modal-border"
                >
                  {t("experimental_features.modal.reject")}
                </a>
                <button
                  type="submit"
                  className="transition-all duration-300 bg-white text-black hover:opacity-60 px-4 py-2 rounded-lg text-sm border border-theme-modal-border"
                >
                  {t("experimental_features.modal.accept")}
                </button>
              </div>
            </form>
          </div>
        </ModalWrapper>
        {children}
      </>
    );
  }
  return <>{children}</>;
}
