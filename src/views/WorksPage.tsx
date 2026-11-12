"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useDictionary } from "@/i18n/I18nProvider";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import ContactBand from "@/components/ui/ContactBand";
import { cn } from "@/lib/cn";

type WorkType = "overseas" | "domestic" | "seminar";
type Industry = "material" | "consumer" | "env" | "energy" | "it";

/** Non-text record data. Titles, clients, tags and locations live in `works.projects` (keyed by id). */
const WORKS: { id: number; year: string; type: WorkType; industry: Industry }[] = [
  { id: 1, year: "2025", type: "domestic", industry: "material" },
  { id: 2, year: "2025", type: "domestic", industry: "consumer" },
  { id: 3, year: "2025", type: "overseas", industry: "env" },
  { id: 4, year: "2025", type: "domestic", industry: "env" },
  { id: 5, year: "2025", type: "overseas", industry: "energy" },
  { id: 6, year: "2025", type: "overseas", industry: "env" },
  { id: 7, year: "2025", type: "seminar", industry: "energy" },
  { id: 8, year: "2025", type: "overseas", industry: "consumer" },
  { id: 9, year: "2025", type: "overseas", industry: "energy" },
  { id: 10, year: "2025", type: "seminar", industry: "energy" },
  { id: 11, year: "2025", type: "domestic", industry: "env" },
  { id: 12, year: "2025", type: "domestic", industry: "it" },
];

const FILTER_IDS = ["all", "overseas", "domestic", "seminar", "env", "energy", "consumer", "it", "material"] as const;
type FilterId = (typeof FILTER_IDS)[number];

type CategoryKey = "exhibitionOverseas" | "meetingOverseas" | "meetingDomestic" | "seminar";

function categoryOf(work: (typeof WORKS)[number]): CategoryKey {
  if (work.type === "overseas") return work.industry === "env" ? "exhibitionOverseas" : "meetingOverseas";
  if (work.type === "domestic") return "meetingDomestic";
  return "seminar";
}

function matches(work: (typeof WORKS)[number], filter: FilterId) {
  if (filter === "all") return true;
  if (filter === "overseas" || filter === "domestic" || filter === "seminar") return work.type === filter;
  return work.industry === filter;
}

/** Desktop column layout shared by the header row and every record row. */
const COLUMNS = "lg:grid-cols-[3.5rem_9rem_minmax(0,1fr)_13rem_9.5rem_1.25rem]";

/** Filter row: scrolls sideways on narrow screens, with the clipped edge faded so it reads as "more". */
function FilterTabs({
  active,
  labels,
  counts,
  ariaLabel,
  onSelect,
}: {
  active: FilterId;
  labels: Record<FilterId, string>;
  counts: Record<FilterId, number>;
  ariaLabel: string;
  onSelect: (id: FilterId) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () =>
      setEdges({ start: el.scrollLeft > 4, end: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const el = scroller.current;
    const tab = el?.querySelector<HTMLElement>(`[data-filter="${active}"]`);
    if (!el || !tab) return;
    if (tab.offsetLeft < el.scrollLeft || tab.offsetLeft + tab.offsetWidth > el.scrollLeft + el.clientWidth) {
      el.scrollTo({ left: tab.offsetLeft - 16, behavior: "smooth" });
    }
  }, [active]);

  // Fade only the edges that hide more tabs; a mask keeps the fade free of colour.
  const fade = `linear-gradient(to right, ${edges.start ? "transparent" : "#000"} 0, #000 ${
    edges.start ? "2.5rem" : "0"
  }, #000 calc(100% - ${edges.end ? "2.5rem" : "0px"}), ${edges.end ? "transparent" : "#000"} 100%)`;

  return (
    <div
      ref={scroller}
      role="group"
      aria-label={ariaLabel}
      style={{ maskImage: fade, WebkitMaskImage: fade }}
      className="-mx-5 flex gap-1 overflow-x-auto border-b border-line px-5 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {FILTER_IDS.map((id) => {
        const selected = active === id;
        return (
          <button
            key={id}
            type="button"
            data-filter={id}
            aria-pressed={selected}
            onClick={() => onSelect(id)}
            className={cn(
              "relative flex min-h-12 shrink-0 items-center gap-1.5 px-3 text-small font-semibold whitespace-nowrap transition-colors",
              selected ? "text-blue" : "text-ink-soft hover:text-ink",
            )}
          >
            {labels[id]}
            <span className={cn("tabular text-caption font-normal", selected ? "text-blue" : "text-ink-faint")}>
              {counts[id]}
            </span>
            {selected && <span className="absolute inset-x-3 bottom-0 h-[3px] bg-blue" />}
          </button>
        );
      })}
    </div>
  );
}

