import { Clock, CheckCircle } from "lucide-react";

import { GlassCard, CardTitle } from "./BookingSummaryCard";

export default function SelectedSlotCard({
  slot = {},
}) {
  return (
    <GlassCard>
      <CardTitle
        icon={Clock}
        iconBg="bg-[#F59E0B]/10"
        iconColor="text-[#F59E0B]"
      >
        Time Slot
      </CardTitle>

      <div className="flex items-center justify-between bg-[#F8FAFC] dark:bg-[#1a2640] border border-gray-200 dark:border-white/[0.08] rounded-2xl px-4 py-[13px]">
        <div> 
          <p className="text-[21px] font-extrabold text-[#22C55E]">
            {slot?.time || "Not Selected"}
          </p>

          <p className="text-[11px] text-[#9CA3AF]">
            {slot?.date || "Choose Date"}
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold px-3 py-1 rounded-full bg-[#22C55E]/12 text-[#22C55E]">
          <CheckCircle size={11} />
          Confirmed
        </span>
      </div>
    </GlassCard>
  );
}