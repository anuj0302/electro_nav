import {
  Home as HomeIcon,
  Zap,
  CalendarDays,
  Heart,
  User,
  Layers,
  Star,
  Clock,
  CalendarCheck2,
  MapPin,
} from "lucide-react";

const FILTERS = [
  "Nearby",
  "Fast Charging",
  "Available Now",
  "AC Chargers",
  "DC Fast",
];

const NAV_ITEMS = [
  { label: "Home", Icon: HomeIcon, path: "/" }, 
  { label: "Map", Icon: MapPin, path: "/map" },
  { label: "Bookings", Icon: CalendarDays, path: "/bookings/my" },
];

const QUICK = [
  {
    label: "Home Charger",
    Icon: HomeIcon,
    bg: "bg-[#22C55E]/10",
    color: "text-[#22C55E]",
  },
  {
    label: "Work",
    Icon: Layers,
    bg: "bg-[#3B82F6]/10",
    color: "text-[#3B82F6]",
  },
  {
    label: "Saved",
    Icon: Star,
    bg: "bg-[#F59E0B]/10",
    color: "text-[#F59E0B]",
  },
  {
    label: "History",
    Icon: Clock,
    bg: "bg-[#EF4444]/10",
    color: "text-[#EF4444]",
  },
];

export { FILTERS, NAV_ITEMS, QUICK };
