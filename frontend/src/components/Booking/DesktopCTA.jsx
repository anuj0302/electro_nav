import BookingTotalCard from "./BookingTotalCard";
import ConfirmButton from "./ConfirmButton";

export default function DesktopCTA({
  estimates,
  slot,
  confirmed,
  submitting,
  onConfirm,
}) {
  return (
    <div className="hidden lg:block sticky top-[92px] self-start">
      <BookingTotalCard estimates={estimates} />

      <div className="mt-4">
        <ConfirmButton
          onClick={onConfirm}
          confirmed={confirmed}
          submitting={submitting}
        />
      </div>

      <div className="mt-3 text-center rounded-2xl py-3 px-4 bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/[0.06] shadow-sm">
        <p className="text-[11px] text-gray-500 dark:text-[#9CA3AF]">
          Selected Slot
        </p>

        <p className="mt-1 text-[13px] font-bold text-[#22C55E]">
          {slot?.time || "Not Selected"}
          {" · "}
          {slot?.date || "Choose Date"}
        </p>
      </div>
    </div>
  );
}  