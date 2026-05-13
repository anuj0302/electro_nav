import { Moon, Sun } from "lucide-react";

import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle Theme"
      className={`
        fixed top-5 right-5 z-50
        flex items-center gap-2
        rounded-full border
        px-4 py-2
        text-sm font-medium
        transition-all duration-200
        hover:scale-[1.03]
        active:scale-95
        ${
          dark
            ? `
              border-gray-700
              bg-[#111827]
              text-white
              hover:border-green-500
            `
            : `
              border-gray-300
              bg-white
              text-gray-800
              hover:border-green-500
            `
        }
      `}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}

      <span>
        {dark ? "Light" : "Dark"}
      </span>
    </button>
  );
}

// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "../../context/ThemeContext";

// export default function ThemeToggle() {
//   const { dark, toggle } = useTheme();

//   return (
//     <button
//       onClick={toggle}
//       className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-full border border-gray-700 bg-[#111827] px-4 py-2 text-sm text-white transition hover:border-green-500 dark:bg-[#111827] dark:text-white"
//     >
//       {dark ? <Sun size={16} /> : <Moon size={16} />}
//       {dark ? "Light" : "Dark"}
//     </button>
//   );
// }

// // import { useTheme } from "../context/ThemeContext";

// // export default function ThemeToggle() {
// //   const { dark, toggle } = useTheme();

// //   return (
// //     <button
// //       onClick={toggle}
// //       aria-label="Toggle theme"
// //       className={`
// //         fixed top-4 right-4 z-50 flex items-center gap-2
// //         px-3 py-2 rounded-full border text-xs font-medium
// //         transition-all duration-200 hover:scale-[1.03] active:scale-95
// //         ${dark
// //           ? "bg-[#111827] border-[#374151] text-[#9CA3AF] hover:border-[#22C55E] hover:text-[#22C55E]"
// //           : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#16A34A] hover:text-[#16A34A]"
// //         }
// //       `}
// //     >
// //       {dark ? (
// //         <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //           <circle cx="12" cy="12" r="5" />
// //           <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
// //         </svg>
// //       ) : (
// //         <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //           <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
// //         </svg>
// //       )}
// //       {dark ? "Light" : "Dark"}
// //     </button>
// //   );
// // }