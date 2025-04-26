"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // Sidebar hidden initially on mobile
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-black">
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? (isMobile ? "fixed inset-0 z-40" : "relative w-64") : (isMobile ? "hidden" : "w-20")
        } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSidebarToggle={handleSidebarToggle} isMobile={isMobile} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Overlay on mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={handleSidebarToggle}
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
        ></div>
      )}
    </div>
  );
}
