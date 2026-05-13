import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

import BookingPageLayout from "../components/BookingPage/BookingPageLayout";

export default function BookingPage() {
  const navigate =
    useNavigate();

  /* STATES */

  const [bookings, setBookings] =
    useState([]);
 
  const [loading, setLoading] =
    useState(true);

  const [activeFilter, setActiveFilter] =
    useState("All");

  /* FETCH BOOKINGS */

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings =
    async () => {
      try {
        setLoading(true);

        const res =
          await api.get(
            "/bookings/my"
          );

        console.log(
          "BOOKINGS RESPONSE",
          res.data
        );

        setBookings(
          res.data?.data || []
        );
      } catch (err) {
        console.error(
          "FETCH BOOKINGS ERROR",
          err
        );

        if (
          err?.response
            ?.status === 401
        ) {
          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          toast.error(
            "Session expired. Please login again."
          );

          navigate("/login");

          return;
        }

        toast.error(
          err?.response?.data
            ?.message ||
            "Failed to load bookings"
        );
      } finally {
        setLoading(false);
      }
    };

  /* CARD CLICK */

  const handleBookingClick =
    (booking) => {
      console.log(
        "BOOKING CLICKED",
        booking
      );
    };

  /* EXPLORE */

  const handleExploreStations =
    () => {
      navigate("/");
    };

  /* RENDER */

  return (
    <BookingPageLayout
      bookings={bookings}
      loading={loading}
      activeFilter={
        activeFilter
      }
      onFilterChange={
        setActiveFilter
      }
      onBookingClick={
        handleBookingClick
      }
      onExploreStations={
        handleExploreStations
      }
    />
  );
}