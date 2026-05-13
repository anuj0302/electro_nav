import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  LogIn,
} from "lucide-react";

import ThemeToggle from "../components/ThemeToggle";
import GlowOrb from "../components/GlowOrb";
import GridBackground from "../components/GridBackground";
import InputField from "../components/InputField";
import BrandHeader from "../components/BrandHeader";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B1220] px-4 py-10">
      <GridBackground />
      <GlowOrb />
      <ThemeToggle />

      <div
        className="
          relative z-10
          w-full max-w-2xl
          rounded-3xl
          border border-gray-800
          bg-[#111827]
          p-8 md:p-10
          shadow-2xl shadow-black/40
        "
      >
        <BrandHeader />

        <div className="mt-8">
          <h2 className="mb-2 text-4xl font-bold tracking-tight text-white">
            Welcome Back
          </h2>

          <p className="mb-8 text-base text-gray-400">
            Sign in to continue your charging journey.
          </p>

          <form className="space-y-5">
            <InputField
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
            />

            <InputField
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-green-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="
                flex w-full items-center justify-center gap-2
                rounded-2xl bg-green-500
                py-4 font-semibold text-white
                transition-all duration-200
                hover:bg-green-600
                active:scale-[0.98]
              "
            >
              <LogIn size={18} />
              Sign In
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
                hover:border-green-500
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
                hover:border-green-500
              "
            >
              Apple
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-green-400 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import { useState } from "react";
// import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from "lucide-react";

// import { useTheme } from "../context/ThemeContext";
// import ThemeToggle from "../components/ThemeToggle";
// import GridBackground from "../components/GridBackground";
// import GlowOrb from "../components/GlowOrb";
// import AuthCard from "../components/AuthCard";
// import BrandHeader from "../components/BrandHeader";
// import InputField from "../components/InputField";
// import SocialButton from "../components/SocialButton";
// import { GoogleIcon, AppleIcon } from "../components/SocialIcons";

// // import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const { dark } = useTheme();

//   const [email,    setEmail]    = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [loading,  setLoading]  = useState(false);
//   const [error,    setError]    = useState("");

//   const green         = dark ? "#22C55E" : "#16A34A";
//   const textSecondary = dark ? "text-[#9CA3AF]" : "text-[#6B7280]";
//   const textPrimary   = dark ? "text-[#F9FAFB]" : "text-[#111827]";
//   const divider       = dark ? "bg-[#374151]"   : "bg-[#E5E7EB]";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!email.trim() || !password.trim()) {
//       setError("Please fill in both fields.");
//       return;
//     }
//     setLoading(true);
//     try {
//       await new Promise((r) => setTimeout(r, 1600));
//       console.log("Logged in:", { email });
//     } catch (err) {
//       setError(err?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // PAGE WRAPPER — uses a full-page fixed overlay so centering is
//   // completely independent of any parent flex/block chain.
//   return (
//     <>
//       {/* Full-screen background layer */}
//       <div className=""
//         style={{
//           position: "fixed",
//           inset: 0,
//           backgroundColor: dark ? "#0B1220" : "#F9FAFB",
//           transition: "background-color 0.3s",
//           zIndex: 0,
//         }}
//       />
//       <GridBackground />
//       <GlowOrb />
//       <ThemeToggle />

//       {/* Scroll container — sits above background, centers the card */}
//       <div
//         style={{
//           position: "relative",
//           zIndex: 1,
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: "2rem 1rem",
//           fontFamily: "'Inter', sans-serif",
//         }}
//       >
//         {/* Card width constraint */}
//         <div style={{ width: "100%", maxWidth: 460 }}>
//           <AuthCard>
//             <BrandHeader />

//             <h2
//               style={{
//                 fontSize: "1.875rem",
//                 fontWeight: 700,
//                 letterSpacing: "-0.02em",
//                 lineHeight: 1.2,
//                 marginBottom: "0.5rem",
//                 color: dark ? "#F9FAFB" : "#111827",
//               }}
//             >
//               Welcome back
//             </h2>
//             <p
//               style={{
//                 fontSize: "0.875rem",
//                 marginBottom: "1.75rem",
//                 color: dark ? "#9CA3AF" : "#6B7280",
//               }}
//             >
//               Sign in to manage your charging sessions
//             </p>

//             {error && (
//               <div
//                 style={{
//                   marginBottom: "1.25rem",
//                   padding: "0.625rem 1rem",
//                   borderRadius: "0.75rem",
//                   fontSize: "0.75rem",
//                   fontWeight: 500,
//                   background: "rgba(239,68,68,0.1)",
//                   border: "1px solid rgba(239,68,68,0.2)",
//                   color: "#F87171",
//                 }}
//               >
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }} noValidate>
//               <InputField
//                 id="email" label="Email address" type="email"
//                 placeholder="you@example.com" value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 icon={Mail} autoComplete="email" required
//               />

