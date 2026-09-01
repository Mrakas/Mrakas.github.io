"use client";

import { useEffect, useState } from "react";
import styles from "@/app/site.module.scss";

export function ThemeButton() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(current);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("data-theme", next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      className={styles.iconButton}
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Light theme" : "Dark theme"}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "◐"}</span>
    </button>
  );
}
