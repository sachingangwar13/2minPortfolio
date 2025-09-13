import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
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
<<<<<<< HEAD
// import React from "react";
=======
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651

export default function DashboardLayout() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // console.log(token)
        const payload = JSON.parse(atob(token.split(".")[1] || ""));
        if (payload?.username) setUserName(payload.username);
        // console.log(atob(token.split(".")[1] || ""));
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

  const linkBase =
    "text-sm flex items-center gap-2 rounded-md px-3 py-2 text-zinc-200 hover:bg-zinc-800";
  const linkActive = "bg-zinc-800 text-white";

  return (
    
<<<<<<< HEAD
    <div className="min-h-screen bg-black text-white">
      <NavBar/>
=======
    <div className="min-h-screen bg-[#0B0C0E] text-white">
      <NavBar />
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651
      <div className="mx-auto flex ">
        
        <aside className="sticky top-0 hidden h-screen w-64 flex-col justify-between border-r border-zinc-800 bg-[#111214] px-3 pt-4 pb-4 md:flex">
          <div>
            <div className="mb-4 flex items-center gap-2 px-2">
              <LayoutDashboard className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-semibold">User Dashboard</span>
            </div>
            <nav className="space-y-1">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                <Home className="h-4 w-4" /> Home
              </NavLink>
              <NavLink
                to="/dashboard/introduction"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                <UserRound className="h-4 w-4" /> Introduction
              </NavLink>
              <NavLink
                to="/dashboard/education"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                <GraduationCap className="h-4 w-4" /> Education
              </NavLink>
              <NavLink
                to="/dashboard/skills"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                <Wrench className="h-4 w-4" /> Skills
              </NavLink>
              <NavLink
                to="/dashboard/experience"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                <BriefcaseBusiness className="h-4 w-4" /> Experiences
              </NavLink>
              <NavLink
                to="/dashboard/projects"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                <FolderGit2 className="h-4 w-4" /> Projects
              </NavLink>
              <NavLink
                to="/dashboard/preview"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                <Home className="h-4 w-4" /> Preview Portfolio
              </NavLink>
              <NavLink
                to="/dashboard/link"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                <Link2 className="h-4 w-4" /> Get Portfolio Link
              </NavLink>
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-zinc-300 hover:bg-zinc-800"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </aside>

        {/* Main content */}
        <main className="min-h-screen flex-1 p-4 md:p-6">
<<<<<<< HEAD
          {/* Top navbar inside dashboard content */}
          {/* <div className="mb-4 flex items-center justify-between rounded-lg border border-zinc-800 bg-[#0F1113] p-4">
=======
          
          {/* Top navbar inside dashboard content */}
          <div className="mb-4 flex items-center justify-between rounded-lg border border-zinc-800 bg-[#0F1113] p-4">
            {/* <div className="text-sm text-zinc-300">
              {userName ? `Signed in as ${userName}` : "Dashboard"}
            </div> */}
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard/preview"
                className="rounded-md bg-zinc-700 px-3 py-1 text-sm hover:bg-zinc-600"
              >
                Preview
              </Link>
              {userName ? (
                <a
                  href={`/portfolio/${userName}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-emerald-600 px-3 py-1 text-sm hover:bg-emerald-500"
                >
                  Open Portfolio
                </a>
              ) : null}
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-3 py-1 text-sm hover:bg-red-500"
              >
                Logout
              </button>
            </div>
<<<<<<< HEAD
          </div> */}
=======
          </div>
>>>>>>> a8e449fd799e33b483398f5a238847bbd3d74651
          <Outlet context={{ userName, setUserName }} />
        </main>
      </div>
    </div>
  );
}
