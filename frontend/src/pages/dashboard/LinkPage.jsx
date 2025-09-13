import React from "react";
import { useOutletContext } from "react-router-dom";

export default function LinkPage() {
  const { userName } = useOutletContext();
  const link = `${window.location.origin}/portfolio/${userName || ''}`;
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Portfolio Link</h2>
      <div className="rounded-md border border-zinc-700 bg-zinc-900 p-3 text-sm">{link}</div>
      <p className="text-xs text-zinc-400">You can implement the portfolio page later to read data by username.</p>
    </div>
  );
}


