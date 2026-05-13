import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      document.body.style.backgroundColor = "#0B1220";
    } else {
      root.classList.remove("dark");
      document.body.style.backgroundColor = "#F9FAFB";
    }

    document.body.style.transition = "background-color 0.3s ease";
  }, [dark]);

  const toggle = () => {
    setDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}

// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [dark, setDark] = useState(true);

//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [dark]);

//   const toggle = () => setDark((prev) => !prev);

//   return (
//     <ThemeContext.Provider value={{ dark, toggle }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);

// // import { createContext, useContext, useState, useEffect } from "react";

// // const ThemeContext = createContext(null);

// // export function ThemeProvider({ children }) {
// //   const [dark, setDark] = useState(true);
// //   const toggle = () => setDark((d) => !d);

// //   // Apply dark/light class directly on <html> so CSS vars work globally
// //   useEffect(() => {
// //     document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
// //     document.body.style.backgroundColor = dark ? "#0B1220" : "#F9FAFB";
// //     document.body.style.transition = "background-color 0.3s";
// //   }, [dark]);

// //   return (
// //     <ThemeContext.Provider value={{ dark, toggle }}>
// //       {children}
// //     </ThemeContext.Provider>
// //   );
// // }

// // export function useTheme() {
// //   const ctx = useContext(ThemeContext);
// //   if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
// //   return ctx;
// // }