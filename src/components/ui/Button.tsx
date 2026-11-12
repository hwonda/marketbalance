"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "@/i18n/Link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "inverse";

/** Orange is reserved for the primary action; ink text on orange keeps contrast above 4.5:1. */
const VARIANTS: Record<Variant, string> = {
  primary: "bg-orange text-ink hover:bg-orange-deep hover:text-white",
  secondary: "border border-ink/25 text-ink hover:border-ink",
  inverse: "border border-white/40 text-white hover:border-white hover:bg-white/10",
};

const BASE =
  "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-small font-semibold no-underline transition-colors";

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(BASE, VARIANTS[variant], className);
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <Link {...props} className={buttonClass(variant, className)} />;
}
