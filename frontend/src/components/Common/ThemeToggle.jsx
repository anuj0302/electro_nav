import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="
        relative w-10 h-10 rounded-full flex items-center justify-center bg-[#F9FAFB] dark:bg-[#111827] 
        border border-gray-300 dark:border-white/10 text-[#111827] dark:text-[#9CA3AF] hover:text-[#22C55E] hover:scale-105 active:scale-95 
        shadow-lg backdrop-blur-md transition-all duration-300
      "
    >
      <div
        className={`
    transition-transform duration-500
    ${dark ? "rotate-180" : "rotate-0"}
  `}
      >
        {dark ? <Sun size={17} /> : <Moon size={17} />}
      </div>
    </button> 
  );
}
