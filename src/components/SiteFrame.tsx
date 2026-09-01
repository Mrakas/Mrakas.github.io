import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "@/app/site.module.scss";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.site}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className={`${styles.shell} ${styles.main}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
