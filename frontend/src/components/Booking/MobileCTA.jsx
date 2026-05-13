import ConfirmButton from "./ConfirmButton";

export default function MobileCTA({
  estimates,
  slot,
  confirmed,
  submitting,
  onConfirm,
}) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl bg-white/92 dark:bg-[#0B1220]/92 border-t border-gray-200 dark:border-white/[0.06]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10.5px] text-gray-500 dark:text-[#9CA3AF]">
            Slot
          </p>

          <p className="text-[13px] font-bold text-[#22C55E]">
            {slot?.time || "Not Selected"}
          </p>

          <p className="text-[10px] text-gray-400 dark:text-[#6B7280]">
            {slot?.date || "Choose Date"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10.5px] text-gray-500 dark:text-[#9CA3AF]">
            Est. Total
          </p>

          <p className="text-[20px] font-extrabold text-[#111827] dark:text-[#F9FAFB]">
            ₹{estimates?.cost || 0}
          </p>
        </div>
      </div>

      <ConfirmButton
        onClick={onConfirm}
        confirmed={confirmed}
        submitting={submitting}
      />
    </div>
  );
} 