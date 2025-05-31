// src/pages/_app.tsx
import "../styles/globals.css";
 
import type { AppProps } from "next/app";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// 1) Define the shape of our ThemeContext
// import ThemeToggle from "@/components/ThemeToggle";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// 2) Create the context with a default placeholder
const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

// 3) Create a provider that wraps the app
function ThemeProvider({ children }: { children: ReactNode }) {
  // On the server or during SSR, window is undefined. Default to 'light'.
  const [theme, setTheme] = useState<Theme>("light");

  // When app first loads (client-side), read from localStorage and apply to <html>
  useEffect(() => {
    // 3a) Read saved theme from localStorage, if available
    const stored = typeof window !== "undefined"
      ? localStorage.getItem("theme")
      : null;

    const initial: Theme = stored === "dark" ? "dark" : "light";
    setTheme(initial);

    // 3b) Apply it to <html>
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // 4) toggleTheme flips between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      // 4a) Persist to localStorage
      localStorage.setItem("theme", next);
      // 4b) Add or remove the 'dark' class on <html>
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 5) Create a custom hook for easy access in other components
export function useTheme() {
  return useContext(ThemeContext);
}

// 6) Wrap the entire app with ThemeProvider
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
