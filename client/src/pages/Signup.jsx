import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  UserPlus,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";
import GlowOrb from "../components/GlowOrb";
import GridBackground from "../components/GridBackground";
import InputField from "../components/InputField";
import BrandHeader from "../components/BrandHeader";

export default function Signup() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B1220] px-4 py-10">
      <GridBackground />
      <GlowOrb />
      <ThemeToggle />

      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-gray-800 bg-[#111827] p-8 shadow-2xl shadow-black/40 md:p-10">
        <BrandHeader />

        <div className="mt-8">
          <h2 className="mb-2 text-4xl font-bold tracking-tight text-white">
            Create Account
          </h2>

          <p className="mb-8 text-base text-gray-400">
            Join the EV charging network.
          </p>

          <form className="space-y-5">
            <InputField
              type="text"
              placeholder="Full Name"
              icon={<User size={18} />}
            />

            <InputField
              type="email"
              placeholder="Email Address"
              icon={<Mail size={18} />}
            />

            <InputField
              type={showPass ? "text" : "password"}
              placeholder="Create Password"
              icon={<Lock size={18} />}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {showPass ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              }
            />

            <button
              type="submit"
              className="
                flex w-full items-center justify-center gap-2
                rounded-2xl bg-[#22C55E]
                py-4 text-base font-semibold text-white
                transition-all duration-200
                hover:opacity-90 active:scale-[0.98]
              "
            >
              <UserPlus size={18} />
              Create Account
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-700" />
            <span className="text-sm text-gray-400">
              or continue with
            </span>
            <div className="h-px flex-1 bg-gray-700" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              className="
                rounded-2xl border border-gray-700
                bg-[#1F2937]
                py-3 text-white
                transition-all duration-200
                hover:border-[#22C55E]
              "
            >
              Google
            </button>

            <button
              className="
                rounded-2xl border border-gray-700
                bg-[#1F2937]
                py-3 text-white
                transition-all duration-200
                hover:border-[#22C55E]
              "
            >
              Apple
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#22C55E] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { Mail, Lock, Eye, EyeOff, UserPlus, Loader2, User, Car } from "lucide-react";

// import { useTheme } from "../context/ThemeContext";
// import ThemeToggle from "../components/ThemeToggle";
// import GridBackground from "../components/GridBackground";
// import GlowOrb from "../components/GlowOrb";
// import AuthCard from "../components/AuthCard";
// import BrandHeader from "../components/BrandHeader";
// import InputField from "../components/InputField";
// import SocialButton from "../components/SocialButton";
// import { GoogleIcon, AppleIcon } from "../components/SocialIcons";

// const PASSWORD_RULES = [
//   { label: "8+ characters",    test: (p) => p.length >= 8    },
//   { label: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
//   { label: "Number",           test: (p) => /[0-9]/.test(p) },
// ];

// function PasswordStrength({ password, dark }) {
//   const passed = PASSWORD_RULES.filter((r) => r.test(password)).length;
//   const barColors = ["#EF4444", "#F59E0B", "#22C55E"];
//   const labels    = ["Weak", "Fair", "Strong"];

//   if (!password) return null;
//   return (
//     <div style={{ marginTop: "0.375rem" }}>
//       <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.25rem" }}>
//         {[0, 1, 2].map((i) => (
//           <div key={i} style={{
//             flex: 1, height: 3, borderRadius: 99,
//             backgroundColor: i < passed ? barColors[passed - 1] : (dark ? "#374151" : "#E5E7EB"),
//             transition: "background-color 0.3s",
//           }} />
//         ))}
//       </div>
//       <p style={{ fontSize: "0.625rem", color: dark ? "#9CA3AF" : "#6B7280" }}>
//         Strength:{" "}
//         <span style={{
//           fontWeight: 600,
//           color: passed === 3 ? (dark ? "#22C55E" : "#16A34A") : passed === 2 ? "#F59E0B" : "#EF4444",
//         }}>
//           {labels[passed - 1] ?? "Weak"}
//         </span>
//       </p>
//     </div>
//   );
// }

// export default function Signup() {
//   const { dark } = useTheme();

//   const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", vehicleModel: "" });
//   const [showPass,    setShowPass]    = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [loading,     setLoading]     = useState(false);
//   const [error,       setError]       = useState("");

//   const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

//   const green = dark ? "#22C55E" : "#16A34A";
//   const textSecondary = dark ? "text-[#9CA3AF]" : "text-[#6B7280]";

//   const validate = () => {
//     if (!form.name.trim())              return "Full name is required.";
//     if (!form.email.trim())             return "Email is required.";
//     if (form.password.length < 8)       return "Password must be at least 8 characters.";
//     if (form.password !== form.confirm) return "Passwords do not match.";
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     const err = validate();
//     if (err) { setError(err); return; }
//     setLoading(true);
//     try {
//       await new Promise((r) => setTimeout(r, 1600));
//       console.log("Registered:", form);
//     } catch (err) {
//       setError(err?.message || "Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Full-screen background */}
//       <div style={{
//         position: "fixed", inset: 0,
//         backgroundColor: dark ? "#0B1220" : "#F9FAFB",
//         transition: "background-color 0.3s", zIndex: 0,
//       }} />
//       <GridBackground />
//       <GlowOrb />
//       <ThemeToggle />

//       {/* Scroll container — centers card */}
//       <div style={{
//         position: "relative", zIndex: 1,
//         minHeight: "100vh",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         padding: "2rem 1rem",
//         fontFamily: "'Inter', sans-serif",
//       }}>
//         <div style={{ width: "100%", maxWidth: 460 }}>
//           <AuthCard>
//             <BrandHeader />

//             <h2 style={{
//               fontSize: "1.5rem", fontWeight: 700,
//               letterSpacing: "-0.02em", marginBottom: "0.25rem",
//               color: dark ? "#F9FAFB" : "#111827",
//             }}>
//               Create your account
//             </h2>
//             <p style={{ fontSize: "0.875rem", marginBottom: "1.5rem", color: dark ? "#9CA3AF" : "#6B7280" }}>
//               Join 50,000+ EV drivers on the network
//             </p>

//             {error && (
//               <div style={{
//                 marginBottom: "1rem", padding: "0.625rem 1rem",
//                 borderRadius: "0.75rem", fontSize: "0.75rem", fontWeight: 500,
//                 background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171",
//               }}>
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }} noValidate>
//               <InputField id="name" label="Full name" type="text"
//                 placeholder="Alex Johnson" value={form.name}
//                 onChange={set("name")} icon={User} autoComplete="name" required />

//               <InputField id="email" label="Email address" type="email"
//                 placeholder="you@example.com" value={form.email}
//                 onChange={set("email")} icon={Mail} autoComplete="email" required />

//               <div>
//                 <InputField id="password" label="Password"
//                   type={showPass ? "text" : "password"}
//                   placeholder="Create a strong password" value={form.password}
//                   onChange={set("password")} icon={Lock}
//                   autoComplete="new-password" required
//                   rightSlot={
//                     <button type="button" onClick={() => setShowPass((v) => !v)}
//                       aria-label={showPass ? "Hide" : "Show"}
//                       className={`transition-colors ${textSecondary} p-0.5`}>
//                       {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
//                     </button>
//                   }
//                 />
//                 <PasswordStrength password={form.password} dark={dark} />
//               </div>

//               <InputField id="confirm" label="Confirm password"
//                 type={showConfirm ? "text" : "password"}
//                 placeholder="Re-enter your password" value={form.confirm}
//                 onChange={set("confirm")} icon={Lock}
//                 autoComplete="new-password" required
//                 rightSlot={
//                   <button type="button" onClick={() => setShowConfirm((v) => !v)}
//                     aria-label={showConfirm ? "Hide" : "Show"}
//                     className={`transition-colors ${textSecondary} p-0.5`}>
//                     {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
//                   </button>
//                 }
//               />

//               <InputField id="vehicleModel" label="EV model (optional)" type="text"
//                 placeholder="Tesla Model 3, Ather 450X…" value={form.vehicleModel}
//                 onChange={set("vehicleModel")} icon={Car} autoComplete="off" />

//               <p style={{ fontSize: "0.6875rem", lineHeight: 1.6, color: dark ? "#9CA3AF" : "#6B7280" }}>
//                 By creating an account you agree to our{" "}
//                 <a href="#" style={{ fontWeight: 500, color: green }}>Terms of Service</a>
//                 {" "}and{" "}
//                 <a href="#" style={{ fontWeight: 500, color: green }}>Privacy Policy</a>.
//               </p>

//               <button
//                 type="submit" disabled={loading}
//                 style={{
//                   width: "100%", display: "flex", alignItems: "center",
//                   justifyContent: "center", gap: "0.5rem",
//                   padding: "0.875rem", borderRadius: "1rem", border: "none",
//                   cursor: loading ? "not-allowed" : "pointer",
//                   backgroundColor: green, color: "#fff",
//                   fontSize: "0.875rem", fontWeight: 600,
//                   opacity: loading ? 0.7 : 1,
//                   transition: "opacity 0.2s", fontFamily: "inherit",
//                 }}
//               >
//                 {loading ? <Loader2 size={17} className="animate-spin" /> : (
//                   <><UserPlus size={15} strokeWidth={2.5} /> Create account</>
//                 )}
//               </button>
//             </form>

//             <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.25rem 0" }}>
//               <div style={{ flex: 1, height: 1, backgroundColor: dark ? "#374151" : "#E5E7EB" }} />
//               <span style={{ fontSize: "0.75rem", color: dark ? "#9CA3AF" : "#6B7280" }}>or sign up with</span>
//               <div style={{ flex: 1, height: 1, backgroundColor: dark ? "#374151" : "#E5E7EB" }} />
//             </div>

//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
//               <SocialButton icon={<GoogleIcon />}>Google</SocialButton>
//               <SocialButton icon={<AppleIcon color={dark ? "#F9FAFB" : "#111827"} />}>Apple</SocialButton>
//             </div>

//             <p style={{ textAlign: "center", fontSize: "0.75rem", color: dark ? "#9CA3AF" : "#6B7280" }}>
//               Already have an account?{" "}
//               <a href="/login" style={{ fontWeight: 600, color: green, textDecoration: "none" }}
//                 onMouseOver={e => e.target.style.textDecoration = "underline"}
//                 onMouseOut={e => e.target.style.textDecoration = "none"}
//               >
//                 Sign in
//               </a>
//             </p>
//           </AuthCard>
//         </div>
//       </div>
//     </>
//   );
// }