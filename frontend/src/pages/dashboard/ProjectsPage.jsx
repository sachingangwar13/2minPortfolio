import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { API_BASE } from "../../lib/config";

export default function ProjectsPage() {
  const { userName } = useOutletContext();
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: [],
    github: "",
    live: "",
  });
  const [techText, setTechText] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [msg, setMsg] = useState("");

  async function load() {
    if (!userName) return;
    const res = await fetch(`${API_BASE}/api/projects/${userName}`);
    if (res.ok) setList(await res.json());
  }

  useEffect(() => {
    load();
  }, [userName]);

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    const fd = new FormData();
    fd.append("userName", userName);
    if (editingId) fd.append("id", editingId);
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append(
      "techStack",
      JSON.stringify(
        techText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      ),
    );
    fd.append("github", form.github);
    fd.append("live", form.live);
    if (file) fd.append("image", file);
    const res = await fetch(`${API_BASE}/api/projects`, {
      method: "POST",
      body: fd,
    });
    if (!res.ok) {
      setMsg("Failed to save");
      return;
    }
    setForm({
      title: "",
      description: "",
      techStack: [],
      github: "",
      live: "",
    });
    setTechText("");
    setFile(null);
    setPreview("");
    setEditingId("");
    setMsg("Saved");
    load();
  }

  async function remove(id) {
    await fetch(`${API_BASE}/api/projects/${id}`, { method: "DELETE" });
    load();
  }

  function startEdit(p) {
    setEditingId(p._id);
    setForm({
      title: p.title,
      description: p.description,
      techStack: p.techStack,
      github: p.github,
      live: p.live,
    });
    setTechText((p.techStack || []).join(", "));
    setPreview(p.image || "");
    setFile(null);
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Showcase Your Projects</h2>
        <p className="text-sm text-zinc-400">
          Highlight achievements and share with the world
        </p>
      </div>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="mb-1 block text-sm text-zinc-300">Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="Project title"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="h-28 w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="Describe the project"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">Tech Stack</label>
          <div className="flex gap-2">
            <input
              value={techText}
              onChange={(e) => setTechText(e.target.value)}
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="e.g., React, Node.js"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">
            Project Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setFile(f || null);
              setPreview(f ? URL.createObjectURL(f) : "");
            }}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
          />
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="mt-2 h-28 w-44 rounded-md object-cover"
            />
          ) : null}
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">
            GitHub Repository
          </label>
          <input
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="https://github.com/user/repo"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">Live Link</label>
          <input
            value={form.live}
            onChange={(e) => setForm({ ...form, live: e.target.value })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="https://project-live-link.com"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-md bg-blue-600 px-4 py-2">
            {editingId ? "Update" : "Create"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={() => {
                setEditingId("");
                setForm({
                  title: "",
                  description: "",
                  techStack: [],
                  github: "",
                  live: "",
                });
                setTechText("");
                setFile(null);
                setPreview("");
              }}
              className="rounded-md bg-zinc-700 px-4 py-2"
            >
              Cancel
            </button>
          ) : null}
          {msg && <span className="text-sm text-zinc-400">{msg}</span>}
        </div>
      </form>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {list.map((p) => (
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
            <div className="mt-2 flex flex-wrap gap-2">
              {(p.techStack || []).map((t, idx) => (
                <span
                  key={idx}
                  className="rounded bg-zinc-800 px-2 py-1 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              {p.github ? (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-400 underline"
                >
                  GitHub
                </a>
              ) : null}
              {p.live ? (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-emerald-400 underline"
                >
                  Live
                </a>
              ) : null}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => startEdit(p)}
                className="rounded-md bg-emerald-600 px-3 py-1 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => remove(p._id)}
                className="rounded-md bg-red-600 px-3 py-1 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
