import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { API_BASE } from "../../lib/config";

export default function IntroductionPage() {
  const { userName } = useOutletContext();
  const [intro, setIntro] = useState({
    fullName: "",
    title: "",
    location: "",
    status: [],
    socialLinks: {
      gmail: "",
      github: "",
      linkedin: "",
      x: "",
      phone: "",
      image: "",
    },
    about: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      if (!userName) return;
      const res = await fetch(`${API_BASE}/api/introduction/${userName}`);
      if (res.ok) {
        const data = await res.json();
        setIntro({
          fullName: data.fullName || "",
          title: data.title || "",
          location: data.location || "",
          status: data.status || "",
          socialLinks: {
            gmail: data.socialLinks?.gmail || "",
            github: data.socialLinks?.github || "",
            linkedin: data.socialLinks?.linkedin || "",
            x: data.socialLinks?.x || "",
            phone: data.socialLinks?.phone || "",
            image: data.socialLinks?.image || "",
          },
          about: data.about || "",
        });
      }
    })();
  }, [userName]);

  async function save(e) {
    e.preventDefault();
    setMsg("");
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("fullName", intro.fullName);
    formData.append("title", intro.title);
    formData.append("location", intro.location);
    formData.append("status", intro.status);
    formData.append("about", intro.about);
    formData.append("socialLinks", JSON.stringify(intro.socialLinks));
    if (file) formData.append("image", file);
    const res = await fetch(`${API_BASE}/api/introduction`, {
      method: "POST",
      body: formData,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setMsg(res.ok ? "Saved" : "Failed to save");
  }

  async function remove() {
    setMsg("");
    const res = await fetch(`${API}/introduction/${userName}`, {
      method: "DELETE",
    });
    if (res.status === 204) {
      setIntro({
        fullName: "",
        title: "",
        location: "",
        status: "hireme",
        socialLinks: {
          gmail: "",
          github: "",
          linkedin: "",
          x: "",
          phone: "",
          image: "",
        },
        about: "",
      });
      setMsg("Deleted");
    } else {
      setMsg("Failed to delete");
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Introduction</h2>
        <p className="text-sm text-zinc-400">Basic profile and social links</p>
      </div>
      <form onSubmit={save} className="space-y-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-zinc-300">
              Full Name
            </label>
            <input
              value={intro.fullName}
              onChange={(e) => setIntro({ ...intro, fullName: e.target.value })}
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Status</label>{" "}
            <select
              required
              value={intro.status}
              onChange={(e) => setIntro({ ...intro, status: e.target.value })}
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            >
              {" "}
              <option value="" disabled>
                {" "}
                Select status{" "}
              </option>{" "}
              <option value="hireme">hireme</option>{" "}
              <option value="looking for a job">looking for a job</option>{" "}
              <option value="open to work">open to work</option>{" "}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">Title</label>
          <input
            value={intro.title}
            onChange={(e) => setIntro({ ...intro, title: e.target.value })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="e.g., Full Stack Developer"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">Location</label>
          <input
            value={intro.location}
            onChange={(e) => setIntro({ ...intro, location: e.target.value })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="e.g., City, State, Country"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">
            Social Links
          </label>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              value={intro.socialLinks.gmail}
              onChange={(e) =>
                setIntro({
                  ...intro,
                  socialLinks: { ...intro.socialLinks, gmail: e.target.value },
                })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Gmail"
            />
            <input
              value={intro.socialLinks.phone}
              onChange={(e) =>
                setIntro({
                  ...intro,
                  socialLinks: { ...intro.socialLinks, phone: e.target.value },
                })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Phone"
            />
            <input
              value={intro.socialLinks.github}
              onChange={(e) =>
                setIntro({
                  ...intro,
                  socialLinks: { ...intro.socialLinks, github: e.target.value },
                })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="GitHub URL"
            />
            <input
              value={intro.socialLinks.linkedin}
              onChange={(e) =>
                setIntro({
                  ...intro,
                  socialLinks: {
                    ...intro.socialLinks,
                    linkedin: e.target.value,
                  },
                })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="LinkedIn URL"
            />
            <input
              value={intro.socialLinks.x}
              onChange={(e) =>
                setIntro({
                  ...intro,
                  socialLinks: { ...intro.socialLinks, x: e.target.value },
                })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="X URL"
            />
            <div>
              <label className="mb-1 block text-sm text-zinc-300">
                Profile Image
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
              {preview || intro.socialLinks.image ? (
                <img
                  src={preview || intro.socialLinks.image}
                  alt="preview"
                  className="mt-2 h-24 w-24 rounded-full object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-300">About</label>
          <textarea
            value={intro.about}
            onChange={(e) => setIntro({ ...intro, about: e.target.value })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            placeholder="Tell us about yourself"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-md bg-blue-600 px-4 py-2">Create</button>
          <button type="submit" className="rounded-md bg-emerald-600 px-4 py-2">
            Update
          </button>
          <button
            type="button"
            onClick={remove}
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
