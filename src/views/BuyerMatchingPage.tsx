"use client";

import { Fragment, useMemo, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useDictionary } from "@/i18n/I18nProvider";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import ContactBand from "@/components/ui/ContactBand";
import { cn } from "@/lib/cn";

// Sample records for illustration; the real buyer database is shared after a consultation.
const BUYERS = [
  {
    id: 1,
    country: "USA",
    company: "Global Tech Solutions Inc.",
    category: "Electronics / AI",
    type: "Distributor",
    products: "Smart Home Devices, IoT Sensors",
    website: "www.globaltech-sol.com",
    manager: "John Smith",
    position: "Purchasing Manager",
    phone: "+1-202-555-0147",
    mobile: "+1-202-555-0198",
    email: "john.smith@globaltech.com",
  },
  {
    id: 2,
    country: "Germany",
    company: "EcoEnergy Systems GmbH",
    category: "Renewable Energy",
    type: "Importer",
    products: "Solar Panels, Battery Storage",
    website: "www.ecoenergy-systems.de",
    manager: "Hans Müller",
    position: "CEO",
    phone: "+49-30-123456",
    mobile: "+49-170-9876543",
    email: "h.mueller@ecoenergy.de",
  },
  {
    id: 3,
    country: "Vietnam",
    company: "Vina Mart Group",
    category: "Food & Beverage",
    type: "Retailer",
    products: "Functional Health Foods, Snacks",
    website: "www.vinamart-group.vn",
    manager: "Nguyen Van A",
    position: "Sourcing Director",
    phone: "+84-24-3456-7890",
    mobile: "+84-90-123-4567",
    email: "nva@vinamart.vn",
  },
  {
    id: 4,
    country: "Japan",
    company: "Nippon Trading Co.",
    category: "Consumer Goods",
    type: "Wholesaler",
    products: "Cosmetics, Skincare",
    website: "www.nippon-trading.co.jp",
    manager: "Sato Kenji",
    position: "Manager",
    phone: "+81-3-1234-5678",
    mobile: "+81-90-1234-5678",
    email: "kenji.sato@nippon-t.jp",
  },
  {
    id: 5,
    country: "UAE",
    company: "Desert Oasis General Trading",
    category: "Medical / Pharma",
    type: "Agent",
    products: "Medical Devices, PPE",
    website: "www.desertoasis-uae.com",
    manager: "Ahmed Ali",
    position: "Procurement Specialist",
    phone: "+971-4-123-4567",
    mobile: "+971-50-123-4567",
    email: "a.ali@desertoasis.com",
  },
  {
    id: 6,
    country: "Thailand",
    company: "Siam Future Mart",
    category: "Food & Beverage",
    type: "Distributor",
    products: "Organic Snacks, Beverage",
    website: "www.siamfuture.th",
    manager: "Komsan P.",
    position: "Buyer",
    phone: "+66-2-123-4567",
    mobile: "+66-81-234-5678",
    email: "komsan@siamfuture.th",
  },
  {
    id: 7,
    country: "France",
    company: "Lumiere Bio",
    category: "Consumer Goods",
    type: "Importer",
    products: "Premium Cosmetics",
    website: "www.lumierebio.fr",
    manager: "Claire D.",
    position: "Director",
    phone: "+33-1-23-45-67",
    mobile: "+33-6-12-34-56",
    email: "claire@lumierebio.fr",
  },
  {
    id: 8,
    country: "Canada",
    company: "Maple Tech Dist.",
    category: "IT / Electronics",
    type: "Wholesaler",
    products: "Server Rack, Networking",
    website: "www.mapletech.ca",
    manager: "Mark W.",
    position: "Manager",
    phone: "+1-416-555-0123",
    mobile: "+1-416-555-0124",
    email: "mark@mapletech.ca",
  },
  {
    id: 9,
    country: "UK",
    company: "British Green Energy",
    category: "Renewable Energy",
    type: "Retailer",
    products: "Wind Turbine Parts",
    website: "www.britishgreen.co.uk",
    manager: "Sarah J.",
    position: "CEO",
    phone: "+44-20-1234-5678",
    mobile: "+44-77-1234-5678",
    email: "sarah@britishgreen.co.uk",
  },
  {
    id: 10,
    country: "Australia",
    company: "Oz Health Supplies",
    category: "Medical / Pharma",
    type: "Importer",
    products: "Health Supplements",
    website: "www.ozhealth.com.au",
    manager: "David K.",
    position: "Buyer",
    phone: "+61-2-1234-5678",
    mobile: "+61-412-345-678",
    email: "david@ozhealth.com.au",
  },
];

