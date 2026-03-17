import CTAButton from "@/components/lib/CTAButton";
import CommunityHubImportItemSteps from "../..";
import { Warning } from "@phosphor-icons/react";
import { Trans, useTranslation } from "react-i18next";

export default function UnknownItem({ item, setSettings, setStep }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col mt-4 gap-y-4">
      <div className="w-full flex items-center gap-x-2">
        <Warning size={24} className="text-red-500" />
        <h2 className="text-base text-red-500 font-semibold">
          {t("community_hub.import.item.unknown.title")}
        </h2>
      </div>
      <div className="flex flex-col gap-y-[25px] text-white/80 text-sm">
        <p>{t("community_hub.import.item.unknown.description")}</p>
        <p>
          <Trans
            i18nKey="community_hub.import.item.unknown.item_id"
            values={{ id: item.id }}
            components={{ bold: <b /> }}
          />
          <br />
          <Trans
            i18nKey="community_hub.import.item.unknown.item_type"
            values={{ itemType: item.itemType }}
            components={{ bold: <b /> }}
          />
        </p>
        <p>{t("community_hub.import.item.unknown.contact_support")}</p>
      </div>
      <CTAButton
        className="text-dark-text w-full mt-[18px] h-[34px] hover:bg-accent"
        onClick={() => {
          setSettings({ itemId: null, item: null });
          setStep(CommunityHubImportItemSteps.itemId.key);
        }}
      >
        {t("community_hub.import.item.unknown.try_another")}
      </CTAButton>
    </div>
  );
}
