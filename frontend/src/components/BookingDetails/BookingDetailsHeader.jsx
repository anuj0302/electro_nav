import { ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";

import ThemeToggle from "../Common/ThemeToggle";

import { useTheme } from "../../context/ThemeContext";

export default function BookingDetailsHeader() {
  const navigate = useNavigate();

  const { dark } = useTheme();

  return (
    <header
      className={`
        sticky top-0 z-50
        backdrop-blur-xl
        ${
          dark
            ? "bg-[#0B1220]/90 border-b border-white/[0.05]"
            : "bg-white/90 border-b border-gray-200"
        }
      `}
    >
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <button
          onClick={() => navigate(-1)}
          className="w-[44px] h-[44px] rounded-2xl flex items-center justify-center bg-[#111827] text-white"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="text-center">
          <h1 className="text-[18px] font-bold">
            Booking Details
          </h1>

          <p className="text-[12px] text-gray-500">
            Charging session details
          </p>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}