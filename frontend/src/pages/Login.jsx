import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Mail, Lock, Phone, Eye, EyeOff, ArrowRight } from "lucide-react";

import toast from "react-hot-toast";

import { emailLogin, phoneLogin } from "../services/authApi";
import { useAuth } from "../context/AuthContext";

import GridBackground from "../components/Common/GridBackground";
import GlowOrb from "../components/Common/GlowOrb";
import InputField from "../components/Common/InputField";
import AuthHeader from "../components/Auth/AuthHeader";
import ThemeToggle from "../components/Common/ThemeToggle";
import LocationModal from "../components/Common/LocationModal";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [type, setType] = useState("email");

  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phonenumber: "",
    password: "",
  });

  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload =
        type === "email"
          ? {
              email: formData.email,
              password: formData.password,
            }
          : {
              phonenumber: formData.phonenumber,
              password: formData.password,
            };

      const res =
        type === "email"
          ? await emailLogin(payload)
          : await phoneLogin(payload);

      login(res.data.token, res.data.user);

      toast.success("Login successful");

      setShowLocationModal(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] dark:bg-[#0B1220] flex items-center justify-center px-4 py-6 overflow-hidden">
      <GridBackground />

      <GlowOrb className="w-[420px] h-[420px] -top-32 -left-24" />

      <GlowOrb className="w-[280px] h-[280px] -bottom-20 -right-20 opacity-60" />

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
            title="Welcome back"
            subtitle="Sign in to your charging account"
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
                    type === item ? "bg-[#22C55E] text-white" : "text-[#9CA3AF]"
                  }
                `}
              >
                {item === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

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
            autoComplete="current-password"
            rightSlot={
              <button type="button" onClick={() => setShowPass((v) => !v)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#22C55E] text-white rounded-2xl py-[14px] text-[15px] font-semibold mt-2 hover:bg-[#16A34A] transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Please wait..." : "Sign In"}

            <ArrowRight size={17} />
          </button>

          <p className="text-center text-[13px] text-[#9CA3AF] mt-5">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[#22C55E]">
              Create one →
            </Link>
          </p>
        </form>
      </div>

      <LocationModal
        open={showLocationModal}
        onClose={() => {
          setShowLocationModal(false);
          navigate("/");
        }}
      />
    </div>
  );
}
