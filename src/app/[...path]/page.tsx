import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage, GalleryPage, HomePage, NotePage, NotesPage, ProjectPage, WorkPage } from "@/components/Pages";
import { pageMetadata } from "@/content/metadata";
import { findNote, findProject, Locale, notes, projects } from "@/content/site";

type Props = { params: Promise<{ path: string[] }> };
type RouteInfo = { locale: Locale; kind: "home" | "work" | "gallery" | "notes" | "about" | "project" | "note"; slug?: string };

function parseRoute(segments: string[]): RouteInfo | null {
  const locale: Locale = segments[0] === "zh" ? "zh" : "en";
  const path = locale === "zh" ? segments.slice(1) : segments;
  if (locale === "zh" && path.length === 0) return { locale, kind: "home" };
  if (path.length === 1 && path[0] === "work") return { locale, kind: "work" };
  if (path.length === 1 && path[0] === "gallery") return { locale, kind: "gallery" };
  if (path.length === 1 && path[0] === "notes") return { locale, kind: "notes" };
  if (path.length === 1 && path[0] === "about") return { locale, kind: "about" };
  if (path.length === 2 && path[0] === "work" && findProject(path[1])) return { locale, kind: "project", slug: path[1] };
  if (path.length === 2 && path[0] === "notes" && findNote(path[1])) return { locale, kind: "note", slug: path[1] };
  return null;
}

export function generateStaticParams() {
  const common = [
    ["work"], ["gallery"], ["notes"], ["about"],
    ...projects.map((project) => ["work", project.slug]),
    ...notes.map((note) => ["notes", note.slug]),
  ];
  return [...common.map((path) => ({ path })), { path: ["zh"] }, ...common.map((path) => ({ path: ["zh", ...path] }))];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  const route = parseRoute(path);
  return route ? pageMetadata(route.locale, route.kind, route.slug) : {};
}

export default async function Page({ params }: Props) {
  const { path } = await params;
  const route = parseRoute(path);
  if (!route) notFound();
  if (route.kind === "home") return <HomePage locale={route.locale} />;
  if (route.kind === "work") return <WorkPage locale={route.locale} />;
  if (route.kind === "gallery") return <GalleryPage locale={route.locale} />;
  if (route.kind === "notes") return <NotesPage locale={route.locale} />;
  if (route.kind === "about") return <AboutPage locale={route.locale} />;
  if (route.kind === "project" && route.slug) return <ProjectPage locale={route.locale} slug={route.slug} />;
  if (route.kind === "note" && route.slug) return <NotePage locale={route.locale} slug={route.slug} />;
  notFound();
}
