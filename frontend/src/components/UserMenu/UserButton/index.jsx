import useLoginMode from "@/hooks/useLoginMode";
import { useLanguageOptions } from "@/hooks/useLanguageOptions";
import usePfp from "@/hooks/usePfp";
import useUser from "@/hooks/useUser";
import { useThemeContext } from "@/ThemeContext";
import System from "@/models/system";
import paths from "@/utils/paths";
import { logoutCurrentUser } from "@/utils/session";
import { userFromStorage } from "@/utils/request";
import { Person } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import AccountModal from "../AccountModal";
import { useTranslation } from "react-i18next";
import { Link, useMatch } from "react-router-dom";
import BillingStatusBanner from "../BillingStatusBanner";
import BillingUpgradeButton from "../BillingUpgradeButton";
import { useBillingShell } from "../BillingShell";
import { shouldShowUpgradeButton } from "../billingPresentation";

export default function UserButton() {
  const { t } = useTranslation();
  const mode = useLoginMode();
  const { user } = useUser();
  const { billingStatus, isBillingLoading, openPricingGate } =
    useBillingShell();
  const menuRef = useRef();
  const buttonRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [supportEmail, setSupportEmail] = useState("");
  const canUpgrade = shouldShowUpgradeButton({
    loginMode: mode,
    role: user?.role ?? null,
    billingStatus,
    isBillingLoading,
  });

  const handleClose = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowMenu(false);
    }
  };

  const handleOpenAccountModal = () => {
    setShowAccountSettings(true);
    setShowMenu(false);
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClose);
    }
    return () => document.removeEventListener("mousedown", handleClose);
  }, [showMenu]);

  useEffect(() => {
    const fetchSupportEmail = async () => {
      const supportEmail = await System.fetchSupportEmail();
      setSupportEmail(
        supportEmail?.email
          ? `mailto:${supportEmail.email}`
          : paths.mailToMintplex()
      );
    };
    fetchSupportEmail();
  }, []);

  if (mode === null) return null;
  return (
    <div className="absolute top-3 right-4 md:top-9 md:right-10 w-fit h-fit z-40">
      <div className="flex items-center gap-2">
        <BillingUpgradeButton visible={canUpgrade} onClick={openPricingGate} />
        <button
          ref={buttonRef}
          onClick={() => setShowMenu(!showMenu)}
          type="button"
          className="uppercase transition-all duration-300 w-[35px] h-[35px] text-base font-semibold rounded-full flex items-center bg-theme-action-menu-bg hover:bg-theme-action-menu-item-hover justify-center text-white p-2 hover:border-slate-100 hover:border-opacity-50 border-transparent border"
        >
          {mode === "multi" ? <UserDisplay /> : <Person size={14} />}
        </button>
      </div>

      {showMenu && (
        <div
          ref={menuRef}
          className="w-fit rounded-lg absolute top-12 right-0 bg-theme-action-menu-bg p-2 flex items-center-justify-center"
        >
          <div className="flex min-w-[265px] flex-col gap-y-2">
            {!isBillingLoading &&
              billingStatus &&
              (billingStatus?.isPaidActive || canUpgrade) && (
                <BillingStatusBanner
                  billingStatus={billingStatus}
                  onUpgrade={
                    canUpgrade
                      ? () => {
                          setShowMenu(false);
                          openPricingGate();
                        }
                      : null
                  }
                />
              )}
            <QuickPreferences
              user={user}
              onNavigate={() => setShowMenu(false)}
            />
            {mode === "multi" && !!user && (
              <button
                onClick={handleOpenAccountModal}
                className="border-none text-white hover:bg-theme-action-menu-item-hover w-full text-left px-4 py-1.5 rounded-md"
              >
                {t("profile_settings.account")}
              </button>
            )}
            <a
              href={supportEmail}
              className="text-white hover:bg-theme-action-menu-item-hover w-full text-left px-4 py-1.5 rounded-md"
            >
              {t("profile_settings.support")}
            </a>
            <button
              onClick={() => logoutCurrentUser(paths.login(true))}
              type="button"
              className="text-white hover:bg-theme-action-menu-item-hover w-full text-left px-4 py-1.5 rounded-md"
            >
              {t("profile_settings.signout")}
            </button>
          </div>
        </div>
      )}
      {user && showAccountSettings && (
        <AccountModal
          user={user}
          hideModal={() => setShowAccountSettings(false)}
        />
      )}
    </div>
  );
}

function UserDisplay() {
  const { pfp } = usePfp();
  const user = userFromStorage();

  if (pfp) {
    return (
      <div className="w-[35px] h-[35px] rounded-full flex-shrink-0 overflow-hidden transition-all duration-300 bg-gray-100 hover:border-slate-100 hover:border-opacity-50 border-transparent border hover:opacity-60">
        <img
          src={pfp}
          alt="User profile picture"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return user?.username?.slice(0, 2) || "AA";
}

function QuickPreferences({ user = null, onNavigate }) {
  const { t } = useTranslation();
  const isInSettings = !!useMatch("/settings/*");
  const { theme, setTheme, availableThemes } = useThemeContext();
  const {
    currentLanguage,
    supportedLanguages,
    getLanguageName,
    changeLanguage,
  } = useLanguageOptions();
  const canOpenAdminSettings = !user || user?.role !== "default";
  const settingsPath = isInSettings ? paths.home() : paths.settings.interface();
  const settingsLabel = isInSettings
    ? "Back to workspaces"
    : "Open admin settings";

  return (
    <>
      <div className="rounded-md px-4 py-1.5 text-white hover:bg-theme-action-menu-item-hover">
        <p className="mb-1.5 text-xs font-medium text-white/60 light:text-theme-text-secondary">
          {t("customization.items.theme.title")}
        </p>
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-theme-settings-input-bg p-1">
          {Object.entries(availableThemes).map(([key, value]) => {
            const isSelected = theme === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTheme(key)}
                className={`min-h-[30px] rounded-md px-2 text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? "bg-primary-button text-[var(--theme-button-primary-text)] shadow-sm"
                    : "text-white/70 hover:bg-theme-action-menu-item-hover light:text-theme-text-secondary"
                }`}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-md px-4 py-1.5 text-white hover:bg-theme-action-menu-item-hover">
        <label
          htmlFor="top-right-language"
          className="mb-1.5 block text-xs font-medium text-white/60 light:text-theme-text-secondary"
        >
          {t("customization.items.display-language.title")}
        </label>
        <select
          id="top-right-language"
          name="userLang"
          className="block w-full rounded-lg border-none bg-theme-settings-input-bg px-3 py-1.5 text-sm text-white outline-none transition-all duration-200 focus:outline-primary-button active:outline-primary-button light:text-theme-text-primary"
          value={currentLanguage || "en"}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          {supportedLanguages.map((lang) => {
            return (
              <option key={lang} value={lang}>
                {getLanguageName(lang)}
              </option>
            );
          })}
        </select>
      </div>

      {canOpenAdminSettings && (
        <Link
          to={settingsPath}
          onClick={onNavigate}
          className="block rounded-md px-4 py-1.5 text-sm text-white transition-all duration-200 hover:bg-theme-action-menu-item-hover light:text-theme-text-primary"
        >
          {settingsLabel}
        </Link>
      )}
    </>
  );
}
