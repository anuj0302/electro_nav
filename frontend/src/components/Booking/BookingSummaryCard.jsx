export function GlassCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        relative overflow-hidden
        rounded-[24px]
        p-[18px]
        mb-[14px]
        bg-white/95 dark:bg-[rgba(15,29,50,0.72)]
        backdrop-blur-xl
        border border-gray-200 dark:border-white/[0.08] 
        shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none
        transition-all duration-300
        ${className}
      `}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22C55E]/35 to-transparent" />

      {children}
    </div>
  );
}

export function CardTitle({
  icon: Icon,
  children,
  iconBg = "bg-[#22C55E]/10",
  iconColor = "text-[#22C55E]",
}) {
  return (
    <div className="flex items-center gap-2 mb-[14px] text-[14px] font-bold font-['Syne',sans-serif] text-[#111827] dark:text-[#F9FAFB]">
      <span
        className={`
          w-8 h-8
          rounded-[10px]
          flex items-center justify-center
          flex-shrink-0
          ${iconBg}
          ${iconColor}
        `}
      >
        <Icon size={15} />
      </span>

      {children}
    </div>
  );
}