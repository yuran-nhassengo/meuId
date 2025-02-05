"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import NotificationPanel from "../notification/indesx";

export const Header = () => {
  const pathname = usePathname();
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ease-in-out ${
        isSticky ? "sticky top-0 left-0 dark:bg-black bg-[#fdfffc] border-b" : "dark:bg-black bg-[#fdfffc]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="rounded-md flex justify-between items-center md:px-6 py-2 space-x-2">
          <h1 className="text-xl font-semibold">Meu ID</h1>

          <nav className="flex space-x-2 border-2 dark:border-white/30 p-1 rounded-2xl">
            {[
              { href: "/", label: "Home" },
              { href: "/perfil", label: "Perfil" },
              { href: "/documentos", label: "Documentos" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-xl transition-all duration-300 ease-in-out ${
                  pathname === href ? "bg-blue-500 text-white" : "dark:hover:bg-gray-600 hover:bg-gray-100"
                } hover:px-6`}
              >
                {label}
              </Link>
            ))}
          </nav>

            <NotificationPanel />
          

          <div className="sm:flex hidden space-x-2">
            <Link href="/login">
              <button
                className={`px-4 py-2 border-2 rounded-2xl transition-all duration-300 ease-in-out ${
                  pathname === "/login"
                    ? "bg-blue-500 text-white"
                    : "dark:hover:bg-gray-700 hover:bg-gray-200"
                }`}
              >
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-4 py-2 border rounded-2xl bg-black text-white hover:bg-blue-600 dark:hover:bg-white/80 dark:bg-white dark:text-black hover:px-6 transition-all duration-300 ease-in-out">
                Inscrever-se
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
