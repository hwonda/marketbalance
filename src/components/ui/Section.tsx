import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Container from "./Container";

type SectionProps = {
  id?: string;
  /** Section heading, shown in the left 4 columns on desktop. */
  title: ReactNode;
  /** Optional short text under the heading. */
  intro?: ReactNode;
  children: ReactNode;
  /** `mist` gives the section a light grey ground to separate it from its neighbours. */
  tone?: "paper" | "mist";
  className?: string;
  headingLevel?: "h2" | "h3";
};

/**
 * Index layout: heading on the left (sticky on desktop), content on the right.
 * Sections are separated by space and ground colour, not by cards or rules.
 */
export default function Section({
  id,
  title,
  intro,
  children,
  tone = "paper",
  className,
  headingLevel = "h2",
}: SectionProps) {
  const Heading = headingLevel;
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-16 md:py-24", tone === "mist" ? "bg-mist" : "bg-paper", className)}
    >
      <Container className="grid gap-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <Heading className="text-h3 font-bold md:text-h2">{title}</Heading>
            {intro && <div className="mt-4 max-w-[34ch] text-ink-soft">{intro}</div>}
          </div>
        </div>
        <div className="min-w-0 md:col-span-8">{children}</div>
      </Container>
    </section>
  );
}
