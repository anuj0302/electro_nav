import { ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

import ThemeToggle from "../Common/ThemeToggle";

export default function SlotHeader() {
  const navigate = useNavigate();

  const { dark } = useTheme();

  const btnCls = `
    flex h-[42px] w-[42px]
    items-center justify-center

    rounded-2xl
    border

    transition-all duration-200
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
              border-b border-white/[0.05]
              bg-[#0B1220]/92
            `
            : `
              border-b border-gray-200
              bg-white/85
            `
        }
      `}
    >
      <div
        className="
          flex w-full items-center justify-between

          px-4 py-4
          lg:px-8
        "
      >
        {/* LEFT */}
        <button
          type="button"
          aria-label="Go Back"
          onClick={() => navigate(-1)}
          className={`
            ${btnCls}

            ${
              dark
                ? `
                  border-white/[0.07]
                  bg-[#111827]
                  text-[#F9FAFB]
                `
                : `
                  border-gray-200
                  bg-white
                  text-[#111827]
                  shadow-sm
                `
            }
          `}
        >
          <ArrowLeft size={18} />
        </button>

        {/* CENTER */}
        <div className="flex flex-col items-center gap-[5px]">
          <span
            className={`
              font-['Syne',sans-serif]
              text-[16px]
              font-bold

              ${dark ? "text-[#F9FAFB]" : "text-[#111827]"}
            `}
          >
            Select Slot
          </span>

          {/* Progress */}
          <div className="flex gap-[5px]">
            {[1, 2, 3, 4].map((step) => {
              const active = step === 2;

              return (
                <span
                  key={step}
                  className={`
                      h-1 rounded-full
                      transition-all duration-200

                      ${
                        active
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
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
