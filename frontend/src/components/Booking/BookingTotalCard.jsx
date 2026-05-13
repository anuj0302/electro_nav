import { GlassCard } from "./BookingSummaryCard";

const RATE_PER_KWH = 14;

export default function BookingTotalCard({
  estimates = {},
}) {
  const rows = [
    {
      label: "Charging rate",
      value: `₹${RATE_PER_KWH}/kWh`,
    }, 

    {
      label: "Energy needed",
      value: `${estimates?.energy || 0} kWh`,
    },

    {
      label: "Duration",
      value: `~${estimates?.mins || 0} min`,
    },
  ];

  return (
    <GlassCard>
      <h3 className="text-[15px] font-bold font-['Syne',sans-serif] text-[#111827] dark:text-[#F9FAFB] mb-3">
        Booking Total
      </h3>

      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between py-[10px] border-b border-gray-200 dark:border-white/[0.08]"
        >
          <span className="text-[12.5px] text-gray-500 dark:text-[#9CA3AF]">
            {row.label}
          </span>

          <span className="text-[13px] font-bold text-[#111827] dark:text-[#F9FAFB]">
            {row.value}
          </span>
        </div>
      ))}

      <div className="flex items-center justify-between pt-4">
        <span className="text-[14px] font-bold text-[#111827] dark:text-[#F9FAFB]">
          Estimated Total
        </span>

        <span className="text-[22px] font-extrabold text-[#22C55E]">
          ₹{estimates?.cost || 0}
        </span>
      </div>
    </GlassCard>
  );
}