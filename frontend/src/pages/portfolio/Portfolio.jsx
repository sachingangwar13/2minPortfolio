import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE } from "../../lib/config";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Link2,
} from "lucide-react";

const API = "http://localhost:3000/api";

function Section({ id, title, children, gradient }) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-5xl scroll-mt-24 space-y-3 px-4 py-8"
    >
      <h2
        className={`bg-white bg-clip-text text-2xl font-bold text-transparent`}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Portfolio() {
  const { userName } = useParams();
  const [data, setData] = useState({ loading: true });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [intro, skills, edu, exp, projects, basic] = await Promise.all([
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
          fetch(`${API_BASE}/api/user/by-username/${userName}`).then((r) =>
            r.ok ? r.json() : null,
          ),
        ]);
        if (mounted)
          setData({ loading: false, intro, skills, edu, exp, projects, basic });
      } catch (e) {
        if (mounted) setData({ loading: false });
      }
    })();
    return () => {
      mounted = false;
    };
  }, [userName]);

  const socials = useMemo(() => {
    const s = data?.intro?.socialLinks || {};
    return [
      s.github ? { href: s.github, label: "GitHub", Icon: Github } : null,
      s.linkedin
        ? { href: s.linkedin, label: "LinkedIn", Icon: Linkedin }
        : null,
      s.gmail
        ? { href: `mailto:${s.gmail}`, label: "Email", Icon: Mail }
        : null,
    ].filter(Boolean);
  }, [data]);

  if (data.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0C0E] text-white">
        <div className="animate-pulse text-zinc-400">Loading portfolio…</div>
      </div>
    );
  }

  const intro = data.intro || {};
  const skills = data.skills || {};
  const edu = data.edu || {};
  const exp = data.exp || [];
  const projects = data.projects || [];
  const theme = data?.basic?.theme || "emerald";
  const gradient =
    theme === "violet"
      ? "from-violet-400 to-fuchsia-400"
      : theme === "cyan"
        ? "from-cyan-400 to-blue-400"
        : "from-emerald-400 to-cyan-400";

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white">
      {/* Top nav */}
      {/* <div className="sticky top-0 z-10 border-b border-zinc-800 bg-[#0B0C0E]/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <a href="#" className="text-sm font-semibold text-white">
            {userName}'s Portfolio
          </a>
          <nav className="hidden gap-5 text-sm text-zinc-300 md:flex">
            <a href="#about" className="hover:text-white">
              About
            </a>
            <a href="#skills" className="hover:text-white">
              Skills
            </a>
            <a href="#education" className="hover:text-white">
              Education
            </a>
            <a href="#experience" className="hover:text-white">
              Experience
            </a>
            <a href="#projects" className="hover:text-white">
              Projects
            </a>
          </nav>
        </div>
      </div> */}

      {/* Hero */}
      <div className="mx-auto max-w-5xl flex justify-between px-10 py-10 text-center">
        <div className="flex flex-col items-start gap-4">
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white bg-clip-text text-3xl font-bold text-transparent md:text-4xl pb-2"
          >
            {intro.fullName || userName}
          </motion.h1>
          <div className="flex items-center gap-3 text-md font-semibold text-zinc-300">
            {intro.status ? (
              <>
                <span className="rounded-full border border-emerald-500/30 bg-white px-3 py-0.5 text-black">
                  Hire Me!
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-white px-3 py-0.5 text-black">
                  Tech Enthusiast
                </span>
              </>
            ) : null}
          </div>
          <p className="text-lg font-bold text-zinc-400">{intro.title}</p>
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            {intro.location ? (
              <span className="inline-flex items-center gap-1 text-lg font-semibold">
                <MapPin className="h-4 w-4" /> {intro.location}
              </span>
            ) : null}
          </div>
          <div className="mt-2 flex gap-3">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-zinc-700 p-2 text-zinc-300 hover:border-zinc-500 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={
            intro?.socialLinks?.image ||
            "https://avatars.githubusercontent.com/u/9919?v=4"
          }
          alt="profile"
          className="h-28 w-28 rounded-sm object-cover shadow-lg"
        />
      </div>

      <Section id="about" title="About" gradient={gradient}>
        <p className="leading-relaxed text-zinc-300">
          {intro.about || "No bio yet."}
        </p>
      </Section>

      <Section id="education" title="Education" gradient={gradient}>
        {edu?.collegeName ? (
          <div className="flex justify-between rounded-lg border border-zinc-800 bg-gray-800/50 p-4">
            <div>
              <div className="text-lg font-semibold">{edu.collegeName}</div>
              <div className="mt-3 text-sm text-zinc-300">{edu.branchName}</div>
            </div>
            <div className="text-md my-2 font-semibold text-zinc-400">
              {edu.passoutYear - 4 + " - " + edu.passoutYear}
            </div>
          </div>
        ) : (
          <div className="text-sm text-zinc-500">No education added.</div>
        )}
      </Section>

      <Section id="skills" title="Skills" gradient={gradient}>
        <div className="flex flex-col gap-5">
          {[
            { label: "Languages", list: skills.languages },
            { label: "Frameworks", list: skills.frameworks },
            { label: "Tools", list: skills.Tools },
            { label: "Databases", list: skills.DataBases },
            {
              label: "Frameworks & Libraries",
              list: skills.FrameworksAndLibraries,
            },
          ].map((g) => (
            <div
              key={g.label}
              className="rounded-lg border border-zinc-800 bg-gray-800/50 p-4"
            >
              <div className="mb-2 text-lg font-semibold text-zinc-200">
                {g.label}
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {(g.list || []).length === 0 ? (
                  <span className="text-xs text-zinc-500">No items</span>
                ) : (
                  g.list.map((t, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-neutral-600/40 bg-gray-800 px-3 py-2 text-xs text-zinc-200"
                    >
                      {t}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="experience" title="Work Experience" gradient={gradient}>
        {exp.length === 0 ? (
          <div className="text-sm text-zinc-500">No experience added.</div>
        ) : (
          <div className="relative space-y-12 pl-10">
            {/* Timeline line */}

            {exp.map((e) => (
              <div key={e._id} className="relative space-y-12 pl-8">
                {/* Timeline dot */}
                <div className="absolute left-[11px] top-2 h-full w-0.5 bg-gray-700"></div>
                <div className="reltive">
                  <div className="absolute left-[-1px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-green-500 bg-green-500">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
                </div>

                {/* Card */}
                <div className="rounded-xl border border-zinc-800 bg-gray-800/70 p-5 shadow-md">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      {e.company}
                    </h3>
                    <span className="text-xs text-zinc-400">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-zinc-300">{e.role}</div>
                  <div className="text-xs text-zinc-400">{e.duration}</div>

                  {e.description && (
                    <>
                      <h4 className="mt-3 font-semibold text-zinc-200">
                        Responsibilities:
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                        {e.description}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section id="projects" title="Projects" gradient={gradient}>
        {projects.length === 0 ? (
          <div className="text-sm text-zinc-500">No projects yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <motion.a
                key={p._id}
                href={p.live || p.github || "#"}
                target={p.live || p.github ? "_blank" : undefined}
                rel="noreferrer"
                whileHover={{ y: -2 }}
                className="block rounded-lg border border-zinc-800 p-3 hover:border-zinc-600"
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="mb-2 h-40 w-full rounded-md object-cover"
                  />
                ) : null}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-semibold">{p.title}</div>
                    <p className="text-sm text-zinc-400">{p.description}</p>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 text-zinc-400" />
                </div>
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
              </motion.a>
            ))}
          </div>
        )}
      </Section>

      <footer className="mx-auto max-w-5xl px-4 py-10 text-center text-xs text-zinc-500">
        <div className="inline-flex items-center gap-2">
          <Link2 className="h-4 w-4" />
          <span>Generated with 2 Minute Portfolio</span>
        </div>
      </footer>
    </div>
  );
}
