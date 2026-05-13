import { Zap, Clock3, BatteryCharging } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

const ITEMS = [
  {
    label: "Available",
    color: "bg-[#22C55E]",
    text: "text-[#22C55E]",
    icon: Zap,
  },

  {
    label: "Limited",
    color: "bg-[#F59E0B]",
    text: "text-[#F59E0B]",
    icon: Clock3,
  },

  {
    label: "Busy",
    color: "bg-[#EF4444]",
    text: "text-[#EF4444]",
    icon: BatteryCharging,
  },
];

export default function MapLegend() {
  const { dark } = useTheme();

  return (
    <div
      className={`
        absolute
        bottom-5
        left-4
        z-[500]
        rounded-2xl
        px-4 py-3
        backdrop-blur-xl
        border
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        ${
          dark
            ? `
              bg-[#111827]/92
              border-white/[0.07]
            `
            : `
              bg-white/92
              border-gray-200
            `
        }
      `}
    >
      <p
        className={`
          text-[11px]
          font-bold
          uppercase
          tracking-[0.6px]
          mb-3
          ${dark ? "text-[#F9FAFB]" : "text-[#111827]"}
        `}
      >
        Station Status
      </p>

      <div className="flex flex-col gap-2.5">
        {ITEMS.map(({ label, color, text, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-2"
          >
            <div
              className={`w-3 h-3 rounded-full ${color}`}
            />

            <Icon
              size={13}
              className={text}
            />

            <span
              className={`text-[11px] font-medium ${
                dark
                  ? "text-[#D1D5DB]"
                  : "text-gray-600"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}