import { CheckCircle } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

export default function SuccessOverlay({
  visible,
  bookingId,
  onClose,
}) {
  const { dark } = useTheme();

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 bg-black/60 backdrop-blur-md">
      <div
        className={`
          w-full max-w-[420px]
          rounded-[30px] 
          p-7
          text-center
          border
          shadow-2xl
          ${
            dark
              ? "bg-[#111827] border-white/[0.08]"
              : "bg-white border-gray-200"
          }
        `}
      >
        <div className="w-[92px] h-[92px] rounded-full flex items-center justify-center bg-[#22C55E]/10 border border-[#22C55E]/20 mx-auto mb-5">
          <CheckCircle
            size={44}
            className="text-[#22C55E]"
          />
        </div>

        <h2 className="text-[26px] font-extrabold text-[#111827] dark:text-[#F9FAFB]">
          Booking Confirmed
        </h2>

        <p className="mt-2 text-[14px] text-gray-500 dark:text-[#9CA3AF]">
          Your charging slot has been reserved successfully.
        </p>

        <div className="mt-5 rounded-2xl py-4 px-4 bg-[#F8FAFC] dark:bg-[#1F2937] border border-gray-200 dark:border-white/[0.06]">
          <p className="text-[11px] uppercase tracking-[0.8px] text-gray-500 dark:text-[#9CA3AF]">
            Booking ID
          </p>

          <p className="mt-1 text-[18px] font-bold text-[#22C55E]">
            {bookingId}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-2xl py-3.5 font-semibold transition-all duration-200"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}