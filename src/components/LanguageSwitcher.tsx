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

/** KO / EN tabs. The visible code is short; the accessible name is the language written in itself. */
export default function LanguageSwitcher({ className, onNavigate }: Props) {
  const current = useLocale();
  const dict = useDictionary();
  const pathname = usePathname();

  return (
    <nav
      aria-label={dict.languageSwitcher.label}
      className={cn("inline-flex w-fit items-center rounded-full border border-line p-0.5", className)}
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <NextLink
            key={locale}
            href={localizeHref(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            aria-label={localeNames[locale]}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              rememberLocale(locale);
              onNavigate?.();
            }}
            className={cn(
              "flex min-h-7 min-w-9 items-center justify-center rounded-full px-2.5 text-[12px] leading-none font-semibold transition-colors",
              active ? "bg-ink text-white" : "text-ink-faint hover:text-ink",
            )}
          >
            {locale.toUpperCase()}
          </NextLink>
        );
      })}
    </nav>
  );
}
