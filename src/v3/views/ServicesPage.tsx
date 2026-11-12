"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Box,
  Briefcase,
  Car,
  ChartColumn,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Compass,
  Cpu,
  FileSignature,
  Globe,
  Handshake,
  Leaf,
  Lightbulb,
  Megaphone,
  MessagesSquare,
  Presentation,
  Search,
  Settings,
  ShieldCheck,
  Ship,
  Stethoscope,
  Store,
  Target,
  Users,
  Zap,
  type LucideProps,
} from "lucide-react";
import Link from "@/v3/i18n/Link";
import { useHashScroll } from "@/v3/hooks/useHashScroll";
import { useDictionary } from "@/v3/i18n/I18nProvider";
import { cn } from "@/v3/lib/cn";
import CtaSection from "@/v3/components/CtaSection";

type Icon = ComponentType<LucideProps>;

/**
 * Section anchors in page order (change request §12): industries first, then the five businesses.
 * The ids match the header submenu (#mice, #marketing, #exhibition, #buyer, #trade).
 */
const TAB_IDS = ["industries", "mice", "marketing", "exhibition", "buyer", "trade"] as const;
type TabId = (typeof TAB_IDS)[number];
type BusinessId = Exclude<TabId, "industries">;

/** Fixed header (76px) + sticky tab bar (~57px). */
const HEADER_HEIGHT = 76;
const ACTIVE_OFFSET = HEADER_HEIGHT + 57 + 40;
const JUMP_OFFSET = HEADER_HEIGHT + 57 + 24;

const NAVY = "#14213D";
const BLUE = "#1F5FE0";

const sectionNumber = (id: TabId) => String(TAB_IDS.indexOf(id) + 1).padStart(2, "0");
const pad = (index: number) => String(index + 1).padStart(2, "0");

/** Photos and icons for `services.industries.items`, same order (§10: sharp photos, navy icons). */
const INDUSTRY_VISUALS: { img: string; icon: Icon }[] = [
  { img: "/image/ser/s-1.jpg", icon: Leaf },
  { img: "/image/ser/s-2.jpg", icon: Zap },
  { img: "/image/ser/s-3.jpg", icon: Cpu },
  { img: "/image/ser/s-4.jpg", icon: Car },
  { img: "/image/ser/s-5.jpg", icon: Stethoscope },
  { img: "/image/ser/s-6.jpg", icon: Box },
];

/** Icons for each business's service-content cards, in card order. */
const CARD_ICONS: Record<BusinessId, Icon[]> = {
  mice: [ClipboardList, MessagesSquare, Presentation],
  marketing: [Search, Compass, Users, Megaphone, Handshake],
  exhibition: [Target, Settings, Megaphone],
  buyer: [Search, Users, FileSignature],
  trade: [Lightbulb, ShieldCheck, Users, FileSignature, Ship],
};

/** Icons for the circular process steps, where a section has one distinct from its cards. */
const STEP_ICONS: Partial<Record<BusinessId, Icon[]>> = {
  mice: [Lightbulb, ClipboardList, Settings, Store, ChartColumn],
  exhibition: [Search, Briefcase, Settings, Globe],
};

