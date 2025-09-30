import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GithubIcon, TwitterIcon } from "lucide-react";

export default function NavBar() {
    const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
   );
    // console.log(Boolean(localStorage.getItem("token")));
  
    useEffect(() => {
      const onStorage = () => setLoggedIn(Boolean(localStorage.getItem("token")));
      window.addEventListener("storage", onStorage);
      // console.log(onStorage)
      return () => window.removeEventListener("storage", onStorage);
    }, []);

    const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="relative z-10 md:flex w-full py-2 bg-neutral-800 ">
        <div className="container mx-auto flex items-center px-4 justify-between sm:px-6 lg:px-8">
          <span className="inline-flex cursor-pointer items-center gap-2 from-pink-500 to-violet-500 text-[1rem] font-bold tracking-tight text-white transition-colors duration-300 hover:text-neutral-400 sm:text-2xl">
            
              <img
              src="../../src/assets/white_on_trans.png"
              alt="Portfolio Logo"
              className="mt-2 h-6 w-6 object-contain sm:h-8 sm:w-8"
            />
            <Link to='/'>
              2MinutePortfolio
            </Link>
          </span>

          <div className="flex items-center gap-3">
            <div className="flex gap-2 text-white sm:gap-4">
              <a
                href="https://twitter.com/sachinn_gangwar"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-1.5 transition-all duration-300 hover:bg-neutral-100 sm:p-2 dark:hover:bg-neutral-800"
                aria-label="Twitter"
              >
                <TwitterIcon/>
              </a>

              <a
                href="https://github.com/sachingangwar13"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-1.5 transition-all duration-300 hover:bg-neutral-100 sm:p-2 dark:hover:bg-neutral-800"
                aria-label="GitHub"
              >
                <GithubIcon/>
              </a>
              {loggedIn ? (
                <button onClick={handleLogout} className="rounded-2xl bg-red-600 px-4 py-2 delay-100 hover:bg-red-800">
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
  )
}