export default function WorksPage() {
  const { works } = useDictionary();
  const [filter, setFilter] = useState<FilterId>("all");
  const [openId, setOpenId] = useState<number | null>(null);

  const text = (id: number) => works.projects.find((p) => p.id === id)!;
  const rows = WORKS.filter((w) => matches(w, filter));
  const counts = Object.fromEntries(
    FILTER_IDS.map((id) => [id, WORKS.filter((w) => matches(w, id)).length]),
  ) as Record<FilterId, number>;
  const labels = Object.fromEntries(FILTER_IDS.map((id) => [id, works.filters[id]])) as Record<FilterId, string>;
  const t = works.table;

  return (
    <MotionConfig reducedMotion="user">
      <PageIntro title={works.intro.title} lead={works.intro.lead.replace("{count}", String(WORKS.length))} />

      <section aria-labelledby="works-list-title" className="bg-paper pt-10 pb-20 md:pt-14 md:pb-28">
        <Container>
          <h2 id="works-list-title" className="sr-only">
            {works.listTitle}
          </h2>

          <FilterTabs
            active={filter}
            labels={labels}
            counts={counts}
            ariaLabel={works.filters.ariaLabel}
            onSelect={(id) => {
              setFilter(id);
              setOpenId(null);
            }}
          />

          <p aria-live="polite" className="sr-only">
            {t.count.replace("{count}", String(rows.length))}
          </p>

          {/* Column names for sighted desktop readers; each row's button already announces its own cells. */}
          <div
            aria-hidden
            className={cn(
              "mt-8 hidden gap-6 border-b border-ink/80 pb-3 text-caption font-semibold text-ink-soft lg:grid",
              COLUMNS,
            )}
          >
            <span>{t.year}</span>
            <span>{t.place}</span>
            <span>{t.title}</span>
            <span>{t.client}</span>
            <span>{t.category}</span>
            <span />
          </div>

          {rows.length === 0 ? (
            <p className="border-b border-line py-12 text-ink-soft">{t.empty}</p>
          ) : (
            <ul className="mt-6 grid gap-3 lg:mt-0 lg:block">
              {rows.map((work) => {
                const record = text(work.id);
                const open = openId === work.id;
                const panelId = `work-${work.id}-details`;
                const place = record.location || t.domestic;
                const category = works.categories[categoryOf(work)];
                return (
                  <li
                    key={work.id}
                    className="overflow-hidden rounded-lg border border-line lg:overflow-visible lg:rounded-none lg:border-0 lg:border-b"
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenId(open ? null : work.id)}
                      className={cn(
                        "grid w-full grid-cols-[minmax(0,1fr)_1.25rem] gap-x-4 gap-y-1 px-4 py-5 text-left transition-colors hover:bg-mist/70 lg:items-baseline lg:gap-6 lg:px-0 lg:py-6",
                        COLUMNS,
                      )}
                    >
                      <span className="tabular hidden text-small text-ink-faint lg:block">{work.year}</span>
                      <span className="col-start-1 font-bold text-blue lg:col-start-auto">{place}</span>
                      <span className="col-start-1 text-body font-semibold leading-snug text-ink lg:col-start-auto lg:text-lead">
                        {record.title}
                      </span>
                      <span className="col-start-1 text-small text-ink-soft lg:col-start-auto">{record.client}</span>
                      <span className="col-start-1 mt-2 lg:col-start-auto lg:mt-0">
                        <span className="inline-block rounded-md bg-mist px-2 py-0.5 text-caption whitespace-nowrap text-ink-soft">
                          {category}
                        </span>
                      </span>
                      <span className="col-start-2 row-span-4 row-start-1 flex justify-end self-center lg:col-start-auto lg:row-span-1 lg:row-start-auto">
                        <ChevronDown
                          aria-hidden
                          size={20}
                          className={cn("text-ink-faint transition-transform duration-200", open && "rotate-180")}
                        />
                        <span className="sr-only">{open ? t.collapse : t.expand}</span>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <dl
                            className={cn(
                              "grid gap-x-6 gap-y-4 px-4 pt-1 pb-6 text-small sm:grid-cols-2 lg:grid lg:px-0",
                              COLUMNS,
                            )}
                          >
                            <div className="sm:col-span-2 lg:col-span-2 lg:col-start-3">
                              <dt className="text-caption text-ink-faint">{t.tags}</dt>
                              <dd className="mt-1 flex flex-wrap gap-1.5">
                                {record.tags.map((tag) => (
                                  <span key={tag} className="rounded-md bg-mist px-2 py-0.5 text-ink-soft">
                                    {tag}
                                  </span>
                                ))}
                              </dd>
                            </div>
                            <div className="lg:col-start-3">
                              <dt className="text-caption text-ink-faint">{t.location}</dt>
                              <dd className="mt-1 text-ink">{record.location || t.nationwide}</dd>
                            </div>
                            <div className="lg:col-start-4">
                              <dt className="text-caption text-ink-faint">{t.industry}</dt>
                              <dd className="mt-1 text-ink">{works.industries[work.industry]}</dd>
                            </div>
                          </dl>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </section>

      <ContactBand />
    </MotionConfig>
  );
}
