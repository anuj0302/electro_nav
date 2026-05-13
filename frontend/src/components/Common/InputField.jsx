export default function InputField({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  optional = false,
  rightSlot,
  className = "",
  ...props
}) {
  return (
    <div className="mb-3.5">
      <label className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.6px] text-gray-600 dark:text-[#9CA3AF] mb-1.5">
        {label}

        {optional && (
          <span className="text-[10px] normal-case font-normal bg-[#1F2937] border border-white/10 rounded-md px-1.5 py-px text-[#9CA3AF]">
            Optional
          </span>
        )}
      </label>

      <div className="relative">
        {Icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 dark:text-[#9CA3AF]">
            <Icon size={16} />
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          className={`
            w-full
            bg-gray-100 dark:bg-[#1F2937]
            border border-gray-300 dark:border-white/[0.07]
            rounded-2xl
            py-3.5 pr-11
            text-[14px]
            text-[#111827] dark:text-[#F9FAFB]
            placeholder-[#9CA3AF]/60
            focus:border-[#22C55E]/50
            focus:ring-2 focus:ring-[#22C55E]/15
            outline-none transition-all duration-200
            ${Icon ? "pl-10" : "pl-4"}
            ${className}
          `}
          {...props}
        />

        {rightSlot && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightSlot}
          </span>
        )}
      </div>
    </div>
  );
}
