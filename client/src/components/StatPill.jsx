import { useTheme } from "../context/ThemeContext";

export default function StatPill({ value, label }) {
  const { dark } = useTheme();

  return (
    <div
      className={`
        rounded-xl py-2.5 text-center border transition-all duration-300 hover:scale-[1.02]
        ${dark
          ? "bg-[#1F2937] border-[#374151]"
          : "bg-[#F3F4F6] border-[#E5E7EB]"
        }
      `}
    >
      <p className={`text-sm font-bold ${dark ? "text-[#22C55E]" : "text-[#16A34A]"}`}>
        {value}
      </p>
      <p className={`text-[10px] mt-0.5 ${dark ? "text-[#9CA3AF]" : "text-[#6B7280]"}`}>
        {label}
      </p>
    </div>
  );
}