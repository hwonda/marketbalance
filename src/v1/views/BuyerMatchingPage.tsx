"use client";

import { Fragment, useMemo, useState, type ReactNode } from "react";
import Link from "@/v1/i18n/Link";
import { motion } from "motion/react";
import {
  Globe,
  User,
  Mail,
  Package,
  Phone,
  Search,
  Building2,
  Tag,
  ExternalLink,
  UserPlus,
  Smartphone,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/v1/lib/cn";
import { useDictionary } from "@/v1/i18n/I18nProvider";

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

function ColumnHeader({ icon, label, sub }: { icon: ReactNode; label: string; sub?: string }) {
  return (
    <th
      scope="col"
      className="px-4 py-6 text-left align-bottom border-b border-gray-100 first:pl-8 last:pr-8"
    >
      <div className="flex items-center gap-2 font-display font-black text-[#111827] text-[0.95rem] tracking-[0.08em] whitespace-nowrap">
        {icon} {label}
      </div>
      {sub && (
        <div className="mt-1 pl-6 font-display font-bold text-gray-400 text-[0.75rem] tracking-[0.08em] whitespace-nowrap">
          {sub}
        </div>
      )}
    </th>
  );
}

export default function BuyerMatchingPage() {
  const { buyerMatching: t, common } = useDictionary();
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

  const iconClass = "text-[#E84B3A] shrink-0";
  const pageButton =
    "w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all active:scale-95";

  return (
    <main
      className="font-sans break-keep"
      style={{
        backgroundColor: "#fcfcfc",
        minHeight: "100vh",
      }}
    >
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          height: "560px",
          paddingTop: "100px",
        }}
        aria-label={t.hero.ariaLabel}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80")',
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 z-0 overflow-hidden mix-blend-multiply opacity-70">
          <motion.div
            className="absolute top-[0%] -left-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply"
            style={{
              backgroundColor: "rgba(232, 75, 58, 0.2)",
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
              backgroundColor: "rgba(37, 99, 235, 0.2)",
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
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fcfcfc] to-transparent z-10" />
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
                {t.hero.eyebrow}
              </span>
            </div>
            <h1
              className="font-display font-extrabold text-[#111827] leading-[1.05] mb-8"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {t.hero.titleLead}
              <br />
              <span
                style={{
                  color: "#E84B3A",
                }}
              >
                {t.hero.titleHighlight}
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
              {t.hero.descLine1}
              <br />
              {t.hero.descLine2}
            </p>
          </motion.div>
        </div>
        <nav
          className="absolute flex items-center gap-3 font-display font-bold uppercase tracking-[0.15em] z-20 md:bottom-[2.5rem] md:right-[3rem] bottom-[-4rem] right-1/2 translate-x-1/2 md:translate-x-0 whitespace-nowrap"
          style={{
            fontSize: "0.75rem",
            color: "#6b7280",
          }}
          aria-label={t.breadcrumb.ariaLabel}
        >
          <Link
            href="/"
            className="inline-flex items-center min-h-[40px] text-inherit no-underline hover:text-[#111827] transition-colors"
          >
            {common.home}
          </Link>
          <span
            aria-hidden
            style={{
              color: "#d1d5db",
            }}
          >
            /
          </span>
          <span className="text-[#111827]">{t.breadcrumb.current}</span>
        </nav>
      </section>
      <section className="relative mt-8 z-20 pb-32">
        <div
          className="mx-auto px-4 md:px-8 w-full"
          style={{
            maxWidth: "1440px",
          }}
        >
          <div className="bg-white p-4 md:p-6 rounded-t-[28px] md:rounded-t-[40px] border-x border-t border-gray-100 shadow-[0_-20px_40px_rgba(0,0,0,0.02)] flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => updateQuery(e.target.value)}
                placeholder={t.search.placeholder}
                aria-label={t.search.ariaLabel}
                className="w-full h-14 bg-gray-50 border-2 border-transparent rounded-2xl pl-12 pr-12 font-sans font-bold text-[#111827] focus:outline-none focus:border-[#E84B3A] focus:bg-white transition-all placeholder:text-gray-400 placeholder:font-medium shadow-inner [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => updateQuery("")}
                  aria-label={t.search.clear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#111827] hover:bg-gray-100 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
          <div className="bg-white border-x border-b border-gray-100 rounded-b-[28px] md:rounded-b-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.04)] overflow-hidden">
            {visible.length === 0 ? (
              <div className="px-6 py-20 text-center border-t border-gray-100" role="status">
                <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300">
                  <Search size={26} />
                </div>
                <p className="font-display font-black text-[#111827] text-lg mb-2">{t.search.emptyTitle}</p>
                <p className="font-sans font-medium text-gray-500 text-sm mb-6">{t.search.emptyHint}</p>
                <button
                  type="button"
                  onClick={() => updateQuery("")}
                  className="h-11 px-6 rounded-2xl border border-gray-200 font-display font-bold text-sm text-[#111827] hover:border-[#E84B3A] hover:text-[#E84B3A] transition-colors"
                >
                  {t.search.clear}
                </button>
              </div>
            ) : (
              <>
                {/* Desktop: 7 columns, secondary fields stacked under their primary column so nothing is clipped. */}
                <div className="hidden lg:block">
                  <table className="w-full table-fixed border-collapse">
                    <colgroup>
                      <col className="w-[9%]" />
                      <col className="w-[18%]" />
                      <col className="w-[13%]" />
                      <col className="w-[14%]" />
                      <col className="w-[14%]" />
                      <col className="w-[13%]" />
                      <col className="w-[19%]" />
                    </colgroup>
                    <thead>
                      <tr className="bg-gray-50/50">
                        <ColumnHeader
                          icon={<Globe size={16} className={iconClass} />}
                          label={t.columns.country}
                        />
                        <ColumnHeader
                          icon={<Building2 size={16} className={iconClass} />}
                          label={t.columns.company}
                          sub={t.columns.website}
                        />
                        <ColumnHeader
                          icon={<Tag size={16} className={iconClass} />}
                          label={t.columns.category}
                          sub={t.columns.type}
                        />
                        <ColumnHeader
                          icon={<Package size={16} className={iconClass} />}
                          label={t.columns.products}
                        />
                        <ColumnHeader
                          icon={<UserPlus size={16} className={iconClass} />}
                          label={t.columns.manager}
                          sub={t.columns.position}
                        />
                        <ColumnHeader
                          icon={<Phone size={16} className={iconClass} />}
                          label={t.columns.phone}
                          sub={t.columns.mobile}
                        />
                        <ColumnHeader
                          icon={<Mail size={16} className={iconClass} />}
                          label={t.columns.email}
                        />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {visible.map((b) => (
                        <tr key={b.id} className="hover:bg-[#E84B3A]/[0.02] transition-colors align-top">
                          <td className="px-4 py-6 pl-8">
                            <span className="inline-block px-3 py-1.5 bg-gray-100 rounded-lg font-display font-bold text-[#111827] text-[0.8rem] uppercase tracking-wider">
                              {b.country}
                            </span>
                          </td>
                          <td className="px-4 py-6">
                            <div className="font-sans font-bold text-[#111827] text-[0.95rem] leading-snug">
                              {b.company}
                            </div>
                            <a
                              href={`https://${b.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1.5 inline-block font-sans font-semibold text-blue-600 hover:text-[#E84B3A] transition-colors text-[0.85rem] break-all"
                            >
                              {b.website}
                            </a>
                          </td>
                          <td className="px-4 py-6">
                            <div className="font-sans font-medium text-gray-600 text-[0.95rem] leading-snug">
                              {b.category}
                            </div>
                            <span className="mt-2 inline-flex items-center h-7 px-3 border border-navy/10 rounded-full font-display font-bold text-navy text-[0.7rem] uppercase tracking-widest bg-navy/5">
                              {b.type}
                            </span>
                          </td>
                          <td className="px-4 py-6">
                            <div className="font-sans font-medium text-gray-600 text-[0.95rem] leading-snug">
                              {b.products}
                            </div>
                          </td>
                          <td className="px-4 py-6">
                            <div className="font-sans font-bold text-[#111827] text-[0.95rem]">
                              {b.manager}
                            </div>
                            <div className="mt-1 font-sans font-medium text-gray-500 text-[0.85rem] italic">
                              {b.position}
                            </div>
                          </td>
                          <td className="px-4 py-6">
                            <div className="font-sans font-bold text-[#111827] text-[0.9rem] tabular-nums break-all">
                              {b.phone}
                            </div>
                            <div className="mt-1 font-sans font-medium text-gray-500 text-[0.85rem] tabular-nums break-all">
                              {b.mobile}
                            </div>
                          </td>
                          <td className="px-4 py-6 pr-8">
                            <a
                              href={`mailto:${b.email}`}
                              className="font-sans font-bold text-[#E84B3A] text-[0.9rem] hover:underline [overflow-wrap:anywhere]"
                            >
                              {b.email}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile/tablet: one card per buyer. */}
                <ul className="lg:hidden divide-y divide-gray-100 border-t border-gray-100 list-none m-0 p-0">
                  {visible.map((b) => (
                    <li key={b.id} className="p-5 md:p-8">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-3 py-1.5 bg-gray-100 rounded-lg font-display font-bold text-[#111827] text-[0.75rem] uppercase tracking-wider">
                          {b.country}
                        </span>
                        <span className="inline-flex items-center h-7 px-3 border border-navy/10 rounded-full font-display font-bold text-navy text-[0.7rem] uppercase tracking-widest bg-navy/5">
                          {b.type}
                        </span>
                      </div>
                      <h3 className="font-sans font-black text-[#111827] text-lg leading-snug">
                        {b.company}
                      </h3>
                      <a
                        href={`https://${b.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1.5 min-h-[40px] font-sans font-semibold text-blue-600 text-sm break-all"
                      >
                        <ExternalLink size={14} className="shrink-0" aria-hidden />
                        {b.website}
                      </a>
                      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 text-sm">
                        <dt className="flex items-center gap-1.5 font-display font-bold text-gray-400 whitespace-nowrap">
                          <Tag size={14} className={iconClass} aria-hidden /> {t.columns.category}
                        </dt>
                        <dd className="m-0 font-sans font-medium text-gray-700">{b.category}</dd>
                        <dt className="flex items-center gap-1.5 font-display font-bold text-gray-400 whitespace-nowrap">
                          <Package size={14} className={iconClass} aria-hidden /> {t.columns.products}
                        </dt>
                        <dd className="m-0 font-sans font-medium text-gray-700">{b.products}</dd>
                        <dt className="flex items-center gap-1.5 font-display font-bold text-gray-400 whitespace-nowrap">
                          <User size={14} className={iconClass} aria-hidden /> {t.columns.manager}
                        </dt>
                        <dd className="m-0 font-sans font-bold text-[#111827]">
                          {b.manager}
                          <span className="block font-medium text-gray-500 italic">{b.position}</span>
                        </dd>
                        <dt className="flex items-center gap-1.5 font-display font-bold text-gray-400 whitespace-nowrap">
                          <Phone size={14} className={iconClass} aria-hidden /> {t.columns.phone}
                        </dt>
                        <dd className="m-0 font-sans font-bold text-[#111827] tabular-nums">{b.phone}</dd>
                        <dt className="flex items-center gap-1.5 font-display font-bold text-gray-400 whitespace-nowrap">
                          <Smartphone size={14} className={iconClass} aria-hidden /> {t.columns.mobile}
                        </dt>
                        <dd className="m-0 font-sans font-bold text-[#111827] tabular-nums">{b.mobile}</dd>
                        <dt className="flex items-center gap-1.5 font-display font-bold text-gray-400 whitespace-nowrap">
                          <Mail size={14} className={iconClass} aria-hidden /> {t.columns.email}
                        </dt>
                        <dd className="m-0 min-w-0">
                          <a
                            href={`mailto:${b.email}`}
                            className="inline-flex items-center min-h-[40px] -my-2.5 font-sans font-bold text-[#E84B3A] break-all"
                          >
                            {b.email}
                          </a>
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="p-5 md:p-10 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
              <span className="font-sans font-medium text-gray-500 text-sm" aria-live="polite">
                {fillTemplate(t.pagination.summary, {
                  shown: <span className="text-[#111827] font-bold">{visible.length}</span>,
                  total: <span className="text-[#111827] font-bold">{filtered.length}</span>,
                })}
              </span>
              <nav
                className={cn("flex gap-2", filtered.length === 0 && "hidden")}
                aria-label={t.pagination.ariaLabel}
              >
                <button
                  type="button"
                  onClick={() => setPage(Math.max(1, current - 1))}
                  disabled={current === 1}
                  aria-label={t.pagination.previous}
                  className={cn(
                    pageButton,
                    "bg-white border border-gray-200 hover:border-[#E84B3A] hover:text-[#E84B3A] hover:bg-gray-50 hover:shadow-md group disabled:opacity-30 disabled:cursor-not-allowed",
                  )}
                >
                  <span className="group-hover:-translate-x-1 transition-transform" aria-hidden>
                    ←
                  </span>
                </button>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPage(p)}
                    aria-label={t.pagination.page.replace("{page}", String(p))}
                    aria-current={current === p ? "page" : undefined}
                    className={cn(
                      pageButton,
                      "font-display font-black text-lg text-[#111827]",
                      current === p
                        ? "bg-[#111827] !text-white shadow-xl shadow-navy/20"
                        : "bg-white border border-gray-200 hover:border-[#E84B3A] hover:text-[#E84B3A] hover:bg-gray-50 hover:shadow-md",
                    )}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage(Math.min(pageCount, current + 1))}
                  disabled={current === pageCount}
                  aria-label={t.pagination.next}
                  className={cn(
                    pageButton,
                    "bg-white border border-gray-200 hover:border-[#E84B3A] hover:text-[#E84B3A] hover:bg-gray-50 hover:shadow-md group disabled:opacity-30 disabled:cursor-not-allowed",
                  )}
                >
                  <span className="group-hover:translate-x-1 transition-transform" aria-hidden>
                    →
                  </span>
                </button>
              </nav>
            </div>
          </div>
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{ once: true }}
            className="mt-8 md:mt-12 p-6 md:p-8 bg-blue-50/50 rounded-[28px] md:rounded-[40px] border border-blue-100 flex items-start gap-4 md:gap-6 shadow-sm"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <Info size={24} aria-hidden />
            </div>
            <div>
              <h2 className="font-display font-black text-[#111827] text-lg md:text-xl mb-2">
                {t.notice.title}
              </h2>
              <p className="font-sans font-medium text-blue-900/70 leading-relaxed text-[0.95rem] md:text-base">
                {t.notice.body}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
