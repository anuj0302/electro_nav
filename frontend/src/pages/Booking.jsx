import { useState, useEffect } from "react";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import { useTheme } from "../context/ThemeContext";

import {
  BookingHeader,
  BookingInfoCard, 
  DesktopCTA,
  MobileCTA,
  SuccessOverlay,
  SelectedStationCard,
  SelectedChargerCard,
  SelectedSlotCard,
  BatteryRingCard,
} from "../components/Booking";

import GridBackground from "../components/Common/GridBackground";

import GlowOrb from "../components/Common/GlowOrb";

import useBookingEstimates from "../hooks/useBookingEstimates";

import {
  getBookingFlow,
  clearBookingFlow,
} from "../utils/bookingFlowStorage";

export default function Booking() {
  const navigate = useNavigate();

  const { dark } = useTheme();

  const bookingFlow =
    getBookingFlow();

  const station =
    bookingFlow?.station;

  const charger =
    bookingFlow?.charger;

  const slot =
    bookingFlow?.slot;

  const vehicle =
    bookingFlow?.vehicle;

  const battery =
    bookingFlow?.battery;

  const current =
    battery?.current || 30;

  const target =
    battery?.target || 80;

  const [notes, setNotes] =
    useState("");

  const [confirmed, setConfirmed] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [createdBooking, setCreatedBooking] =
    useState(null);

  const [submitting, setSubmitting] =
    useState(false);

  const estimates =
    useBookingEstimates(
      current,
      target
    );

  // Prevent refresh/direct access issues
  useEffect(() => {
    if (
      !station ||
      !charger ||
      !slot
    ) {
      navigate("/");
    }
  }, [
    station,
    charger,
    slot,
    navigate,
  ]);

  const handleConfirm =
    async () => {
      try {
        if (confirmed || submitting)
          return;

        if (
          !vehicle?.registration
        ) {
          toast.error(
            "Vehicle registration missing"
          );

          return;
        }

        setSubmitting(true);

        const payload = {
          stationId:
            station?._id,

          vehicleId:
            vehicle.registration,

          slotDate:
            slot?.date,

          slotTime:
            slot?.time,

          chargerType:
            charger?.type ||
            "DC Fast",

          batteryTarget:
            target,

          estimatedDuration:
            estimates?.mins,

          notes,
        };

        console.log(
          "BOOKING FLOW",
          bookingFlow
        );

        console.log(
          "PAYLOAD",
          payload
        );

        const res =
          await api.post(
            "/bookings",
            payload
          );

        if (
          res.data.success
        ) {
          setConfirmed(true);

          setCreatedBooking(
            res.data.data
          );

          toast.success(
            "Booking Confirmed!"
          );

          clearBookingFlow();

          setTimeout(() => {
            setShowSuccess(true);
          }, 700);
        }
      } catch (error) {
        console.error(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Booking failed"
        );
      } finally {
        setSubmitting(false);
      }
    };

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
      {/* Background */}
      {dark && (
        <>
          <GridBackground />

          <GlowOrb className="w-[420px] h-[420px] -top-[180px] -left-[140px]" />

          <GlowOrb className="w-[340px] h-[340px] -bottom-[80px] -right-[80px]" />
        </>
      )}

      {/* Success Overlay */}
      <SuccessOverlay
        visible={showSuccess}
        bookingId={
          createdBooking?.bookingId
        }
        onClose={() => {
          setShowSuccess(false);

          navigate("/bookings");
        }}
      />

      <div className="relative z-10">
        <BookingHeader />

        {/* PAGE TITLE */}
        <div className="px-4 lg:px-8 max-w-[1180px] mx-auto pt-1 pb-4">
          <h1
            className={`
              text-[28px]
              lg:text-[34px]
              font-extrabold

              ${
                dark
                  ? "text-[#F9FAFB]"
                  : "text-[#111827]"
              }
            `}
          >
            Review & Confirm
          </h1>

          <p
            className={`
              mt-1 text-[14px]

              ${
                dark
                  ? "text-[#9CA3AF]"
                  : "text-gray-500"
              }
            `}
          >
            Step 4 of 4
          </p>
        </div>

        {/* CONTENT */}
        <div
          className="
            w-full
            max-w-[1180px]
            mx-auto

            px-4 lg:px-6

            lg:grid
            lg:grid-cols-[minmax(0,1fr)_360px]

            xl:grid-cols-[minmax(0,1fr)_380px]

            gap-6

            pb-[140px]
          "
        >
          {/* LEFT */}
          <div>
            {station && (
              <SelectedStationCard
                station={station}
              />
            )}

            {charger && (
              <SelectedChargerCard
                charger={charger}
              />
            )}

            {slot && (
              <SelectedSlotCard
                slot={slot}
              />
            )}

            <BookingInfoCard
              notes={notes}
              onNotesChange={
                setNotes
              }
            />
          </div>

          {/* RIGHT */}
          <div className="min-w-0">
            <BatteryRingCard
              current={current}
              target={target}
            />

            <DesktopCTA
              estimates={estimates}
              slot={slot}
              confirmed={confirmed}
              submitting={submitting}
              onConfirm={
                handleConfirm
              }
            />
          </div>
        </div>

        {/* Mobile CTA */}
        <MobileCTA
          estimates={estimates}
          slot={slot}
          confirmed={confirmed}
          submitting={submitting}
          onConfirm={
            handleConfirm
          }
        />
      </div>
    </div>
  );
}