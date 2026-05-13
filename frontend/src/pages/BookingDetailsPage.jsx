import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

import GridBackground from "../components/Common/GridBackground";
import GlowOrb from "../components/Common/GlowOrb";

import BookingDetailsHeader from "../components/BookingDetails/BookingDetailsHeader";

import BookingHeroCard from "../components/BookingDetails/BookingHeroCard";

import ChargingProgressCard from "../components/BookingDetails/ChargingProgressCard";

import BookingMetaGrid from "../components/BookingDetails/BookingMetaGrid";

import VehicleInfoCard from "../components/BookingDetails/VehicleInfoCard";

import PaymentSummaryCard from "../components/BookingDetails/PaymentSummaryCard";

import BookingTimeline from "../components/BookingDetails/BookingTimeline";

import ActionButtons from "../components/BookingDetails/ActionButtons";
 
import { useTheme } from "../context/ThemeContext";

export default function BookingDetailsPage() {
  const { dark } = useTheme();

  const navigate = useNavigate();

  const { id } = useParams();

  const [booking, setBooking] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking =
    async () => {
      try {
        setLoading(true);

        const res =
          await api.get(
            `/bookings/${id}`
          );

        setBooking(res.data?.data);
      } catch (err) {
        console.error(err);

        toast.error(
          "Failed to load booking"
        );

        navigate("/bookings");
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex items-center justify-center
        "
      >
        Loading...
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div
      className={`
        min-h-screen
        relative
        overflow-hidden

        ${
          dark
            ? "bg-[#0B1220]"
            : "bg-[#F4F7FB]"
        }
      `}
    >
      {dark && (
        <>
          <GridBackground />

          <GlowOrb className="w-[420px] h-[420px] -top-[180px] -left-[140px]" />

          <GlowOrb className="w-[340px] h-[340px] -bottom-[80px] -right-[80px]" />
        </>
      )}

      <div className="relative z-10">
        <BookingDetailsHeader />

        <main
          className="
            max-w-[1200px]
            mx-auto

            px-4
            lg:px-6

            py-6

            space-y-5
          "
        >
          <BookingHeroCard
            booking={booking}
          />

          <ChargingProgressCard
            booking={booking}
          />

          <BookingMetaGrid
            booking={booking}
          />

          <VehicleInfoCard
            booking={booking}
          />

          <PaymentSummaryCard
            booking={booking}
          />

          <BookingTimeline
            booking={booking}
          />

          {/* <ActionButtons
            booking={booking}
          /> */}
        </main>
      </div>
    </div>
  );
}