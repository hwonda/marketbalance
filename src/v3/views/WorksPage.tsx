"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type TouchEvent,
} from "react";
import Link from "@/v3/i18n/Link";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Zap,
  Leaf,
  Layers,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Users,
  Building2,
  ShoppingBag,
  Trophy,
  X,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/v3/lib/cn";
import CtaSection from "@/v3/components/CtaSection";
import { useDictionary, useLocale } from "@/v3/i18n/I18nProvider";
import { mediaFor, type WorkMedia } from "@/v3/data/workMedia";

type WorkType = "overseas" | "domestic" | "seminar";
type Industry = "material" | "consumer" | "env" | "energy" | "it";

/** Non-text record data. Titles, clients, tags and locations live in `works.projects` (keyed by id). */
const WORKS: {
  id: number;
  year: string;
  type: WorkType;
  industry: Industry;
  icon: ReactElement;
  theme: string;
}[] = [
  {
    id: 1,
    year: "2025",
    type: "domestic",
    industry: "material",
    icon: <Layers size={32} />,
    theme: "linear-gradient(135deg, #14213D 0%, #1e3a6e 45%, #2D7A5F 100%)",
  },
  {
    id: 2,
    year: "2025",
    type: "domestic",
    industry: "consumer",
    icon: <Building2 size={32} />,
    theme: "linear-gradient(135deg, #1a0e00 0%, #2e1c00 45%, #1F5FE0 100%)",
  },
  {
    id: 3,
    year: "2025",
    type: "overseas",
    industry: "env",
    icon: <Globe size={40} />,
    theme: "linear-gradient(135deg, #14213D 0%, #14213D 40%, #2D7A5F 100%)",
  },
  {
    id: 4,
    year: "2025",
    type: "domestic",
    industry: "env",
    icon: <Leaf size={32} />,
    theme: "linear-gradient(135deg, #081a10 0%, #0d2a18 45%, #2D7A5F 100%)",
  },
  {
    id: 5,
    year: "2025",
    type: "overseas",
    industry: "energy",
    icon: <Zap size={32} />,
    theme: "linear-gradient(135deg, #14213D 0%, #14213D 45%, #1F5FE0 100%)",
  },
  {
    id: 6,
    year: "2025",
    type: "overseas",
    industry: "env",
    icon: <Globe size={32} />,
    theme: "linear-gradient(135deg, #14213D 0%, #1e3a6e 45%, #2D7A5F 100%)",
  },
  {
    id: 7,
    year: "2025",
    type: "seminar",
    industry: "energy",
    icon: <Users size={32} />,
    theme: "linear-gradient(135deg, #081a10 0%, #0d2a18 45%, #2D7A5F 100%)",
  },
  {
    id: 8,
    year: "2025",
    type: "overseas",
    industry: "consumer",
    icon: <ShoppingBag size={32} />,
    theme: "linear-gradient(135deg, #1a0e00 0%, #2e1c00 45%, #1F5FE0 100%)",
  },
  {
    id: 9,
    year: "2025",
    type: "overseas",
    industry: "energy",
    icon: <Zap size={32} />,
    theme: "linear-gradient(135deg, #14213D 0%, #14213D 45%, #1F5FE0 100%)",
  },
  {
    id: 10,
    year: "2025",
    type: "seminar",
    industry: "energy",
    icon: <Users size={32} />,
    theme: "linear-gradient(135deg, #0a0a2e 0%, #12124a 45%, #1F5FE0 100%)",
  },
  {
    id: 11,
    year: "2025",
    type: "domestic",
    industry: "env",
    icon: <Leaf size={32} />,
    theme: "linear-gradient(135deg, #14213D 0%, #1e3a6e 45%, #2D7A5F 100%)",
  },
  {
    id: 12,
    year: "2025",
    type: "domestic",
    industry: "it",
    icon: <Cpu size={32} />,
    theme: "linear-gradient(135deg, #0a0a2e 0%, #12124a 45%, #1F5FE0 100%)",
  },
];