//               <InputField
//                 id="password" label="Password"
//                 type={showPass ? "text" : "password"}
//                 placeholder="Enter your password" value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 icon={Lock} autoComplete="current-password" required
//                 rightSlot={
//                   <button
//                     type="button"
//                     onClick={() => setShowPass((v) => !v)}
//                     aria-label={showPass ? "Hide password" : "Show password"}
//                     className={`transition-colors ${textSecondary} p-0.5`}
//                   >
//                     {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
//                   </button>
//                 }
//               />

//               <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "-0.25rem" }}>
//                 <a href="#" style={{ fontSize: "0.75rem", fontWeight: 500, color: green, textDecoration: "none" }}
//                   onMouseOver={e => e.target.style.textDecoration = "underline"}
//                   onMouseOut={e => e.target.style.textDecoration = "none"}
//                 >
//                   Forgot password?
//                 </a>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 style={{
//                   width: "100%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "0.5rem",
//                   padding: "0.875rem",
//                   borderRadius: "1rem",
//                   border: "none",
//                   cursor: loading ? "not-allowed" : "pointer",
//                   backgroundColor: green,
//                   color: "#fff",
//                   fontSize: "0.875rem",
//                   fontWeight: 600,
//                   opacity: loading ? 0.7 : 1,
//                   transition: "opacity 0.2s, transform 0.1s",
//                   fontFamily: "inherit",
//                 }}
//               >
//                 {loading ? (
//                   <Loader2 size={17} className="animate-spin" />
//                 ) : (
//                   <>
//                     <LogIn size={15} strokeWidth={2.5} />
//                     Sign in to your account
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Divider */}
//             <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.25rem 0" }}>
//               <div style={{ flex: 1, height: 1, backgroundColor: dark ? "#374151" : "#E5E7EB" }} />
//               <span style={{ fontSize: "0.75rem", color: dark ? "#9CA3AF" : "#6B7280" }}>or continue with</span>
//               <div style={{ flex: 1, height: 1, backgroundColor: dark ? "#374151" : "#E5E7EB" }} />
//             </div>

//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
//               <SocialButton icon={<GoogleIcon />}>Google</SocialButton>
//               <SocialButton icon={<AppleIcon color={dark ? "#F9FAFB" : "#111827"} />}>Apple</SocialButton>
//             </div>

//             <p style={{ textAlign: "center", fontSize: "0.75rem", color: dark ? "#9CA3AF" : "#6B7280" }}>
//               Don't have an account?{" "}
//               <a href="/signup" style={{ fontWeight: 600, color: green, textDecoration: "none" }}
//                 onMouseOver={e => e.target.style.textDecoration = "underline"}
//                 onMouseOut={e => e.target.style.textDecoration = "none"}
//               >
//                 Create account
//               </a>
//             </p>
//           </AuthCard>
//         </div>
//       </div>
//     </>
//   );
// }