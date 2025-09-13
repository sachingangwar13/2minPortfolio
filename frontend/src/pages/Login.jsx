import React, { useEffect, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../lib/config";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleReady, setGoogleReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = "google-oauth-script";
    if (document.getElementById(id)) {
      setGoogleReady(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.defer = true;
    s.id = id;
    s.onload = () => setGoogleReady(true);
    document.body.appendChild(s);
    // global callback
    // eslint-disable-next-line no-undef
    window.handleGoogleCredential = async (resp) => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: resp.credential }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Google login failed");
        localStorage.setItem("token", data.token);
        localStorage.removeItem("dashboardUserName");
        navigate("/dashboard", { replace: true });
      } catch (e) {
        setError(e.message);
      }
    };
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Login failed");
      localStorage.setItem("token", data.token);
      localStorage.removeItem("dashboardUserName");
      navigate("/dashboard", { replace: true });
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

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#0C0A09]">
      <div className="flex h-90 w-90 flex-col items-center rounded-lg bg-[#18181B] p-6">
        <h1 className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text pb-4 text-4xl font-bold text-transparent">
          Login
        </h1>

        <form className="mt-10 w-full" onSubmit={handleSubmit}>
          <div className="top-1/2 flex -translate-y-1/2 items-center">
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

          <div className="flex justify-center">
            <button
              disabled={loading}
              className="transition-duration-200 w-full rounded-md bg-gradient-to-r from-green-400 to-emerald-500 py-3 text-xl font-bold hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-400 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          {googleReady && (
            <div className="mt-4">
              <div
                id="g_id_onload"
                data-client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleGoogleCredential"
                data-auto_select="false"
              />
              <div
                className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
              ></div>
            </div>
          )}
          {error && (
            <p className="mt-4 text-center text-sm text-red-400">{error}</p>
          )}
        </form>

        <div className="mt-10 flex items-center justify-center">
          <p className="text-white">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-500 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
