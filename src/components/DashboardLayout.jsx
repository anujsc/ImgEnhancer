import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import ThemeToggle from "../utilis/ThemeToggle";
import { IoIosLogOut } from "react-icons/io";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* 🌐 Top Navigation Bar */}
      <header className="w-full bg-white dark:bg-gray-800 shadow-md px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          {/* 🔰 Logo + Title */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <div className="w-12 h-12">
              <img
                src="/images/photo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="px-4 py-1 bg-gradient-to-tr from-blue-400 to-blue-600  rounded-xl">
              <h1 className="text-white font text-lg sm:text-xl md:text-2xl font-semibold text-center sm:text-left whitespace-nowrap">
                Img Enhancer | Bg Cutter
              </h1>
            </div>
          </div>

          {/* 🌙 Theme Toggle + 🔓 Logout */}
          <div className="flex items-center justify-center gap-4 mt-2 sm:mt-0">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="p-[2vh] bg-[#9333EA] hover:bg-[#b645cd] rounded-full text-white hover:scale-[110%] transition-all"
              title="Logout"
            >
              <IoIosLogOut size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* 📄 Page Content */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
