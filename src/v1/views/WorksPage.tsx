"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import Link from "@/v1/i18n/Link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Globe,
  Zap,
  Leaf,
  Layers,
  Cpu,
  ChartColumn,
  ChevronLeft,
  ChevronRight,
  Users,
  Building2,
  ShoppingBag,
  Trophy,
  X,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/v1/lib/cn";
import CtaSection from "@/v1/components/CtaSection";
import { useDictionary } from "@/v1/i18n/I18nProvider";

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
    theme: "linear-gradient(135deg, #0c1a35 0%, #1e3a6e 45%, #2D7A5F 100%)",
  },
  {
    id: 2,
    year: "2025",
    type: "domestic",
    industry: "consumer",
    icon: <Building2 size={32} />,
    theme: "linear-gradient(135deg, #1a0e00 0%, #2e1c00 45%, #E84B3A 100%)",
  },
  {
    id: 3,
    year: "2025",
    type: "overseas",
    industry: "env",
    icon: <Globe size={40} />,
    theme: "linear-gradient(135deg, #0c1a35 0%, #13274F 40%, #2D7A5F 100%)",
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
    theme: "linear-gradient(135deg, #0c1a35 0%, #13274F 45%, #2563EB 100%)",
  },
  {
    id: 6,
    year: "2025",
    type: "overseas",
    industry: "env",
    icon: <Globe size={32} />,
    theme: "linear-gradient(135deg, #0c1a35 0%, #1e3a6e 45%, #2D7A5F 100%)",
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
    theme: "linear-gradient(135deg, #1a0e00 0%, #2e1c00 45%, #E84B3A 100%)",
  },
  {
    id: 9,
    year: "2025",
    type: "overseas",
    industry: "energy",
    icon: <Zap size={32} />,
    theme: "linear-gradient(135deg, #0c1a35 0%, #13274F 45%, #2563EB 100%)",
  },
  {
    id: 10,
    year: "2025",
    type: "seminar",
    industry: "energy",
    icon: <Users size={32} />,
    theme: "linear-gradient(135deg, #0a0a2e 0%, #12124a 45%, #2563EB 100%)",
  },
  {
    id: 11,
    year: "2025",
    type: "domestic",
    industry: "env",
    icon: <Leaf size={32} />,
    theme: "linear-gradient(135deg, #0c1a35 0%, #1e3a6e 45%, #2D7A5F 100%)",
  },
  {
    id: 12,
    year: "2025",
    type: "domestic",
    industry: "it",
    icon: <Cpu size={32} />,
    theme: "linear-gradient(135deg, #0a0a2e 0%, #12124a 45%, #2563EB 100%)",
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
      ? { key: "exhibitionOverseas", text: "text-orange-600", bg: "bg-orange-50" }
      : { key: "meetingOverseas", text: "text-blue-600", bg: "bg-blue-50" };
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
    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brand-orange rounded-full opacity-0 group-hover/row:opacity-100 transition-all scale-0 group-hover/row:scale-100 duration-500 shadow-[0_0_8px_rgba(232,75,58,0.5)]" />
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
                ? "bg-navy text-white shadow-[0_10px_20px_rgba(12,26,53,0.2)]"
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

export default function WorksPage() {
  const { works, common } = useDictionary();
  const [n, setN] = useState<FilterId>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const textOf = (id: number) => works.projects.find((p) => p.id === id)!;
  const u = WORKS.filter((f) => {
    if (n === "all") return true;
    if (n === "overseas" || n === "domestic" || n === "seminar") return f.type === n;
    return f.industry === n;
  });
  const r = selectedId === null ? null : (WORKS.find((w) => w.id === selectedId) ?? null);
  const rText = r ? textOf(r.id) : null;

  // Modal: close on Escape and keep the page behind it from scrolling.
  useEffect(() => {
    if (selectedId === null) return;
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
    { main: works.table.category, sub: works.table.categorySub, align: "text-center" },
    { main: works.table.industry, sub: works.table.industrySub, align: "text-center" },
    { main: works.table.title, sub: works.table.titleSub, align: "text-left" },
    { main: works.table.client, sub: works.table.clientSub, align: "text-left" },
  ];

  return (
    <div className="bg-white">
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          height: "560px",
          paddingTop: "100px",
        }}
        aria-label={works.hero.ariaLabel}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80")',
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 z-0 overflow-hidden mix-blend-multiply opacity-70">
          <motion.div
            className="absolute top-[0%] -left-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply"
            style={{
              backgroundColor: "rgba(37, 99, 235, 0.2)",
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
              backgroundColor: "rgba(232, 75, 58, 0.2)",
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
          className="relative z-10 mx-auto w-full px-8 md:px-12"
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
            className="max-w-[800px] bg-white/40 backdrop-blur-md p-10 md:p-14 rounded-[32px] border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.03)]"
          >
            <div className="flex items-center gap-[15px] mb-6">
              <div
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
                {works.hero.eyebrow}
              </span>
            </div>
            <h1
              className="font-display font-extrabold text-[#111827] leading-[1.05] mb-8"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {works.hero.titleLine1}
              <br />
              <span
                style={{
                  color: "#2563EB",
                }}
              >
                {works.hero.titleLine2}
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
              {works.hero.descLine1}
              <br />
              {works.hero.descLine2}
            </p>
          </motion.div>
        </div>
        <nav
          className="absolute flex items-center gap-3 font-display font-bold uppercase tracking-[0.15em] z-20 md:bottom-[2.5rem] md:right-[3rem] bottom-[-4rem] right-1/2 translate-x-1/2 md:translate-x-0"
          style={{
            fontSize: "0.75rem",
            color: "#6b7280",
          }}
          aria-label={works.breadcrumb.ariaLabel}
        >
          <Link href="/" className="text-inherit no-underline hover:text-[#111827] transition-colors">
            {common.home}
          </Link>
          <span
            style={{
              color: "#d1d5db",
            }}
          >
            /
          </span>
          <span className="text-[#111827]">{works.breadcrumb.current}</span>
        </nav>
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
            <div className="flex items-center gap-8 bg-gray-50/50 backdrop-blur-sm p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-full -translate-y-12 translate-x-12" />
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
                <div className="absolute inset-0 bg-navy rounded-2xl shadow-[0_15px_30px_rgba(12,26,53,0.3),inset_0_2px_4px_rgba(255,255,255,0.1)] border border-white/10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
                <div className="relative z-10 flex items-center justify-center h-full">
                  <Trophy
                    size={36}
                    className="text-brand-orange drop-shadow-[0_4px_10px_rgba(232,75,58,0.4)]"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-32 px-6 md:px-12">
        <div
          className="mx-auto"
          style={{
            maxWidth: "1280px",
          }}
        >
          <FilterBar active={n} labels={filterLabels} ariaLabel={works.filters.ariaLabel} onSelect={setN} />
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_40px_80px_rgba(0,0,0,0.03)] overflow-hidden">
            {u.length === 0 && (
              <p className="py-20 text-center font-sans font-bold text-gray-400">{works.table.empty}</p>
            )}
            <div className={cn("hidden overflow-x-auto", u.length > 0 && "lg:block")}>
              <div className="min-w-[1000px]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      {headers.map((h) => (
                        <th key={h.main} scope="col" className={cn("py-10 px-8", h.align)}>
                          <div className="font-display font-black text-navy text-base mb-1">{h.main}</div>
                          {h.sub && (
                            <div className="font-display font-bold text-navy/40 uppercase tracking-[0.2em] text-[11px]">
                              {h.sub}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {u.map((f) => {
                      const cat = categoryOf(f);
                      const t = textOf(f.id);
                      return (
                        <tr
                          key={f.id}
                          onClick={() => setSelectedId(f.id)}
                          className="transition-all duration-500 hover:bg-gray-50/80 group/row cursor-pointer"
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
                          <td className="py-8 px-8 text-left max-w-md">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(f.id);
                              }}
                              className="text-left font-sans font-black text-navy leading-snug block transition-all duration-500 group-hover/row:text-brand-orange"
                              style={{
                                fontSize: "1.15rem",
                                letterSpacing: "-0.03em",
                              }}
                            >
                              {t.title}
                            </button>
                            <div className="flex items-center gap-2 mt-3 opacity-40 group-hover/row:opacity-100 transition-opacity duration-500">
                              <div className="h-[1px] w-4 bg-brand-orange" />
                              <span className="text-[11px] font-display font-bold text-brand-orange uppercase tracking-widest">
                                {works.table.detailHint}
                              </span>
                            </div>
                          </td>
                          <td className="py-8 px-8 text-left">
                            <div className="flex items-center gap-4">
                              <IconBadge icon={<Building2 />} size={18} />
                              <div>
                                <span className="font-display font-bold text-gray-400 text-[11px] uppercase tracking-widest block mb-0.5">
                                  {works.table.orderingOrg}
                                </span>
                                <span className="font-sans font-bold text-navy/70 text-sm block">
                                  {t.client}
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:hidden divide-y divide-gray-50">
              {u.map((f) => {
                const cat = categoryOf(f);
                const t = textOf(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    className="w-full text-left p-6 md:p-8 flex flex-col gap-5 group/row cursor-pointer"
                    onClick={() => setSelectedId(f.id)}
                  >
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
                    <div>
                      <h3
                        className="font-sans font-black text-navy leading-snug mb-4 transition-colors group-hover/row:text-brand-orange"
                        style={{
                          fontSize: "1.2rem",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {t.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <IconBadge icon={<Building2 />} size={14} />
                        <div>
                          <span className="font-display font-bold text-gray-400 text-[11px] uppercase tracking-widest block">
                            {works.table.orderingOrg}
                          </span>
                          <span className="font-sans font-bold text-navy/70 text-xs">{t.client}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <CtaSection
        hideWorksLink
        highlight={works.cta.highlight}
        title={
          <>
            {works.cta.titleLead}{" "}
            <span className="text-[#2563EB] font-bold underline underline-offset-8 decoration-2 underline-[#2563EB]/40">
              {works.cta.titleHighlight}
            </span>
            {works.cta.titleMid} <br className="hidden md:block" />
            {works.cta.titleTail}
          </>
        }
        description={works.cta.description}
      />
      <AnimatePresence>
        {r && rText && (
          <div
            className="fixed inset-0 z-[1100] flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-detail-title"
          >
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-md"
            />
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              className="relative w-full max-w-4xl max-h-[calc(100dvh-2rem)] md:max-h-[calc(100dvh-4rem)] overflow-y-auto bg-white rounded-[32px] md:rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.3)] flex flex-col md:flex-row"
            >
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label={works.modal.close}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 md:bg-gray-100 shadow-sm md:shadow-none flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all duration-300"
              >
                <X size={20} />
              </button>
              <div
                className="w-full md:w-1/2 h-[200px] md:h-auto shrink-0 relative bg-navy flex items-center justify-center overflow-hidden"
                style={{
                  background: r.theme,
                }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <motion.div
                  initial={{
                    scale: 0.8,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.3,
                  }}
                  className="relative z-10 w-28 h-28 md:w-48 md:h-48"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-[32px] md:rounded-[40px] blur-2xl" />
                  <div className="absolute inset-0 bg-white/10 rounded-[32px] md:rounded-[40px] backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center">
                    {cloneElement(r.icon as ReactElement<LucideProps>, {
                      size: 64,
                      className: "text-white drop-shadow-2xl md:scale-125",
                    })}
                  </div>
                </motion.div>
                <div
                  aria-hidden="true"
                  className="absolute bottom-4 left-6 md:bottom-8 md:left-8 text-white/50 font-display font-black text-3xl md:text-6xl select-none uppercase tracking-tighter"
                >
                  {r.industry}
                </div>
              </div>
              <div className="w-full md:w-1/2 p-7 md:p-14 relative flex flex-col">
                <div className="mb-8 md:mb-10 md:pr-12">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/5 rounded-full border border-brand-orange/10 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                    <span className="font-display font-bold text-brand-orange text-[11px] uppercase tracking-widest">
                      {works.modal.performance.replace("{year}", r.year)}
                    </span>
                  </div>
                  <h2
                    id="work-detail-title"
                    className="font-display font-black text-navy text-2xl md:text-3xl leading-tight tracking-tight mb-4"
                  >
                    {rText.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {rText.tags.map((f) => (
                      <span
                        key={f}
                        className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-bold"
                      >
                        #{f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 md:space-y-6 flex-grow">
                  {[
                    {
                      label: works.modal.orderingOrg,
                      val: rText.client,
                      icon: null,
                      color: "text-brand-orange",
                    },
                    {
                      label: works.modal.focusArea,
                      val: rText.location || works.modal.nationwide,
                      icon: Globe,
                      color: "text-blue-600",
                    },
                    {
                      label: works.modal.sector,
                      val: works.industries[r.industry],
                      icon: ChartColumn,
                      color: "text-green-600",
                    },
                  ].map((f, h) => (
                    <motion.div
                      key={h}
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.5 + h * 0.1,
                      }}
                      className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300"
                    >
                      {f.icon && (
                        <IconBadge
                          icon={<f.icon />}
                          size={20}
                          className={cn(
                            "bg-white group-hover/row:bg-white",
                            f.color.replace("text-", "group-hover/row:text-"),
                          )}
                        />
                      )}
                      <div className={cn(!f.icon && "pl-1")}>
                        <span className="font-display font-bold text-gray-400 text-[11px] uppercase tracking-widest block mb-0.5">
                          {f.label}
                        </span>
                        <span className="font-sans font-bold text-navy text-base">{f.val}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 md:mt-10 pt-8 md:pt-10 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-display font-bold text-navy/40 text-[11px] uppercase tracking-widest">
                      {works.modal.caseVerified}
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="min-h-11 font-display font-black text-sm text-navy flex items-center gap-2 group no-underline hover:text-brand-orange transition-colors"
                  >
                    {works.modal.consult}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
