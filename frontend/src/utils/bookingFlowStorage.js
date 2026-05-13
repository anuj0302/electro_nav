export const BOOKING_KEY =
  "ev_booking_flow";

/* ───────────────── GET ───────────────── */

export const getBookingFlow =
  () => {
    try {
      const raw =
        localStorage.getItem(
          BOOKING_KEY
        );

      if (!raw) return {};

      return JSON.parse(raw);
    } catch (error) {
      console.error(
        "Invalid booking flow data",
        error
      );

      localStorage.removeItem(
        BOOKING_KEY
      );

      return {}; 
    }
  };

/* ───────────────── SAVE ───────────────── */

export const saveBookingFlow =
  (data = {}) => {
    try {
      const existing =
        getBookingFlow();

      const updated = {
        ...existing,
        ...data,
      };

      localStorage.setItem(
        BOOKING_KEY,
        JSON.stringify(updated)
      );

      return updated;
    } catch (error) {
      console.error(
        "Failed to save booking flow",
        error
      );

      return null;
    }
  };

/* ───────────────── UPDATE FIELD ───────────────── */

export const updateBookingField =
  (key, value) => {
    try {
      const existing =
        getBookingFlow();

      const updated = {
        ...existing,
        [key]: value,
      };

      localStorage.setItem(
        BOOKING_KEY,
        JSON.stringify(updated)
      );

      return updated;
    } catch (error) {
      console.error(
        "Failed to update booking field",
        error
      );

      return null;
    }
  };

/* ───────────────── CLEAR ───────────────── */

export const clearBookingFlow =
  () => {
    localStorage.removeItem(
      BOOKING_KEY
    );
  };

/* ───────────────── VALIDATIONS ───────────────── */

export const hasStationSelected =
  () => {
    const booking =
      getBookingFlow();

    return Boolean(
      booking?.station
    );
  };

export const hasVehicleDetails =
  () => {
    const booking =
      getBookingFlow();

    return Boolean(
      booking?.vehicle
    );
  };

export const hasSlotSelected =
  () => {
    const booking =
      getBookingFlow();

    return Boolean(
      booking?.slot
    );
  };