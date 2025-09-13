import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How quickly can I set up my portfolio?",
    a: "Our platform allows for rapid portfolio creation. With a user-friendly interface and customizable templates, you can have your portfolio up and running in no time, often within minutes.",
  },
  {
    q: "Can I share my portfolio with others easily?",
    a: "Yes, you get a live link you can share anywhere — on resumes, social media, or with clients and employers.",
  },
  {
    q: "How can I collaborate with others on my portfolio?",
    a: "You can showcase projects, link to repositories, and include contact options so collaborators can reach out.",
  },
  {
    q: "Will my portfolio be optimized for search engines?",
    a: "We provide SEO-friendly structure and best practices to help your portfolio be discoverable.",
  },
  {
    q: "Is my data safe and private on this platform?",
    a: "We take privacy seriously. You control what you publish publicly, and sensitive data is never exposed.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="w-full py-14">
      <div className="mx-auto w-full max-w-5xl px-4">
        <h2 className="text-center text-4xl font-extrabold tracking-tight text-pink-400">
          Curious? Check Out Our FAQs!
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Find answers to your questions below
        </p>

        <div className="mt-8 space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={item.q}
                className="rounded-xl border border-zinc-700/70 bg-[#15161A] p-4 text-white"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-lg font-semibold hover:text-green-500 transition-all duration-200">{item.q}</span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 text-purple-400" />
                  ) : (
                    <Plus className="h-5 w-5 text-purple-400" />
                  )}
                </button>
                <div
                  className={`grid transition-all duration-400 ease-in-out overflow-hidden ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="text-sm leading-relaxed text-zinc-300 overflow-hidden">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


