"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "@/i18n/Link";
import { useHashScroll } from "@/hooks/useHashScroll";
import { useDictionary } from "@/i18n/I18nProvider";
import { motion } from "motion/react";
import {
  Globe,
  Zap,
  Leaf,
  Handshake,
  Briefcase,
  Cpu,
  MicVocal,
  ChartColumn,
  Lightbulb,
  Box,
  ClipboardCheck,
  Search,
  Settings,
  Users,
  Stethoscope,
  Car,
  Ship,
  Target,
  Sparkles,
  CircleCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/cn";
import CtaSection from "@/components/CtaSection";
import { slideInLeft, slideInRight } from "@/lib/variants";

/** Section anchors, in page order; tab labels come from `services.tabs`. */
const TAB_IDS = ["industries", "exhibition", "marketing", "mice", "buyer", "trade"] as const;
type TabId = (typeof TAB_IDS)[number];

/** Distance from the viewport top at which a section counts as "current" (header + sticky tab bar). */
const ACTIVE_OFFSET = 160;
/** Scroll offset used when jumping to a section from the tab bar. */
const JUMP_OFFSET = 130;

const SLIDE_IMAGES = [
  "/image/ser/s-7.jpg",
  "/image/ser/s-8.jpg",
  "/image/ser/s-9.jpg",
  "/image/ser/s-10.jpg",
];

/** Visuals for `services.industries.items`, same order. */
const INDUSTRY_STYLES = [
  { color: "#059669", img: "/image/ser/s-1.jpg", icon: Leaf },
  { color: "#ea580c", img: "/image/ser/s-2.jpg", icon: Zap },
  { color: "#2563EB", img: "/image/ser/s-3.jpg", icon: Cpu },
  { color: "#4f46e5", img: "/image/ser/s-4.jpg", icon: Car },
  { color: "#e11d48", img: "/image/ser/s-5.jpg", icon: Stethoscope },
  { color: "#d946ef", img: "/image/ser/s-6.jpg", icon: Box },
];

const EXHIBITION_STEP_ICONS = [Search, Briefcase, Settings, Globe];
const BUYER_STEP_ICONS = [Lightbulb, Target, ClipboardCheck, MicVocal, ChartColumn];
const TRADE_CARD_ICONS = [Target, Users, Ship];

const stepNumber = (index: number) => String(index + 1).padStart(2, "0");

function ExhibitionSlider() {
  const { services } = useDictionary();
  const slides = services.exhibition.slides;
  const [n, setN] = useState(0);
  useEffect(() => {
    const r = setInterval(() => {
      setN((o) => (o + 1) % slides.length);
    }, 4000);
    return () => clearInterval(r);
  }, [slides.length]);
  return (
    <div className="relative w-full flex flex-col gap-4 lg:h-full lg:min-h-[480px] max-h-[700px]">
      <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[400px] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] group">
        {slides.map((slide, o) => (
          <motion.div
            key={o}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: n === o ? 1 : 0,
            }}
            transition={{
              duration: 1,
            }}
            className="absolute inset-0"
          >
            <img src={SLIDE_IMAGES[o]} className="w-full h-full object-cover" alt={slide.title} />
            <div className="absolute inset-0 bg-navy/20" />
          </motion.div>
        ))}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30" aria-hidden="true">
          {slides.map((_, o) => (
            <div
              key={o}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                n === o ? "w-8 bg-brand-orange" : "w-2 bg-white/50",
              )}
            />
          ))}
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl shadow-sm" aria-live="polite">
        <h4 className="font-display font-bold text-navy text-xl mb-1.5">{slides[n].title}</h4>
        <p className="font-sans font-medium text-gray-500 text-sm tracking-tight leading-relaxed">
          {slides[n].desc}
        </p>
      </div>
    </div>
  );
}

