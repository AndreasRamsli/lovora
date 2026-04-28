import { useState, useRef, useEffect, useMemo } from "react";
import { SlidersHorizontal } from "@phosphor-icons/react";
import { useLanguageOptions } from "@/hooks/useLanguageOptions";
import useLoginMode from "@/hooks/useLoginMode";
import useUser from "@/hooks/useUser";
import { useThemeContext } from "@/ThemeContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import paths from "@/utils/paths";

function getTextSizes(t) {
  return [
    { key: "small", label: t("chat_window.small"), textClass: "text-xs" },
    { key: "normal", label: t("chat_window.normal"), textClass: "text-sm" },
    { key: "large", label: t("chat_window.large"), textClass: "text-base" },
  ];
}

export default function TextSizeMenu() {
  const { t } = useTranslation();
  const TEXT_SIZES = useMemo(() => getTextSizes(t), [t]);
  const mode = useLoginMode();
  const { user } = useUser();
  const { theme, setTheme, availableThemes } = useThemeContext();
  const {
    currentLanguage,
    supportedLanguages,
    getLanguageName,
    changeLanguage,
  } = useLanguageOptions();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    window.localStorage.getItem("anythingllm_text_size") || "normal"
  );
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!showMenu) return;
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  function handleTextSizeChange(size) {
    setSelectedSize(size);
    window.localStorage.setItem("anythingllm_text_size", size);
    window.dispatchEvent(new CustomEvent("textSizeChange", { detail: size }));
  }

  // User icon is visible when login mode is active (single with password or multi-user)
  const hasUserIcon = mode !== null;
  const canOpenAdminSettings = !user || user?.role !== "default";

  return (
    <div
      className={`absolute top-3 md:top-5 z-30 ${hasUserIcon ? "right-[55px] md:right-[67px]" : "right-4 md:right-6"}`}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className={`group border-none cursor-pointer flex items-center justify-center w-[35px] h-[35px] rounded-full transition-all ${showMenu ? "bg-zinc-700 light:bg-divine-pleasure" : "ui-btn-ghost"}`}
      >
        <SlidersHorizontal
          size={18}
          className={
            showMenu
              ? "text-white light:text-infinite-night"
              : "text-doctor/75 light:text-infinite-night/55 group-hover:text-white light:group-hover:text-slate-800"
          }
        />
      </button>

      {showMenu && (
        <div
          ref={menuRef}
          className="absolute right-0 top-[42px] bg-zinc-800 light:bg-white border border-zinc-700 light:border-slate-300 rounded-lg p-3 w-[282px] flex flex-col gap-1 shadow-lg"
        >
          <p className="text-[10px] font-medium text-doctor/55 light:text-infinite-night/55 px-2 mb-0.5">
            {t("chat_window.text_size_label")}
          </p>
          {TEXT_SIZES.map(({ key, label, textClass }) => (
            <div
              key={key}
              onClick={() => handleTextSizeChange(key)}
              className={`flex items-center px-2 py-1 rounded cursor-pointer ${
                selectedSize === key
                  ? "bg-zinc-700 light:bg-divine-pleasure"
                  : "hover:bg-zinc-700/50 light:hover:bg-slate-100"
              }`}
            >
              <span className={`${textClass} text-white light:text-slate-900`}>
                {label}
              </span>
            </div>
          ))}
          <div className="my-1 h-px bg-white/10 light:bg-slate-200" />
          <p className="text-[10px] font-medium text-doctor/55 light:text-infinite-night/55 px-2 mb-0.5">
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
                      : "text-white/70 hover:bg-zinc-700/50 light:text-theme-text-secondary light:hover:bg-slate-100"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
          <label
            htmlFor="top-right-language"
            className="text-[10px] font-medium text-doctor/55 light:text-infinite-night/55 px-2 mb-0.5 mt-2"
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
          {canOpenAdminSettings && (
            <>
              <div className="my-1 h-px bg-white/10 light:bg-slate-200" />
              <Link
                to={paths.settings.interface()}
                onClick={() => setShowMenu(false)}
                className="flex items-center px-2 py-1 rounded cursor-pointer text-sm text-white hover:bg-zinc-700/50 light:text-slate-900 light:hover:bg-slate-100"
              >
                {t("profile_settings.settings", "Settings")}
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
