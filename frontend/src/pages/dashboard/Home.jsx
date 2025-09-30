import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { userName, setUserName } = useOutletContext();
  // console.log(userName);
  const [input, setInput] = useState("");
  useEffect(()=>{ setInput(userName || ""); }, [userName]);
  return (
    <div className="flex flex-col items-center justify-center mt-30 py-20 min-w-full text-center">
      <div className="text-3xl font-semibold mb-5">
        👋 Hello, {userName}!
      </div>
      <div className="text-lg">
        Welcome to dashboard - let's make your portfolio 🚀
      </div>
    </div>
  );
}


