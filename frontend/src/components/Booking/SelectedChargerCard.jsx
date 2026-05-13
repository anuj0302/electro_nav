import { Plug } from "lucide-react";

import { GlassCard, CardTitle } from "./BookingSummaryCard";

export default function SelectedChargerCard({
  charger = {},
}) {
  const cells = [
    {
      val: charger?.type || "N/A",
      label: "Type",
    },

    {
      val: `${charger?.power || 0} ${charger?.unit || "kW"}`,
      label: "Power",
    },

    {
      val: charger?.connector || "N/A",
      label: "Connector",
    },
  ];

  return (
    <GlassCard>
      <CardTitle
        icon={Plug}
        iconBg="bg-[#818CF8]/12"
        iconColor="text-[#818CF8]"
      >
        Selected Charger
      </CardTitle>

      <div className="grid grid-cols-3 gap-2">
        {cells.map((cell) => (
          <div
            key={cell.label}
            className="bg-[#F8FAFC] dark:bg-[#1a2640] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-3 text-center"
          >
            <p className="text-[18px] font-extrabold text-[#22C55E]">
              {cell.val}
            </p>

            <p className="text-[10px] text-[#9CA3AF] mt-1">
              {cell.label}
            </p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
} 