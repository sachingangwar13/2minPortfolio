import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { userName, setUserName } = useOutletContext();
  const [input, setInput] = useState("");
  useEffect(()=>{ setInput(userName || ""); }, [userName]);
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-3xl font-bold">Hello, {userName || "there"}!</h1>
      <p className="mt-2 text-zinc-400">Welcome to your dashboard – let’s make things happen! 🚀</p>
      <div className="mt-6 w-full max-w-sm text-left">
        <label className="mb-1 block text-xs text-zinc-400">Set your username (key to your data)</label>
        <input value={input} onChange={(e)=>setInput(e.target.value)} onBlur={()=>setUserName(input)} className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-2 text-sm" placeholder="your-username" />
        <p className="mt-1 text-xs text-zinc-500">Tip: set this once; other pages will load and save using it.</p>
      </div>
    </div>
  );
}


