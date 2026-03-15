import { createContext, useEffect, useState } from "react";
import LogoLight from "./media/logo/lovora-light.svg";
import LogoDark from "./media/logo/lovora-dark.svg";
import System from "./models/system";
import { useThemeContext } from "./ThemeContext";
export const LogoContext = createContext();

export function LogoProvider({ children }) {
  const { resolvedTheme = "dark" } = useThemeContext() ?? {};
  const defaultLogo = resolvedTheme === "light" ? LogoLight : LogoDark;
  const [logo, setLogo] = useState(defaultLogo);
  const [loginLogo, setLoginLogo] = useState(defaultLogo);
  const [isCustomLogo, setIsCustomLogo] = useState(false);

  async function fetchInstanceLogo() {
    // Apply the theme-correct default immediately while checking for a custom logo.
    setLogo(defaultLogo);
    setLoginLogo(defaultLogo);
    setIsCustomLogo(false);
    try {
      const { isCustomLogo, logoURL } = await System.fetchLogo();
      if (isCustomLogo && logoURL) {
        setLogo(logoURL);
        setLoginLogo(logoURL);
        setIsCustomLogo(true);
      }
    } catch (err) {
      console.error("Failed to fetch logo:", err);
    }
  }

  useEffect(() => {
    if (!isCustomLogo) {
      setLogo(defaultLogo);
      setLoginLogo(defaultLogo);
    }
  }, [defaultLogo, isCustomLogo]);

  useEffect(() => {
    fetchInstanceLogo();
  }, [defaultLogo]);

  return (
    <LogoContext.Provider value={{ logo, setLogo, loginLogo, isCustomLogo }}>
      {children}
    </LogoContext.Provider>
  );
}
