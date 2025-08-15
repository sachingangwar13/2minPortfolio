import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0C0A09] p-6 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold tracking-tight">404</h1>
        <p className="mt-2 text-zinc-400">
          The page you’re looking for doesn’t exist.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500"
          >
            Go Home
          </Link>
          <Link
            to="/dashboard"
            className="rounded-md bg-zinc-700 px-4 py-2 text-sm font-medium hover:bg-zinc-600"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