const FILTER_IDS = [
  "all",
  "overseas",
  "domestic",
  "seminar",
  "env",
  "energy",
  "consumer",
  "it",
  "material",
] as const;
type FilterId = (typeof FILTER_IDS)[number];

type CategoryKey = "exhibitionOverseas" | "meetingOverseas" | "meetingDomestic" | "seminar";

/** Badge colour + label key for a record's category column. */
function categoryOf(work: (typeof WORKS)[number]): { key: CategoryKey; text: string; bg: string } {
  if (work.type === "overseas") {
    return work.industry === "env"
      ? { key: "exhibitionOverseas", text: "text-[#1F5FE0]", bg: "bg-[#EAF0FD]" }
      : { key: "meetingOverseas", text: "text-sky-700", bg: "bg-sky-50" };
  }
  if (work.type === "domestic") return { key: "meetingDomestic", text: "text-teal-600", bg: "bg-teal-50" };
  return { key: "seminar", text: "text-purple-600", bg: "bg-purple-50" };
}

const IconBadge = ({
  icon,
  size = 20,
  className,
}: {
  icon: ReactNode;
  size?: number;
  className?: string;
}) => (
  <div className={cn("relative w-12 h-12 flex items-center justify-center shrink-0 group/icon", className)}>
    <div className="absolute inset-x-1 bottom-0 h-1 bg-black/10 rounded-full blur-sm transform group-hover/row:scale-110 transition-transform duration-500" />
    <div className="absolute inset-0 bg-gray-50 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_2px_4px_rgba(0,0,0,0.05)] border border-gray-100 transition-all duration-500 group-hover/row:bg-white group-hover/row:shadow-[0_10px_20px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,1)] group-hover/row:-translate-y-0.5" />
    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent rounded-xl opacity-50" />
    <div className="relative z-10 text-gray-400 group-hover/row:text-navy transition-all duration-500 group-hover/row:scale-110">
      {isValidElement(icon)
        ? cloneElement(icon as ReactElement<LucideProps>, {
            size,
            strokeWidth: 2.5,
          })
        : icon}
    </div>
    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brand-orange rounded-full opacity-0 group-hover/row:opacity-100 transition-all scale-0 group-hover/row:scale-100 duration-500 shadow-[0_0_8px_rgba(31,95,224,0.5)]" />
  </div>
);

/**
 * Horizontally scrollable filter chips. Edge fades + chevrons show when more chips are off-screen,
 * and the active chip is scrolled into view when it changes.
 */
