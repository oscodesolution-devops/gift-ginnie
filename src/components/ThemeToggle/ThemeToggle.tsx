import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { LuMoonStar } from "react-icons/lu";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>();

  useEffect(() => {
    const mode = localStorage.getItem("theme");
    if (
      mode === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    }
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="text-2xl" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <IoSunnyOutline /> : <LuMoonStar />}
    </div>
  );
}
