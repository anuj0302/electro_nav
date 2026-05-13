import { Zap, MapPin, Star, Navigation2 } from "lucide-react";

import AvailabilityBadge from "./AvailabilityBadge";

const TYPE_STYLES = {
  "DC Fast": "text-[#818CF8] bg-[#818CF8]/10 border-[#818CF8]/20",

  "DC 50kW": "text-[#818CF8] bg-[#818CF8]/10 border-[#818CF8]/20",

  "DC 100kW": "text-[#818CF8] bg-[#818CF8]/10 border-[#818CF8]/20",

  "AC 11kW": "text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/20",

  "AC 22kW": "text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/20",
};

const STATUS_STYLES = {
  available: {
    iconColor: "text-[#22C55E]",
    iconBg: "bg-[#22C55E]/10 border-[#22C55E]/20",
  },

  busy: {
    iconColor: "text-[#EF4444]",
    iconBg: "bg-[#EF4444]/10 border-[#EF4444]/20",
  },

  limited: {
    iconColor: "text-[#F59E0B]",
    iconBg: "bg-[#F59E0B]/10 border-[#F59E0B]/20",
  },
};

export default function StationCard({ station, onNavigate, onBook }) {
  const {
    name = "Unknown Station",

    address = "Unknown Address",

    distance,
    distanceKm,

    availableSlots = 0,

    totalSlots = 0,

    chargerTypes = [],

    pricePerKWh,
    pricePerUnit,

    status = "available",

    rating = 0,

    reviews = 0,

    waitTime = "N/A",
  } = station || {};

  const styles = STATUS_STYLES[status] || STATUS_STYLES.available;

  const isBusy = status === "busy" || availableSlots === 0;

  const formattedDistance =
    distance || (distanceKm ? `${distanceKm} km` : "N/A");

  const formattedPrice = pricePerKWh || pricePerUnit || 18;

  const reviewsCount = Array.isArray(reviews) ? reviews.length : reviews;

  return (
    <div
      className="
        group

        relative overflow-hidden

        rounded-[20px]
        p-4

        bg-white
        dark:bg-[#111827]

        border
        border-gray-100
        dark:border-white/[0.06]

        hover:shadow-[0_6px_28px_rgba(0,0,0,0.08)]
        dark:hover:shadow-[0_6px_28px_rgba(0,0,0,0.35)]

        hover:-translate-y-[2px]

        transition-all duration-200
      "
    >
      {/* Glow */}
      <div
        className="
          absolute top-0 left-0 right-0 h-px

          bg-gradient-to-r
          from-transparent
          via-[#22C55E]/30
          to-transparent
        "
      />

      {/* ───────── TOP ───────── */}
      <div
        className="
          flex items-start
          gap-3
          mb-3
        "
      >
        {/* Icon */}
        <div
          className={`
            w-[46px]
            h-[46px]

            flex-shrink-0

            rounded-[14px]

            border

            flex items-center justify-center

            ${styles.iconBg}
            ${styles.iconColor}
          `}
        >
          <Zap size={21} fill="currentColor" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name */}
          <p
            className="
              text-[14px]
              font-bold

              text-[#111827]
              dark:text-[#F9FAFB]

              leading-tight

              truncate
            "
          >
            {name}
          </p>

          {/* Address */}
          <p
            className="
              text-[11px]

              text-gray-400
              dark:text-[#6B7280]

              mt-[2px]

              leading-tight

              line-clamp-1
            "
          >
            {address}
          </p>

          {/* Meta */}
          <div
            className="
              flex items-center
              gap-3

              mt-1.5

              text-[11.5px]

              text-gray-500
              dark:text-[#9CA3AF]
            "
          >
            {/* Distance */}
            <span
              className="
                flex items-center
                gap-[3px]
              "
            >
              <MapPin size={11} className="flex-shrink-0" />

              {formattedDistance}
            </span>

            {/* Rating */}
            <span
              className="
                flex items-center
                gap-[3px]
              "
            >
              <Star
                size={11}
                className="
                  text-[#F59E0B]
                  flex-shrink-0
                "
                fill="currentColor"
              />

              <span
                className="
                  font-semibold

                  text-[#111827]
                  dark:text-[#F9FAFB]
                "
              >
                {rating}
              </span>

              <span
                className="
                  text-gray-400
                  dark:text-[#6B7280]
                "
              >
                ({reviewsCount})
              </span>
            </span>
          </div>

          {/* Charger Types */}
          <div
            className="
              flex gap-1.5
              mt-2
              flex-wrap
            "
          >
            {chargerTypes.map((t) => (
              <span
                key={t}
                className={`
                  text-[10px]
                  font-semibold

                  px-2
                  py-[3px]

                  rounded-[6px]

                  border

                  ${
                    TYPE_STYLES[t] ??
                    `
                    text-[#9CA3AF]
                    bg-white/5
                    border-white/10
                  `
                  }
                `}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="flex-shrink-0 mt-0.5">
          <AvailabilityBadge status={status} />
        </div>
      </div>

      {/* ───────── STATS ───────── */}
      <div
        className="
          grid grid-cols-3
          gap-2
          mb-3
        "
      >
        {[
          {
            value: `${availableSlots}/${totalSlots}`,
            label: "Slots Free",
          },

          {
            value: `₹${formattedPrice}`,
            label: "Per kWh",
          },

          {
            value: waitTime,
            label: "Wait",
          },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="
              rounded-[12px]

              py-2.5
              px-2

              text-center

              bg-gray-50
              dark:bg-[#1F2937]

              border
              border-gray-100
              dark:border-white/[0.04]
            "
          >
            <p
              className="
                text-[13px]
                font-bold

                text-[#111827]
                dark:text-[#F9FAFB]

                leading-none
              "
            >
              {value}
            </p>

            <p
              className="
                text-[9.5px]

                uppercase
                tracking-[0.5px]

                text-gray-400
                dark:text-[#6B7280]

                mt-1

                font-medium
              "
            >
              {label}
            </p> 
          </div>
        ))}
      </div>

      {/* ───────── ACTIONS ───────── */}
      <div className="flex gap-2">
        {/* Navigate */}
        <button
          onClick={() => onNavigate?.(station)}
          className="
            flex-1

            flex items-center justify-center
            gap-1.5

            rounded-[13px]

            py-2.5

            text-[12.5px]
            font-semibold

            bg-gray-50
            dark:bg-[#1F2937]

            border
            border-gray-200
            dark:border-white/[0.07]

            text-gray-700
            dark:text-[#D1D5DB]

            hover:bg-gray-100
            dark:hover:bg-white/[0.08]

            hover:text-[#111827]
            dark:hover:text-white

            active:scale-[0.97]

            transition-all duration-150
          "
        >
          <Navigation2 size={13} strokeWidth={2.3} />
          Navigate
        </button>

        {/* Book */}
        <button
          onClick={() => onBook?.(station)}
          disabled={isBusy}
          className={`
            flex-[2]

            flex items-center justify-center
            gap-1.5

            rounded-[13px]

            py-2.5

            text-[12.5px]
            font-bold

            active:scale-[0.97]

            transition-all duration-150

            ${
              isBusy
                ? `
                  cursor-not-allowed

                  bg-gray-100
                  dark:bg-[#1F2937]

                  text-gray-400
                  dark:text-[#6B7280]

                  border
                  border-gray-200
                  dark:border-white/[0.06]
                `
                : `
                  bg-[#22C55E]

                  text-white

                  shadow-[0_4px_14px_rgba(34,197,94,0.28)]

                  hover:bg-[#16A34A]
                  hover:-translate-y-px
                `
            }
          `}
        >
          <Zap
            size={13}
            fill={isBusy ? "none" : "currentColor"}
            strokeWidth={isBusy ? 2 : 0}
          />

          {isBusy ? "Station Full" : "Book Slot"}
        </button>
      </div>
    </div>
  );
}
