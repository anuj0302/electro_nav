import { useTheme } from "../../context/ThemeContext";

export default function PricingCard({ station, charger }) {
  const { dark } = useTheme();

  const price = charger?.pricePerUnit || station?.pricePerUnit || 18;

  const available = charger?.slotsAvail ?? station?.availableSlots ?? 0;

  const total = charger?.slotsTotal ?? station?.totalSlots ?? 0;

  const chargerType = charger?.type || "Fast Charger";

  const estimatedDuration = charger?.chargeTime || "45 mins";

  const energyNeeded = Math.max(12, Math.round((charger?.power || 24) * 0.5));

  const estimatedCost = Math.round(price * energyNeeded);

  return (
    <div
      className={`
        relative overflow-hidden

        rounded-[24px]
        p-[20px]
        mb-4

        border
        transition-all duration-300

        ${
          dark
            ? `
              bg-[#091225]
              border-white/[0.07]
            `
            : `
              bg-white
              border-gray-200
              shadow-[0_4px_20px_rgba(15,23,42,0.06)]
            `
        }
      `}
    >
      <div
        className="
          absolute top-0 left-0 right-0 h-px
          bg-gradient-to-r
          from-transparent
          via-[#22C55E]/40
          to-transparent
        "
      />

      <h3
        className={`
          text-[16px]
          font-bold
          mb-4

          ${dark ? "text-white" : "text-[#111827]"}
        `}
      >
        Pricing & Summary
      </h3>

      <div
        className={`
          text-center
          py-5
          mb-2
          border-b

          ${dark ? "border-white/[0.07]" : "border-gray-100"}
        `}
      >
        <p
          className="
            text-[42px]
            font-black
            text-[#22C55E]
            leading-none
          "
        >
          ₹{price}
          <span
            className={`
              text-[16px]
              font-medium

              ${dark ? "text-[#9CA3AF]" : "text-gray-500"}
            `}
          >
            /kWh
          </span>
        </p>

        <p
          className={`
            text-[13px]
            mt-2

            ${dark ? "text-[#9CA3AF]" : "text-gray-500"}
          `}
        >
          {chargerType}
        </p>
      </div>

      {[
        {
          label: "Session Type",
          value: chargerType,
        },

        {
          label: "Estimated Duration",
          value: estimatedDuration,
        },

        {
          label: "Energy Needed",
          value: `${energyNeeded} kWh`,
        },

        {
          label: "Slots Available",
          value: `${available} / ${total} free`,
          accent: true,
        },
      ].map(({ label, value, accent }) => (
        <div
          key={label}
          className={`
              flex items-center justify-between
              py-3
              border-b

              ${dark ? "border-white/[0.07]" : "border-gray-100"}
            `}
        >
          <span
            className={`
                text-[13px]

                ${dark ? "text-[#9CA3AF]" : "text-gray-500"}
              `}
          >
            {label}
          </span>

          <span
            className={`
                text-[14px]
                font-bold

                ${
                  accent
                    ? "text-[#22C55E]"
                    : dark
                      ? "text-white"
                      : "text-[#111827]"
                }
              `}
          >
            {value}
          </span>
        </div>
      ))}

      <div className="flex items-center justify-between pt-5">
        <span
          className={`
            text-[15px]
            font-bold

            ${dark ? "text-white" : "text-[#111827]"}
          `}
        >
          Est. Total Cost
        </span>

        <span
          className="
            text-[24px]
            font-black
            text-[#22C55E]
          "
        >
          ₹{estimatedCost}
        </span>
      </div>

      <p
        className={`
          text-[11px]
          mt-3
          leading-relaxed

          ${dark ? "text-[#9CA3AF]" : "text-gray-500"}
        `}
      >
        * Estimate based on {energyNeeded} kWh at ₹{price}/kWh.
      </p>
    </div>
  );
}
