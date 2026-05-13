import { Link, useLocation } from "react-router-dom";

import { NAV_ITEMS } from "../../constants/data";

import { useTheme } from "../../context/ThemeContext";

export default function BottomNav() {
  const location = useLocation();

  const { dark } = useTheme();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[460px] z-[1200] px-4 pb-3 lg:hidden">
      <nav
        className={`
          relative
          backdrop-blur-2xl
          border
          rounded-[30px]
          flex items-center justify-around
          px-3 py-[12px]
          transition-all duration-300
          ${
            dark
              ? `
                bg-[rgba(15,23,42,0.92)]
                border-white/[0.06]
                shadow-[0_-10px_40px_rgba(0,0,0,0.35)]
              `
              : `
                bg-white/96
                border-gray-200
                shadow-[0_-8px_32px_rgba(15,23,42,0.08)]
              `
          }
        `}
      >
        {NAV_ITEMS.map(({
          label,
          Icon,
          path,
        }) => {
          const active =
            location.pathname === path ||
            location.pathname.startsWith(`${path}/`);

          const isMap = path === "/map";

          return (
            <Link
              key={path}
              to={path}
              aria-label={label}
              className={`
                relative
                flex flex-col
                items-center justify-center
                transition-all duration-300
                ${
                  isMap
                    ? "-mt-9"
                    : "px-3 py-1 rounded-[16px]"
                }
                ${
                  !isMap &&
                  (active
                    ? "bg-[#22C55E]/10"
                    : dark
                      ? "hover:bg-white/[0.05]"
                      : "hover:bg-gray-100")
                }
              `}
            >
              {isMap ? (
                <>
                  <div
                    className={`
                      absolute
                      w-[68px]
                      h-[68px]
                      rounded-full
                      blur-2xl
                      transition-all duration-300
                      ${
                        active
                          ? "bg-[#22C55E]/35 opacity-100"
                          : "bg-[#22C55E]/15 opacity-70"
                      }
                    `}
                  />

                  <div
                    className={`
                      relative
                      w-[64px]
                      h-[64px]
                      rounded-full
                      flex items-center justify-center
                      border-[4px]
                      transition-all duration-300
                      ${
                        active
                          ? `
                              bg-[#22C55E]
                              border-[#0B1220]
                              scale-110
                              shadow-[0_10px_35px_rgba(34,197,94,.45)]
                            `
                          : dark
                            ? `
                                bg-[#111827]
                                border-[#0B1220]
                                shadow-[0_8px_28px_rgba(0,0,0,.35)]
                              `
                            : `
                                bg-white
                                border-[#F4F7FB]
                                shadow-[0_8px_28px_rgba(15,23,42,.12)]
                              `
                      }
                    `}
                  >
                    <Icon
                      size={30}
                      strokeWidth={2.4}
                      className={
                        active
                          ? "text-white"
                          : dark
                            ? "text-[#22C55E]"
                            : "text-[#22C55E]"
                      }
                    />
                  </div>

                  <span
                    className={`
                      mt-2
                      text-[10px]
                      font-bold
                      tracking-[0.4px]
                      ${
                        active
                          ? "text-[#22C55E]"
                          : dark
                            ? "text-[#9CA3AF]"
                            : "text-gray-500"
                      }
                    `}
                  >
                    {label}
                  </span>
                </>
              ) : (
                <>
                  <Icon
                    size={20}
                    strokeWidth={
                      active
                        ? 2.5
                        : 2.2
                    }
                    className={
                      active
                        ? "text-[#22C55E]"
                        : dark
                          ? "text-[#9CA3AF]"
                          : "text-gray-500"
                    }
                  />

                  <span
                    className={`
                      text-[9.5px]
                      font-medium
                      tracking-[0.3px]
                      mt-[3px]
                      transition-all duration-200
                      ${
                        active
                          ? "text-[#22C55E]"
                          : dark
                            ? "text-[#9CA3AF]"
                            : "text-gray-500"
                      }
                    `}
                  >
                    {label}
                  </span>

                  {active && (
                    <span className="absolute -bottom-[2px] w-1 h-1 rounded-full bg-[#22C55E]" />
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}