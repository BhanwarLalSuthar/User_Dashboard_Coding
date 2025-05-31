// src/components/Layout.tsx

import Link from "next/link";
import { ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header / Navbar */}
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold">
            User Dashboard
          </Link>

          <div className="space-x-4">
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/dashboard/add" className="hover:underline">
              Add User
            </Link>
             {/* ===== Theme Toggle Button ===== */}
             <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4">
        <small>© {new Date().getFullYear()} User Dashboard Project</small>
      </footer>
    </div>
  );
}
