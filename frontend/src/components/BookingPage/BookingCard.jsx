import {
  MapPin,
  CalendarDays,
  Clock3,
  Zap,
  ChevronRight,
  CheckCircle2,
  TimerReset,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

const STATUS_STYLES = {
  confirmed: {
    icon: TimerReset,
    text: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
    border: "border-[#F59E0B]/20",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    label: "Upcoming",
  },

  charging: {
    icon: Zap,
    text: "text-[#38BDF8]",
    bg: "bg-[#38BDF8]/10",
    border: "border-[#38BDF8]/20",
    glow: "shadow-[0_0_24px_rgba(56,189,248,0.16)]",
    label: "Charging",
  },

  completed: {
    icon: CheckCircle2,
    text: "text-[#22C55E]",
    bg: "bg-[#22C55E]/10",
    border: "border-[#22C55E]/20",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.12)]",
    label: "Completed",
  },

  cancelled: {
    icon: XCircle,
    text: "text-[#EF4444]",
    bg: "bg-[#EF4444]/10",
    border: "border-[#EF4444]/20",
    glow: "shadow-[0_0_18px_rgba(239,68,68,0.12)]",
    label: "Cancelled",
  },
};

export default function BookingCard({
  booking,
  onClick,
}) {
  const navigate = useNavigate();

  const { dark } = useTheme();

  const {
    _id,
    stationId,
    slotDate,
    slotTime,
    chargerType,
    estimatedCost,
    bookingStatus,
  } = booking || {};

  const stationName = stationId?.name || "EV Station";

  const address = stationId?.address || "";

  const status = bookingStatus?.toLowerCase() || "confirmed";

  const style = STATUS_STYLES[status] || STATUS_STYLES.confirmed;

  const StatusIcon = style.icon;

  const handleViewDetails = (e) => {
    e.stopPropagation();

    navigate(`/bookings/${_id}`);
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden
        rounded-[28px]
        border
        backdrop-blur-xl
        p-4 md:p-5
        mb-4
        cursor-pointer
        transition-all duration-300
        hover:-translate-y-[3px]
        hover:border-[#22C55E]/30
        group
        ${style.glow}
        ${
          dark
            ? `
              border-white/[0.06]
              bg-[#111827]/85
              hover:bg-[#151D2B]
            `
            : `
              border-gray-200
              bg-white
              hover:shadow-[0_10px_40px_rgba(15,23,42,0.08)]
            `
        }
      `}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22C55E]/40 to-transparent" />

      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] flex-shrink-0">
            <Zap
              size={24}
              fill="currentColor"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2
              className={`
                text-[16px] md:text-[17px]
                font-bold
                font-['Syne',sans-serif]
                truncate
                ${
                  dark
                    ? "text-[#F9FAFB]"
                    : "text-[#111827]"
                }
              `}
            >
              {stationName}
            </h2>

            <p className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF] mt-1 line-clamp-1">
              <MapPin
                size={12}
                className="text-[#22C55E]"
              />

              {address}
            </p>
          </div>
        </div>

        <div
          className={`
            flex items-center gap-1.5
            px-3 py-[6px]
            rounded-full
            border
            text-[10px]
            font-bold
            uppercase
            tracking-[0.6px]
            whitespace-nowrap
            ${style.text}
            ${style.bg}
            ${style.border}
          `}
        >
          <StatusIcon size={11} />

          {style.label}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {[
          {
            label: "Date",
            value: slotDate,
            Icon: CalendarDays,
          },

          {
            label: "Time",
            value: slotTime,
            Icon: Clock3,
          },

          {
            label: "Cost",
            value: `₹${estimatedCost || 0}`,
            Icon: Zap,
          },
        ].map(({
          label,
          value,
          Icon,
        }) => (
          <div
            key={label}
            className={`
              rounded-2xl
              p-3
              border
              transition-all duration-200
              group-hover:border-[#22C55E]/15
              ${
                dark
                  ? `
                    bg-[#1F2937]
                    border-white/[0.06]
                  `
                  : `
                    bg-[#F8FAFC]
                    border-gray-200
                  `
              }
            `}
          >
            <Icon
              size={14}
              className="text-[#22C55E] mb-2"
            />

            <p
              className={`
                text-[13px] md:text-[14px]
                font-bold
                font-['Syne',sans-serif]
                leading-none
                ${
                  dark
                    ? "text-[#F9FAFB]"
                    : "text-[#111827]"
                }
              `}
            >
              {value}
            </p>

            <p className="text-[10px] uppercase tracking-[0.5px] text-[#9CA3AF] mt-1.5">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div
        className={`
          flex items-center justify-between
          pt-3
          border-t
          ${
            dark
              ? "border-white/[0.06]"
              : "border-gray-200"
          }
        `}
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.5px] text-[#9CA3AF]">
            Charger
          </p>

          <p
            className={`
              text-[13px]
              font-semibold
              mt-[2px]
              ${
                dark
                  ? "text-[#F9FAFB]"
                  : "text-[#111827]"
              }
            `}
          >
            {chargerType}
          </p>
        </div>

        <button
          onClick={handleViewDetails}
          className="flex items-center gap-1.5 text-[#22C55E] text-[12.5px] font-bold hover:gap-2 transition-all duration-200"
        >
          View Details

          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}