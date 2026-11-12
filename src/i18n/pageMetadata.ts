import type { Metadata } from "next";
import { hasLocale, locales } from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";

type PageNamespace = Exclude<keyof Dictionary, "metadata" | "nav" | "footer" | "cta" | "languageSwitcher" | "common">;

/**
 * Per-page <title>/<description> plus hreflang alternates.
 * Reads `meta.title` / `meta.description` from the page's namespace when present.
 */
export async function pageMetadata(
  params: Promise<{ lang: string }>,
  namespace: PageNamespace,
  path: string,
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const meta = (dict[namespace] as { meta?: { title?: string; description?: string } }).meta;
  const suffix = path === "/" ? "" : path;

  return {
    ...(meta?.title ? { title: `${meta.title} | ${dict.metadata.appName}` } : {}),
    ...(meta?.description ? { description: meta.description } : {}),
    alternates: {
      canonical: `/${lang}${suffix}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}${suffix}`])),
    },
  };
}
