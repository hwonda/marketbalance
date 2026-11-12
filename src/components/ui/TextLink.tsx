"use client";

import type { ComponentProps } from "react";
import Link from "@/i18n/Link";
import { cn } from "@/lib/cn";

/** Inline link: blue with an underline that strengthens on hover. */
export default function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "font-semibold text-blue underline decoration-blue/30 underline-offset-4 transition-colors hover:decoration-blue",
        className,
      )}
    />
  );
}
