import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { API_BASE } from "../lib/config";
function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
<<<<<<< HEAD
  const [isSending, setIsSending] = useState(false);
=======
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Signup failed");
      // naive success: redirect to login
      window.location.href = "/login";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function sendOtp() {
    if (!form.email) return setError("Enter email first");
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/otp/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to send OTP");
      setOtpSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-opacity-50 flex h-screen flex-col items-center justify-center bg-[#0C0A09]">
      <div className="flex w-full max-w-md flex-col items-center rounded-lg bg-[#18181B] p-6">
        <h2 className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text pb-4 text-3xl font-bold text-transparent">
          Create an Account
        </h2>

        <form className="mt-10 w-full" onSubmit={handleSubmit}>
          <div className="top-1/2 flex -translate-y-1/2 items-center">
            <User className="absolute left-3 text-gray-700" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={onChange}
              className="bg-opacity-50 w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pr-3 pl-10 text-white placeholder-gray-400 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="top-1/2 mt-5 flex -translate-y-1/2 items-center">
            <Mail className="absolute left-3 text-gray-700" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              className="bg-opacity-50 w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pr-3 pl-10 text-white placeholder-gray-400 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            />
          </div>
<<<<<<< HEAD
          

=======
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={sendOtp}
              className="rounded-md bg-zinc-700 px-3 py-2 text-sm"
            >
              {otpSent ? "Resend OTP" : "Send OTP"}
            </button>
            {otpSent && (
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-40 rounded-md border border-zinc-700 bg-zinc-900 p-2 text-sm"
              />
            )}
          </div>
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651

          <div className="mt-5 flex -translate-y-1/2 items-center">
            <Mail className="absolute left-3 text-gray-700" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              className="bg-opacity-50 w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pr-3 pl-10 text-white placeholder-gray-400 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            />
          </div>

<<<<<<< HEAD
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={sendOtp}
              disabled={isSending} // optional state to indicate sending in progress
              className={`rounded-md px-4 py-2 text-sm font-medium transition 
                ${isSending ? "bg-zinc-500 cursor-not-allowed" : "bg-zinc-700 hover:bg-zinc-600"}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500`}
            >
              {isSending
                ? "Sending..."
                : otpSent
                  ? "Resend OTP"
                  : "Send OTP"}
            </button>

            {otpSent && (
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6} // adjust as needed
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                aria-label="Enter One Time Password"
                className="w-44 rounded-md border border-zinc-600 bg-zinc-900 p-2 text-sm text-white 
                 placeholder-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
              />
            )}
          </div>

          <div className="flex justify-center mt-4">
=======
          <div className="flex justify-center">
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651
            <button
              disabled={loading}
              className="transition-duration-200 w-full rounded-md bg-gradient-to-r from-green-400 to-emerald-500 py-3 font-bold hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-400 disabled:opacity-60"
            >
<<<<<<< HEAD
              {loading ?"Signing up..." : "Sign Up"}
=======
              {loading ? "Signing up..." : "Sign Up"}
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651
            </button>
          </div>
          {error && (
            <p className="mt-4 text-center text-sm text-red-400">{error}</p>
          )}
        </form>

        <div className="px-8 py-4">
          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-400 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
