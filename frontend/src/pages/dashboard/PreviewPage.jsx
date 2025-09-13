import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { API_BASE } from "../../lib/config";

export default function PreviewPage() {
  const { userName } = useOutletContext();
  const [data, setData] = useState({});
  const [theme, setTheme] = useState("emerald");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    (async () => {
      if (!userName) return;
      const [intro, skills, edu, exp, projects, me] = await Promise.all([
        fetch(`${API_BASE}/api/introduction/${userName}`).then((r) =>
          r.ok ? r.json() : null,
        ),
        fetch(`${API_BASE}/api/skills/${userName}`).then((r) =>
          r.ok ? r.json() : null,
        ),
        fetch(`${API_BASE}/api/education/${userName}`).then((r) =>
          r.ok ? r.json() : null,
        ),
        fetch(`${API_BASE}/api/experience/${userName}`).then((r) =>
          r.ok ? r.json() : [],
        ),
        fetch(`${API_BASE}/api/projects/${userName}`).then((r) =>
          r.ok ? r.json() : [],
        ),
        fetch(`${API_BASE}/api/user/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then((r) => (r.ok ? r.json() : { theme: "emerald" })),
      ]);
      setData({ intro, skills, edu, exp, projects });
      setTheme(me.theme || "emerald");
    })();
  }, [userName]);

  return (
    <div className="space-y-4">
<<<<<<< HEAD
      <div className="flex flex-col items-center justify-between gap-10">
=======
      <div className="flex items-center flex-col justify-between">
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651
        <h2 className="text-xl font-semibold">Preview</h2>
        {userName && (
          <Link
            to={`/portfolio/${userName}`}
<<<<<<< HEAD
            className="rounded-md bg-emerald-600 px-4 py-2 text-lg hover:bg-emerald-800 duration-300ms"
=======
            className="rounded-md bg-emerald-600 mt-10 px-3 py-1 text-sm"
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651
          >
            Open Full Portfolio
          </Link>
        )}
      </div>
      {/* Theme chooser */}
      {/* <div className="rounded-lg border border-zinc-700 p-3">
        <div className="mb-2 text-sm text-zinc-300">
          Choose a theme to preview and save
        </div>
        <div className="flex gap-3">
          {["emerald", "violet", "cyan"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`rounded-md border px-3 py-1 text-sm ${theme === t ? "border-white" : "border-zinc-700"} bg-zinc-900`}
            >
              {t}
            </button>
          ))}
          <button
            disabled={saving}
            onClick={async () => {
              setSaveMsg("");
              setSaving(true);
              try {
                const res = await fetch(`${API_BASE}/api/user/me`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify({ theme }),
                });
                setSaveMsg(res.ok ? "Saved" : "Failed");
              } catch {
                setSaveMsg("Failed");
              } finally {
                setSaving(false);
              }
            }}
            className="rounded-md bg-emerald-600 px-3 py-1 text-sm disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Theme"}
          </button>
          {saveMsg && <span className="text-sm text-zinc-400">{saveMsg}</span>}
        </div>
      </div> */}
      {/* Lightweight embedded preview: show hero + projects thumbnails with theme color */}
      {/* {data?.intro && (
        <div className="rounded-lg border border-zinc-700 p-4">
          <div className="flex items-center gap-4">
            <img
              src={data.intro?.socialLinks?.image}
              alt="profile"
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <div className="text-lg font-semibold">{data.intro.fullName}</div>
              <div className="text-sm text-zinc-400">{data.intro.title}</div>
              <div
                className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-xs ${theme === "violet" ? "border-fuchsia-400 text-fuchsia-300" : theme === "cyan" ? "border-cyan-400 text-cyan-300" : "border-emerald-400 text-emerald-300"}`}
              >
                {theme} theme
              </div>
            </div>
          </div>
        </div>
      )} */}
<<<<<<< HEAD
      {/* {data.projects && data.projects.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.projects.map((p) => (
            <div key={p._id} className="rounded-lg border border-zinc-700 p-3">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  className="mb-2 h-40 w-full rounded-md object-cover"
                />
              ) : null}
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-zinc-400">{p.description}</p>
            </div>
          ))}
        </div>
      )} */}
=======
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651
    </div>
  );
}
