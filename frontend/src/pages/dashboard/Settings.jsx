import React, { useEffect, useState } from "react";
import { API_BASE } from "../../lib/config";

export default function Settings() {
  const [theme, setTheme] = useState("emerald");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/user/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.ok) {
          const data = await res.json();
          setTheme(data.theme || "emerald");
        }
      } catch {}
    })();
  }, []);

  async function save() {
    setMsg("");
    const res = await fetch(`${API_BASE}/api/user/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ theme }),
    });
    setMsg(res.ok ? "Saved" : "Failed");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Settings</h2>
      <div>
        <label className="mb-1 block text-sm text-zinc-300">Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
        >
          <option value="emerald">Emerald</option>
          <option value="violet">Violet</option>
          <option value="cyan">Cyan</option>
        </select>
      </div>
      <button onClick={save} className="rounded-md bg-emerald-600 px-4 py-2">
        Save
      </button>
      {msg && <span className="ml-2 text-sm text-zinc-400">{msg}</span>}
    </div>
  );
}
