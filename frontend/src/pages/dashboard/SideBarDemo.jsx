"use client";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Home,
  UserRound,
  GraduationCap,
  Wrench,
  BriefcaseBusiness,
  FolderGit2,
  Link2,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import NavBar from "../../component/NavBar";

// Import the sidebar components you wrote earlier
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../../component/ui/Sidebar";

export default function DashboardLayout() {
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(true); // controls sidebar open/close

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1] || ""));
        if (payload?.username) setUserName(payload.username);
      }
      const saved = localStorage.getItem("dashboardUserName");
      if (saved && !userName) setUserName(saved);
    } catch {}
  }, []);

  useEffect(() => {
    if (userName) localStorage.setItem("dashboardUserName", userName);
  }, [userName]);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  // All sidebar links:
  const links = [
    { label: "Home", href: "/dashboard", icon: <Home className="h-4 w-4" /> },
    {
      label: "Introduction",
      href: "/dashboard/introduction",
      icon: <UserRound className="h-4 w-4" />,
    },
    {
      label: "Education",
      href: "/dashboard/education",
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      label: "Skills",
      href: "/dashboard/skills",
      icon: <Wrench className="h-4 w-4" />,
    },
    {
      label: "Experiences",
      href: "/dashboard/experience",
      icon: <BriefcaseBusiness className="h-4 w-4" />,
    },
    {
      label: "Projects",
      href: "/dashboard/projects",
      icon: <FolderGit2 className="h-4 w-4" />,
    },
    {
      label: "Preview Portfolio",
      href: "/dashboard/preview",
      icon: <Home className="h-4 w-4" />,
    },
    {
      label: "Get Portfolio Link",
      href: "/dashboard/link",
      icon: <Link2 className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavBar />

      <div className="mx-auto flex w-full flex-1">
        {/* Sidebar */}
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <div className="mb-4 flex items-center gap-2 px-2">
                <LayoutDashboard className="h-5 w-5 text-emerald-400" />
                {open && (
                  <span className="text-sm font-semibold">
                    User Dashboard
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>

            {/* Logout button at bottom */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-zinc-300 hover:bg-zinc-800"
            >
              <LogOut className="h-4 w-4" />
              {open && <span>Logout</span>}
            </button>
          </SidebarBody>
        </Sidebar>

        {/* Main content */}
        <main className="min-h-screen flex-1 p-4 md:p-6 bg-[#0F1113]">
          <Outlet context={{ userName, setUserName }} />
        </main>
      </div>
    </div>
  );
}
