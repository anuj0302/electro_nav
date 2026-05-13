// src/components/Booking/VehicleDetailsHeader.jsx

import { ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

import ThemeToggle from "../Common/ThemeToggle";

export default function VehicleDetailsHeader() {
  const navigate = useNavigate();

  const { dark } = useTheme();

  const btnCls = `
    w-[42px] 
    h-[42px]

    rounded-2xl

    flex items-center justify-center

    border

    transition-all duration-200

    active:scale-[0.96]
  `;

  return (
    <header
      className={`
        sticky top-0 z-40

        w-full

        backdrop-blur-xl

        transition-colors duration-300

        ${
          dark
            ? `
              bg-[#0B1220]/92
              border-b border-white/[0.05]
            `
            : `
              bg-white/85
              border-b border-gray-200
            `
        }
      `}
    >
      <div
        className="
          w-full

          px-4
          md:px-6
          xl:px-10

          py-4

          flex items-center justify-between
        "
      >
        {/* ───────── LEFT ───────── */}
        <button
          onClick={() => navigate(-1)}
          className={`
            ${btnCls}

            ${
              dark
                ? `
                  bg-[#111827]
                  border-white/[0.07]

                  text-[#F9FAFB]

                  hover:border-[#22C55E]/25
                  hover:text-[#22C55E]
                `
                : `
                  bg-white
                  border-gray-200

                  text-[#111827]

                  shadow-sm

                  hover:border-[#22C55E]/25
                  hover:text-[#16A34A]
                `
            }
          `}
        >
          <ArrowLeft size={18} />
        </button>

        {/* ───────── CENTER ───────── */}
        <div
          className="
            flex flex-col
            items-center

            gap-[5px]
          "
        >
          <span
            className={`
              text-[16px]
              font-bold

              font-['Syne',sans-serif]

              tracking-[0.2px]

              ${
                dark
                  ? "text-[#F9FAFB]"
                  : "text-[#111827]"
              }
            `}
          >
            Vehicle Details
          </span>

          {/* Progress */}
          <div className="flex gap-[5px]">
            {[1, 2, 3, 4].map((n) => (
              <span
                key={n}
                className={`
                  h-1

                  rounded-full

                  transition-all duration-300

                  ${
                    n === 3
                      ? `
                        w-[34px]
                        bg-[#22C55E]
                      `
                      : dark
                      ? `
                        w-[22px]
                        bg-[#22C55E]/70
                      `
                      : `
                        w-[22px]
                        bg-[#22C55E]/40
                      `
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* ───────── RIGHT ───────── */}
        <div
          className="
            flex items-center justify-center
          "
        >
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}