function FilterBar({
  active,
  labels,
  ariaLabel,
  onSelect,
}: {
  active: FilterId;
  labels: Record<FilterId, string>;
  ariaLabel: string;
  onSelect: (id: FilterId) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () =>
      setEdges({
        start: el.scrollLeft > 4,
        end: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
      });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    const chip = el?.querySelector<HTMLElement>(`[data-filter="${active}"]`);
    if (!el || !chip) return;
    const target = chip.offsetLeft - (el.clientWidth - chip.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  const nudge = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    el?.scrollBy({ left: direction * el.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <div className="relative mb-12 bg-gray-50/50 rounded-[28px] border border-gray-100/50 overflow-hidden">
      <div
        ref={scrollerRef}
        role="group"
        aria-label={ariaLabel}
        className="relative flex items-center gap-2 overflow-x-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {FILTER_IDS.map((id) => (
          <button
            key={id}
            type="button"
            data-filter={id}
            aria-pressed={active === id}
            onClick={() => onSelect(id)}
            className={cn(
              "font-display font-black min-h-11 py-3 px-6 md:px-8 rounded-[20px] transition-all duration-500 whitespace-nowrap text-sm tracking-tighter",
              active === id
                ? "bg-navy text-white shadow-[0_10px_20px_rgba(20,33,61,0.2)]"
                : "text-gray-500 hover:text-navy hover:bg-white/80",
            )}
          >
            {labels[id]}
          </button>
        ))}
      </div>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => nudge(-1)}
        className={cn(
          "absolute inset-y-0 left-0 w-14 flex items-center justify-start pl-2 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent text-navy/60 transition-opacity duration-300",
          edges.start ? "opacity-100" : "opacity-0 pointer-events-none",
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
          "absolute inset-y-0 right-0 w-14 flex items-center justify-end pr-2 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent text-navy/60 transition-opacity duration-300",
          edges.end ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

/** Results text: keeps line breaks; lines starting with "- " or "• " become a bullet list. */
function ResultsText({ text }: { text: string }) {
  const blocks: { list: boolean; lines: string[] }[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trimEnd();
    const bullet = /^\s*[-•]\s+/.test(line);
    const content = bullet ? line.replace(/^\s*[-•]\s+/, "") : line;
    const last = blocks[blocks.length - 1];
    if (last && last.list === bullet) last.lines.push(content);
    else blocks.push({ list: bullet, lines: [content] });
  }
  return (
    <div className="space-y-3 text-[15px] leading-[1.8] text-[#4A5873]">
      {blocks.map((block, i) =>
        block.list ? (
          <ul key={i} className="list-disc space-y-1 pl-5 marker:text-[#1F5FE0]">
            {block.lines.map((line, j) => (
              <li key={j}>{line}</li>
            ))}
          </ul>
        ) : (
          <p key={i} className="whitespace-pre-line">
            {block.lines.join("\n").trim()}
          </p>
        ),
      )}
    </div>
  );
}

type Labels = {
  prev: string;
  next: string;
  enlarge: string;
  closePhoto: string;
  photoCount: string;
  photos: string;
};

/** Photo gallery: previous/next buttons, swipe on touch, click a photo to see it large. */
function Gallery({
  photos,
  locale,
  labels,
  onEnlarge,
}: {
  photos: WorkMedia["photos"];
  locale: "ko" | "en";
  labels: Labels;
  onEnlarge: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const go = (delta: number) => setIndex((i) => (i + delta + photos.length) % photos.length);
  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40 && photos.length > 1) go(dx < 0 ? 1 : -1);
  };
  const photo = photos[index];

  return (
    <div
      className="relative h-full min-h-[240px] w-full bg-[#14213D] md:min-h-[420px]"
      role="group"
      aria-roledescription="carousel"
      aria-label={labels.photos}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        onClick={() => onEnlarge(index)}
        aria-label={`${labels.enlarge}: ${photo.alt[locale]}`}
        className="block h-full w-full cursor-zoom-in"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt[locale]}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </button>
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={labels.prev}
            className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#14213D] shadow hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={labels.next}
            className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#14213D] shadow hover:bg-white"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            <span
              className="rounded-full bg-[#14213D]/70 px-3 py-1 text-[12px] font-semibold text-white"
              aria-live="polite"
            >
              {labels.photoCount
                .replace("{current}", String(index + 1))
                .replace("{total}", String(photos.length))}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

/** Full-screen view of one photo, with previous/next. Escape or the close button returns to the popup. */
function Lightbox({
  photos,
  start,
  locale,
  labels,
  onClose,
}: {
  photos: WorkMedia["photos"];
  start: number;
  locale: "ko" | "en";
  labels: Labels;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(start);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const go = (delta: number) => setIndex((i) => (i + delta + photos.length) % photos.length);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      } else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const photo = photos[index];
  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt[locale]}
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40 && photos.length > 1) go(dx < 0 ? 1 : -1);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.alt[locale]}
        className="max-h-full max-w-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={labels.closePhoto}
        className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-white text-[#14213D]"
      >
        <X size={20} />
      </button>
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label={labels.prev}
            className="absolute top-1/2 left-4 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#14213D]"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label={labels.next}
            className="absolute top-1/2 right-4 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#14213D]"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}

export default function WorksPage() {
  const { works, common } = useDictionary();
  const locale = useLocale();
  const [n, setN] = useState<FilterId>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const textOf = (id: number) => works.projects.find((p) => p.id === id)!;
  const u = WORKS.filter((f) => {
    if (n === "all") return true;
    if (n === "overseas" || n === "domestic" || n === "seminar") return f.type === n;
    return f.industry === n;
  });
  const r = selectedId === null ? null : (WORKS.find((w) => w.id === selectedId) ?? null);
  const rText = r ? textOf(r.id) : null;
  const rMedia = r ? mediaFor(r.id) : null;
  const results = rMedia?.results[locale]?.trim() ?? "";

  const close = () => {
    setLightbox(null);
    setSelectedId(null);
  };

  // Popup: move focus into it, close on Escape, keep the page behind it from scrolling.
  useEffect(() => {
    if (selectedId === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedId]);

  const filterLabels: Record<FilterId, string> = {
    all: works.filters.all,
    overseas: works.filters.overseas,
    domestic: works.filters.domestic,
    seminar: works.filters.seminar,
    env: works.filters.env,
    energy: works.filters.energy,
    consumer: works.filters.consumer,
    it: works.filters.it,
    material: works.filters.material,
  };

  const headers = [
    { main: works.table.category, sub: works.table.categorySub, align: "text-center", width: "w-[180px]" },
    { main: works.table.industry, sub: works.table.industrySub, align: "text-center", width: "w-[160px]" },
    { main: works.table.title, sub: works.table.titleSub, align: "text-left", width: "" },
  ];
  const galleryLabels: Labels = works.modal;

  return (
    <div className="bg-white">
      {/* §2/§6: plain section ground, no decorative circles, grid, glass card or text over a photo. */}
      <section
        className="relative bg-[#F6F8FC] pt-[136px] pb-16 md:pt-[156px] md:pb-20"
        aria-label={works.hero.ariaLabel}
      >
        <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <div className="flex items-center gap-[15px] mb-6">
            <div className="h-[2px] w-10 bg-[#1F5FE0]" />
            <span className="font-display text-[0.8rem] font-bold tracking-[0.3em] text-[#14213D] uppercase">
              {works.hero.eyebrow}
            </span>
          </div>
          <h1
            className="mb-6 font-display leading-[1.05] font-extrabold text-[#14213D]"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)", letterSpacing: "-0.04em" }}
          >
            {works.hero.titleLine1}
            <br />
            <span className="text-[#1F5FE0]">{works.hero.titleLine2}</span>
          </h1>
          <p className="max-w-[560px] font-sans text-[1.05rem] leading-[1.8] font-medium text-[#4A5873] md:text-[1.15rem]">
            {works.hero.descLine1} <br className="hidden md:block" />
            {works.hero.descLine2}
          </p>
          <nav
            className="mt-10 flex items-center gap-3 font-display text-[0.75rem] font-bold tracking-[0.15em] text-[#6b7280] uppercase md:absolute md:right-12 md:bottom-0 md:mt-0"
            aria-label={works.breadcrumb.ariaLabel}
          >
            <Link href="/" className="inline-flex min-h-11 items-center hover:text-[#14213D]">
              {common.home}
            </Link>
            <span className="text-[#d1d5db]">/</span>
            <span className="text-[#14213D]">{works.breadcrumb.current}</span>
          </nav>
        </div>
      </section>
      <section className="pt-24 pb-12 px-8 md:px-12 bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: "1280px",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-brand-orange" />
                <span className="font-display font-bold text-brand-orange uppercase tracking-[0.4em] text-xs">
                  {works.record.eyebrow}
                </span>
              </div>
              <h2
                className="font-display font-black text-navy leading-[1.1] mb-6"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                {works.record.title}
                <span className="text-brand-orange">.</span>
              </h2>
              <p className="font-sans font-bold text-gray-400 text-2xl leading-relaxed max-w-2xl tracking-tighter">
                {works.record.descLead} <br />
                <span className="text-navy font-black">{works.record.descEmphasis}</span>
              </p>
            </div>
            <div className="flex items-center gap-8 bg-[#F6F8FC] p-8 rounded-[40px] border border-gray-100 relative overflow-hidden group">
              <div className="text-right relative z-10">
                <div className="font-display font-black text-navy text-4xl mb-1">
                  {works.record.fiscalYear}
                </div>
                <div className="font-sans font-bold text-brand-orange text-xs uppercase tracking-[0.3em]">
                  {works.record.currentProjects}
                </div>
              </div>
              <div className="w-20 h-20 relative group-hover:rotate-6 transition-transform duration-500 transform-gpu">
                <div className="absolute inset-0 bg-navy/20 rounded-2xl blur-lg opacity-40" />
                <div className="absolute inset-0 bg-navy rounded-2xl shadow-[0_15px_30px_rgba(20,33,61,0.3),inset_0_2px_4px_rgba(255,255,255,0.1)] border border-white/10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
                <div className="relative z-10 flex items-center justify-center h-full">
                  <Trophy
                    size={36}
                    className="text-brand-orange drop-shadow-[0_4px_10px_rgba(31,95,224,0.4)]"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-32 px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <FilterBar active={n} labels={filterLabels} ariaLabel={works.filters.ariaLabel} onSelect={setN} />
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_40px_80px_rgba(0,0,0,0.03)] overflow-hidden">
            {u.length === 0 && (
              <p className="py-20 text-center font-sans font-bold text-gray-400">{works.table.empty}</p>
            )}
            <div className={cn("hidden", u.length > 0 && "lg:block")}>
              <table className="w-full table-fixed">
                <thead>
                  <tr className="bg-[#F6F8FC] border-b border-gray-100">
                    {headers.map((h) => (
                      <th key={h.main} scope="col" className={cn("py-10 px-8", h.align, h.width)}>
                        <div className="font-display font-black text-navy text-base mb-1">{h.main}</div>
                        <div className="font-display font-bold text-navy/40 uppercase tracking-[0.2em] text-[11px]">
                          {h.sub}
                        </div>
                      </th>
                    ))}
                    <th scope="col" className="w-20">
                      <span className="sr-only">{works.table.open}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {u.map((f) => {
                    const cat = categoryOf(f);
                    const t = textOf(f.id);
                    const clickable = mediaFor(f.id) !== null;
                    return (
                      <tr
                        key={f.id}
                        onClick={clickable ? () => setSelectedId(f.id) : undefined}
                        className={cn(
                          "transition-colors duration-300 group/row",
                          clickable && "cursor-pointer hover:bg-[#F6F8FC]",
                        )}
                      >
                        <td className="py-8 px-8 text-center">
                          <span
                            className={cn(
                              "inline-block px-4 py-1.5 rounded-full font-display font-black text-[0.8rem] tracking-tight whitespace-nowrap",
                              cat.bg,
                              cat.text,
                            )}
                          >
                            {works.categories[cat.key]}
                          </span>
                        </td>
                        <td className="py-8 px-8 text-center">
                          <div className="flex flex-col items-center">
                            <IconBadge icon={f.icon} size={22} />
                            <span className="font-sans font-black text-navy/60 text-xs uppercase tracking-tighter mt-2">
                              {works.industries[f.industry]}
                            </span>
                          </div>
                        </td>
                        <td className="py-8 px-8 text-left">
                          {clickable ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(f.id);
                              }}
                              className="text-left font-sans font-black text-navy leading-snug text-[1.15rem] tracking-[-0.03em] transition-colors group-hover/row:text-[#1F5FE0]"
                            >
                              {t.title}
                            </button>
                          ) : (
                            <span className="block font-sans font-black text-navy leading-snug text-[1.15rem] tracking-[-0.03em]">
                              {t.title}
                            </span>
                          )}
                        </td>
                        <td className="py-8 pr-8 text-right">
                          {clickable && (
                            <ChevronRight
                              aria-hidden
                              size={22}
                              className="inline-block text-[#1F5FE0] transition-transform group-hover/row:translate-x-1"
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <ul className="lg:hidden divide-y divide-gray-50">
              {u.map((f) => {
                const cat = categoryOf(f);
                const t = textOf(f.id);
                const clickable = mediaFor(f.id) !== null;
                const content = (
                  <>
                    <div className="w-full flex flex-wrap justify-between items-start gap-x-4 gap-y-3">
                      <span
                        className={cn(
                          "inline-block px-4 py-1.5 rounded-full font-display font-black text-[0.75rem] tracking-tight whitespace-nowrap",
                          cat.bg,
                          cat.text,
                        )}
                      >
                        {works.categories[cat.key]}
                      </span>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <span className="font-display font-bold text-gray-400 text-[11px] uppercase tracking-widest block mb-0.5">
                            {works.table.industryLabel}
                          </span>
                          <span className="font-sans font-black text-navy/60 text-xs">
                            {works.industries[f.industry]}
                          </span>
                        </div>
                        <IconBadge icon={f.icon} size={18} />
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between gap-4">
                      <h3 className="font-sans font-black text-navy leading-snug text-[1.15rem] tracking-[-0.02em]">
                        {t.title}
                      </h3>
                      {clickable && (
                        <ChevronRight aria-hidden size={22} className="shrink-0 text-[#1F5FE0]" />
                      )}
                    </div>
                  </>
                );
                return (
                  <li key={f.id}>
                    {clickable ? (
                      <button
                        type="button"
                        className="w-full text-left p-6 md:p-8 flex flex-col gap-5 cursor-pointer active:bg-[#F6F8FC]"
                        onClick={() => setSelectedId(f.id)}
                        aria-label={`${t.title} — ${works.table.open}`}
                      >
                        {content}
                      </button>
                    ) : (
                      <div className="w-full p-6 md:p-8 flex flex-col gap-5">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      <CtaSection
        hideWorksLink
        highlight={works.cta.highlight}
        title={
          <>
            {works.cta.titleLead}{" "}
            <span className="text-[#1F5FE0] font-bold underline underline-offset-8 decoration-2 underline-[#1F5FE0]/40">
              {works.cta.titleHighlight}
            </span>
            {works.cta.titleMid} <br className="hidden md:block" />
            {works.cta.titleTail}
          </>
        }
        description={works.cta.description}
      />
      <AnimatePresence>
        {r && rText && rMedia && (
          <div
            className="fixed inset-0 z-[1100] flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-detail-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="absolute inset-0 bg-[#14213D]/60"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl max-h-[calc(100dvh-2rem)] md:max-h-[calc(100dvh-4rem)] overflow-y-auto bg-white rounded-[28px] md:rounded-[36px] shadow-[0_40px_80px_rgba(20,33,61,0.3)] flex flex-col md:flex-row"
            >
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={works.modal.close}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-11 h-11 rounded-full bg-white/95 shadow flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="w-full md:w-1/2 shrink-0 overflow-hidden aspect-[4/3] md:aspect-auto">
                {rMedia.photos.length > 0 ? (
                  <Gallery
                    key={r.id}
                    photos={rMedia.photos}
                    locale={locale}
                    labels={galleryLabels}
                    onEnlarge={setLightbox}
                  />
                ) : (
                  <div
                    className="relative flex h-full min-h-[240px] w-full items-center justify-center md:min-h-[420px]"
                    style={{ background: r.theme }}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <div className="relative z-10 flex size-28 items-center justify-center rounded-[32px] border border-white/20 bg-white/10 md:size-40">
                      {cloneElement(r.icon as ReactElement<LucideProps>, {
                        size: 64,
                        className: "text-white",
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2 p-7 md:p-12 flex flex-col">
                <div className="md:pr-12">
                  <span className="font-display font-bold text-[#1F5FE0] text-[12px] uppercase tracking-widest">
                    {works.modal.performance.replace("{year}", r.year)}
                  </span>
                  <h2
                    id="work-detail-title"
                    className="mt-3 font-display font-black text-navy text-2xl md:text-[1.75rem] leading-tight tracking-tight"
                  >
                    {rText.title}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {rText.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#F6F8FC] text-[#4A5873] rounded-lg text-xs font-bold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                {results && (
                  <div className="mt-8 border-t border-gray-100 pt-8">
                    <h3 className="mb-4 font-display text-[13px] font-black tracking-[0.15em] text-[#14213D] uppercase">
                      {works.modal.results}
                    </h3>
                    <ResultsText text={results} />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {r && rMedia && lightbox !== null && (
        <Lightbox
          photos={rMedia.photos}
          start={lightbox}
          locale={locale}
          labels={galleryLabels}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
