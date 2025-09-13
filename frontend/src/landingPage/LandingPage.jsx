import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CoverDemo } from "../component/Cover";
import { GithubIcon, TwitterIcon } from "lucide-react";
import { LaptopScreenshot } from "../component/LaptopScreenshot";
import HowItWorks from "../pages/HowItWorks";
import Features from "../component/Features";
import FAQ from "../component/FAQ";

function LandingPage() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token")),
  );
  // console.log(Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const onStorage = () => setLoggedIn(Boolean(localStorage.getItem("token")));
    window.addEventListener("storage", onStorage);
    // console.log(onStorage)
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.href = "/";
  }

  return (
    <div className="relative min-h-screen w-full bg-black">
         {" "}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
        }}
      />
      <nav className="flex justify-between relative z-10 w-full py-6">
        <div className="container mx-auto flex items-center justify-around px-4 sm:justify-between sm:px-6 lg:px-8">
          <span className="inline-flex cursor-pointer items-center gap-2 from-pink-500 to-violet-500 text-[1rem] font-bold tracking-tight text-white transition-colors duration-300 hover:text-neutral-400 sm:text-2xl">
            <img
              src="https://atomix-ui.vercel.app/_next/image?url=%2Flanding%2Fhero.png&w=64&q=75"
              alt="Portfolio Logo"
              className="mt-2 h-6 w-6 object-contain sm:h-8 sm:w-8"
            />
            <Link to="/">2MinutePortfolio</Link>
          </span>

          <div className=" gap-6 hidden md:flex ">
            <p
              className="font-bold text-neutral-50 hover:text-neutral-400 "
              onClick={() => {
                const el = document.getElementById("howItWorks");
                if (el)
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              How it Works
            </p>
            <p
              className="font-bold text-neutral-50 hover:text-neutral-400 "
              onClick={() => {
                const el = document.getElementById("features");
                if (el)
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Features
            </p>
          </div>
          <div className="flex  items-center gap-3 justify-between">
            <div className="flex gap-2 text-white sm:gap-4">
              <a
                href="https://twitter.com/sachinn_gangwar"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full hidden sm:flex p-1.5 transition-all duration-300 hover:bg-neutral-100 sm:p-2 dark:hover:bg-neutral-800"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>

              <a
                href="https://github.com/sachingangwar13"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full hidden sm:flex p-1.5 transition-all duration-300 hover:bg-neutral-100 sm:p-2 dark:hover:bg-neutral-800"
                aria-label="GitHub"
              >
                <GithubIcon />
              </a>
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="rounded-2xl bg-red-600 px-4 py-2 delay-100 hover:bg-red-800"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button className="rounded-2xl bg-blue-600 px-4 py-2 delay-100 hover:bg-blue-800">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="relative z-10 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="mt-20 w-full max-w-[100%] space-y-6 text-center md:max-w-4xl md:space-y-8">
          <h1 className="box-shadow-black bg-gradient-to-b from-neutral-50 to-neutral-500 bg-clip-text px-2 text-4xl leading-tight font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            Build Your Portfolio in Just <CoverDemo> 2 Minutes!</CoverDemo>
          </h1>

          <p className="mx-auto max-w-3xl px-2 text-center text-neutral-500 selection:bg-white sm:max-w-lg sm:text-lg md:max-w-2xl md:text-xl lg:text-xl">
            Effortlessly create a stunning portfolio and showcase your talents
            instantly with our intuitive generator!
          </p>

          <div className="flex flex-col items-center justify-center gap-3 px-2 pt-4 sm:flex-row sm:gap-6">
            <button className="group relative block w-48">
              <span className="absolute inset-0 rounded-lg bg-indigo-500"></span>
              <div className="relative -translate-x-1 -translate-y-1 rounded-lg border-2 border-indigo-500 bg-zinc-950 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0">
                <Link to={"/dashboard"}>
                  <div className="px-4 py-3 sm:px-6">
                    <p className="text-base font-semibold whitespace-nowrap text-white sm:text-lg">
                      Get Started
                    </p>
                  </div>
                </Link>
              </div>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById("features");
                if (el)
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="group relative w-48 overflow-hidden rounded-lg border border-b-4 border-zinc-700 bg-zinc-950 px-4 py-3 font-medium text-zinc-300 duration-300 outline-none hover:border-t-4 hover:border-b hover:brightness-110 active:opacity-75 sm:w-48 sm:px-6"
            >
              <span className="absolute -top-[150%] left-0 inline-flex h-[5px] w-80 rounded-md bg-zinc-400 opacity-50 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)] duration-500 ease-in-out group-hover:top-[150%]"></span>
              <span className="text-base whitespace-nowrap sm:text-lg">
                {" "}
                Learn More{" "}
              </span>
            </button>
          </div>
        </div>

        <div
          style={{ boxShadow: "0px 0px 4px 2px rgba(255, 255 ,255, .5)" }}
          className="mt-15 w-[60%] rounded-2xl border border-zinc-700 bg-transparent py-16 text-white"
        >
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className="mx-auto max-w-3xl space-y-8 text-center">
              <h1 className="text-3xl font-bold md:text-4xl">
                Don't Let Your Career Potential Go Unnoticed
              </h1>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center space-y-4">
                  <span className="text-5xl">😟</span>
                  <p className="text-center text-gray-300">
                    Struggling to stand out in a crowded job market
                  </p>
                  <span className="text-gray-400">➔</span>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <span className="text-5xl">😕</span>
                  <p className="text-center text-gray-300">
                    Unsure how to showcase skills effectively online
                  </p>
                  <span className="text-gray-400">➔</span>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <span className="text-5xl">😞</span>
                  <p className="text-center text-gray-300">
                    Missing out on opportunities due to poor online presence
                  </p>
                  <span className="text-gray-400">➔</span>
                </div>
              </div>

              <p className="mt-4 text-gray-400">⬇ there is an easier way</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h1 className="mx-auto w-[60%] bg-gradient-to-b from-neutral-50 to-neutral-800 bg-clip-text px-2 text-center text-4xl leading-tight font-bold tracking-tight text-transparent">
            Transform Your Ideas into Stunning Portfolios in Minutes!
          </h1>

          <LaptopScreenshot />
        </div>

        <div id="howItWorks">
          <HowItWorks />
        </div>
        <div id="features" className="mt-12 w-full">
          <Features />
        </div>
        <div id="faq" className="w-full">
          <FAQ />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
