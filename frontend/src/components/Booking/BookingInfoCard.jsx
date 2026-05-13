import { FileText, CheckCircle } from "lucide-react";
import { GlassCard, CardTitle } from "./BookingSummaryCard";

const MAX_NOTES = 300;

export default function BookingInfoCard({
  notes = "",
  onNotesChange,
}) {
  return (
    <>
      <GlassCard>
        <CardTitle
          icon={FileText}
          iconBg="bg-[#818CF8]/10"
          iconColor="text-[#818CF8]"
        > 
          Notes
        </CardTitle>

        <textarea
          value={notes}
          onChange={(e) =>
            onNotesChange?.(e.target.value.slice(0, MAX_NOTES))
          }
          placeholder="Any special requests?"
          rows={3}
          className="
            w-full resize-none
            bg-[#F8FAFC] dark:bg-[#162338]
            border border-gray-200 dark:border-white/[0.08]
            rounded-[14px]
            px-[13px] py-[11px]
            text-[13px]
            text-[#111827] dark:text-[#F9FAFB]
            placeholder:text-gray-400 dark:placeholder:text-[#9CA3AF]/55
            outline-none
            focus:border-[#22C55E]/40
            focus:ring-4 focus:ring-[#22C55E]/10
            transition-all duration-200
          "
        />

        <p className="text-[10.5px] text-[#9CA3AF] mt-1.5 text-right">
          {notes.length}/{MAX_NOTES}
        </p>
      </GlassCard>

      <div className="flex items-start gap-[10px] rounded-2xl p-[12px] mb-[14px] bg-[#22C55E]/[0.06] border border-[#22C55E]/20">
        <div className="w-8 h-8 rounded-full bg-[#22C55E]/12 flex items-center justify-center">
          <CheckCircle
            size={17}
            className="text-[#22C55E]"
          />
        </div>

        <p className="text-[12px] text-[#9CA3AF] leading-relaxed">
          <b className="text-[#22C55E]">
            No payment required for demo.
          </b>
        </p>
      </div>
    </>
  );
}