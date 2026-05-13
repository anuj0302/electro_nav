import { useMemo } from "react";

import { computeEstimates } from "../utils/bookingHelpers";

export default function useBookingEstimates(current, target) {
  return useMemo(() => computeEstimates(current, target), [current, target]);
}
 