import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../constants/url";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("access_token", data.access_token);
      toast.success("Login Success!");
      navigate("/characters");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      // console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-cinzel text-3xl font-bold text-gold mb-2">
            Skirk Portal
          </h1>
          <p className="form-label">Enter the Abyss</p>
        </div>

        <div className="card p-8">
          <h2 className="font-cinzel text-xl font-semibold text-parchment text-center mb-6">
            Login
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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

            <button className="btn-gold mt-2">Login</button>
          </form>

          <p className="text-center text-parchment-dim text-xs mt-6">
            No account?{" "}
            <Link
              to="/register"
              className="text-gold hover:text-gold-light transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
