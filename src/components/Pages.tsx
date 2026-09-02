import Image from "next/image";
import Link from "next/link";
import {
  findNote,
  findProject,
  galleryItems,
  labels,
  Locale,
  localize,
  localePath,
  notes,
  projects,
} from "@/content/site";
import { ProjectCard } from "./ProjectCard";
import { ProjectVideo } from "./ProjectVideo";
import { CupTrackingQuiz } from "./CupTrackingQuiz";
import styles from "@/app/site.module.scss";

function renderEmphasis(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "zh" ? "Marcus Kwan 的精选作品" : "Selected works by Marcus Kwan",
    url: locale === "zh" ? "https://mrakas.github.io/zh/" : "https://mrakas.github.io/",
    author: {
      "@type": "Person",
      name: "Marcus Kwan",
      url: "https://mrakas.github.io/",
      sameAs: ["https://github.com/Mrakas"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Marcus Kwan · {copy.selectedWorks}</p>
          <h1 className={styles.heroTitle}>{copy.hero}</h1>
        </div>
        <p className={styles.heroAside}>{copy.subhero}</p>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{copy.selectedWorks}</h2>
          <Link className={styles.textLink} href={localePath(locale, "/work")}>
            {copy.allWork} ↗
          </Link>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}

export function WorkPage({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  return (
    <>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Archive · 2026</p>
        <h1 className={styles.pageTitle}>{copy.work}</h1>
        <p className={`${styles.lede} ${styles.proseWide}`}>{copy.subhero}</p>
      </header>
      <section className={styles.section}>
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}

export function ProjectPage({ locale, slug }: { locale: Locale; slug: string }) {
  const project = findProject(slug);
  if (!project) return null;
  const note = findNote(slug);
  const copy = labels[locale];

  return (
    <article>
      <Link className={styles.textLink} href={localePath(locale, "/work")}>
        ← {copy.backToWork}
      </Link>
      <header className={`${styles.projectHero} ${styles.section}`}>
        <div>
          <p className={styles.eyebrow}>{localize(locale, project.kicker)} · {project.year}</p>
          <h1 className={styles.projectTitle}>{project.title}</h1>
        </div>
        <div>
          <p className={styles.projectSummary}>{localize(locale, project.summary)}</p>
          <div className={styles.linkRow}>
            {project.links.map((link) => (
              <a className={styles.pillLink} key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {localize(locale, link.label)} ↗
              </a>
            ))}
          </div>
        </div>
      </header>
      <section className={styles.section}>
        <div className={styles.prose}>
          {project.description.map((paragraph, index) => (
            <p className={styles.bodyText} key={index}>{renderEmphasis(localize(locale, paragraph))}</p>
          ))}
          <div className={styles.tagRow}>
            {project.tags.map((tag) => <span className={styles.tag} key={tag}>{tag}</span>)}
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{copy.projectMedia}</h2>
          {note && (
            <Link className={styles.textLink} href={localePath(locale, `/notes/${note.slug}`)}>
              {copy.relatedNote} ↗
            </Link>
          )}
        </div>
        <div className={styles.mediaGrid}>
          {project.media.map((media, index) =>
            media.type === "video" ? (
              media.src.endsWith("/cups.mp4") ? (
                <CupTrackingQuiz key={media.src} media={media} locale={locale} />
              ) : (
                <ProjectVideo key={media.src} media={media} locale={locale} />
              )
            ) : (
              <figure className={styles.mediaCard} key={media.src}>
                <div className={styles.mediaFrame}>
                  <Image
                    className={styles.mediaImage}
                    src={media.src}
                    alt={localize(locale, media.alt)}
                    width={1600}
                    height={1000}
                    priority={index === 0}
                  />
                </div>
                <figcaption className={styles.mediaCaption}>{localize(locale, media.caption)}</figcaption>
              </figure>
            ),
          )}
        </div>
      </section>
    </article>
  );
}

export function GalleryPage({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  return (
    <>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Visual archive</p>
        <h1 className={styles.pageTitle}>{copy.gallery}</h1>
        <p className={`${styles.lede} ${styles.proseWide}`}>{copy.galleryIntro}</p>
      </header>
      <section className={styles.section}>
        <div className={styles.galleryGrid}>
          {galleryItems.map((item, index) => {
            const project = findProject(item.projectSlug)!;
            return (
              <Link className={styles.galleryItem} key={`${item.src}-${index}`} href={localePath(locale, `/work/${item.projectSlug}`)}>
                <Image
                  className={styles.galleryImage}
                  src={item.src}
                  alt={localize(locale, item.alt)}
                  width={1200}
                  height={900}
                />
                <span className={styles.galleryCaption}>
                  <span>{localize(locale, item.alt)}</span>
                  <span>{project.title} ↗</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

export function NotesPage({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  return (
    <>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Project notes</p>
        <h1 className={styles.pageTitle}>{copy.notes}</h1>
        <p className={`${styles.lede} ${styles.proseWide}`}>{copy.notesIntro}</p>
      </header>
      <section className={styles.section}>
        <div className={styles.notesList}>
          {notes.map((note) => (
            <Link className={styles.noteItem} href={localePath(locale, `/notes/${note.slug}`)} key={note.slug}>
              <time className={styles.noteDate}>{note.date}</time>
              <div>
                <h2 className={styles.noteTitle}>{localize(locale, note.title)}</h2>
                <p className={styles.noteSummary}>{localize(locale, note.summary)}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function NotePage({ locale, slug }: { locale: Locale; slug: string }) {
  const note = findNote(slug);
  if (!note) return null;
  const project = findProject(note.projectSlug)!;
  return (
    <article className={styles.prose}>
      <p className={styles.eyebrow}>{note.date} · {project.title}</p>
      <h1 className={styles.pageTitle}>{localize(locale, note.title)}</h1>
      <p className={`${styles.lede} ${styles.bodyText}`}>{localize(locale, note.summary)}</p>
      <div className={styles.section}>
        {note.sections.map((section) => (
          <section className={styles.noteSection} key={section.heading.en}>
            <h2>{localize(locale, section.heading)}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p className={styles.bodyText} key={index}>{localize(locale, paragraph)}</p>
            ))}
          </section>
        ))}
      </div>
      <div className={styles.linkRow}>
        <Link className={styles.pillLink} href={localePath(locale, `/work/${project.slug}`)}>
          {project.title} ↗
        </Link>
        {project.links.map((link) => (
          <a className={styles.pillLink} href={link.href} key={link.href} target="_blank" rel="noreferrer">
            {localize(locale, link.label)} ↗
          </a>
        ))}
      </div>
    </article>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  return (
    <>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Marcus Kwan</p>
        <h1 className={styles.pageTitle}>{copy.about}</h1>
      </header>
      <section className={styles.section}>
        <div className={styles.aboutCard}>
          <div className={styles.aboutMark} aria-label="Marcus Kwan monogram">
            <span>Selected works · 2026</span>
            <span className={styles.aboutInitials}>MK</span>
          </div>
          <div>
            <p className={styles.bodyText}>{copy.aboutIntro}</p>
            <p className={styles.bodyText}>{copy.aboutSecond}</p>
            <h2 className={styles.sectionTitle}>{copy.contact}</h2>
            <div className={styles.linkRow}>
              <a className={styles.pillLink} href="https://github.com/Mrakas">GitHub ↗</a>
              <a className={styles.pillLink} href="mailto:marcuskwan2000@gmail.com">Email ↗</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function NotFoundPage({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  return (
    <section className={styles.hero}>
      <div>
        <p className={styles.eyebrow}>404</p>
        <h1 className={styles.pageTitle}>{copy.notFound}</h1>
      </div>
      <Link className={styles.pillLink} href={localePath(locale, "/")}>{copy.returnHome} ↗</Link>
    </section>
  );
}
