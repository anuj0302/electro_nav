import { Zap } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

export default function ChargerCard({ charger, selected, onSelect }) {
  const { dark } = useTheme();

  const {
    type,
    power,
    unit = "kW",
    connector,
    chargeTime,
    slotsAvail = 0,
    slotsTotal = 0,
    colorClass = "text-[#22C55E]",
    bgClass = "bg-[#22C55E]/10",
  } = charger || {};

  const slotColor =
    slotsAvail === 0
      ? "text-[#EF4444]"
      : slotsAvail <= 1
        ? "text-[#F59E0B]"
        : "text-[#22C55E]";

  const isDisabled = slotsAvail === 0;

  const handleSelect = () => {
    if (!isDisabled) {
      onSelect?.(charger);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      disabled={isDisabled}
      className={`
        relative overflow-hidden

        w-full
        text-left

        rounded-[22px]
        p-[15px]

        border

        transition-all duration-300

        ${
          selected
            ? `
              border-[#22C55E]/40
              bg-[#22C55E]/10
              shadow-[0_0_0_1px_rgba(34,197,94,0.18)]
              scale-[1.01]
            `
            : dark
              ? `
              bg-[#091225]
              border-white/[0.06]
              hover:border-[#22C55E]/20
            `
              : `
              bg-white
              border-gray-200
              hover:border-[#22C55E]/25
              shadow-[0_4px_20px_rgba(15,23,42,0.05)]
            `
        }

        ${
          isDisabled
            ? `
              opacity-60
              cursor-not-allowed
            `
            : `
              cursor-pointer
            `
        }
      `}
    >
      {selected && (
        <div
          className="
            absolute top-0 left-0 right-0 h-px
            bg-gradient-to-r
            from-transparent
            via-[#22C55E]
            to-transparent
          "
        />
      )}

      <div
        className={`
          w-[44px]
          h-[44px]

          rounded-2xl

          flex items-center justify-center

          mb-3

          ${bgClass}
          ${colorClass}
        `}
      >
        <Zap size={22} fill="currentColor" />
      </div>

      <p
        className={`
          text-[14px]
          font-bold
          leading-tight
          mb-1

          ${dark ? "text-[#F9FAFB]" : "text-[#111827]"}
        `}
      >
        {type}
      </p>

      <p
        className={`
          text-[24px]
          font-black
          leading-none
          mb-2

          ${colorClass}
        `}
      >
        {power}

        <span
          className={`
            text-[12px]
            font-medium
            ml-1

            ${dark ? "text-[#9CA3AF]" : "text-gray-500"}
          `}
        >
          {unit}
        </span>
      </p>

      <div
        className={`
          text-[11px]
          flex flex-col gap-[4px]
          mb-3

          ${dark ? "text-[#9CA3AF]" : "text-gray-500"}
        `}
      >
        <span>{connector} Connector</span>

        <span>{chargeTime} full charge</span>
      </div>

      <div
        className={`
          flex items-center justify-between
          pt-2.5
          border-t

          ${dark ? "border-white/[0.06]" : "border-gray-100"}
        `}
      >
        <span
          className={`
            text-[11px]

            ${dark ? "text-[#9CA3AF]" : "text-gray-500"}
          `}
        >
          Slots
        </span>

        <span
          className={`
            text-[11px]
            font-bold

            ${slotColor}
          `}
        >
          {slotsAvail} / {slotsTotal} free
        </span>
      </div>

      {isDisabled && (
        <div
          className="
            absolute top-3 right-3

            px-2 py-1

            rounded-full

            text-[9px]
            font-bold

            bg-[#EF4444]/10
            text-[#EF4444]
            border border-[#EF4444]/20
          "
        >
          FULL
        </div>
      )}
    </button>
  );
}
