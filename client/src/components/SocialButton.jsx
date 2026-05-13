import { useTheme } from "../context/ThemeContext";

export default function SocialButton({
  children,
  icon,
  onClick,
}) {
  const { dark } = useTheme();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex h-14 w-full items-center justify-center gap-3
        rounded-2xl border
        px-4
        text-sm font-medium
        transition-all duration-200
        hover:scale-[1.02]
        active:scale-[0.98]
        ${
          dark
            ? `
              border-gray-700
              bg-[#1F2937]
              text-white
              hover:border-green-500
              hover:bg-[#243041]
            `
            : `
              border-gray-300
              bg-gray-100
              text-gray-900
              hover:border-green-600
              hover:bg-gray-200
            `
        }
      `}
    >
      {/* Icon */}
      {icon && (
        <span className="flex items-center justify-center">
          {icon}
        </span>
      )}

      {/* Text */}
      <span>{children}</span>
    </button>
  );
}

// import { useTheme } from "../context/ThemeContext";

// export default function SocialButton({ children, icon, onClick }) {
//   const { dark } = useTheme();

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`
//         flex-1 flex items-center justify-center gap-2
//         py-2.5 rounded-2xl border text-sm font-medium
//         transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]
//         ${dark
//           ? "bg-[#1F2937] border-[#374151] text-[#F9FAFB] hover:border-[#22C55E]"
//           : "bg-[#F3F4F6] border-[#E5E7EB] text-[#111827] hover:border-[#16A34A]"
//         }
//       `}
//     >
//       {icon}
//       {children}
//     </button>
//   );
// }