"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/v3/lib/cn";
import { LOCALE_COOKIE, localizeHref, locales, type Locale } from "@/v3/i18n/config";
import { useDictionary, useLocale } from "@/v3/i18n/I18nProvider";
import { usePathname } from "@/v3/i18n/usePathname";

/** Persist an explicit choice so the proxy keeps it on the next visit. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * Globe + current language code + chevron in a rounded button; opens a small menu of
 * "한국어 KOR / English ENG" with the current one in blue (change request §4). Same page in the other language.
 */
export default function LanguageSwitcher({ className }: { className?: string }) {
  const current = useLocale();
  const dict = useDictionary();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const options = dict.languageSwitcher.options;

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={root} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={dict.languageSwitcher.label}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-1.5 rounded-full border border-[#D5DCE8] bg-white px-3 text-[13px] font-semibold text-[#14213D] transition-colors hover:border-[#1F5FE0]"
      >
        <Globe size={16} aria-hidden />
        <span>{options[current].code}</span>
        <ChevronDown size={14} aria-hidden className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul className="absolute top-full right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-[#E3E8F0] bg-white py-1 shadow-[0_12px_32px_rgba(20,33,61,0.12)]">
          {locales.map((locale) => {
            const active = locale === current;
            return (
              <li key={locale}>
                <NextLink
                  href={localizeHref(pathname, locale)}
                  hrefLang={locale}
                  lang={locale}
                  aria-current={active ? "true" : undefined}
                  onClick={() => {
                    rememberLocale(locale);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 text-[14px] transition-colors hover:bg-[#F6F8FC]",
                    active ? "font-semibold text-[#1F5FE0]" : "text-[#14213D]",
                  )}
                >
                  <span>{options[locale].name}</span>
                  <span className="text-[12px] tracking-wide">{options[locale].code}</span>
                </NextLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
