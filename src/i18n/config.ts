export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

/** Cookie the language switcher writes so the proxy remembers an explicit choice. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeNames: Record<Locale, string> = { ko: "한국어", en: "English" };

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** `/en/about` -> `en`; null when the path has no locale prefix. */
export function getPathLocale(pathname: string): Locale | null {
  const segment = pathname.split("/")[1] ?? "";
  return hasLocale(segment) ? segment : null;
}

/** `/en/about` -> `/about`, `/en` -> `/`. */
export function stripLocale(pathname: string): string {
  if (!getPathLocale(pathname)) return pathname;
  return "/" + pathname.split("/").slice(2).join("/");
}

/** `/about#history` -> `/en/about#history`. External, hash-only and already-prefixed hrefs pass through. */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//") || getPathLocale(href)) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}
