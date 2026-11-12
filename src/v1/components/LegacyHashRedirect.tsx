"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/v1/i18n/I18nProvider";

/** The previous site used hash routing (`/#/about`); send those old links to the real route. */
export default function LegacyHashRedirect() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const { hash } = window.location;
    if (hash.startsWith("#/") && hash.length > 2) router.replace(`/${locale}${hash.slice(1)}`);
  }, [router, locale]);

  return null;
}
