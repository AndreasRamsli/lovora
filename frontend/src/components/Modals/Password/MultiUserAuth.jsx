import React, { useEffect, useState } from "react";
import System from "../../../models/system";
import { AUTH_TOKEN, AUTH_USER } from "../../../utils/constants";
import paths from "../../../utils/paths";
import showToast from "@/utils/toast";
import { betterAuthClient } from "@/lib/betterAuthClient";
import AuthBridge from "@/models/authBridge";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

function isEmailAddress(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

const RecoveryForm = ({ onSubmit, setShowRecoveryForm }) => {
  const [username, setUsername] = useState("");
  const [recoveryCodeInputs, setRecoveryCodeInputs] = useState(
    Array(2).fill("")
  );

  const handleRecoveryCodeChange = (index, value) => {
    const updatedCodes = [...recoveryCodeInputs];
    updatedCodes[index] = value;
    setRecoveryCodeInputs(updatedCodes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recoveryCodes = recoveryCodeInputs.filter(
      (code) => code.trim() !== ""
    );
    onSubmit(username, recoveryCodes);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center"
    >
      <div className="flex items-start justify-between pt-7 pb-9">
        <div className="flex items-center flex-col gap-y-[18px] max-w-[300px]">
          <div className="flex gap-x-1">
            <h3 className="text-white light:text-infinite-night text-3xl leading-[28px] font-medium text-center white-space-nowrap block">
              {t("login.password-reset.title")}
            </h3>
          </div>
          <p className="text-doctor/55 light:text-infinite-night/55 text-sm text-center">
            {t("login.password-reset.description")}
          </p>
        </div>
      </div>
      <div className="w-full px-12">
        <div className="w-full flex flex-col gap-y-3">
          <div className="w-full flex flex-col gap-y-2">
            <label className="text-doctor/75 light:text-infinite-night text-sm">
              {t("login.multi-user.placeholder-username")}
            </label>
            <input
              name="username"
              type="text"
              className="border-none bg-zinc-800 light:bg-divine-pleasure text-zinc-200 light:text-infinite-night/55 text-sm rounded-lg p-2.5 w-[300px] h-[34px] focus:outline-none focus:ring-1 focus:ring-sky-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <label className="text-doctor/75 light:text-infinite-night text-sm">
              {t("login.password-reset.recovery-codes")}
            </label>
            {recoveryCodeInputs.map((code, index) => (
              <input
                key={index}
                type="text"
                name={`recoveryCode${index + 1}`}
                className="border-none bg-zinc-800 light:bg-divine-pleasure text-zinc-200 light:text-infinite-night/55 text-sm rounded-lg p-2.5 w-[300px] h-[34px] focus:outline-none focus:ring-1 focus:ring-sky-300"
                value={code}
                onChange={(e) =>
                  handleRecoveryCodeChange(index, e.target.value)
                }
                required
                autoComplete="off"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center px-12 mt-9 space-x-2 w-full flex-col gap-y-6">
        <button
          type="submit"
          className="text-zinc-950 bg-white hover:bg-zinc-300 light:bg-burnt-earth/20 light:text-infinite-night light:hover:bg-burnt-earth/20 text-sm font-semibold rounded-lg border-primary-button h-[34px] w-full"
        >
          {t("login.password-reset.title")}
        </button>
        <button
          type="button"
          className="text-zinc-200 light:text-infinite-night/55 hover:text-sky-300 light:hover:text-burnt-earth hover:underline text-sm flex gap-x-1"
          onClick={() => setShowRecoveryForm(false)}
        >
          {t("login.password-reset.back-to-login")}
        </button>
      </div>
    </form>
  );
};

const ResetPasswordForm = ({ onSubmit }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newPassword, confirmPassword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center"
    >
      <div className="flex items-start justify-between pt-7 pb-9">
        <div className="flex items-center flex-col gap-y-[18px] max-w-[300px]">
          <div className="flex gap-x-1">
            <h3 className="text-white light:text-infinite-night text-[38px] leading-[28px] font-medium text-center white-space-nowrap block">
              Reset Password
            </h3>
          </div>
          <p className="text-doctor/55 light:text-infinite-night/55 text-sm text-center">
            Enter your new password.
          </p>
        </div>
      </div>
      <div className="w-full px-12">
        <div className="w-full flex flex-col gap-y-3">
          <div className="w-full flex flex-col gap-y-2">
            <label className="text-doctor/75 light:text-infinite-night text-sm">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              className="border-none bg-zinc-800 light:bg-divine-pleasure text-zinc-200 light:text-infinite-night/55 text-sm rounded-lg p-2.5 w-[300px] h-[34px] focus:outline-none focus:ring-1 focus:ring-sky-300"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <label className="text-doctor/75 light:text-infinite-night text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="border-none bg-zinc-800 light:bg-divine-pleasure text-zinc-200 light:text-infinite-night/55 text-sm rounded-lg p-2.5 w-[300px] h-[34px] focus:outline-none focus:ring-1 focus:ring-sky-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex items-center px-12 mt-9 space-x-2 w-full flex-col gap-y-6">
        <button
          type="submit"
          className="text-zinc-950 bg-white hover:bg-zinc-300 light:bg-burnt-earth/20 light:text-infinite-night light:hover:bg-burnt-earth/20 text-sm font-semibold rounded-lg border-primary-button h-[34px] w-full"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default function MultiUserAuth() {
  const { t } = useTranslation();
  const [view, setView] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [customAppName, setCustomAppName] = useState(null);

  const persistSessionAndRedirect = (user) => {
    window.localStorage.setItem(AUTH_USER, JSON.stringify(user));
    window.localStorage.removeItem(AUTH_TOKEN);
    window.location = paths.home();
  };

  const getBetterAuthSessionUser = async () => {
    const session = await AuthBridge.session();
    if (session?.valid && session?.user) {
      return session.user;
    }
    throw new Error(
      session?.message || "Could not establish an authenticated session."
    );
  };

  const handleLogin = async (e) => {
    setError(null);
    e.preventDefault();
    setLoading(true);
    const data = {};
    const form = new FormData(e.target);
    for (const [key, value] of form.entries()) data[key] = value;

    try {
      const identifier = String(data.username || "").trim();
      const email = identifier.toLowerCase();
      const password = String(data.password || "");

      if (view === "signup") {
        if (!isEmailAddress(identifier)) {
          throw new Error(
            "Account creation currently requires an email address."
          );
        }

        const { error: signUpError } = await betterAuthClient.signUp.email({
          name: email,
          email,
          password,
        });
        if (signUpError) throw new Error(signUpError.message);
        const sessionUser = await getBetterAuthSessionUser();
        persistSessionAndRedirect(sessionUser);
        return;
      }

      if (isEmailAddress(identifier)) {
        const { error: signInError } = await betterAuthClient.signIn.email({
          email,
          password,
        });
        if (signInError) {
          throw new Error(signInError.message || "Sign in failed.");
        }
      } else {
        const legacyLogin = await AuthBridge.legacyLogin({
          username: identifier,
          password,
        });

        if (!legacyLogin.valid) {
          throw new Error(legacyLogin.message || "Sign in failed.");
        }
      }

      const sessionUser = await getBetterAuthSessionUser();
      persistSessionAndRedirect(sessionUser);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = () => setShowRecoveryForm(true);
  const handleRecoverySubmit = async (username, recoveryCodes) => {
    const { success, resetToken, error } = await System.recoverAccount(
      username,
      recoveryCodes
    );

    if (success && resetToken) {
      window.localStorage.setItem("resetToken", resetToken);
      setShowRecoveryForm(false);
      setShowResetPasswordForm(true);
    } else {
      showToast(error, "error", { clear: true });
    }
  };

  const handleResetSubmit = async (newPassword, confirmPassword) => {
    const resetToken = window.localStorage.getItem("resetToken");

    if (resetToken) {
      const { success, error } = await System.resetPassword(
        resetToken,
        newPassword,
        confirmPassword
      );

      if (success) {
        window.localStorage.removeItem("resetToken");
        setShowResetPasswordForm(false);
        showToast("Password reset successful", "success", { clear: true });
      } else {
        showToast(error, "error", { clear: true });
      }
    } else {
      showToast("Invalid reset token", "error", { clear: true });
    }
  };

  useEffect(() => {
    const fetchCustomAppName = async () => {
      const { appName } = await System.fetchCustomAppName();
      setCustomAppName(appName || "");
      setLoading(false);
    };
    fetchCustomAppName();
  }, []);

  if (showRecoveryForm) {
    return (
      <RecoveryForm
        onSubmit={handleRecoverySubmit}
        setShowRecoveryForm={setShowRecoveryForm}
      />
    );
  }

  if (showResetPasswordForm)
    return <ResetPasswordForm onSubmit={handleResetSubmit} />;
  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col justify-center items-center"
    >
      <div className="flex items-start justify-between pt-7 pb-9">
        <div className="flex items-center flex-col gap-y-[18px] max-w-[300px]">
          <div className="flex gap-x-1">
            <h3 className="text-white light:text-infinite-night text-[38px] leading-[28px] font-medium text-center white-space-nowrap block">
              {t("login.multi-user.welcome")}
            </h3>
          </div>
          <p className="text-doctor/55 light:text-infinite-night/55 text-sm text-center">
            {view === "signup"
              ? "Create your account to continue."
              : t("login.sign-in", { appName: customAppName || "Lovora" })}
          </p>
        </div>
      </div>
      <div className="w-full px-12">
        <div className="w-full flex flex-col gap-y-3">
          <div className="w-full flex flex-col gap-y-2">
            <label className="text-doctor/75 light:text-infinite-night text-sm">
              {t("login.multi-user.placeholder-username")}
            </label>
            <input
              name="username"
              type="text"
              className="border-none bg-zinc-800 light:bg-divine-pleasure text-zinc-200 light:text-infinite-night/55 text-sm rounded-lg p-2.5 w-[300px] h-[34px] focus:outline-none focus:ring-1 focus:ring-sky-300"
              required={true}
              autoComplete="off"
            />
          </div>
          <div className="w-full px-0 flex flex-col gap-y-2">
            <label className="text-doctor/75 light:text-infinite-night text-sm">
              {t("login.multi-user.placeholder-password")}
            </label>
            <input
              name="password"
              type="password"
              className="border-none bg-zinc-800 light:bg-divine-pleasure text-zinc-200 light:text-infinite-night/55 text-sm rounded-lg p-2.5 w-[300px] h-[34px] focus:outline-none focus:ring-1 focus:ring-sky-300"
              required={true}
              autoComplete="off"
            />
          </div>
          {error && <p className="text-red-400 text-sm">Error: {error}</p>}
        </div>
      </div>
      <div className="flex items-center px-12 mt-9 space-x-2 w-full flex-col gap-y-6">
        <button
          disabled={loading}
          type="submit"
          className="text-zinc-950 bg-white hover:bg-zinc-300 light:bg-burnt-earth/20 light:text-infinite-night light:hover:bg-burnt-earth/20 text-sm font-semibold rounded-lg border-primary-button h-[34px] w-full"
        >
          {loading
            ? t("login.multi-user.validating")
            : view === "signup"
              ? "Create account"
              : t("login.multi-user.login")}
        </button>
        {view === "login" && (
          <button
            type="button"
            className="text-zinc-200 light:text-infinite-night/55 hover:text-sky-300 light:hover:text-burnt-earth hover:underline text-sm flex gap-x-1"
            onClick={handleResetPassword}
          >
            {t("login.multi-user.forgot-pass")}?
            <b className="font-semibold text-sky-300 light:text-burnt-earth">
              {t("login.multi-user.reset")}
            </b>
          </button>
        )}
        <button
          type="button"
          className="text-zinc-200 light:text-infinite-night/55 hover:text-sky-300 light:hover:text-burnt-earth hover:underline text-sm"
          onClick={() => {
            setError(null);
            setView((current) => (current === "login" ? "signup" : "login"));
          }}
        >
          {view === "signup"
            ? "Already have an account? Sign in"
            : "New here? Create an account"}
        </button>
      </div>
    </form>
  );
}
