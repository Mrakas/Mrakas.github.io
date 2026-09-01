import type { Metadata } from "next";
import { baseUrl, findNote, findProject, labels, Locale, localize, localePath } from "./site";

type PageKind = "home" | "work" | "gallery" | "notes" | "about" | "project" | "note";

export function pageMetadata(locale: Locale, kind: PageKind, slug?: string): Metadata {
  const copy = labels[locale];
  let title = locale === "zh" ? "Marcus Kwan · 精选作品" : "Marcus Kwan · Selected Works";
  let description: string = copy.subhero;
  let path = "/";
  let image = "/images/showcase/og/home.png";

  if (kind === "work") {
    title = locale === "zh" ? "作品 · Marcus Kwan" : "Work · Marcus Kwan";
    path = "/work";
  } else if (kind === "gallery") {
    title = locale === "zh" ? "展厅 · Marcus Kwan" : "Gallery · Marcus Kwan";
    description = copy.galleryIntro;
    path = "/gallery";
  } else if (kind === "notes") {
    title = locale === "zh" ? "项目笔记 · Marcus Kwan" : "Project Notes · Marcus Kwan";
    description = copy.notesIntro;
    path = "/notes";
  } else if (kind === "about") {
    title = locale === "zh" ? "关于 · Marcus Kwan" : "About · Marcus Kwan";
    description = copy.aboutIntro;
    path = "/about";
  } else if (kind === "project" && slug) {
    const project = findProject(slug);
    if (project) {
      title = `${project.title} · Marcus Kwan`;
      description = localize(locale, project.summary);
      path = `/work/${project.slug}`;
      image = project.cover;
    }
  } else if (kind === "note" && slug) {
    const note = findNote(slug);
    if (note) {
      title = `${localize(locale, note.title)} · Marcus Kwan`;
      description = localize(locale, note.summary);
      path = `/notes/${note.slug}`;
      image = findProject(note.projectSlug)?.cover || image;
    }
  }

  const canonicalPath = localePath(locale, path);
  const canonical = `${baseUrl}${canonicalPath === "/" ? "/" : `${canonicalPath}/`}`;
  const english = `${baseUrl}${path === "/" ? "/" : `${path}/`}`;
  const chinesePath = localePath("zh", path);
  const chinese = `${baseUrl}${chinesePath === "/" ? "/" : `${chinesePath}/`}`;
  const absoluteImage = `${baseUrl}${image}`;

  return {
    title,
    description,
    alternates: { canonical, languages: { en: english, "zh-CN": chinese } },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: "Marcus Kwan · Selected Works",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [absoluteImage] },
  };
}
