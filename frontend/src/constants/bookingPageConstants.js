const BOOKING_STATUS = {
  UPCOMING: "Upcoming",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};
 
const TABS = ["All", ...Object.values(BOOKING_STATUS)];
 
const CHARGER_TYPES = { CCS2: "CCS2", CHADEMO: "CHAdeMO", TYPE2: "Type 2", GBT: "GB/T" }; 