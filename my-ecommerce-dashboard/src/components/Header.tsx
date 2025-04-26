"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  onSidebarToggle: () => void;
  isMobile: boolean;
}

export default function Header({ onSidebarToggle, isMobile }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    alert("Logout clicked!");
  };

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center gap-3">
        {isMobile && (
          <button onClick={onSidebarToggle} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <Menu size={28} className="text-black dark:text-white" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-black dark:text-white">Dashboard</h1>
      </div>

      <div className="flex items-center gap-5">
        {/* Dark Mode Toggle */}
        <button
          onClick={handleToggleDarkMode}
          className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="font-medium text-black dark:text-white">Admin</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-500 text-sm hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
