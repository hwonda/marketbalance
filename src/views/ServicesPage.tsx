"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDictionary } from "@/i18n/I18nProvider";
import { useHashScroll } from "@/hooks/useHashScroll";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import Section from "@/components/ui/Section";
import ContactBand from "@/components/ui/ContactBand";
import TextLink from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";

/** Fixed header (72px) + sticky section nav (56px) + breathing room. */
const STICKY_OFFSET = 144;

/** One existing photo per service, in the same order as the dictionary's `services`. */
const SERVICE_PHOTOS: Record<string, string> = {
  exhibition: "/image/main/m-4.jpg",
  buyer: "/image/main/m-8.jpg",
  marketing: "/image/main/m-6.jpg",
  mice: "/image/main/m-5.jpg",
  trade: "/image/main/m-7.jpg",
};

const INDUSTRY_PHOTOS = [
  "/image/ser/s-1.jpg",
  "/image/ser/s-2.jpg",
  "/image/ser/s-3.jpg",
  "/image/ser/s-4.jpg",
  "/image/ser/s-5.jpg",
  "/image/ser/s-6.jpg",
];

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="text-body font-bold">{children}</h3>;
}

export default function ServicesPage() {
  const { services: page } = useDictionary();
  const ids = page.services.map((s) => s.id);
  const [active, setActive] = useState<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  // Land each section just under the sticky nav (header 72 + nav 56).
  useHashScroll({ offset: -128, delay: 300, resetWhenEmpty: true });

  // Highlight the service whose section has reached the sticky nav; nothing above the first one.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= STICKY_OFFSET + 1) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // ids are static for a given dictionary
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // On narrow screens the nav scrolls sideways: fade the edges that hide more items and keep the active one in view.
  useEffect(() => {
    const row = tabsRef.current;
    if (!row) return;
    const measure = () =>
      setEdges({
        left: row.scrollLeft > 4,
        right: row.scrollLeft + row.clientWidth < row.scrollWidth - 4,
      });
    measure();
    row.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      row.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const row = tabsRef.current;
    if (!row) return;
    if (!active) {
      row.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    const link = row.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!link) return;
    const left = link.offsetLeft - 20;
    const right = link.offsetLeft + link.offsetWidth + 20;
    if (left < row.scrollLeft) row.scrollTo({ left, behavior: "smooth" });
    else if (right > row.scrollLeft + row.clientWidth)
      row.scrollTo({ left: right - row.clientWidth, behavior: "smooth" });
  }, [active]);

  return (
    <>
      <PageIntro title={page.intro.title} lead={page.intro.lead} />

      <nav aria-label={page.nav.label} className="sticky top-[72px] z-30 border-b border-line bg-paper">
        <Container className="relative">
          <div
            ref={tabsRef}
            className="-mx-5 flex overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0"
          >
            <ul className="flex shrink-0 gap-1">
              {page.services.map((service) => {
                const isActive = active === service.id;
                return (
                  <li key={service.id}>
                    <a
                      href={`#${service.id}`}
                      data-id={service.id}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative flex h-14 items-center px-3 text-small font-semibold whitespace-nowrap transition-colors",
                        isActive ? "text-blue" : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {service.title}
                      {isActive && <span className="absolute inset-x-3 bottom-0 h-[3px] bg-blue" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-paper to-transparent transition-opacity md:hidden",
              edges.left ? "opacity-100" : "opacity-0",
            )}
          />
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-paper to-transparent transition-opacity md:hidden",
              edges.right ? "opacity-100" : "opacity-0",
            )}
          />
        </Container>
      </nav>

      <Section title={page.industries.title} intro={page.industries.intro} tone="mist" stickBelow="subnav">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          {page.industries.items.map((name, i) => (
            <li key={name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={INDUSTRY_PHOTOS[i]}
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
              <p className="mt-3 text-small font-semibold">{name}</p>
            </li>
          ))}
        </ul>
      </Section>

      {page.services.map((service, index) => (
        <Section
          stickBelow="subnav"
          key={service.id}
          id={service.id}
          title={service.title}
          intro={<p>{service.summary}</p>}
          tone={index % 2 === 0 ? "paper" : "mist"}
          className="scroll-mt-36"
        >
          <div className="grid gap-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SERVICE_PHOTOS[service.id]}
              alt={service.photoAlt}
              loading="lazy"
              className="aspect-[16/9] w-full rounded-lg object-cover sm:aspect-[2/1]"
            />

            {service.audience.length > 0 && (
              <div>
                <SubHeading>{page.headings.audience}</SubHeading>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {service.audience.map((item) => (
                    <li key={item} className="border-t border-line pt-3 text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.groups.length > 0 && (
              <div>
                <SubHeading>{page.headings.included}</SubHeading>
                <div
                  className={cn(
                    "mt-4 grid gap-8",
                    service.groups.length > 1 ? "sm:grid-cols-3" : "sm:grid-cols-1",
                  )}
                >
                  {service.groups.map((group) => (
                    <div key={group.title} className="border-t border-line pt-4">
                      {service.groups.length > 1 && <p className="font-semibold">{group.title}</p>}
                      <ul
                        className={cn(
                          service.groups.length > 1
                            ? "mt-2 grid gap-1 text-small text-ink-soft"
                            : "grid gap-1 text-small text-ink-soft",
                          service.groups.length === 1 && "sm:grid-cols-2 sm:gap-x-8",
                        )}
                      >
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <SubHeading>{page.headings.steps}</SubHeading>
              {/* Steps without a description are short: lay them out side by side to keep the sequence compact. */}
              <ol
                className={cn(
                  "mt-4 border-t border-line",
                  service.steps.every((step) => !step.detail) &&
                    "grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3",
                )}
              >
                {service.steps.map((step, i) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2.5rem_1fr] gap-x-2 border-b border-line py-4"
                  >
                    <span className="tabular text-lead leading-snug font-bold text-blue-deep">{i + 1}</span>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      {step.detail && <p className="mt-1 text-small text-ink-soft">{step.detail}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {service.exhibitions.length > 0 && (
              <div>
                <SubHeading>{page.headings.exhibitions}</SubHeading>
                <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {service.exhibitions.map((fair) => (
                    <div key={fair.name} className="border-t border-line pt-3">
                      <dt className="font-semibold">{fair.name}</dt>
                      <dd className="mt-1 text-small text-ink-soft">{fair.place}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {service.notes.length > 0 && (
              <div>
                <SubHeading>{page.headings.notes}</SubHeading>
                <ul className="mt-3 grid gap-2 text-ink-soft">
                  {service.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {service.related.length > 0 && (
              <div>
                <SubHeading>{page.headings.related}</SubHeading>
                <ul className="mt-3 grid gap-2">
                  {service.related.map((project) => (
                    <li key={project}>
                      <TextLink href="/works" className="font-normal">
                        {project}
                      </TextLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      ))}

      <ContactBand />
    </>
  );
}
