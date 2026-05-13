import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import toast from "react-hot-toast";
 
import {
  emailSignup,
  phoneSignup,
} from "../services/authApi";
import { useAuth } from "../context/AuthContext";

import GridBackground from "../components/Common/GridBackground";
import GlowOrb from "../components/Common/GlowOrb";
import InputField from "../components/Common/InputField";
import AuthHeader from "../components/Auth/AuthHeader";
import ThemeToggle from "../components/Common/ThemeToggle";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [type, setType] = useState("email");

  const [loading, setLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const [showPass2, setShowPass2] = useState(false);

  const [formData, setFormData] =
    useState({
      fullname: "",
      email: "",
      phonenumber: "",
      password: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match"
      );
    }

    try {
      setLoading(true);

      const payload =
        type === "email"
          ? {
              fullname: formData.fullname,
              email: formData.email,
              password: formData.password,
              confirmPassword:
                formData.confirmPassword,
            }
          : {
              fullname: formData.fullname,
              phonenumber:
                formData.phonenumber,
              password: formData.password,
              confirmPassword:
                formData.confirmPassword,
            };

      const res =
        type === "email"
          ? await emailSignup(payload)
          : await phoneSignup(payload);

      login(
  res.data.token,
  res.data.user
);

      toast.success(
        "Account created successfully"
      );

      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] dark:bg-[#0B1220] flex items-center justify-center px-4 py-6 overflow-hidden">

      <GridBackground />

      <GlowOrb className="w-[420px] h-[420px] -top-32 -left-24" />

      <GlowOrb className="w-[360px] h-[360px] -bottom-28 -right-28 opacity-50" />

      <div className="absolute top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#111827] border border-white/[0.07] rounded-3xl px-8 py-9 shadow-[0_8px_48px_rgba(0,0,0,0.4)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22C55E]/50 to-transparent" />

          <AuthHeader
            title="Create account"
            subtitle="Join the network — charge smarter"
          />

          {/* Toggle */}
          <div className="flex bg-[#1F2937] p-1 rounded-2xl mb-5">
            {["email", "phone"].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setType(item)}
                className={`
                  flex-1 py-2 rounded-xl text-sm font-medium transition-all
                  ${
                    type === item
                      ? "bg-[#22C55E] text-white"
                      : "text-[#9CA3AF]"
                  }
                `}
              >
                {item === "email"
                  ? "Email"
                  : "Phone"}
              </button>
            ))}
          </div>

          <InputField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            icon={User}
          />

          {type === "email" ? (
            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              icon={Mail}
            />
          ) : (
            <InputField
              label="Phone Number"
              type="text"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              placeholder="9876543210"
              icon={Phone}
            />
          )}

          <InputField
            label="Password"
            type={showPass ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            icon={Lock}
            autoComplete="new-password"
            rightSlot={
              <button
                type="button"
                onClick={() =>
                  setShowPass((v) => !v)
                }
              >
                {showPass ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            }
          />

          <InputField
            label="Confirm Password"
            type={showPass2 ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            icon={Lock}
            autoComplete="new-password"
            rightSlot={
              <button
                type="button"
                onClick={() =>
                  setShowPass2((v) => !v)
                }
              >
                {showPass2 ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#22C55E] text-white rounded-2xl py-[14px] text-[15px] font-semibold mt-3 hover:bg-[#16A34A] transition-all flex items-center justify-center gap-2"
          >
            {loading
              ? "Please wait..."
              : "Create Account"}

            <ArrowRight size={17} />
          </button>

          <p className="text-center text-[13px] text-[#9CA3AF] mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#22C55E]"
            >
              Sign in →
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}