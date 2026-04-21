import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { url } from "../constants/url";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/auth/register`, {
        email,
        password,
      });

      toast.success("Register Success!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-cinzel text-3xl font-bold text-gold mb-2">
            Skirk Portal
          </h1>
          <p className="form-label">Begin Your Journey</p>
        </div>

        <div className="card p-8">
          <h2 className="font-cinzel text-xl font-semibold text-parchment text-center mb-6">
            Register
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="traveller@teyvat.com"
                className="input-field"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="input-field"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button className="btn-gold mt-2">Register</button>
          </form>

          <p className="text-center text-parchment-dim text-xs mt-6">
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
