import { useNavigate } from "react-router-dom";

import { ArrowLeft, SlidersHorizontal } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

import ThemeToggle from "../Common/ThemeToggle";

export default function BookingPageHeader({
  title = "My Bookings",
  onFilterClick,
}) {
  const navigate = useNavigate();

  const { dark } = useTheme();

  const goBack = () =>
    window.history.length > 1 ? navigate(-1) : navigate("/");

  return (
    <header
      className={`
        sticky top-0 z-40 w-full
        border-b
        backdrop-blur-2xl
        transition-colors duration-300
        ${
          dark
            ? `
              bg-[#0B1220]/95
              border-white/[0.05]
            `
            : `
              bg-white/95
              border-gray-200/80
              shadow-[0_1px_20px_rgba(0,0,0,0.05)]
            `
        }
      `}
    >
      <div className="flex items-center justify-between px-4 lg:px-8 h-[64px] max-w-[1440px] mx-auto">
        <button
          onClick={goBack}
          aria-label="Go back"
          className={`
            w-[38px]
            h-[38px]
            flex-shrink-0
            flex items-center justify-center
            rounded-[12px]
            border
            transition-all duration-200
            active:scale-[0.94]
            ${
              dark
                ? `
                  bg-[#111827]
                  border-white/[0.08]
                  text-[#9CA3AF]
                  hover:text-[#F9FAFB]
                  hover:border-white/[0.14]
                `
                : `
                  bg-white
                  border-gray-200
                  text-gray-500
                  hover:text-[#111827]
                  hover:border-gray-300
                  shadow-sm
                `
            }
          `}
        >
          <ArrowLeft size={16} strokeWidth={2.3} />
        </button>

        <div className="flex flex-col items-center">
          <span
            className={`
              text-[15px]
              sm:text-[16px]
              font-bold
              leading-none
              tracking-[0.2px]
              ${dark ? "text-[#F9FAFB]" : "text-[#111827]"}
            `}
          >
            {title}
          </span>

          <p
            className={`
              mt-[5px]
              text-[10px]
              font-medium
              tracking-[0.3px]
              ${dark ? "text-[#6B7280]" : "text-gray-400"}
            `}
          >
            Manage your charging sessions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onFilterClick}
            aria-label="Filter bookings"
            className={`
              w-[38px]
              h-[38px]
              flex items-center justify-center
              rounded-[12px]
              border
              transition-all duration-200
              active:scale-[0.94]
              ${
                dark
                  ? `
                    bg-[#111827]
                    border-white/[0.08]
                    text-[#9CA3AF]
                    hover:text-[#F9FAFB]
                    hover:border-white/[0.14]
                  `
                  : `
                    bg-white
                    border-gray-200
                    text-gray-500
                    hover:text-[#111827]
                    hover:border-gray-300
                    shadow-sm
                  `
              }
            `}
          >
            <SlidersHorizontal size={16} strokeWidth={2.2} />
          </button>

          <div className="flex-shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
