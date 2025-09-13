import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { API_BASE } from "../../lib/config";

export default function ExperiencePage() {
  const { userName } = useOutletContext();
  const [form, setForm] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
  });
  const [list, setList] = useState([]);

  async function load() {
    if (!userName) return;
    const res = await fetch(`${API_BASE}/api/experience/${userName}`);
    if (res.ok) setList(await res.json());
  }

  useEffect(() => {
    load();
  }, [userName]);

  async function add(e) {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/experience`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userName, ...form }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Failed" }));
      alert(err.message || "Failed to add");
      return;
    }
    setForm({ company: "", role: "", duration: "", description: "" });
    load();
  }

  async function remove(id) {
    await fetch(`${API_BASE}/api/experience/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Experiences</h2>
        <p className="text-sm text-zinc-400">
          Add your professional experience
        </p>
      </div>
      <form onSubmit={add} className="space-y-3">
        <div>
          <label className="mb-1 block text-sm text-zinc-300">Company</label>
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="Company"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Role</label>
            <input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Role"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Duration</label>
            <input
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="e.g., Jan 2023 - Present"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="Describe your work"
          />
        </div>
        <button className="rounded-md bg-emerald-600 px-4 py-2">Add</button>
      </form>
      <div className="space-y-2">
        {list.map((e) => (
          <div
            key={e._id}
            className="flex items-center justify-between rounded-md border border-zinc-700 p-3"
          >
            <div>
              <p className="font-medium">
                {e.company} — {e.role}
              </p>
              <p className="text-sm text-zinc-400">{e.duration}</p>
            </div>
            <button
              onClick={() => remove(e._id)}
              className="rounded-md bg-red-600 px-3 py-1 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
