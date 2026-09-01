"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { labels, Locale, localePath } from "@/content/site";
import { ThemeButton } from "./ThemeButton";
import styles from "@/app/site.module.scss";

const navItems = [
  { key: "work", path: "/work", icon: "◇" },
  { key: "gallery", path: "/gallery", icon: "▦" },
  { key: "notes", path: "/notes", icon: "≡" },
  { key: "about", path: "/about", icon: "○" },
] as const;

export function Header() {
  const pathname = usePathname() || "/";
  const locale: Locale = pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
  const cleanPath = locale === "zh" ? pathname.replace(/^\/zh/, "") || "/" : pathname;
  const otherLocale: Locale = locale === "en" ? "zh" : "en";
  const copy = labels[locale];

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label={locale === "zh" ? "主导航" : "Main navigation"}>
        <Link className={styles.brand} href={localePath(locale, "/")}>
          Marcus Kwan
        </Link>
        <div className={styles.navLinks}>
          {navItems.map((item) => {
            const selected = cleanPath === item.path || cleanPath.startsWith(`${item.path}/`);
            return (
              <Link
                key={item.key}
                className={`${styles.navLink} ${selected ? styles.navLinkActive : ""}`}
                href={localePath(locale, item.path)}
                aria-current={selected ? "page" : undefined}
              >
                <span aria-hidden="true">{item.icon} </span>
                {copy[item.key]}
              </Link>
            );
          })}
        </div>
        <div className={styles.navActions}>
          <Link
            className={styles.iconButton}
            href={localePath(otherLocale, cleanPath)}
            hrefLang={otherLocale === "zh" ? "zh-CN" : "en"}
            aria-label={locale === "en" ? "切换到中文" : "Switch to English"}
          >
            {copy.language}
          </Link>
          <ThemeButton />
        </div>
      </nav>
    </header>
  );
}
