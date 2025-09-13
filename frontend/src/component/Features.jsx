import React from "react";
import {
  Rocket,
  Link2,
  UsersRound,
  Palette,
  ClipboardList,
  Search,
  BarChart3,
  Smartphone,
} from "lucide-react";

const features = [
  {
    title: "Rapid Portfolio Creation",
    desc:
      "Build your portfolio in no time with our user‑friendly interface, allowing you to showcase your work effortlessly.",
    Icon: Rocket,
  },
  {
    title: "Instant Portfolio Links",
    desc:
      "Get a live link to your portfolio within minutes so you can share achievements with potential clients and employers.",
    Icon: Link2,
  },
  {
    title: "Collaborate with Talented Individuals",
    desc:
      "Connect and collaborate with skilled professionals to enhance your projects and expand your network.",
    Icon: UsersRound,
  },
  {
    title: "Customizable Templates",
    desc:
      "Choose from a variety of professional templates to craft a unique, visually appealing portfolio.",
    Icon: Palette,
  },
  {
    title: "Integrated Project Management Tools",
    desc:
      "Utilize built‑in tools to manage projects efficiently, track progress, and keep everything organized.",
    Icon: ClipboardList,
  },
  {
    title: "SEO Optimization",
    desc:
      "Optimize your portfolio for search engines to increase visibility and attract more opportunities.",
    Icon: Search,
  },
  {
    title: "Analytics Dashboard",
    desc:
      "Gain insights on visitors and engagement to make informed improvements to your portfolio.",
    Icon: BarChart3,
  },
  {
    title: "Mobile‑Friendly Design",
    desc:
      "Responsive layouts ensure your portfolio looks great on every device and screen size.",
    Icon: Smartphone,
  },
];

export default function Features() {
  return (
    <section className="w-full py-14">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Features
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-zinc-700/70 bg-[#15161A] p-5 text-center shadow-[0_0_0_1px_rgba(0,0,0,0.2)] transition hover:border-zinc-600"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


