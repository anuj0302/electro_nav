const getStatusConfig = (status) => {
  const configs = {
    [BOOKING_STATUS.ACTIVE]: {
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      dot: "bg-green-400",
      glow: "shadow-green-500/20",
      icon: Activity,
      pulse: true,
    },
    [BOOKING_STATUS.UPCOMING]: {
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      dot: "bg-blue-400",
      glow: "shadow-blue-500/20",
      icon: Clock,
      pulse: false,
    },
    [BOOKING_STATUS.COMPLETED]: {
      color: "text-emerald-400", 
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      dot: "bg-emerald-400",
      glow: "shadow-emerald-500/20",
      icon: CheckCircle2,
      pulse: false,
    },
    [BOOKING_STATUS.CANCELLED]: {
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      dot: "bg-red-400",
      glow: "shadow-red-500/20",
      icon: XCircle,
      pulse: false,
    },
  };
  return configs[status] || configs[BOOKING_STATUS.UPCOMING];
};
 
const getProgressColor = (status) => {
  if (status === BOOKING_STATUS.ACTIVE) return "from-green-500 to-emerald-400";
  if (status === BOOKING_STATUS.COMPLETED) return "from-emerald-600 to-emerald-400";
  return "from-slate-600 to-slate-500";
};
 
const formatCurrency = (amount) => `₹${amount.toLocaleString("en-IN")}`;