/** "01 ── EYEBROW" row plus the "주요 사업 - <title>" heading shared by the four business sections. */
function SectionHeading({ num, eyebrow, title }: { num: string; eyebrow: string; title: string }) {
  const { services } = useDictionary();
  return (
    <>
      <div className="inline-flex items-center gap-3 mb-6">
        <span className="font-display font-black text-[#E84B3A] text-4xl">{num}</span>
        <div className="w-12 h-[2px] bg-gray-300" />
        <span className="font-display font-bold text-gray-400 uppercase tracking-widest text-base md:text-lg">
          {eyebrow}
        </span>
      </div>
      <h2
        className="font-display font-black text-navy leading-[1.1] mb-8"
        style={{
          fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
          letterSpacing: "-0.04em",
        }}
      >
        {services.labels.coreBusiness}
        <br />
        <span className="text-brand-orange">{title}</span>
      </h2>
    </>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/5 border border-brand-orange/20 rounded-xl w-fit">
      <p className="font-sans font-bold text-brand-orange text-base md:text-lg">{children}</p>
    </div>
  );
}

function ServiceGroups({ groups }: { groups: { title: string; items: string[] }[] }) {
  const { services } = useDictionary();
  return (
    <>
      <div className="flex items-center gap-4 mb-10">
        <div className="w-1.5 h-6 bg-brand-orange rounded-full" />
        <h4 className="font-display font-black text-navy text-2xl tracking-tight">
          {services.labels.serviceContent}
        </h4>
      </div>
      <div className="space-y-10 group/list">
        {groups.map((group, f) => (
          <div
            key={f}
            className="relative pl-8 md:pl-12 border-l border-gray-200 group-hover/list:border-brand-orange/40 transition-colors duration-300"
          >
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-brand-orange shadow-sm" />
            <h4 className="font-sans font-black text-navy text-lg mb-3">
              {stepNumber(f)}. {group.title}
            </h4>
            <ul className="space-y-2">
              {group.items.map((item, m) => (
                <li key={m} className="font-sans font-bold text-gray-500 text-sm flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0 mt-[0.45em]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

function TargetList({ targets }: { targets: string[] }) {
  const { services } = useDictionary();
  return (
    <div className="p-6 md:p-10 bg-white rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-sm flex-1 flex flex-col justify-center">
      <h4 className="font-display font-black text-navy text-xl mb-6">{services.labels.serviceTargets}</h4>
      <div className="grid grid-cols-1 gap-4">
        {targets.map((target, f) => (
          <div
            key={f}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 font-sans font-bold text-gray-700"
          >
            <CircleCheck size={20} className="text-brand-orange mt-0.5 shrink-0" />
            <span className="text-[0.95rem]">{target}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CountryBox({ countries }: { countries: string }) {
  const { services } = useDictionary();
  return (
    <div className="p-6 md:p-8 bg-[#f8fafc] text-navy rounded-[32px] md:rounded-[40px] border border-gray-100 relative overflow-hidden flex flex-col justify-center">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full -translate-y-12 translate-x-12" />
      <h4 className="font-display font-black text-navy text-xl mb-6 relative z-10">
        {services.labels.targetCountries}
      </h4>
      <div className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
        <div className="font-display font-black text-brand-orange text-3xl uppercase tracking-widest">
          {services.labels.global}
        </div>
        <p className="font-sans font-bold text-gray-500 leading-relaxed text-[0.95rem] flex-1">{countries}</p>
      </div>
    </div>
  );
}

function ProcessIntro({ lines }: { lines: string[] }) {
  const { services } = useDictionary();
  return (
    <div className="max-w-2xl mb-12">
      <h3 className="font-display font-black text-navy text-3xl mb-4 tracking-tighter">
        {services.labels.process}
      </h3>
      <div className="h-1 w-24 bg-brand-orange mb-6" />
      <p className="font-sans font-bold text-gray-500 text-lg md:text-xl leading-relaxed">
        {lines[0]} <br className="hidden md:block" />
        {lines[1]}
      </p>
    </div>
  );
}

/** Tab strip with edge fades that show when more tabs are hidden off-screen (mostly on mobile). */
function SectionTabs({ active, onSelect }: { active: TabId | null; onSelect: (id: TabId) => void }) {
  const { services } = useDictionary();
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdges({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Keep the active tab inside the strip as the page scrolls.
  useEffect(() => {
    const el = scroller.current;
    const button = active ? el?.querySelector<HTMLElement>(`[data-tab="${active}"]`) : null;
    if (!el) return;
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
    <div
      className="sticky z-[90] border-b"
      style={{
        top: "75px",
        backgroundColor: "rgba(255, 255, 255, 0.97)",
        backdropFilter: "blur(10px)",
        borderColor: "#e5e7eb",
        boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      }}
    >
      <nav aria-label={services.aria.tabs} className="relative mx-auto" style={{ maxWidth: "1440px" }}>
        <div
          ref={scroller}
          onScroll={measure}
          className="flex gap-0 overflow-x-auto px-4 md:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TAB_IDS.map((id) => (
            <button
              key={id}
              type="button"
              data-tab={id}
              onClick={() => onSelect(id)}
              aria-current={active === id ? "true" : undefined}
              className={cn(
                "flex items-center gap-2 py-4 px-4 md:px-5 font-display font-bold tracking-[0.05em] whitespace-nowrap transition-all border-b-2",
                active === id
                  ? "text-[#2563EB] border-[#2563EB]"
                  : "text-[#6b7280] border-transparent hover:text-navy",
              )}
              style={{
                fontSize: "1rem",
              }}
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
            "absolute inset-y-0 left-0 w-12 flex items-center justify-start pl-1 bg-gradient-to-r from-white via-white/90 to-transparent text-gray-400 transition-opacity",
            edges.left ? "opacity-100" : "opacity-0 pointer-events-none",
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
            "absolute inset-y-0 right-0 w-12 flex items-center justify-end pr-1 bg-gradient-to-l from-white via-white/90 to-transparent text-gray-400 transition-opacity",
            edges.right ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    </div>
  );
}

export default function ServicesPage() {
  const { services, common } = useDictionary();
  const [active, setActive] = useState<TabId | null>(null);

  useEffect(() => {
    // The last section whose top has passed the header line is current; above the first one, none is.
    const update = () => {
      let current: TabId | null = null;
      for (const id of TAB_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useHashScroll({ offset: -JUMP_OFFSET, delay: 300, resetWhenEmpty: true });

  const jumpTo = (id: TabId) => {
    const f = document.getElementById(id);
    if (f) {
      window.scrollTo({
        top: f.getBoundingClientRect().top + window.scrollY - JUMP_OFFSET,
        behavior: "smooth",
      });
    }
  };

  const { hero, industries, exhibition, marketing, mice, buyer, trade, cta } = services;

  return (
    <div className="bg-white">
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          height: "560px",
          paddingTop: "100px",
        }}
        aria-label={services.aria.pageHeader}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80")',
            opacity: 0.2,
          }}
        />
        <div className="absolute inset-0 z-0 overflow-hidden mix-blend-multiply opacity-70">
          <motion.div
            className="absolute top-[0%] -left-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply"
            style={{
              backgroundColor: "rgba(56, 139, 219, 0.2)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-[0%] right-[0%] w-[40vw] h-[60vw] rounded-l-[100vw] mix-blend-multiply"
            style={{
              backgroundColor: "rgba(242, 114, 69, 0.2)",
            }}
            animate={{
              x: [0, -20, 20, 0],
              scale: [1, 1.02, 0.98, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#111827 1px, transparent 1px), linear-gradient(90deg, #111827 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />
        <div
          className="relative z-10 mx-auto w-full px-4 md:px-8 lg:px-12"
          style={{
            maxWidth: "1440px",
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="max-w-[800px] bg-white/40 backdrop-blur-md p-8 md:p-14 rounded-[32px] border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.03)]"
          >
            <div className="flex items-center gap-[15px] mb-6">
              <div
                className="shrink-0"
                style={{
                  width: "40px",
                  height: "2px",
                  backgroundColor: "#E84B3A",
                }}
              />
              <span
                className="font-display font-bold uppercase tracking-[0.3em]"
                style={{
                  fontSize: "0.8rem",
                  color: "#111827",
                }}
              >
                {hero.eyebrow}
              </span>
            </div>
            <h1
              className="font-display font-extrabold text-[#111827] leading-[1.05] mb-8"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {hero.titleLine1}
              <br />
              <span
                style={{
                  color: "#2563EB",
                }}
              >
                {hero.titleLine2}
              </span>
            </h1>
            <p
              className="font-sans font-medium leading-[1.8]"
              style={{
                fontSize: "1.15rem",
                color: "#4b5563",
                maxWidth: "560px",
                letterSpacing: "-0.01em",
              }}
            >
              {hero.descLines[0]}
              <br />
              {hero.descLines[1]}
            </p>
          </motion.div>
        </div>
        <nav
          className="absolute flex items-center gap-3 font-display font-bold uppercase tracking-[0.15em] z-20 md:bottom-[2.5rem] md:right-[3rem] bottom-[-4rem] right-1/2 translate-x-1/2 md:translate-x-0"
          style={{
            fontSize: "0.75rem",
            color: "#6b7280",
          }}
          aria-label={services.aria.breadcrumb}
        >
          <Link
            href="/"
            className="inline-block py-3 -my-3 text-inherit no-underline hover:text-[#111827] transition-colors"
          >
            {common.home}
          </Link>
          <span
            style={{
              color: "#d1d5db",
            }}
          >
            /
          </span>
          <span className="text-[#111827]">{services.breadcrumb}</span>
        </nav>
      </section>
      <SectionTabs active={active} onSelect={jumpTo} />
      <section
        className="bg-gray-50"
        style={{
          paddingTop: "8rem",
          paddingBottom: "8rem",
        }}
        id="industries"
      >
        <div
          className="mx-auto px-4 md:px-8 lg:px-12"
          style={{
            maxWidth: "1440px",
          }}
        >
          <div className="mb-16 md:mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="font-display font-black text-[#E84B3A] text-4xl">00</span>
              <div className="w-12 h-[2px] bg-gray-300" />
              <span className="font-display font-bold text-gray-400 uppercase tracking-widest text-base md:text-lg">
                {industries.eyebrow}
              </span>
            </div>
            <h2
              className="font-display font-black text-navy leading-[1.1]"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {industries.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.items.map((item, f) => {
              const style = INDUSTRY_STYLES[f];
              const Icon = style.icon;
              return (
                <motion.div
                  key={f}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: f * 0.1,
                  }}
                  className="group h-full relative"
                >
                  <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-[0_15px_30px_rgba(0,0,0,0.02)] transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] relative flex flex-col h-full min-h-[240px] md:min-h-[260px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${style.img})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-navy/5 transition-all duration-700 group-hover:bg-transparent" />
                    <div className="relative z-10 p-6 flex flex-col h-full items-center justify-center">
                      <div className="flex flex-col items-center gap-2 text-center px-5 py-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:-translate-y-2">
                        {item.label && (
                          <div
                            className="font-display font-black uppercase tracking-[0.25em]"
                            style={{
                              color: style.color,
                              fontSize: "0.6875rem",
                            }}
                          >
                            {item.label}
                          </div>
                        )}
                        <h3 className="font-display font-black text-navy text-xl lg:text-2xl tracking-tighter leading-tight flex items-center gap-3 justify-center">
                          <span className="relative p-2 rounded-xl bg-white shadow-sm border border-gray-100 group-hover:bg-[#111827] group-hover:text-white transition-all duration-700">
                            <Icon size={24} strokeWidth={2.5} className="shrink-0" />
                          </span>
                          {item.name}
                        </h3>
                      </div>
                      <div
                        className="absolute bottom-0 left-0 w-full h-[4px] transition-all duration-500 scale-x-0 group-hover:scale-x-100"
                        style={{
                          backgroundColor: style.color,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <section
        className="bg-white scroll-mt-20 overflow-hidden relative"
        style={{
          paddingTop: "8rem",
          paddingBottom: "6rem",
        }}
        id="exhibition"
        aria-label={services.aria.exhibition}
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
        <div
          className="mx-auto relative z-10 px-4 md:px-8 lg:px-12"
          style={{
            maxWidth: "1440px",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={slideInLeft}
            className="mb-12"
          >
            <SectionHeading num="01" eyebrow={exhibition.eyebrow} title={exhibition.title} />
            <div className="flex flex-col gap-4 mb-10">
              <p className="font-sans font-bold text-gray-500 text-lg md:text-xl leading-relaxed max-w-5xl">
                {exhibition.desc} <span className="text-navy">{exhibition.descDetail}</span>
              </p>
              <Note>{exhibition.note}</Note>
            </div>
          </motion.div>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-12 items-stretch mb-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              variants={slideInLeft}
              className="lg:w-[60%] flex"
            >
              <div className="flex-1 w-full p-8 md:p-12 bg-[#f8fafc] rounded-[32px] md:rounded-[48px] border border-gray-100 relative overflow-hidden group flex flex-col h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full -translate-y-12 translate-x-12 blur-2xl" />
                <ServiceGroups groups={exhibition.serviceGroups} />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              variants={slideInRight}
              className="lg:w-[40%] relative flex w-full"
            >
              <ExhibitionSlider />
            </motion.div>
          </div>
          <div className="relative pt-12 pb-12">
            <div className="relative z-10">
              <ProcessIntro lines={exhibition.processDescLines} />
              <div className="relative">
                <div className="hidden md:block absolute top-[88px] left-[12%] w-[76%] h-[2px] bg-gray-100">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: "100%",
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    viewport={{
                      once: true,
                    }}
                    className="h-full bg-brand-orange/30"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-12 relative">
                  {exhibition.steps.map((title, f) => {
                    const Icon = EXHIBITION_STEP_ICONS[f];
                    return (
                      <motion.div
                        key={f}
                        initial={{
                          opacity: 0,
                          y: 30,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: f * 0.2,
                            duration: 0.6,
                          },
                        }}
                        viewport={{
                          once: true,
                          amount: 0.3,
                        }}
                        className="flex flex-col items-center text-center group"
                      >
                        <motion.div
                          initial={{
                            borderColor: "#f3f4f6",
                            color: "#d1d5db",
                          }}
                          whileInView={{
                            borderColor: "#E84B3A",
                            color: "#E84B3A",
                          }}
                          viewport={{
                            once: true,
                            amount: 0.3,
                          }}
                          transition={{
                            delay: 0.8 + f * 0.3,
                            duration: 0.5,
                          }}
                          className="w-32 h-32 md:w-44 md:h-44 rounded-[32px] md:rounded-[40px] bg-white border-4 flex flex-col items-center justify-center mb-6 md:mb-8 shadow-2xl relative z-10 group-hover:rotate-3 transition-all duration-500 transform-gpu"
                        >
                          <div className="absolute inset-2 bg-gray-50 rounded-[24px] md:rounded-[32px] shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_10px_20px_rgba(0,0,0,0.05)]" />
                          <div className="absolute inset-2 bg-gradient-to-br from-white/80 to-transparent rounded-[24px] md:rounded-[32px]" />
                          <motion.div
                            className="mb-2 relative z-20"
                            animate={{
                              y: [0, -4, 0],
                              filter: [
                                "drop-shadow(0 0 0px rgba(232,75,58,0))",
                                "drop-shadow(0 0 15px rgba(232,75,58,0.5))",
                                "drop-shadow(0 0 0px rgba(232,75,58,0))",
                              ],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: f * 0.5,
                            }}
                          >
                            <Icon
                              size={48}
                              strokeWidth={1.2}
                              className="text-[#E84B3A] w-10 h-10 md:w-12 md:h-12"
                            />
                            <Sparkles
                              size={14}
                              className="absolute -top-2 -right-2 text-[#E84B3A] opacity-30"
                            />
                          </motion.div>
                          <span className="font-display font-black text-navy/30 text-xl md:text-2xl leading-none relative z-20">
                            {stepNumber(f)}
                          </span>
                          <motion.div
                            className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-orange/40"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          />
                          <motion.div
                            className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full bg-blue-400/20"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              delay: 0.5,
                            }}
                          />
                        </motion.div>
                        <h4 className="font-display font-black text-navy text-base md:text-lg leading-tight max-w-[12rem] min-h-[3em] flex items-start md:items-center justify-center">
                          {title}
                        </h4>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-16 pt-8 border-t border-gray-100">
                <p className="font-sans font-bold text-gray-500 text-sm leading-relaxed">
                  {exhibition.footnote.lead}{" "}
                  <span className="text-brand-orange font-black text-base">
                    {exhibition.footnote.highlight}
                  </span>
                  <br />
                  <span className="text-navy font-black text-base inline-block mt-2">
                    {exhibition.footnote.otherLabel}
                  </span>{" "}
                  <span className="text-gray-500">{exhibition.footnote.other}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-white scroll-mt-20 overflow-hidden relative"
        style={{
          paddingTop: "8rem",
          paddingBottom: "6rem",
        }}
        id="marketing"
        aria-label={services.aria.marketing}
      >
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gray-50/50 skew-x-12 -translate-x-1/2 pointer-events-none" />
        <div
          className="mx-auto relative z-10 px-4 md:px-8 lg:px-12"
          style={{
            maxWidth: "1440px",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={slideInLeft}
            className="mb-12"
          >
            <SectionHeading num="02" eyebrow={marketing.eyebrow} title={marketing.title} />
            <div className="flex flex-col gap-4 mb-10">
              <p className="font-sans font-bold text-gray-500 text-lg md:text-xl leading-relaxed max-w-5xl">
                {marketing.desc}
              </p>
              <p className="font-sans font-bold text-navy text-base md:text-lg leading-relaxed">
                {marketing.detail}
              </p>
              <Note>{marketing.note}</Note>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              variants={slideInLeft}
              className="p-8 md:p-12 bg-[#f8fafc] rounded-[32px] md:rounded-[48px] border border-gray-100 flex flex-col h-full"
            >
              <ServiceGroups groups={marketing.serviceGroups} />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              variants={slideInRight}
              className="flex flex-col gap-8 md:gap-12"
            >
              <TargetList targets={marketing.targets} />
              <CountryBox countries={marketing.countries} />
            </motion.div>
          </div>
        </div>
      </section>
      <section
        className="bg-white scroll-mt-20 overflow-hidden relative"
        style={{
          paddingTop: "8rem",
          paddingBottom: "6rem",
        }}
        id="mice"
        aria-label={services.aria.mice}
      >
        <div
          className="mx-auto relative z-10 px-4 md:px-8 lg:px-12"
          style={{
            maxWidth: "1440px",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={slideInLeft}
            className="lg:w-full"
          >
            <SectionHeading num="03" eyebrow={mice.eyebrow} title={mice.title} />
            <div className="flex flex-col gap-4 mb-10">
              <p className="font-sans font-bold text-gray-500 text-lg md:text-xl leading-relaxed max-w-5xl">
                {mice.desc}
              </p>
              <Note>{mice.note}</Note>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch mt-12 md:mt-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                }}
                variants={slideInLeft}
                className="p-8 md:p-12 bg-[#f8fafc] rounded-[32px] md:rounded-[48px] border border-gray-100 flex flex-col h-full"
              >
                <ServiceGroups groups={mice.serviceGroups} />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                }}
                variants={slideInRight}
                className="flex flex-col gap-12"
              >
                <TargetList targets={mice.targets} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <section
        className="bg-gray-50/50 scroll-mt-20 overflow-hidden relative"
        style={{
          paddingTop: "8rem",
          paddingBottom: "6rem",
        }}
        id="buyer"
        aria-label={services.aria.buyer}
      >
        <div
          className="mx-auto relative z-10 px-4 md:px-8 lg:px-12"
          style={{
            maxWidth: "1440px",
          }}
        >
          <div className="mb-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              variants={slideInLeft}
              className="lg:w-full"
            >
              <SectionHeading num="04" eyebrow={buyer.eyebrow} title={buyer.title} />
              <div className="flex flex-col gap-4 mb-10">
                <div className="flex items-start md:items-center gap-3 px-5 md:px-6 py-4 md:py-3 bg-brand-orange/5 border border-brand-orange/20 rounded-2xl w-fit mb-6">
                  <Globe
                    className="text-brand-orange shrink-0 mt-0.5 md:mt-0 animate-[spin_20s_linear_infinite]"
                    size={24}
                  />
                  <p className="font-sans font-black text-navy text-lg md:text-xl">{buyer.intro}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  variants={slideInLeft}
                  className="p-8 md:p-12 bg-[#f8fafc] rounded-[32px] md:rounded-[48px] border border-gray-100 flex flex-col h-full"
                >
                  <ServiceGroups groups={buyer.serviceGroups} />
                </motion.div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  variants={slideInRight}
                  className="flex flex-col gap-8 md:gap-12"
                >
                  <TargetList targets={buyer.targets} />
                  <CountryBox countries={buyer.countries} />
                </motion.div>
              </div>
            </motion.div>
          </div>
          <div className="relative pt-12 pb-12 mt-12">
            <div className="relative z-10">
              <ProcessIntro lines={buyer.processDescLines} />
              <div className="relative">
                <div className="hidden lg:block absolute top-[80px] left-[10%] w-[80%] h-[2px] bg-gray-100">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: "100%",
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    viewport={{
                      once: true,
                    }}
                    className="h-full bg-brand-orange/30"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 md:gap-y-12 gap-x-4 md:gap-x-8 relative">
                  {buyer.steps.map((title, f) => {
                    const Icon = BUYER_STEP_ICONS[f];
                    return (
                      <motion.div
                        key={f}
                        initial={{
                          opacity: 0,
                          y: 30,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: f * 0.2,
                            duration: 0.6,
                          },
                        }}
                        viewport={{
                          once: true,
                          amount: 0.3,
                        }}
                        className="flex flex-col items-center text-center group"
                      >
                        <motion.div
                          initial={{
                            borderColor: "#f3f4f6",
                            color: "#d1d5db",
                          }}
                          whileInView={{
                            borderColor: "#E84B3A",
                            color: "#E84B3A",
                          }}
                          viewport={{
                            once: true,
                            amount: 0.3,
                          }}
                          transition={{
                            delay: 0.8 + f * 0.3,
                            duration: 0.5,
                          }}
                          className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white border-4 flex flex-col items-center justify-center mb-6 md:mb-8 shadow-xl relative z-10"
                        >
                          <motion.div
                            className="mb-1 relative"
                            animate={{
                              filter: [
                                "drop-shadow(0 0 0px rgba(232,101,34,0))",
                                "drop-shadow(0 0 12px rgba(232,101,34,0.6))",
                                "drop-shadow(0 0 0px rgba(232,101,34,0))",
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: f * 0.5,
                            }}
                          >
                            <Icon size={44} strokeWidth={1.5} className="w-9 h-9 lg:w-11 lg:h-11" />
                            <motion.div
                              className="absolute -top-1 -right-1 text-brand-orange opacity-0"
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0.5, 1.2, 0.5],
                                rotate: [0, 90, 180],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: f * 0.5,
                              }}
                            >
                              <Sparkles size={12} />
                            </motion.div>
                          </motion.div>
                          <span className="font-display font-black text-navy/20 text-lg lg:text-xl leading-none">
                            {stepNumber(f)}
                          </span>
                          <motion.div
                            className="absolute inset-[-4px] rounded-full border border-brand-orange/20 opacity-0"
                            animate={{
                              scale: [1, 1.15],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: f * 0.5,
                            }}
                          />
                          <div className="absolute inset-1 rounded-full border border-dashed border-gray-100 animate-[spin_12s_linear_infinite]" />
                        </motion.div>
                        <h4 className="font-display font-black text-navy text-base md:text-lg leading-tight max-w-[10rem]">
                          {title}
                        </h4>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-16 md:mt-20 p-6 md:p-8 bg-brand-orange/[0.03] border border-brand-orange/10 rounded-[32px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 hidden md:block">
                  <Globe size={120} />
                </div>
                <p className="font-sans font-bold text-gray-500 text-sm leading-relaxed relative z-10">
                  {buyer.summary.label}
                  <br />
                  <span className="text-navy font-black text-lg md:text-xl inline-block mt-3 tracking-tight">
                    {buyer.summary.flow}
                  </span>
                  <br />
                  <span className="text-brand-orange font-bold text-base mt-2 inline-block">
                    {buyer.summary.tagline}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-white scroll-mt-20 overflow-hidden relative"
        style={{
          paddingTop: "8rem",
          paddingBottom: "6rem",
        }}
        id="trade"
        aria-label={services.aria.trade}
      >
        <div
          className="mx-auto relative z-10 px-4 md:px-8 lg:px-12"
          style={{
            maxWidth: "1440px",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={slideInLeft}
            className="lg:w-full"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-[1px] bg-brand-orange shrink-0" />
              <span className="font-display font-black text-brand-orange uppercase tracking-[0.3em] md:tracking-[0.4em] text-sm">
                {trade.eyebrow}
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16 lg:items-center">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-blue-50 rounded-[28px] flex items-center justify-center text-blue-500 shadow-sm border border-blue-100/50">
                  <Handshake size={48} strokeWidth={1.5} />
                </div>
                <h2
                  className="font-display font-black text-navy leading-none"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {trade.title}
                </h2>
              </div>
              <div>
                <p className="font-sans font-bold text-gray-500 text-lg md:text-2xl leading-snug mb-6">
                  {trade.descLines[0]} <br className="hidden md:block" />
                  {trade.descLines[1]}
                </p>
                <div className="p-5 md:p-6 bg-gray-50/50 border border-gray-100 rounded-2xl inline-block">
                  <p className="font-sans font-bold text-gray-500 text-base md:text-lg">
                    <span className="text-brand-orange mr-1">*</span>
                    {trade.note}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-14 md:mt-16">
              {trade.cards.map((card, f) => {
                const Icon = TRADE_CARD_ICONS[f];
                return (
                  <motion.div
                    key={f}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { delay: 0.2 + f * 0.1, duration: 0.6 } },
                    }}
                    className="p-8 md:p-10 bg-[#f8fafc] rounded-[32px] md:rounded-[40px] border border-gray-100 group hover:border-brand-orange/30 transition-colors duration-500"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">
                      <Icon size={28} />
                    </div>
                    <h4 className="font-display font-black text-navy text-xl mb-3">{card.title}</h4>
                    <p className="font-sans font-bold text-gray-500 leading-relaxed">{card.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
      <CtaSection
        highlight={cta.highlight}
        title={
          <>
            {cta.titleLead}{" "}
            <span className="text-[#2563EB] font-bold underline underline-offset-8 decoration-2 underline-[#2563EB]/40">
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
