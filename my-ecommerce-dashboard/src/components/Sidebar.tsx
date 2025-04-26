"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Products" },
//   { href: "/dashboard/products", label: "Products" },
//   { href: "/dashboard/analytics", label: "Analytics" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full h-full p-6 bg-white dark:bg-gray-800">
      {/* Logo / Title */}
      <div className="h-16 flex items-center justify-center text-xl font-bold border-b dark:border-gray-700">
        Admin Panel
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto mt-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              pathname === link.href
                ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                : "text-black dark:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
