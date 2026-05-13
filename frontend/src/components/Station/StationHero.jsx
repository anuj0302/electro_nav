import {
  Zap,
  MapPin,
  Star,
} from "lucide-react";

import AvailabilityBadge from "./AvailabilityBadge";

import { useTheme } from "../../context/ThemeContext";

export default function StationHero({
  station,
}) {
  const { dark } = useTheme();

  const {
    name = "Unknown Station",

    address = "Unknown Address",

    distance,
    distanceKm,

    rating = 0,

    isOpen = false,

    status = "available",

    waitTime = "N/A",

    availableSlots = 0,

    totalSlots = 0,

    chargerTypes = [],

    reviews = 124,
  } = station || {};

  // Backend compatibility
  const formattedDistance =
    distance ||
    (distanceKm
      ? `${distanceKm} km`
      : "N/A");

  // Reviews compatibility
  const reviewsCount =
    Array.isArray(reviews)
      ? reviews.length
      : reviews;

  return (
    <div
      className={`
        relative overflow-hidden

        rounded-3xl

        p-5
        mb-4

        border 

        ${
          dark
            ? `
              bg-[#111827]
              border-white/[0.07]
            `
            : `
              bg-white
              border-gray-200
              shadow-sm
            `
        }
      `}
    >
      {/* Top Glow */}
      <div
        className="
          absolute top-0 left-0 right-0 h-px

          bg-gradient-to-r
          from-transparent
          via-[#22C55E]/40
          to-transparent
        "
      />

      {/* Main */}
      <div
        className="
          flex items-start justify-between
          gap-3
          mb-3
        "
      >
        {/* Left */}
        <div className="flex gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div
            className="
              w-[52px]
              h-[52px]

              rounded-2xl

              bg-[#22C55E]/10
              border border-[#22C55E]/20

              flex items-center justify-center

              text-[#22C55E]

              flex-shrink-0
            "
          >
            <Zap
              size={26}
              fill="currentColor"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Name */}
            <h1
              className={`
                text-[18px]
                font-bold
                font-['Syne',sans-serif]

                leading-tight
                mb-1

                break-words

                ${
                  dark
                    ? "text-[#F9FAFB]"
                    : "text-[#111827]"
                }
              `}
            >
              {name}
            </h1>

            {/* Address */}
            <p
              className={`
                text-[12.5px]

                flex items-center gap-1

                mb-1.5

                ${
                  dark
                    ? "text-[#9CA3AF]"
                    : "text-gray-500"
                }
              `}
            >
              <MapPin
                size={11}
                className="
                  text-[#22C55E]
                  flex-shrink-0
                "
              />

              <span className="truncate">
                {address} ·{" "}
                {formattedDistance}
              </span>
            </p>

            {/* Meta */}
            <div
              className="
                flex items-center
                gap-3
                flex-wrap
              "
            >
              {/* Rating */}
              <span
                className={`
                  flex items-center gap-1
                  text-[11.5px]

                  ${
                    dark
                      ? "text-[#9CA3AF]"
                      : "text-gray-500"
                  }
                `}
              >
                <Star
                  size={12}
                  className="text-[#F59E0B]"
                  fill="currentColor"
                />

                <b
                  className={
                    dark
                      ? "text-[#F9FAFB]"
                      : "text-[#111827]"
                  }
                >
                  {rating}
                </b>

                <span>
                  ({reviewsCount} reviews)
                </span>
              </span>

              {/* Open Badge */}
              <span
                className={`
                  inline-flex items-center
                  gap-1

                  text-[10px]
                  font-semibold

                  px-[10px]
                  py-[3px]

                  rounded-full

                  uppercase
                  tracking-[0.4px]

                  border

                  ${
                    isOpen
                      ? `
                        bg-[#22C55E]/12
                        text-[#22C55E]
                        border-[#22C55E]/20
                      `
                      : `
                        bg-[#EF4444]/10
                        text-[#EF4444]
                        border-[#EF4444]/20
                      `
                  }
                `}
              >
                ●{" "}
                {isOpen
                  ? "Open 24x7"
                  : "Closed"}
              </span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="flex-shrink-0">
          <AvailabilityBadge
            status={status}
          />
        </div>
      </div>

      {/* Tags */}
      <div
        className="
          flex flex-wrap
          gap-1.5
          mt-3
        "
      >
        {/* Charger Types */}
        {chargerTypes.map(
          (type, index) => (
            <span
              key={`${type}-${index}`}
              className="
                text-[10px]
                font-medium

                px-2
                py-[3px]

                rounded-md

                border

                bg-[#22C55E]/10
                text-[#22C55E]
                border-[#22C55E]/20
              "
            >
              {type}
            </span>
          ),
        )}

        {/* Wait */}
        <span
          className={`
            text-[10px]
            font-medium

            px-2
            py-[3px]

            rounded-md

            border

            ${
              dark
                ? `
                  bg-[#1F2937]
                  border-white/[0.07]
                  text-[#9CA3AF]
                `
                : `
                  bg-gray-100
                  border-gray-200
                  text-gray-600
                `
            }
          `}
        >
          ⏱ {waitTime} wait
        </span>

        {/* Slots */}
        <span
          className={`
            text-[10px]
            font-medium

            px-2
            py-[3px]

            rounded-md

            border

            ${
              dark
                ? `
                  bg-[#1F2937]
                  border-white/[0.07]
                  text-[#9CA3AF]
                `
                : `
                  bg-gray-100
                  border-gray-200
                  text-gray-600
                `
            }
          `}
        >
          {availableSlots}/
          {totalSlots} slots
        </span>
      </div>
    </div>
  );
}