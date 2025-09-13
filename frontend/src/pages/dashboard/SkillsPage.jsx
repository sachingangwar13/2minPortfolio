import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { API_BASE } from "../../lib/config";

function parseCsv(str) {
  return str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
function joinCsv(arr) {
  return (arr || []).join(", ");
}

export default function SkillsPage() {
  const { userName } = useOutletContext();
  const [skills, setSkills] = useState({
    languages: [],
    frameworks: [],
    Tools: [],
    DataBases: [],
    FrameworksAndLibraries: [],
  });
  const [languagesText, setLanguagesText] = useState("");
  const [frameworksText, setFrameworksText] = useState("");
  const [toolsText, setToolsText] = useState("");
  const [databasesText, setDatabasesText] = useState("");
  const [falText, setFalText] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      if (!userName) return;
      const res = await fetch(`${API_BASE}/api/skills/${userName}`);
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
        setLanguagesText(joinCsv(data.languages));
        setFrameworksText(joinCsv(data.frameworks));
        setToolsText(joinCsv(data.Tools));
        setDatabasesText(joinCsv(data.DataBases));
        setFalText(joinCsv(data.FrameworksAndLibraries));
      } else {
        // reset if nothing found
        setLanguagesText("");
        setFrameworksText("");
        setToolsText("");
        setDatabasesText("");
        setFalText("");
      }
    })();
  }, [userName]);

  async function save(e) {
    e.preventDefault();
    setMsg("");
    const payload = {
      userName,
      languages: parseCsv(languagesText),
      frameworks: parseCsv(frameworksText),
      Tools: parseCsv(toolsText),
      DataBases: parseCsv(databasesText),
      FrameworksAndLibraries: parseCsv(falText),
    };
    const res = await fetch(`${API_BASE}/api/skills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });
    setMsg(res.ok ? "Saved" : "Failed to save");
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Skills</h2>
        <p className="text-sm text-zinc-400">
          Provide your skills as comma separated lists
        </p>
      </div>
      <form onSubmit={save} className="space-y-3">
        <div>
          <label className="mb-1 block text-sm text-zinc-300">Languages</label>
          <input
            value={languagesText}
            onChange={(e) => setLanguagesText(e.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="e.g., JavaScript, TypeScript, Python"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">Frameworks</label>
          <input
            value={frameworksText}
            onChange={(e) => setFrameworksText(e.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="e.g., React, Next.js"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">Tools</label>
          <input
            value={toolsText}
            onChange={(e) => setToolsText(e.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="e.g., Git, Docker"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">Databases</label>
          <input
            value={databasesText}
            onChange={(e) => setDatabasesText(e.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="e.g., MongoDB, PostgreSQL"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">
            Frameworks & Libraries
          </label>
          <input
            value={falText}
            onChange={(e) => setFalText(e.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="e.g., Tailwind, Redux"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-md bg-emerald-600 px-4 py-2">Save</button>
          <button
            type="button"
            onClick={async () => {
              await fetch(`${API}/skills/${userName}`, { method: "DELETE" });
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