type Buyer = (typeof BUYERS)[number];

const PAGE_SIZE = 5;

const SEARCH_FIELDS = ["country", "company", "category", "type", "products", "manager"] as const;

function matchesQuery(buyer: Buyer, query: string) {
  if (!query) return true;
  return SEARCH_FIELDS.some((field) => buyer[field].toLowerCase().includes(query));
}

/** Fills `{name}` placeholders in a dictionary string with React nodes. */
function fillTemplate(template: string, values: Record<string, ReactNode>) {
  return template.split(/(\{\w+\})/).map((part, i) => {
    const key = part.match(/^\{(\w+)\}$/)?.[1];
    return <Fragment key={i}>{key && key in values ? values[key] : part}</Fragment>;
  });
}

/** Lets long emails and URLs wrap after "@", "." and "-" instead of mid-word. */
function softBreak(text: string) {
  return text.split(/(?<=[@./-])/).map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <wbr />}
      {part}
    </Fragment>
  ));
}

const linkClass = "text-blue underline decoration-blue/30 underline-offset-4 hover:decoration-blue";

function Website({ url, className }: { url: string; className?: string }) {
  return (
    <a href={`https://${url}`} target="_blank" rel="noopener noreferrer" className={cn(linkClass, className)}>
      {softBreak(url)}
    </a>
  );
}

