export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

/** Cookie the language switcher writes so the proxy remembers an explicit choice. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeNames: Record<Locale, string> = { ko: "한국어", en: "English" };

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/**
 * v3 (the original site with the client's change requests applied) is served under /v3,
 * next to v1 (/ko, /en) and v2 (/v2/...).
 * Every route of this version is `${ROUTE_PREFIX}/${locale}/...`.
 */
export const ROUTE_PREFIX = "/v3";

/** Path without the version prefix: `/v3/en/about` -> `/en/about`. Paths outside /v2 are returned unchanged. */
function withoutPrefix(pathname: string): string {
  if (pathname === ROUTE_PREFIX) return "/";
  return pathname.startsWith(`${ROUTE_PREFIX}/`) ? pathname.slice(ROUTE_PREFIX.length) : pathname;
}

/** `/v3/en/about` -> `en`; null when the path has no locale. */
export function getPathLocale(pathname: string): Locale | null {
  const segment = withoutPrefix(pathname).split("/")[1] ?? "";
  return hasLocale(segment) ? segment : null;
}

/** `/v3/en/about` -> `/about`, `/v3/en` -> `/`. */
export function stripLocale(pathname: string): string {
  const path = withoutPrefix(pathname);
  if (!getPathLocale(path)) return path;
  return "/" + path.split("/").slice(2).join("/");
}

/** Full path of a page in this version: `localePath("en", "/about")` -> `/v3/en/about`. */
export function localePath(locale: Locale | string, path = ""): string {
  return `${ROUTE_PREFIX}/${locale}${path === "/" ? "" : path}`;
}

/** `/about#history` -> `/v3/en/about#history`. External, hash-only and already-localized hrefs pass through. */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//") || href.startsWith(`${ROUTE_PREFIX}/`)) return href;
  return localePath(locale, href);
}
