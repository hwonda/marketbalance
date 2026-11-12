import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";

/**
 * Two versions share this app: the original site at /ko, /en (src/v1) and the redesign at /v2/ko, /v2/en.
 * Any URL without a locale gets one, inside the version it belongs to: /about -> /ko/about, /v2 -> /v2/ko.
 */
const V2 = "/v2";

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
  const inV2 = pathname === V2 || pathname.startsWith(`${V2}/`);
  const rest = inV2 ? pathname.slice(V2.length) || "/" : pathname;
  if (hasLocale(rest.split("/")[1] ?? "")) return;

  const url = request.nextUrl.clone();
  url.pathname = `${inV2 ? V2 : ""}/${pickLocale(request)}${rest === "/" ? "" : rest}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and anything with a file extension (images, favicon, brochure.pdf...).
  matcher: ["/", "/((?!_next|.*\\..*).*)"],
};
