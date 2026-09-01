"use client";

import { usePathname } from "next/navigation";
import styles from "@/app/site.module.scss";

export function Footer() {
  const pathname = usePathname() || "/";
  const zh = pathname === "/zh" || pathname.startsWith("/zh/");

  return (
    <footer className={styles.footer}>
      <div className={`${styles.shell} ${styles.footerInner}`}>
        <span>© {new Date().getFullYear()} Marcus Kwan</span>
        <span>
          {zh ? "基于 " : "Adapted from "}
          <a href="https://github.com/once-ui-system/magic-portfolio">Magic Portfolio</a>
          {zh ? " · CC BY-NC 4.0" : " · CC BY-NC 4.0"}
        </span>
      </div>
    </footer>
  );
}
