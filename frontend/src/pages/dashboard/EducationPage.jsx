import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { API_BASE } from "../../lib/config";

export default function EducationPage() {
  const { userName } = useOutletContext();
  const [edu, setEdu] = useState({
    collegeName: "",
    branchName: "",
    passoutYear: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      if (!userName) return;
      const res = await fetch(`${API_BASE}/api/education/${userName}`);
      if (res.ok) {
        const data = await res.json();
        setEdu({
          collegeName: data.collegeName || "",
          branchName: data.branchName || "",
          passoutYear: data.passoutYear || "",
        });
      }
    })();
  }, [userName]);

  async function save(e) {
    e.preventDefault();
    setMsg("");
    const res = await fetch(`${API_BASE}/api/education`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ username: userName, ...edu }),
    });
    setMsg(res.ok ? "Saved" : "Failed to save");
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Education</h2>
        <p className="text-sm text-zinc-400">Tell us about your education</p>
      </div>
      <form onSubmit={save} className="space-y-3">
        <div>
          <label className="mb-1 block text-sm text-zinc-300">
            College Name
          </label>
          <input
            value={edu.collegeName}
            onChange={(e) => setEdu({ ...edu, collegeName: e.target.value })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="College Name"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">
            Branch Name
          </label>
          <input
            value={edu.branchName}
            onChange={(e) => setEdu({ ...edu, branchName: e.target.value })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="Branch Name"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">
            Passout Year
          </label>
          <input
            value={edu.passoutYear}
            onChange={(e) => setEdu({ ...edu, passoutYear: e.target.value })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="YYYY"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-md bg-emerald-600 px-4 py-2">Save</button>
          <button
            type="button"
            onClick={async () => {
              await fetch(`${API}/education/${userName}`, { method: "DELETE" });
              setMsg("Deleted");
            }}
            className="rounded-md bg-red-600 px-4 py-2"
          >
            Delete
          </button>
          {msg && <span className="text-sm text-zinc-400">{msg}</span>}
        </div>
      </form>
    </div>
  );
}
