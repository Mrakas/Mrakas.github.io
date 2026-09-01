import Image from "next/image";
import Link from "next/link";
import { labels, Locale, localize, localePath, Project } from "@/content/site";
import styles from "@/app/site.module.scss";

export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <Link className={styles.projectCard} href={localePath(locale, `/work/${project.slug}`)}>
      <div className={styles.projectImageWrap}>
        <Image
          className={styles.projectImage}
          src={project.cover}
          alt={localize(locale, project.coverAlt)}
          fill
          sizes="(max-width: 820px) 100vw, 50vw"
        />
        <span className={styles.playBadge}>{locale === "zh" ? "点击查看" : "Open to play"}</span>
      </div>
      <div className={styles.projectCardBody}>
        <div className={styles.projectMeta}>
          <span>{localize(locale, project.kicker)}</span>
          <span>{project.year}</span>
        </div>
        <h2 className={styles.projectCardTitle}>{project.title}</h2>
        <p className={styles.projectCardSummary}>{localize(locale, project.summary)}</p>
        <span className={styles.arrow}>{labels[locale].viewProject} ↗</span>
      </div>
    </Link>
  );
}
