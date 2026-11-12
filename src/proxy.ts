import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";

/**
 * Three versions share this app: the original site at /ko, /en (src/v1), the redesign at /v2/... and
 * the original with the client's change requests at /v3/... (src/v3).
 * Any URL without a locale gets one, inside the version it belongs to: /about -> /ko/about, /v3 -> /v3/ko.
 */
const VERSION_PREFIXES = ["/v2", "/v3"];

/** Explicit choice (cookie) wins, then the browser's Accept-Language, then the default. */
function pickLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  const preferred = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  return preferred.map((p) => p.lang).find((lang): lang is Locale => hasLocale(lang)) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const prefix = VERSION_PREFIXES.find((p) => pathname === p || pathname.startsWith(`${p}/`)) ?? "";
  const rest = pathname.slice(prefix.length) || "/";
  if (hasLocale(rest.split("/")[1] ?? "")) return;

  const url = request.nextUrl.clone();
  url.pathname = `${prefix}/${pickLocale(request)}${rest === "/" ? "" : rest}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and anything with a file extension (images, favicon, brochure.pdf...).
  matcher: ["/", "/((?!_next|.*\\..*).*)"],
};
