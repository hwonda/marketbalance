"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizeHref } from "./config";
import { useLocale } from "./I18nProvider";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & { href: string };

/** Drop-in for next/link that keeps internal links inside the current locale. */
export default function Link({ href, ...props }: Props) {
  const locale = useLocale();
  return <NextLink href={localizeHref(href, locale)} {...props} />;
}
