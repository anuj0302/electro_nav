import { useMemo, useState, useEffect, useRef } from "react";
import { LogOut, MapPin, User, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ThemeToggle from "../Common/ThemeToggle";
import { NAV_ITEMS } from "../../constants/data";
import { getUserLocation } from "../../utils/locationHelpers";
import { useTheme } from "../../context/ThemeContext";

/* ── Greeting based on hour ── */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Header() {
  const navigate  = useNavigate();
  const pathname  = useLocation().pathname;
  const { dark }  = useTheme();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* header shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* user */
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user")); }
    catch { return null; }
  }, []);

  const fullName  = user?.fullname || user?.name || "Alex Johnson";
  const firstName = fullName.split(" ")[0];
  const initials  = fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  /* location */
  const savedLocation   = getUserLocation();
  const currentLocation = savedLocation?.full || "Current Location";

  /* logout */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  /* ── base surface ── */
  const surface = dark
    ? "bg-[#0B1220]/95 border-white/[0.05]"
    : "bg-white/95 border-gray-200/80";

  return (
    <header
      className={`
        sticky top-0 z-50
        border-b backdrop-blur-2xl
        transition-all duration-300
        ${surface}
        ${scrolled && !dark ? "shadow-[0_1px_20px_rgba(0,0,0,0.07)]" : ""}
      `}
    >
      <div className="flex items-center justify-between px-4 lg:px-8 h-[64px] max-w-[1440px] mx-auto">

        {/* ══ LEFT — location + greeting ══ */}
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-1 mb-[1px]">
            <MapPin size={10} className="text-[#22C55E] flex-shrink-0" />
            <span className={`text-[10.5px] font-medium tracking-wide truncate ${dark ? "text-[#6B7280]" : "text-gray-400"}`}>
              {currentLocation.toUpperCase()}
            </span>
          </div>
          <h1 className={`text-[17px] lg:text-[18px] font-bold tracking-tight leading-none ${dark ? "text-[#F9FAFB]" : "text-[#111827]"}`}>
            {getGreeting()},{" "}
            <span className="text-[#22C55E]">{firstName}</span>
            <span className={`text-[#22C55E] ${dark ? "opacity-80" : "opacity-60"}`}>.</span>
          </h1>
        </div>

        {/* ══ CENTER — desktop nav pill ══ */}
        <nav
          className={`
            hidden lg:flex items-center gap-[2px]
            px-[5px] py-[5px] rounded-[18px] border
            transition-colors duration-300
            ${dark
              ? "bg-[#0F1929] border-white/[0.07]"
              : "bg-gray-50 border-gray-200/70"}
          `}
        >
          {NAV_ITEMS.map(({ label, Icon, path }) => {
            const active = pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`
                  relative flex items-center gap-2
                  px-[14px] py-[8px] rounded-[13px]
                  text-[12.5px] font-semibold
                  transition-all duration-200
                  ${active
                    ? `${dark ? "bg-[#22C55E]/15 text-[#22C55E]" : "bg-white text-[#22C55E] shadow-sm border border-gray-200/70"}`
                    : `${dark ? "text-[#6B7280] hover:text-[#9CA3AF] hover:bg-white/[0.04]" : "text-gray-500 hover:text-[#111827] hover:bg-white/70"}`
                  }
                `}
              >
                <Icon size={15} strokeWidth={active ? 2.5 : 2} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ══ RIGHT — theme + user ══ */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          {/* ── user menu ── */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((p) => !p)}
              className={`
                flex items-center gap-2.5
                h-[42px] pl-[5px] pr-3 rounded-2xl border
                transition-all duration-200
                ${dark
                  ? "bg-[#111827] border-white/[0.08] hover:border-white/[0.14]"
                  : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"}
              `}
            >
              {/* avatar */}
              <div className="w-[32px] h-[32px] rounded-[10px] bg-[#22C55E] flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
                {initials}
              </div>

              {/* name — hidden on small screens */}
              <span className={`hidden sm:block text-[12.5px] font-semibold leading-none ${dark ? "text-[#E5E7EB]" : "text-[#111827]"}`}>
                {firstName}
              </span>

              <ChevronDown
                size={13}
                strokeWidth={2.5}
                className={`
                  transition-transform duration-200 flex-shrink-0
                  ${open ? "rotate-180" : ""}
                  ${dark ? "text-[#6B7280]" : "text-gray-400"}
                `}
              />
            </button>

            {/* ── dropdown ── */}
            {open && (
              <div
                className={`
                  absolute right-0 top-[50px] w-[220px] z-50
                  rounded-2xl border overflow-hidden
                  shadow-[0_8px_36px_rgba(0,0,0,0.18)]
                  backdrop-blur-xl
                  transition-all duration-200
                  ${dark
                    ? "bg-[#111827]/96 border-white/[0.07]"
                    : "bg-white/96 border-gray-200"}
                `}
              >
                {/* user info */}
                <div className={`px-4 py-3.5 border-b ${dark ? "border-white/[0.06]" : "border-gray-100"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-[36px] h-[36px] rounded-xl bg-[#22C55E] flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-[13px] font-bold leading-tight truncate ${dark ? "text-[#F9FAFB]" : "text-[#111827]"}`}>
                        {fullName}
                      </p>
                      <p className={`text-[11px] mt-[2px] truncate ${dark ? "text-[#6B7280]" : "text-gray-400"}`}>
                        {user?.email || user?.phonenumber || ""}
                      </p>
                    </div>
                  </div>
                </div>


                {/* divider */}
                <div className={`mx-4 h-px ${dark ? "bg-white/[0.06]" : "bg-gray-100"}`} />

                {/* logout */}
                <button
                  onClick={handleLogout}
                  className="
                    w-full flex items-center gap-3 px-4 py-3
                    text-[13px] font-medium text-[#EF4444]
                    hover:bg-[#EF4444]/[0.06]
                    transition-colors duration-150
                  "
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 