import React, { useState, useEffect } from "react";
import { API_BASE } from "../lib/config";

function Section({ title, children }) {
  return (
    <div className="rounded-lg border border-zinc-700 p-4">
      <h2 className="mb-3 text-xl font-semibold text-white">{title}</h2>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const [userName, setUserName] = useState("");

  // Introduction state
  const [intro, setIntro] = useState({
    fullName: "",
    status: "hireme",
    socialLinks: {
      gmail: "",
      github: "",
      linkedin: "",
      x: "",
      phone: "",
      image: "",
    },
  });
  const [introMsg, setIntroMsg] = useState("");

  async function saveIntroduction(e) {
    e.preventDefault();
    setIntroMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/introduction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, ...intro }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setIntroMsg("Saved");
    } catch (err) {
      setIntroMsg(err.message);
    }
  }

  async function loadIntroduction() {
    if (!userName) return;
    setIntroMsg("");
    const res = await fetch(`${API_BASE}/api/introduction/${userName}`);
    if (res.ok) {
      const data = await res.json();
      setIntro({
        fullName: data.fullName || "",
        status: data.status || "hireme",
        socialLinks: {
          gmail: data.socialLinks?.gmail || "",
          github: data.socialLinks?.github || "",
          linkedin: data.socialLinks?.linkedin || "",
          x: data.socialLinks?.x || "",
          phone: data.socialLinks?.phone || "",
          image: data.socialLinks?.image || "",
        },
      });
    }
  }

  // Skills state
  const [skills, setSkills] = useState({
    languages: [],
    frameworks: [],
    Tools: [],
    DataBases: [],
    FrameworksAndLibraries: [],
  });
  const [skillsMsg, setSkillsMsg] = useState("");

  function parseCsv(str) {
    return str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  function joinCsv(arr) {
    return (arr || []).join(", ");
  }

  async function saveSkills(e) {
    e.preventDefault();
    setSkillsMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, ...skills }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSkillsMsg("Saved");
    } catch (err) {
      setSkillsMsg(err.message);
    }
  }

  async function loadSkills() {
    if (!userName) return;
    setSkillsMsg("");
    const res = await fetch(`${API_BASE}/api/skills/${userName}`);
    if (res.ok) setSkills(await res.json());
  }

  // Education state
  const [edu, setEdu] = useState({
    collegeName: "",
    branchName: "",
    passoutYear: "",
  });
  const [eduMsg, setEduMsg] = useState("");

  async function saveEducation(e) {
    e.preventDefault();
    setEduMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/education`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, ...edu }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setEduMsg("Saved");
    } catch (err) {
      setEduMsg(err.message);
    }
  }

  async function loadEducation() {
    if (!userName) return;
    setEduMsg("");
    const res = await fetch(`${API_BASE}/api/education/${userName}`);
    if (res.ok) {
      const data = await res.json();
      setEdu({
        collegeName: data.collegeName || "",
        branchName: data.branchName || "",
        passoutYear: data.passoutYear || "",
      });
    }
  }

  // Experience state
  const [expForm, setExpForm] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
  });
  const [exps, setExps] = useState([]);
  const [expMsg, setExpMsg] = useState("");

  async function addExperience(e) {
    e.preventDefault();
    setExpMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/experience`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, ...expForm }),
      });
      if (!res.ok) throw new Error("Failed to add");
      setExpForm({ company: "", role: "", duration: "", description: "" });
      await loadExperiences();
      setExpMsg("Added");
    } catch (err) {
      setExpMsg(err.message);
    }
  }

  async function loadExperiences() {
    if (!userName) return;
    const res = await fetch(`${API_BASE}/api/experience/${userName}`);
    if (res.ok) setExps(await res.json());
  }

  async function deleteExperience(id) {
    await fetch(`${API_BASE}/api/experience/${id}`, { method: "DELETE" });
    await loadExperiences();
  }

  useEffect(() => {
    // try to read username from token payload if present
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1] || ""));
        if (payload?.username) setUserName(payload.username);
      }
    } catch {}
    loadIntroduction();
    loadSkills();
    loadEducation();
    loadExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-[#0C0A09] p-4 text-white">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between rounded-lg border border-zinc-700 p-4">
          <div>
            <label className="block text-sm text-zinc-300">
              Username (key to your data)
            </label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="your-username"
            />
            <p className="mt-1 text-xs text-zinc-400">
              Data is saved by this userName across all sections.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="h-fit rounded-md bg-red-600 px-4 py-2"
          >
            Logout
          </button>
        </div>

        <Section title="Introduction">
          <form onSubmit={saveIntroduction} className="space-y-3">
            <input
              value={intro.fullName}
              onChange={(e) => setIntro({ ...intro, fullName: e.target.value })}
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Full name"
            />
            <select
              value={intro.status}
              onChange={(e) => setIntro({ ...intro, status: e.target.value })}
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
            >
              <option value="hireme">hireme</option>
              <option value="looking for a job">looking for a job</option>
              <option value="open to work">open to work</option>
            </select>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <input
                value={intro.socialLinks.gmail}
                onChange={(e) =>
                  setIntro({
                    ...intro,
                    socialLinks: {
                      ...intro.socialLinks,
                      gmail: e.target.value,
                    },
                  })
                }
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
                placeholder="Gmail"
              />
              <input
                value={intro.socialLinks.github}
                onChange={(e) =>
                  setIntro({
                    ...intro,
                    socialLinks: {
                      ...intro.socialLinks,
                      github: e.target.value,
                    },
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
              <input
                value={intro.socialLinks.phone}
                onChange={(e) =>
                  setIntro({
                    ...intro,
                    socialLinks: {
                      ...intro.socialLinks,
                      phone: e.target.value,
                    },
                  })
                }
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
                placeholder="Phone"
              />
              <input
                value={intro.socialLinks.image}
                onChange={(e) =>
                  setIntro({
                    ...intro,
                    socialLinks: {
                      ...intro.socialLinks,
                      image: e.target.value,
                    },
                  })
                }
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
                placeholder="Image URL"
              />
            </div>
            <button className="rounded-md bg-emerald-600 px-4 py-2">
              Save
            </button>
            {introMsg && (
              <span className="ml-2 text-sm text-zinc-400">{introMsg}</span>
            )}
          </form>
        </Section>

        <Section title="Skills">
          <form onSubmit={saveSkills} className="space-y-3">
            <input
              value={joinCsv(skills.languages)}
              onChange={(e) =>
                setSkills({ ...skills, languages: parseCsv(e.target.value) })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Languages (comma separated)"
            />
            <input
              value={joinCsv(skills.frameworks)}
              onChange={(e) =>
                setSkills({ ...skills, frameworks: parseCsv(e.target.value) })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Frameworks (comma separated)"
            />
            <input
              value={joinCsv(skills.Tools)}
              onChange={(e) =>
                setSkills({ ...skills, Tools: parseCsv(e.target.value) })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Tools (comma separated)"
            />
            <input
              value={joinCsv(skills.DataBases)}
              onChange={(e) =>
                setSkills({ ...skills, DataBases: parseCsv(e.target.value) })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Databases (comma separated)"
            />
            <input
              value={joinCsv(skills.FrameworksAndLibraries)}
              onChange={(e) =>
                setSkills({
                  ...skills,
                  FrameworksAndLibraries: parseCsv(e.target.value),
                })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Frameworks & Libraries (comma separated)"
            />
            <button className="rounded-md bg-emerald-600 px-4 py-2">
              Save
            </button>
            {skillsMsg && (
              <span className="ml-2 text-sm text-zinc-400">{skillsMsg}</span>
            )}
          </form>
        </Section>

        <Section title="Education">
          <form onSubmit={saveEducation} className="space-y-3">
            <input
              value={edu.collegeName}
              onChange={(e) => setEdu({ ...edu, collegeName: e.target.value })}
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="College Name"
            />
            <input
              value={edu.branchName}
              onChange={(e) => setEdu({ ...edu, branchName: e.target.value })}
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Branch Name"
            />
            <input
              value={edu.passoutYear}
              onChange={(e) => setEdu({ ...edu, passoutYear: e.target.value })}
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Passout Year"
            />
            <button className="rounded-md bg-emerald-600 px-4 py-2">
              Save
            </button>
            {eduMsg && (
              <span className="ml-2 text-sm text-zinc-400">{eduMsg}</span>
            )}
          </form>
        </Section>

        <Section title="Experience">
          <form onSubmit={addExperience} className="space-y-3">
            <input
              value={expForm.company}
              onChange={(e) =>
                setExpForm({ ...expForm, company: e.target.value })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Company"
            />
            <input
              value={expForm.role}
              onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Role"
            />
            <input
              value={expForm.duration}
              onChange={(e) =>
                setExpForm({ ...expForm, duration: e.target.value })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Duration"
            />
            <textarea
              value={expForm.description}
              onChange={(e) =>
                setExpForm({ ...expForm, description: e.target.value })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2"
              placeholder="Description"
            />
            <button className="rounded-md bg-emerald-600 px-4 py-2">Add</button>
            {expMsg && (
              <span className="ml-2 text-sm text-zinc-400">{expMsg}</span>
            )}
          </form>
          <div className="mt-4 space-y-2">
            {exps.map((e) => (
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
                  onClick={() => deleteExperience(e._id)}
                  className="rounded-md bg-red-600 px-3 py-1 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
