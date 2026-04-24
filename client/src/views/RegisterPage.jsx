import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../constants/url";
import skirkIcon from "../assets/skirk-icon.webp";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${url}/auth/register`, { email, password });
      toast.success("Register Success!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background atmospheric glow */}
      <div className="absolute inset-0 bg-void-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <img
            src={skirkIcon}
            alt="Skirk Portal"
            className="w-12 h-12 object-contain"
          />
          <div className="text-center">
            <h1 className="font-cinzel text-2xl font-bold text-gold">
              Skirk Portal
            </h1>
            <p className="form-label mt-1">Begin Your Journey</p>
          </div>
        </div>

        {/* Form card */}
        <div className="card border-t-2 border-t-gold/40 p-8 flex flex-col gap-5">
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="traveller@teyvat.com"
                className="input-field"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="input-field"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn-gold mt-1" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="text-center text-parchment-dim text-xs">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gold hover:text-gold-light transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
