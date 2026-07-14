import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  function applyTheme(isDark) {
    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const prefersDark = storedTheme === "dark" || (!storedTheme && mq.matches);
    applyTheme(prefersDark);

    const handler = (e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  function toggle() {
    const next = !dark;
    applyTheme(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold/20 dark:bg-ivory/10 dark:text-gold dark:hover:bg-ivory/20 transition-all duration-300"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export default DarkModeToggle;
