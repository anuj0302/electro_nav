import { Zap, CheckCircle, Loader2 } from "lucide-react";

export default function ConfirmButton({
  onClick,
  confirmed,
  submitting,
}) {
  return (
    <button
      disabled={confirmed || submitting}
      onClick={onClick}
      className={`
        relative overflow-hidden 
        w-full h-[54px]
        rounded-2xl
        flex items-center justify-center gap-2
        text-[15px] font-bold font-['Syne',sans-serif]
        transition-all duration-300
        ${
          confirmed
            ? `
              bg-gradient-to-r
              from-[#22C55E]
              to-[#16A34A]
              text-white
              shadow-[0_10px_35px_rgba(34,197,94,0.35)]
            `
            : submitting
              ? `
                bg-[#22C55E]/70
                text-white
                cursor-not-allowed
              `
              : `
                bg-[#22C55E]
                hover:bg-[#16A34A]
                text-white
                hover:-translate-y-[2px]
                shadow-[0_10px_35px_rgba(34,197,94,0.28)]
              `
        }
      `}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-white/[0.12] to-transparent pointer-events-none" />

      {confirmed ? (
        <>
          <CheckCircle size={18} />
          Booking Confirmed
        </>
      ) : submitting ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />
          Processing...
        </>
      ) : (
        <>
          <Zap
            size={18}
            fill="currentColor"
          />
          Confirm Booking
        </>
      )}
    </button>
  );
}