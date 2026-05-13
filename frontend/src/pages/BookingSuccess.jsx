import { useEffect } from "react";

import {
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";

import {
  CheckCircle2,
  MapPin,
  Clock3,
  Zap,
  ArrowRight,
  QrCode,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

import BottomNav from "../components/Layout/BottomNav";

import GridBackground from "../components/Common/GridBackground";
import GlowOrb from "../components/Common/GlowOrb";

import {
  getBookingFlow,
  clearBookingFlow,
} from "../utils/bookingFlowStorage";

export default function BookingSuccess() {
  const navigate = useNavigate();

  const location = useLocation();

  const { dark } = useTheme();

  /* ---------------- BOOKING DATA ---------------- */

  const bookingData =
    location.state ||
    getBookingFlow();

  useEffect(() => {
    if (!bookingData?.station) {
      navigate("/");
    }
  }, [bookingData, navigate]);

  if (!bookingData?.station)
    return null;

  const {
    station,
    charger,
    slot,
    vehicle,
    booking,
  } = bookingData;

  const bookingId =
    booking?.bookingId ||
    `EV-${Date.now()
      .toString()
      .slice(-6)}`;

  return (
    <div
      className={`
        relative min-h-screen
        overflow-x-hidden
        transition-colors duration-300

        ${
          dark
            ? "bg-[#0B1220]"
            : "bg-[#F4F7FB]"
        }
      `}
    >
      {/* ---------------- BACKGROUND ---------------- */}
      {dark && (
        <>
          <GridBackground />

          <GlowOrb className="w-[420px] h-[420px] -top-[180px] -left-[140px]" />

          <GlowOrb className="w-[340px] h-[340px] -bottom-[80px] -right-[80px]" />
        </>
      )}

      <div className="relative z-10">
        {/* ---------------- MAIN ---------------- */}
        <main
          className="
            max-w-[720px]
            mx-auto

            px-4 sm:px-6

            pt-10
            pb-[120px]
          "
        >
          {/* ---------------- SUCCESS ICON ---------------- */}
          <div className="flex justify-center mb-5">
            <div
              className="
                w-[95px]
                h-[95px]

                rounded-full

                flex items-center justify-center

                bg-[#22C55E]/10
                border border-[#22C55E]/20

                shadow-[0_10px_40px_rgba(34,197,94,.15)]
              "
            >
              <CheckCircle2
                size={48}
                className="text-[#22C55E]"
              />
            </div>
          </div>

          {/* ---------------- HEADING ---------------- */}
          <div className="text-center mb-7">
            <p
              className="
                mb-2

                text-[13px]
                font-semibold

                uppercase
                tracking-[2px]

                text-[#22C55E]
              "
            >
              Booking Successful
            </p>

            <h1
              className={`
                text-[30px]
                sm:text-[36px]

                leading-tight

                font-extrabold
                font-['Syne',sans-serif]

                ${
                  dark
                    ? "text-[#F9FAFB]"
                    : "text-[#111827]"
                }
              `}
            >
              Charging Slot Confirmed ⚡
            </h1>

            <p
              className={`
                mt-3

                text-[14px]
                leading-relaxed

                ${
                  dark
                    ? "text-[#9CA3AF]"
                    : "text-gray-500"
                }
              `}
            >
              Your EV charging session
              has been booked
              successfully.
            </p>
          </div>

          {/* ---------------- BOOKING CARD ---------------- */}
          <div
            className={`
              overflow-hidden

              rounded-[28px]

              border

              ${
                dark
                  ? `
                    bg-[#111827]
                    border-white/[0.06]
                    shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                  `
                  : `
                    bg-white
                    border-gray-100
                    shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                  `
              }
            `}
          >
            {/* TOP ACCENT */}
            <div
              className="
                h-[5px]

                bg-gradient-to-r
                from-[#22C55E]
                via-[#16A34A]
                to-[#22C55E]
              "
            />

            <div className="p-5 sm:p-7">
              {/* ---------------- BOOKING ID ---------------- */}
              <div
                className="
                  flex items-center
                  justify-between

                  gap-3
                  flex-wrap

                  mb-6
                "
              >
                <div>
                  <p
                    className={`
                      text-[11px]

                      uppercase
                      tracking-[1.4px]

                      ${
                        dark
                          ? "text-[#6B7280]"
                          : "text-gray-400"
                      }
                    `}
                  >
                    Booking ID
                  </p>

                  <h2
                    className={`
                      text-[20px]
                      font-extrabold
                      font-['Syne',sans-serif]

                      ${
                        dark
                          ? "text-[#F9FAFB]"
                          : "text-[#111827]"
                      }
                    `}
                  >
                    {bookingId}
                  </h2>
                </div>

                <div
                  className="
                    px-4 py-2

                    rounded-full

                    bg-[#22C55E]/10
                    border border-[#22C55E]/20

                    text-[#22C55E]
                    text-[12px]
                    font-semibold
                  "
                >
                  Confirmed
                </div>
              </div>

              {/* ---------------- STATION ---------------- */}
              <div
                className={`
                  mb-4

                  rounded-2xl

                  border

                  p-4

                  ${
                    dark
                      ? `
                        bg-[#1A2438]
                        border-white/[0.06]
                      `
                      : `
                        bg-gray-50
                        border-gray-100
                      `
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="
                      w-[46px]
                      h-[46px]

                      rounded-2xl

                      bg-[#22C55E]/10

                      flex items-center justify-center

                      text-[#22C55E]
                    "
                  >
                    <Zap
                      size={22}
                      fill="currentColor"
                    />
                  </div>

                  <div className="flex-1">
                    <h3
                      className={`
                        text-[16px]
                        font-bold

                        ${
                          dark
                            ? "text-[#F9FAFB]"
                            : "text-[#111827]"
                        }
                      `}
                    >
                      {station?.name}
                    </h3>

                    <p
                      className={`
                        mt-1

                        flex items-center gap-1.5

                        text-[12px]

                        ${
                          dark
                            ? "text-[#9CA3AF]"
                            : "text-gray-500"
                        }
                      `}
                    >
                      <MapPin size={13} />

                      {station?.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* ---------------- DETAILS GRID ---------------- */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  {
                    label: "Time",
                    value:
                      slot?.time ||
                      "N/A",
                  },

                  {
                    label: "Date",
                    value:
                      slot?.date ||
                      "N/A",
                  },

                  {
                    label: "Charger",
                    value:
                      charger?.type ||
                      "N/A",
                  },

                  {
                    label: "Vehicle",
                    value:
                      vehicle?.model ||
                      "EV Vehicle",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`
                      rounded-2xl

                      border

                      p-4

                      ${
                        dark
                          ? `
                            bg-[#1A2438]
                            border-white/[0.06]
                          `
                          : `
                            bg-gray-50
                            border-gray-100
                          `
                      }
                    `}
                  >
                    <p
                      className={`
                        mb-1

                        text-[11px]

                        uppercase
                        tracking-[1px]

                        ${
                          dark
                            ? "text-[#6B7280]"
                            : "text-gray-400"
                        }
                      `}
                    >
                      {item.label}
                    </p>

                    <p
                      className={`
                        text-[14px]
                        font-bold

                        ${
                          dark
                            ? "text-[#F9FAFB]"
                            : "text-[#111827]"
                        }
                      `}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* ---------------- QR SECTION ---------------- */}
              <div
                className="
                  rounded-2xl

                  border border-dashed
                  border-[#22C55E]/30

                  bg-[#22C55E]/5

                  p-5

                  text-center

                  mb-5
                "
              >
                <div
                  className={`
                    w-[72px]
                    h-[72px]

                    rounded-2xl

                    mx-auto
                    mb-3

                    flex items-center justify-center

                    ${
                      dark
                        ? "bg-[#111827]"
                        : "bg-white"
                    }
                  `}
                >
                  <QrCode
                    size={42}
                    className="text-[#22C55E]"
                  />
                </div>

                <p
                  className="
                    text-[13px]
                    font-semibold

                    text-[#22C55E]
                  "
                >
                  Show this QR at the station
                </p>

                <p
                  className={`
                    mt-1
                    text-[11px]

                    ${
                      dark
                        ? "text-[#9CA3AF]"
                        : "text-gray-500"
                    }
                  `}
                >
                  Scan for charging
                  verification
                </p>
              </div>

              {/* ---------------- ACTIONS ---------------- */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/bookings"
                  className="
                    flex-1

                    inline-flex
                    items-center
                    justify-center
                    gap-2

                    rounded-2xl

                    py-3.5

                    bg-[#22C55E]
                    hover:bg-[#16A34A]

                    text-white
                    font-bold

                    transition-all duration-200
                  "
                >
                  View My Bookings

                  <ArrowRight size={16} />
                </Link>

                <button
                  onClick={() => {
                    clearBookingFlow();
 
                    navigate("/");
                  }}
                  className={`
                    flex-1

                    rounded-2xl

                    py-3.5

                    font-semibold

                    border

                    transition-all duration-200

                    ${
                      dark
                        ? `
                          bg-[#1A2438]
                          border-white/[0.07]
                          text-[#F9FAFB]
                        `
                        : `
                          bg-white
                          border-gray-200
                          text-[#111827]
                        `
                    }
                  `}
                >
                  Back To Home
                </button>
              </div>
            </div>
          </div>

          {/* ---------------- BOTTOM NOTE ---------------- */}
          <div
            className={`
              flex items-center
              justify-center
              gap-2

              mt-5

              text-[12px]

              ${
                dark
                  ? "text-[#9CA3AF]"
                  : "text-gray-500"
              }
            `}
          >
            <Clock3 size={13} />

            Arrive 5 minutes before
            your slot
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}