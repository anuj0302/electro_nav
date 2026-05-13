import {
  ArrowLeft,
  MapPinned,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useTheme,
} from "../../context/ThemeContext";

import ThemeToggle from "../Common/ThemeToggle";

export default function MapHeader({
  onRecenter,
  isNavigating,
}) {
  const navigate = useNavigate();

  const { dark } = useTheme();

  const btnCls = `
    w-[42px] h-[42px]
    rounded-2xl
    flex items-center justify-center
    border
    transition-all duration-200
  `;

  return (
    <header
      className={`
        absolute top-0 left-0 right-0
        z-[1200]
        backdrop-blur-2xl
        ${
          dark
            ? `
              bg-[#0B1220]/72
              border-b border-white/[0.05]
            `
            : `
              bg-white/78
              border-b border-gray-200
            `
        }
      `}
    >
      <div className="px-4 pt-4 pb-3 sm:px-6 lg:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
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
                    `
                    : `
                      bg-white
                      border-gray-200
                      text-[#111827]
                      shadow-sm
                    `
                }
              `}
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <MapPinned
                  size={17}
                  className="text-[#22C55E]"
                />

                <span
                  className={`
                    text-[16px]
                    font-bold
                    font-['Syne',sans-serif]
                    ${
                      dark
                        ? "text-[#F9FAFB]"
                        : "text-[#111827]"
                    }
                  `}
                >
                  EV Station Map
                </span>
              </div>

              <div>
                <p
                  className={`
                    text-[11px]
                    mt-[2px]
                    ${
                      dark
                        ? "text-[#9CA3AF]"
                        : "text-gray-500"
                    }
                  `}
                >
                  Nearby charging stations
                </p>

                {isNavigating && (
                  <p className="text-[10px] text-[#22C55E] font-semibold mt-1">
                    Navigation Active
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}