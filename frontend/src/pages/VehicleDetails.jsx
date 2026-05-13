import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { ChevronRight } from "lucide-react";

import {
  VehicleCard,
  BatterySliderCard,
} from "../components/Booking";

import GridBackground from "../components/Common/GridBackground";

import GlowOrb from "../components/Common/GlowOrb";

import VehicleDetailsHeader from "../components/Vehicle/VehicleDetailsHeader";

import {
  getBookingFlow, 
  saveBookingFlow,
} from "../utils/bookingFlowStorage";

import {
  MOCK_VEHICLE,
} from "../constants/bookingMockData";

import { useTheme } from "../context/ThemeContext";

export default function VehicleDetails() {
  const navigate = useNavigate();

  const { dark } = useTheme();

  const bookingFlow =
    getBookingFlow();

  const station =
    bookingFlow?.station;

  const [vehicle, setVehicle] =
    useState(
      bookingFlow?.vehicle ||
        MOCK_VEHICLE
    );

  const [current, setCurrent] =
    useState(
      bookingFlow?.battery
        ?.current || 32
    );

  const [target, setTarget] =
    useState(
      bookingFlow?.battery
        ?.target || 80
    );

  useEffect(() => {
    if (!station) {
      navigate("/");
    }
  }, [station, navigate]);

  const isInvalid =
    !vehicle?.driverName?.trim() ||
    !vehicle?.model?.trim() ||
    !vehicle?.registration?.trim() ||
    target <= current;

  const handleContinue = () => {
    if (
      !vehicle?.driverName?.trim() ||
      !vehicle?.model?.trim() ||
      !vehicle?.registration?.trim()
    ) {
      toast.error(
        "Please fill all vehicle details"
      );

      return;
    }

    if (target <= current) {
      toast.error(
        "Target battery must be greater than current battery"
      );

      return;
    }

    saveBookingFlow({
      vehicle,

      battery: {
        current,
        target,
      },
    });

    navigate("/booking/review");
  };

  return (
    <div
      className={`
        relative min-h-screen
        w-full overflow-x-hidden
        transition-colors duration-300

        ${
          dark
            ? "bg-[#0B1220]"
            : "bg-[#F4F7FB]"
        }
      `}
    >
      {/* Background */}
      {dark && (
        <>
          <GridBackground />

          <GlowOrb className="w-[420px] h-[420px] -top-[180px] -left-[140px]" />

          <GlowOrb className="w-[340px] h-[340px] -bottom-[80px] -right-[80px]" />
        </>
      )}

      {/* Header */}
      <VehicleDetailsHeader />

      {/* Main Content */}
      <div className="relative z-10 mt-4">
        <div
          className="
            mx-auto
            max-w-[1180px]

            px-4 lg:px-8

            lg:grid
            lg:grid-cols-[420px_1fr]
            lg:gap-7

            pb-10
          "
        >
          {/* Left Card */}
          <VehicleCard
            vehicle={vehicle}
            onChange={setVehicle}
          />

          {/* Right Card */}
          <BatterySliderCard
            current={current}
            target={target}
            onCurrentChange={
              setCurrent
            }
            onTargetChange={
              setTarget
            }
            hideExtraSlider={
              true
            }
          />
        </div>

        {/* Continue Button */}
        <div className="px-4 lg:px-8 pb-8">
          <div className="mx-auto max-w-[1180px]">
            <button
              disabled={isInvalid}
              onClick={
                handleContinue
              }
              className={`
                flex w-full items-center
                justify-center gap-2

                rounded-2xl

                py-[16px]

                text-[15px]
                font-bold
                text-white

                transition-all duration-200

                ${
                  isInvalid
                    ? `
                      bg-[#22C55E]/50
                      cursor-not-allowed
                      shadow-none
                    `
                    : `
                      bg-[#22C55E]

                      shadow-[0_8px_30px_rgba(34,197,94,0.28)]

                      hover:bg-[#16A34A]

                      active:scale-[0.99]
                    `
                }
              `}
            >
              Continue to Review

              <ChevronRight
                size={18}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}