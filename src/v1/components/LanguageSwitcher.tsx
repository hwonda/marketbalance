"use client";

import NextLink from "next/link";
import { cn } from "@/v1/lib/cn";
import { LOCALE_COOKIE, localizeHref, locales, type Locale } from "@/v1/i18n/config";
import { useDictionary, useLocale } from "@/v1/i18n/I18nProvider";
import { usePathname } from "@/v1/i18n/usePathname";

type Props = {
  /** `dark` is for the navy mobile menu. */
  tone?: "light" | "dark";
  className?: string;
  onNavigate?: () => void;
};

/** Persist an explicit choice so the proxy stops following Accept-Language. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export default function LanguageSwitcher({ tone = "light", className, onNavigate }: Props) {
  const current = useLocale();
  const dict = useDictionary();
  const pathname = usePathname();

  const remember = (locale: Locale) => {
    rememberLocale(locale);
    onNavigate?.();
  };

  return (
    <div
      role="group"
      aria-label={dict.languageSwitcher.label}
      className={cn(
        "flex items-center rounded-full border p-0.5 font-display text-[0.75rem] font-semibold",
        tone === "light" ? "border-black/10 bg-white/50" : "border-white/15 bg-white/5",
        className,
      )}
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <NextLink
            key={locale}
            href={localizeHref(pathname, locale)}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            onClick={() => remember(locale)}
            className={cn(
              "rounded-full px-3 py-1.5 uppercase tracking-[0.08em] no-underline transition-colors",
              tone === "light"
                ? active
                  ? "bg-[#111827] text-white"
                  : "text-black/50 hover:text-black"
                : active
                  ? "bg-white text-[#0C1A35]"
                  : "text-white/50 hover:text-white",
            )}
          >
            {locale}
          </NextLink>
        );
      })}
    </div>
  );
}
