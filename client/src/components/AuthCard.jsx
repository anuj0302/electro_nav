import { useTheme } from "../context/ThemeContext";

/**
 * AuthCard — shared elevated card used by Login & Signup.
 */
export default function AuthCard({ children }) {
  const { dark } = useTheme();

  return (
    <div
      className={`
        relative z-10
        w-full max-w-2xl
        rounded-3xl border
        p-6 md:p-10
        transition-all duration-300
        animate-fadeIn
        ${
          dark
            ? "border-[#374151] bg-[#111827]"
            : "border-[#E5E7EB] bg-white"
        }
      `}
      style={{
        boxShadow: dark
          ? "0 25px 60px rgba(0,0,0,0.5)"
          : "0 10px 40px rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex flex-col gap-6">
        {children}
      </div>
    </div>
  );
}