/** Tab strip with edge fades when more tabs are hidden off-screen (mostly on mobile). */
function SectionTabs({ active, onSelect }: { active: TabId | null; onSelect: (id: TabId) => void }) {
  const { services } = useDictionary();
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Keep the active tab inside the strip as the page scrolls.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const button = active ? el.querySelector<HTMLElement>(`[data-tab="${active}"]`) : null;
    if (!button) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    const left = button.offsetLeft;
    const right = left + button.offsetWidth;
    if (left < el.scrollLeft || right > el.scrollLeft + el.clientWidth) {
      el.scrollTo({ left: Math.max(0, left - 32), behavior: "smooth" });
    }
  }, [active]);

  const nudge = (direction: 1 | -1) => {
    const el = scroller.current;
    el?.scrollBy({ left: direction * el.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <div className="sticky z-[90] border-b border-[#E3E8F0] bg-white" style={{ top: `${HEADER_HEIGHT}px` }}>
      <nav aria-label={services.aria.tabs} className="relative mx-auto max-w-[1440px]">
        <div
          ref={scroller}
          onScroll={measure}
          className="flex overflow-x-auto px-4 md:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TAB_IDS.map((id) => (
            <button
              key={id}
              type="button"
              data-tab={id}
              onClick={() => onSelect(id)}
              aria-current={active === id ? "true" : undefined}
              className={cn(
                "flex min-h-14 items-center border-b-2 px-4 text-[15px] font-bold whitespace-nowrap transition-colors md:px-5",
                active === id
                  ? "border-[#1F5FE0] text-[#1F5FE0]"
                  : "border-transparent text-[#4A5873] hover:text-[#14213D]",
              )}
            >
              {services.tabs[id]}
            </button>
          ))}
        </div>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => nudge(-1)}
          className={cn(
            "absolute inset-y-0 left-0 flex w-12 items-center justify-start bg-gradient-to-r from-white via-white/90 to-transparent pl-1 text-[#4A5873] transition-opacity",
            edges.left ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => nudge(1)}
          className={cn(
            "absolute inset-y-0 right-0 flex w-12 items-center justify-end bg-gradient-to-l from-white via-white/90 to-transparent pr-1 text-[#4A5873] transition-opacity",
            edges.right ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    </div>
  );
}

/** "01 ── EYEBROW" row and the section title. Numbers follow the new page order, in blue (§10, §12). */
function SectionHeading({ id, eyebrow, title }: { id: TabId; eyebrow: string; title: string }) {
  const { services } = useDictionary();
  return (
    <>
      <div className="mb-5 inline-flex items-center gap-3">
        <span className="font-display text-4xl font-black" style={{ color: BLUE }}>
          {sectionNumber(id)}
        </span>
        <span className="h-[2px] w-12 bg-[#D5DCE8]" />
        <span className="font-display text-sm font-bold tracking-widest text-[#4A5873] uppercase md:text-base">
          {eyebrow}
        </span>
      </div>
      <h2
        className="font-display mb-5 leading-[1.15] font-black"
        style={{ color: NAVY, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em" }}
      >
        {id !== "industries" && (
          <span className="mb-1 block text-[0.55em] font-bold text-[#4A5873]">{services.labels.coreBusiness}</span>
        )}
        {title}
      </h2>
    </>
  );
}

function SubHeading({ children }: { children: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-6 w-1.5 rounded-full" style={{ backgroundColor: BLUE }} />
      <h3 className="font-display text-xl font-black md:text-2xl" style={{ color: NAVY }}>
        {children}
      </h3>
    </div>
  );
}

/**
 * Service-content infographic (§11): number + icon + short title + one line, cards side by side
 * joined by arrows; stacked with down arrows on narrow screens.
 */
function CardFlow({ cards, icons }: { cards: { title: string; desc: string }[]; icons: Icon[] }) {
  const { services } = useDictionary();
  const wide = cards.length > 3;
  return (
    <ol className={cn("flex flex-col items-stretch", wide ? "xl:flex-row" : "lg:flex-row")}>
      {cards.map((card, i) => {
        const CardIcon = icons[i] ?? BadgeCheck;
        return (
          <Fragment key={card.title}>
            {i > 0 && (
              <li
                aria-hidden
                className={cn(
                  "flex shrink-0 items-center justify-center py-2 text-[#1F5FE0]",
                  wide ? "xl:px-2 xl:py-0" : "lg:px-3 lg:py-0",
                )}
              >
                <ArrowDown size={22} className={wide ? "xl:hidden" : "lg:hidden"} />
                <ArrowRight size={22} className={cn("hidden", wide ? "xl:block" : "lg:block")} />
                <span className="sr-only">{services.aria.arrow}</span>
              </li>
            )}
            <li className="flex-1 rounded-2xl border border-[#E3E8F0] bg-white p-5 md:p-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-black tracking-wider" style={{ color: BLUE }}>
                  {pad(i)}
                </span>
                <span className="flex size-11 items-center justify-center rounded-xl border border-[#D5DCE8] text-[#14213D]">
                  <CardIcon size={22} strokeWidth={1.6} aria-hidden />
                </span>
              </div>
              <h4 className="mt-4 text-[17px] leading-snug font-bold" style={{ color: NAVY }}>
                {card.title}
              </h4>
              <p className="mt-1.5 text-[14px] leading-relaxed text-[#4A5873]">{card.desc}</p>
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}

/** Process in the circular-icon style (§11: one style for every process, shown once per section). */
function ProcessSteps({ steps, icons }: { steps: string[]; icons: Icon[] }) {
  return (
    <ol className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:flex lg:justify-between lg:gap-4">
      {steps.map((step, i) => {
        const StepIcon = icons[i] ?? BadgeCheck;
        return (
          <li key={step} className="relative flex flex-1 flex-col items-center text-center">
            {i > 0 && (
              <span aria-hidden className="absolute top-10 right-1/2 hidden h-px w-full bg-[#D5DCE8] lg:block" />
            )}
            <span className="relative z-10 flex size-20 items-center justify-center rounded-full border-2 border-[#1F5FE0] bg-white text-[#14213D]">
              <StepIcon size={30} strokeWidth={1.5} aria-hidden />
              <span className="absolute -top-1 -right-1 flex size-7 items-center justify-center rounded-full bg-[#1F5FE0] text-[12px] font-bold text-white">
                {pad(i)}
              </span>
            </span>
            <span className="mt-4 max-w-[12rem] text-[15px] leading-snug font-bold" style={{ color: NAVY }}>
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function Note({ children }: { children: string }) {
  return (
    <p className="mt-4 inline-block rounded-xl border border-[#D6E2FA] bg-[#F2F6FD] px-4 py-2 text-[15px] font-semibold text-[#1F5FE0]">
      {children}
    </p>
  );
}

type Business = {
  eyebrow: string;
  title: string;
  intro: string;
  note?: string;
  cards: { title: string; desc: string }[];
  steps?: string[];
};

/** Same frame for every business section (§11): title, one or two lines, cards, optional process. */
function BusinessSection({
  id,
  data,
  tone,
  children,
  after,
}: {
  id: BusinessId;
  data: Business;
  tone: "white" | "grey";
  /** Shown before the service cards (e.g. target industries). */
  children?: ReactNode;
  /** Shown at the end of the section (e.g. reference exhibitions). */
  after?: ReactNode;
}) {
  const { services } = useDictionary();
  const stepIcons = STEP_ICONS[id];
  return (
    <section
      id={id}
      aria-label={services.tabs[id]}
      className={cn("py-20 md:py-28", tone === "grey" ? "bg-[#F6F8FC]" : "bg-white")}
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
        <SectionHeading id={id} eyebrow={data.eyebrow} title={data.title} />
        <p className="max-w-3xl text-[17px] leading-[1.8] text-[#4A5873] md:text-lg">{data.intro}</p>
        {data.note && <Note>{data.note}</Note>}

        {children}

        <div className="mt-12">
          <SubHeading>{id === "trade" ? services.labels.supportServices : services.labels.serviceContent}</SubHeading>
          <CardFlow cards={data.cards} icons={CARD_ICONS[id]} />
        </div>

        {data.steps && stepIcons && (
          <div className="mt-16">
            <SubHeading>{services.labels.process}</SubHeading>
            <ProcessSteps steps={data.steps} icons={stepIcons} />
          </div>
        )}
        {after}
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const { services, common } = useDictionary();
  const [active, setActive] = useState<TabId | null>(null);

  useEffect(() => {
    // The last section whose top has passed the tab bar is current; above the first one, none is.
    const update = () => {
      let current: TabId | null = null;
      for (const id of TAB_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useHashScroll({ offset: -JUMP_OFFSET, delay: 300, resetWhenEmpty: true });

  const jumpTo = (id: TabId) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - JUMP_OFFSET, behavior: "smooth" });
  };

  const { hero, industries, mice, marketing, exhibition, buyer, trade, cta } = services;

  return (
    <div className="bg-white">
      {/* Page header: solid section ground, no photo, circles, grid or glass card (§2, §6). */}
      <section className="bg-[#F6F8FC] pt-[136px] pb-14 md:pt-[156px] md:pb-20" aria-label={services.aria.pageHeader}>
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 md:flex-row md:items-end md:justify-between md:px-8 lg:px-12">
          <div className="max-w-[800px]">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-[2px] w-10 shrink-0" style={{ backgroundColor: BLUE }} />
              <span className="font-display text-[0.8rem] font-bold tracking-[0.3em] uppercase" style={{ color: NAVY }}>
                {hero.eyebrow}
              </span>
            </div>
            <h1
              className="font-display mb-6 leading-[1.05] font-extrabold"
              style={{ color: NAVY, fontSize: "clamp(2.6rem, 6vw, 4.5rem)", letterSpacing: "-0.04em" }}
            >
              {hero.titleLine1}
              <br />
              <span style={{ color: BLUE }}>{hero.titleLine2}</span>
            </h1>
            <p className="max-w-[560px] text-[17px] leading-[1.8] text-[#4A5873] md:text-[1.15rem]">
              {hero.descLines[0]} <br className="hidden md:block" />
              {hero.descLines[1]}
            </p>
          </div>
          <nav
            aria-label={services.aria.breadcrumb}
            className="font-display flex items-center gap-3 text-[0.75rem] font-bold tracking-[0.15em] text-[#4A5873] uppercase"
          >
            <Link href="/" className="-my-3 inline-block py-3 hover:text-[#14213D]">
              {common.home}
            </Link>
            <span className="text-[#C9D1DE]">/</span>
            <span style={{ color: NAVY }}>{services.breadcrumb}</span>
          </nav>
        </div>
      </section>

      <SectionTabs active={active} onSelect={jumpTo} />

      {/* 01 Key industries (§10): sharp photo, navy gradient from the bottom, white text bottom-left. */}
      <section id="industries" aria-label={services.tabs.industries} className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
          <SectionHeading id="industries" eyebrow={industries.eyebrow} title={industries.title} />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {industries.items.map((item, i) => {
              const { img, icon: IndustryIcon } = INDUSTRY_VISUALS[i];
              return (
                <li key={item.label} className="relative aspect-[16/10] overflow-hidden rounded-2xl md:rounded-3xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="absolute inset-0 size-full object-cover" loading="lazy" />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(20,33,61,0.92) 0%, rgba(20,33,61,0.55) 45%, rgba(20,33,61,0.05) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-5 md:p-6">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#14213D]">
                      <IndustryIcon size={28} strokeWidth={1.7} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <span className="block text-[12px] font-bold tracking-[0.18em] text-white/80 uppercase">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-xl leading-snug font-black text-white md:text-2xl">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <BusinessSection id="mice" data={mice} tone="grey" />
      <BusinessSection id="marketing" data={marketing} tone="white" />
      <BusinessSection
        id="exhibition"
        data={exhibition}
        tone="grey"
        after={
          <div className="mt-16">
            <SubHeading>{services.labels.exhibitions}</SubHeading>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {exhibition.exhibitions.map((fair) => (
                <li key={fair.title} className="rounded-xl border border-[#E3E8F0] bg-white px-5 py-4">
                  <span className="block font-bold" style={{ color: NAVY }}>
                    {fair.title}
                  </span>
                  <span className="mt-0.5 block text-[14px] text-[#4A5873]">{fair.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />
      <BusinessSection id="buyer" data={buyer} tone="white" />
      <BusinessSection id="trade" data={trade} tone="grey">
        <div className="mt-10">
          <SubHeading>{services.labels.categories}</SubHeading>
          <ul className="flex flex-wrap gap-3">
            {trade.categories.map((category) => (
              <li
                key={category}
                className="rounded-full border border-[#1F5FE0] bg-white px-5 py-2.5 text-[15px] font-bold text-[#1F5FE0]"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </BusinessSection>

      <CtaSection
        highlight={cta.highlight}
        title={
          <>
            {cta.titleLead}{" "}
            <span className="font-bold text-[#1F5FE0] underline decoration-2 underline-offset-8">
              {cta.titleHighlight}
            </span>{" "}
            {cta.titleMid} <br className="hidden md:block" />
            {cta.titleTail}
          </>
        }
        description={cta.description}
      />
    </div>
  );
}
