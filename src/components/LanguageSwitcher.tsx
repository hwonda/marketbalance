"use client";

import NextLink from "next/link";
import { cn } from "@/lib/cn";
import { LOCALE_COOKIE, localeNames, localizeHref, locales, type Locale } from "@/i18n/config";
import { useDictionary, useLocale } from "@/i18n/I18nProvider";
import { usePathname } from "@/i18n/usePathname";

type Props = {
  className?: string;
  onNavigate?: () => void;
};

/** Persist an explicit choice so the proxy stops following Accept-Language. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/** Each language is named in itself, so a reader who can't read the current page can still find theirs. */
export default function LanguageSwitcher({ className, onNavigate }: Props) {
  const current = useLocale();
  const dict = useDictionary();
  const pathname = usePathname();

  return (
    <nav aria-label={dict.languageSwitcher.label} className={cn("flex items-center gap-1 text-small", className)}>
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <NextLink
            key={locale}
            href={localizeHref(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              rememberLocale(locale);
              onNavigate?.();
            }}
            className={cn(
              "rounded-md px-2 py-1.5 transition-colors",
              active ? "font-semibold text-ink" : "text-ink-faint hover:text-ink",
            )}
          >
            {localeNames[locale]}
          </NextLink>
        );
      })}
    </nav>
  );
}
