import { useEffect } from "react";

import {
  saveBookingFlow,
} from "../utils/bookingFlowStorage";

export default function SlotSelector({
  slots,
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect,
}) {

  /* Save slot automatically */
  useEffect(() => {
    if (!selectedDate || !selectedTime)
      return;

    saveBookingFlow({
      slot: {
        date: selectedDate, 
        time: selectedTime,
      },
    });
  }, [selectedDate, selectedTime]);

  return (
    <div className="mb-6">

      {/* Title */}
      <div className="mb-4">
        <h3
          className="
            text-[16px]
            font-bold
            font-['Syne',sans-serif]
            text-[#111827]
            dark:text-[#F9FAFB]
          "
        >
          Select Time Slot
        </h3>

        <p
          className="
            text-[12px]
            text-gray-500
            dark:text-[#9CA3AF]
            mt-1
          "
        >
          Choose preferred charging schedule
        </p>
      </div>

      {/* DATE STRIP */}
      <div
        className="
          flex gap-2
          overflow-x-auto
          pb-2 mb-4
          no-scrollbar
        "
      >
        {slots?.dates?.map((d) => {

          const active =
            selectedDate === d.num;

          return (
            <button
              key={d.num}
              onClick={() =>
                onDateSelect(d.num)
              }
              className={`
                flex-shrink-0
                min-w-[72px]
                px-[14px]
                py-3
                rounded-2xl
                border
                transition-all duration-200

                ${
                  active
                    ? `
                      bg-[#22C55E]
                      border-[#22C55E]
                      shadow-[0_6px_18px_rgba(34,197,94,.25)]
                    `
                    : `
                      bg-white
                      dark:bg-[#111827]
                      border-gray-200
                      dark:border-white/[0.07]

                      hover:border-[#22C55E]/35
                    `
                }
              `}
            >
              <p
                className={`
                  text-[11px]
                  font-medium
                  mb-[2px]

                  ${
                    active
                      ? "text-white/80"
                      : "text-gray-500 dark:text-[#9CA3AF]"
                  }
                `}
              >
                {d.day}
              </p>

              <p
                className={`
                  text-[18px]
                  font-bold
                  font-['Syne',sans-serif]

                  ${
                    active
                      ? "text-white"
                      : "text-[#111827] dark:text-[#F9FAFB]"
                  }
                `}
              >
                {d.num}
              </p>
            </button>
          );
        })}
      </div>

      {/* TIME GRID */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          gap-2
        "
      >
        {slots?.times?.map((slot) => {

          const active =
            selectedTime === slot.time;

          return (
            <button
              key={slot.time}
              disabled={!slot.available}
              onClick={() =>
                slot.available &&
                onTimeSelect(slot.time)
              }
              className={`
                py-[12px]
                px-2
                rounded-[14px]
                border
                text-center
                text-[13px]
                font-semibold
                transition-all duration-200

                ${
                  !slot.available
                    ? `
                      opacity-40
                      cursor-not-allowed
                      line-through

                      bg-gray-100
                      dark:bg-[#111827]

                      border-gray-200
                      dark:border-white/[0.07]

                      text-gray-400
                      dark:text-[#6B7280]
                    `
                    : active
                    ? `
                      bg-[#22C55E]
                      border-[#22C55E]
                      text-white

                      shadow-[0_6px_18px_rgba(34,197,94,.25)]
                    `
                    : `
                      bg-white
                      dark:bg-[#111827]

                      border-gray-200
                      dark:border-white/[0.07]

                      text-gray-700
                      dark:text-[#9CA3AF]

                      hover:border-[#22C55E]/35
                      hover:text-[#111827]
                      dark:hover:text-[#F9FAFB]

                      hover:-translate-y-[1px]
                    `
                }
              `}
            >
              {slot.time}
            </button>
          );
        })}
      </div>
    </div>
  );
}