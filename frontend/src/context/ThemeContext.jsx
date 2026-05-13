import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeCtx =
  createContext();

export const useTheme = () =>
  useContext(ThemeCtx);

export function ThemeProvider({
  children,
}) {
  /* ---------------- DEFAULT THEME ---------------- */

  const getInitialTheme = () => {
    const savedTheme =
      localStorage.getItem(
        "theme"
      );

    /* default = LIGHT */

    if (!savedTheme) {
      return false;
    }

    return savedTheme === "dark";
  };

  const [dark, setDark] =
    useState(getInitialTheme);

  /* ---------------- APPLY THEME ---------------- */

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }
  }, [dark]);

  /* ---------------- TOGGLE ---------------- */

  const toggle = () => {
    setDark((prev) => !prev);
  };

  return (
    <ThemeCtx.Provider
      value={{ 
        dark,
        toggle,
      }}
    >
      {children}
    </ThemeCtx.Provider>
  );
} 