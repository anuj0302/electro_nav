import {
  BATTERY_KWH,
  CHARGER_POWER,
  RATE_PER_KWH,
  KM_PER_KWH,
} from "../constants/bookingConstants";

export function computeEstimates(current, target) {
  const delta = Math.max(0, target - current);

  const energy = Number(((delta / 100) * BATTERY_KWH).toFixed(1));

  return {
    energy,
    mins: Math.round((energy / CHARGER_POWER) * 60),
    cost: Math.round(energy * RATE_PER_KWH),
    km: Math.round(energy * KM_PER_KWH),
  };
}

export function generateBookingId() {
  return `EN-${new Date().getFullYear()}-${Math.floor(
    10000 + Math.random() * 90000,
  )}`;
} 

export function battFillClass(value) {
  if (value <= 25) {
    return "from-[#ef4444] to-[#f87171]";
  }

  if (value <= 55) {
    return "from-[#f59e0b] to-[#fcd34d]";
  }

  return "from-[#22C55E] to-[#86efac]";
}

export function ringStrokeColor(value) {
  if (value <= 25) return "#ef4444";

  if (value <= 55) return "#f59e0b";

  return "#22C55E";
}
