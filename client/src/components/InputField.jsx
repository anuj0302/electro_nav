import { useTheme } from "../context/ThemeContext";

/**
 * Reusable InputField Component
 */
export default function InputField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  rightSlot,
  autoComplete,
  required = false,
}) {
  const { dark } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`
            text-sm font-medium
            ${dark ? "text-gray-300" : "text-gray-700"}
          `}
        >
          {label}

          {required && (
            <span className="ml-1 text-green-500">
              *
            </span>
          )}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="group relative flex items-center">
        {/* Left Icon */}
        {Icon && (
          <span
            className={`
              pointer-events-none absolute left-4
              transition-colors duration-200
              ${
                dark
                  ? "text-gray-500 group-focus-within:text-green-400"
                  : "text-gray-400 group-focus-within:text-green-600"
              }
            `}
          >
            {typeof Icon === "function" ? (
              <Icon size={18} strokeWidth={2} />
            ) : (
              Icon
            )}
          </span>
        )}

        {/* Input */}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          className={`
            h-14 w-full
            rounded-2xl border
            text-[15px]
            outline-none
            transition-all duration-200
            focus:ring-4
            ${
              Icon ? "pl-12" : "pl-5"
            }
            ${
              rightSlot ? "pr-12" : "pr-5"
            }
            ${
              dark
                ? `
                  border-gray-700
                  bg-[#1F2937]
                  text-white
                  placeholder:text-gray-500
                  focus:border-green-500
                  focus:ring-green-500/10
                `
                : `
                  border-gray-300
                  bg-gray-100
                  text-gray-900
                  placeholder:text-gray-400
                  focus:border-green-600
                  focus:ring-green-600/10
                `
            }
          `}
        />

        {/* Right Slot */}
        {rightSlot && (
          <span className="absolute right-4 flex items-center">
            {rightSlot}
          </span>
        )}
      </div>
    </div>
  );
}

// import { useTheme } from "../context/ThemeContext";

// /**
//  * InputField
//  * @param {string}   id
//  * @param {string}   label
//  * @param {string}   type          - "email" | "password" | "text"
//  * @param {string}   placeholder
//  * @param {string}   value
//  * @param {function} onChange
//  * @param {node}     icon          - Lucide icon component
//  * @param {node}     rightSlot     - Optional: eye toggle, etc.
//  * @param {string}   autoComplete
//  * @param {boolean}  required
//  */
// export default function InputField({
//   id,
//   label,
//   type = "text",
//   placeholder,
//   value,
//   onChange,
//   icon: Icon,
//   rightSlot,
//   autoComplete,
//   required = false,
// }) {
//   const { dark } = useTheme();

//   return (
//     <div className="flex flex-col gap-1.5">
//       <label
//         htmlFor={id}
//         className={`text-xs font-medium ${dark ? "text-[#9CA3AF]" : "text-[#6B7280]"}`}
//       >
//         {label}
//         {required && (
//           <span className={`ml-0.5 ${dark ? "text-[#22C55E]" : "text-[#16A34A]"}`}>*</span>
//         )}
//       </label>

//       <div className="relative flex items-center group">
//         {Icon && (
//           <span
//             className={`
//               absolute left-3.5 pointer-events-none transition-colors duration-200
//               ${dark
//                 ? "text-[#4B5563] group-focus-within:text-[#22C55E]"
//                 : "text-[#9CA3AF] group-focus-within:text-[#16A34A]"
//               }
//             `}
//           >
//             <Icon size={15} strokeWidth={2} />
//           </span>
//         )}

//         <input
//           id={id}
//           type={type}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           autoComplete={autoComplete}
//           required={required}
//           className={`
//             w-full rounded-2xl py-3.5 text-[15px] border outline-none
//             font-[inherit] transition-all duration-200 focus:ring-2
//             ${Icon    ? "pl-10" : "pl-4"}
//             ${rightSlot ? "pr-10" : "pr-4"}
//             ${dark
//               ? "bg-[#1F2937] border-[#374151] text-[#F9FAFB] placeholder-[#4B5563] focus:border-[#22C55E] focus:ring-[#22C55E]/15"
//               : "bg-[#F3F4F6] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#16A34A] focus:ring-[#16A34A]/15"
//             }
//           `}
//         />

//         {rightSlot && (
//           <span className="absolute right-3 flex items-center">{rightSlot}</span>
//         )}
//       </div>
//     </div>
//   );
// }