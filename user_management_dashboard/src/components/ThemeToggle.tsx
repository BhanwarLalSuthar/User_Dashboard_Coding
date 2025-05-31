// src/components/ThemeToggle.tsx

import { useTheme } from "@/pages/_app"; // adjust path if your hook is in a different folder

export default function ThemeToggle() {
  // Destructure theme & toggleTheme from context
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle Dark / Light Mode"
    >
      {theme === "light" ? (
        // Moon icon or “🌙” for switching to dark
        <span className="text-xl">🌙</span>
      ) : (
        // Sun icon or “☀️” for switching to light
        <span className="text-xl">☀️</span>
      )}
    </button>
  );
}
