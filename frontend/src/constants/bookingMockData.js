export const MOCK_SLOT = {
  time: "11:00 AM",
  date: "12 May 2026",
  duration: "45 mins",
};

export const MOCK_VEHICLE = {
  driverName: "",
  model: "Tata Nexon EV",
  registration: "",
  connector: "CCS2",
};

// src/mock/bookingsMockData.js

export const BOOKINGS_MOCK = [
  {
    id: "BK-10231",

    stationName: "Tata Power EZ Charge",

    address: 
      "MP Nagar Zone-1, Bhopal",

    date: "12 May 2026",

    time: "10:30 AM",

    charger: "DC Fast Charger • CCS2",

    energy: 28,

    status: "Upcoming",
  },

  {
    id: "BK-10232",

    stationName: "Ather Grid Station",

    address:
      "Arera Colony, Bhopal",

    date: "08 May 2026",

    time: "07:00 PM",

    charger: "Type 2 • 22kW",

    energy: 16,

    status: "Completed",
  },

  {
    id: "BK-10233",

    stationName: "ChargeZone Hub",

    address:
      "DB Mall Parking, Bhopal",

    date: "04 May 2026",

    time: "01:45 PM",

    charger: "DC Fast • CHAdeMO",

    energy: 34,

    status: "Completed",
  },

  {
    id: "BK-10234",

    stationName: "Statiq Charging Point",

    address:
      "New Market, Bhopal",

    date: "30 Apr 2026",

    time: "09:15 AM",

    charger: "CCS2 • 60kW",

    energy: 22,

    status: "Cancelled",
  },

  {
    id: "BK-10235",

    stationName: "Pulse Energy Station",

    address:
      "Hoshangabad Road, Bhopal",

    date: "15 May 2026",

    time: "06:30 PM",

    charger: "DC Fast • GB/T",

    energy: 41,

    status: "Upcoming",
  },
];