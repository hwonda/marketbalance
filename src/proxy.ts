import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, getPathLocale, hasLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";

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
  if (getPathLocale(pathname)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and anything with a file extension (images, favicon, brochure.pdf...).
  // "/" is listed on its own so the bare base path (e.g. /v2) is also redirected to a locale.
  matcher: ["/", "/((?!_next|.*\\..*).*)"],
};