export default function BuyerMatchingPage() {
  const { buyerMatching: t } = useDictionary();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();
  const filtered = useMemo(() => BUYERS.filter((b) => matchesQuery(b, normalized)), [normalized]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const pageButton =
    "flex size-11 items-center justify-center rounded-lg text-small font-semibold transition-colors disabled:cursor-not-allowed disabled:text-ink-faint/50";

  return (
    <>
      <PageIntro title={t.intro.title} lead={t.intro.lead} />

      <section className="bg-paper py-12 md:py-16">
        <Container>
          <p className="max-w-[64ch] rounded-lg bg-mist px-5 py-4 text-small text-ink-soft">
            <strong className="mr-1 font-semibold text-ink">{t.notice.title}</strong>
            {t.notice.body}
          </p>

          <div className="mt-10">
            <div className="w-full md:max-w-md">
              <label htmlFor="buyer-search" className="block text-small font-semibold">
                {t.search.label}
              </label>
              <div className="relative mt-2">
                <Search
                  size={18}
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-faint"
                />
                <input
                  id="buyer-search"
                  type="search"
                  value={query}
                  onChange={(e) => updateQuery(e.target.value)}
                  placeholder={t.search.placeholder}
                  className="h-12 w-full rounded-lg border border-line bg-paper pr-12 pl-11 text-body text-ink placeholder:text-ink-faint focus:border-blue focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => updateQuery("")}
                    aria-label={t.search.clear}
                    className="absolute top-1/2 right-1 flex size-11 -translate-y-1/2 items-center justify-center text-ink-faint hover:text-ink"
                  >
                    <X size={18} aria-hidden />
                  </button>
                )}
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-8 border-t border-line py-14" aria-live="polite">
              <p className="text-lead font-semibold">{t.search.emptyTitle}</p>
              <p className="mt-2 text-ink-soft">{t.search.emptyHint}</p>
              <button
                type="button"
                onClick={() => updateQuery("")}
                className="mt-6 inline-flex min-h-11 items-center rounded-full border border-ink/25 px-5 text-small font-semibold hover:border-ink"
              >
                {t.search.clear}
              </button>
            </div>
          ) : (
            <>
              {/* Desktop: one row per buyer, rules between rows only. */}
              <table className="mt-8 hidden w-full table-fixed border-collapse text-small lg:table">
                <caption className="sr-only">{t.intro.title}</caption>
                <colgroup>
                  <col className="w-[8%]" />
                  <col className="w-[19%]" />
                  <col className="w-[13%]" />
                  <col className="w-[14%]" />
                  <col className="w-[13%]" />
                  <col className="w-[15%]" />
                  <col className="w-[18%]" />
                </colgroup>
                <thead>
                  <tr className="border-y border-line text-left text-ink-soft">
                    <th scope="col" className="py-3 pr-4 font-semibold">
                      {t.columns.country}
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold">
                      {t.columns.company}
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold">
                      {t.columns.category}
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold">
                      {t.columns.products}
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold">
                      {t.columns.contact}
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold">
                      {t.columns.phone}
                    </th>
                    <th scope="col" className="py-3 font-semibold">
                      {t.columns.email}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((b) => (
                    <tr key={b.id} className="border-b border-line align-top">
                      <td className="py-5 pr-4 font-semibold">{b.country}</td>
                      <td className="py-5 pr-4">
                        <span className="block font-semibold text-ink">{b.company}</span>
                        <span className="mt-1 block">
                          <Website url={b.website} />
                        </span>
                      </td>
                      <td className="py-5 pr-4">
                        <span className="block">{b.category}</span>
                        <span className="mt-1 block text-ink-faint">{b.type}</span>
                      </td>
                      <td className="py-5 pr-4 text-ink-soft">{b.products}</td>
                      <td className="py-5 pr-4">
                        <span className="block">{b.manager}</span>
                        <span className="mt-1 block text-ink-faint">{b.position}</span>
                      </td>
                      <td className="tabular py-5 pr-6 whitespace-nowrap">
                        <a href={`tel:${b.phone}`} className="block hover:text-blue">
                          {b.phone}
                        </a>
                        <a href={`tel:${b.mobile}`} className="mt-1 block text-ink-faint hover:text-blue">
                          <span className="sr-only">{t.columns.mobile} </span>
                          {b.mobile}
                        </a>
                      </td>
                      <td className="py-5">
                        <a href={`mailto:${b.email}`} className={linkClass}>
                          {softBreak(b.email)}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile and tablet: the same fields stacked per buyer. */}
              <ul className="mt-8 grid gap-3 lg:hidden">
                {visible.map((b) => (
                  <li key={b.id} className="rounded-lg border border-line px-4 py-5">
                    <p className="text-small text-ink-faint">{b.country}</p>
                    <h2 className="mt-1 text-h4 font-bold">{b.company}</h2>
                    <dl className="mt-4 grid grid-cols-[7rem_1fr] gap-x-4 gap-y-2 text-small">
                      <dt className="text-ink-faint">{t.columns.category}</dt>
                      <dd>
                        {b.category}
                        <span className="block text-ink-faint">{b.type}</span>
                      </dd>
                      <dt className="text-ink-faint">{t.columns.products}</dt>
                      <dd className="text-ink-soft">{b.products}</dd>
                      <dt className="text-ink-faint">{t.columns.contact}</dt>
                      <dd>
                        {b.manager}
                        <span className="block text-ink-faint">{b.position}</span>
                      </dd>
                      <dt className="text-ink-faint">{t.columns.phone}</dt>
                      <dd className="tabular">
                        <a href={`tel:${b.phone}`} className="inline-block py-1 hover:text-blue">
                          {b.phone}
                        </a>
                      </dd>
                      <dt className="text-ink-faint">{t.columns.mobile}</dt>
                      <dd className="tabular">
                        <a href={`tel:${b.mobile}`} className="inline-block py-1 hover:text-blue">
                          {b.mobile}
                        </a>
                      </dd>
                      <dt className="text-ink-faint">{t.columns.email}</dt>
                      <dd className="min-w-0">
                        <a href={`mailto:${b.email}`} className={cn(linkClass, "inline-block py-1")}>
                          {softBreak(b.email)}
                        </a>
                      </dd>
                      <dt className="text-ink-faint">{t.columns.website}</dt>
                      <dd className="min-w-0">
                        <Website url={b.website} className="inline-block py-1" />
                      </dd>
                    </dl>
                  </li>
                ))}
              </ul>

              <nav
                aria-label={t.pagination.ariaLabel}
                className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="tabular text-small text-ink-soft" aria-live="polite">
                  {fillTemplate(t.pagination.summary, { shown: visible.length, total: filtered.length })}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setPage(current - 1)}
                    disabled={current === 1}
                    aria-label={t.pagination.previous}
                    className={cn(pageButton, "text-ink hover:bg-mist")}
                  >
                    <ChevronLeft size={18} aria-hidden />
                  </button>
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPage(n)}
                      aria-current={n === current ? "page" : undefined}
                      aria-label={t.pagination.page.replace("{page}", String(n))}
                      className={cn(
                        pageButton,
                        "tabular",
                        n === current ? "bg-blue-deep text-white" : "text-ink hover:bg-mist",
                      )}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPage(current + 1)}
                    disabled={current === pageCount}
                    aria-label={t.pagination.next}
                    className={cn(pageButton, "text-ink hover:bg-mist")}
                  >
                    <ChevronRight size={18} aria-hidden />
                  </button>
                </div>
              </nav>
            </>
          )}
        </Container>
      </section>

      <ContactBand />
    </>
  );
}
