import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** The one content width used everywhere: 1200px, 20px gutters on phones, 32px from md. */
export default function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 md:px-8", className)}>{children}</div>;
}
