"use client";

import { Fragment } from "react";
import Link from "@/v3/i18n/Link";
import { useHashScroll } from "@/v3/hooks/useHashScroll";
import { motion } from "motion/react";
import { useDictionary, useLocale } from "@/v3/i18n/I18nProvider";
import CtaSection from "@/v3/components/CtaSection";
import { fadeUp } from "@/v3/lib/variants";
import { HISTORY } from "@/v3/data/history";
import { NetworkMap, NETWORK_REGIONS, type NetworkRegion, type RegionKey } from "@/components/maps";

type Part = { text: string; bold: boolean };

/** Dictionary text split into plain and bold parts (no HTML in the JSON). */
function RichText({
  parts,
  boldClassName = "font-bold text-[#14213D]",
}: {
  parts: Part[];
  boldClassName?: string;
}) {
  return (
    <>
      {parts.map((p, i) =>
        p.bold ? (
          <strong key={i} className={boldClassName}>
            {p.text}
          </strong>
        ) : (
          <Fragment key={i}>{p.text}</Fragment>
        ),
      )}
    </>
  );
}

/** Network regions for v3 (change request §9): shared regions plus Poland, Canada, Uzbekistan, Malaysia, Indonesia. */
const EXTRA: Partial<Record<RegionKey, { countries: string[]; hubs: { lon: number; lat: number }[] }>> = {
  asia: {
    countries: ["458", "360"],
    hubs: [
      { lon: 101.69, lat: 3.14 }, // Kuala Lumpur
      { lon: 106.85, lat: -6.21 }, // Jakarta
    ],
  },
  cis: { countries: ["860"], hubs: [{ lon: 69.24, lat: 41.3 }] }, // Tashkent
  northAmerica: { countries: ["124"], hubs: [{ lon: -79.38 + 360, lat: 43.65 }] }, // Toronto
};
const V3_REGIONS: NetworkRegion[] = NETWORK_REGIONS.map((region) => {
  if (region.key === "europe") {
    // Europe is listed as Germany and Poland only.
    return {
      ...region,
      countries: ["276", "616"],
      hubs: [
        { lon: 11.58, lat: 48.14 }, // Munich
        { lon: 21.01, lat: 52.23 }, // Warsaw
      ],
    };
  }
  const extra = EXTRA[region.key];
  return extra
    ? {
        ...region,
        countries: [...region.countries, ...extra.countries],
        hubs: [...region.hubs, ...extra.hubs],
      }
    : region;
});
const MAP_PALETTE = {
  land: "#DCE3EE",
  network: "#C9D8F5",
  korea: "#14213D",
  route: "rgba(31,95,224,0.5)",
  hub: "#1F5FE0",
  ink: "#14213D",
};

/** Decorative icons, in the same order as `about.strengths.items`. */
const STRENGTH_ICONS = [
  <svg
    key="strength-0"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 transition-transform duration-700 group-hover:scale-110"
  >
    <path
      d="M40 20v20h15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="40"
      cy="40"
      r="30"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="4 4"
      opacity="0.3"
    />
    <path
      d="M22 40c0-9.94 8.06-18 18-18"
      stroke="#1F5FE0"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1" opacity="0.1" />
    <path d="M40 12v4M68 40h-4M40 68v-4M12 40h4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
  </svg>,
  <svg
    key="strength-1"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 transition-transform duration-700 group-hover:scale-110"
  >
    <circle cx="40" cy="30" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 60c0-11 9-20 20-20s20 9 20 20" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M52 35l5 5 10-10"
      stroke="#1F5FE0"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1" opacity="0.1" />
    <path d="M15 60h50" stroke="currentColor" strokeWidth="1" opacity="0.2" />
  </svg>,
  <svg
    key="strength-2"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 transition-transform duration-700 group-hover:scale-110"
  >
    <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <ellipse cx="40" cy="40" rx="10" ry="28" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <ellipse cx="40" cy="40" rx="28" ry="10" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <circle cx="58" cy="32" r="4" fill="#1F5FE0" opacity="0.9" />
    <circle cx="22" cy="48" r="4" fill="#1F5FE0" opacity="0.9" />
    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1" opacity="0.1" />
  </svg>,
  <svg
    key="strength-3"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 transition-transform duration-700 group-hover:scale-110"
  >
    <rect x="22" y="28" width="36" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M22 38h36" stroke="currentColor" strokeWidth="1.5" />
    <path d="M30 22v10M50 22v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="40" cy="48" r="6" stroke="#1F5FE0" strokeWidth="2" />
    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1" opacity="0.1" />
  </svg>,
  <svg
    key="strength-4"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 transition-transform duration-700 group-hover:scale-110"
  >
    <path d="M25 55c0-8 6-15 15-15s15 7 15 15" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="40" cy="30" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M55 40l8-8M25 40l-8-8" stroke="#1F5FE0" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1" opacity="0.1" />
    <path d="M15 60h50" stroke="currentColor" strokeWidth="1" opacity="0.2" />
  </svg>,
];

export default function AboutPage() {
  useHashScroll({ offset: -100 });
  const { about, common } = useDictionary();
  const locale = useLocale();
  const sectionTitle = "font-display font-bold leading-[1.15] text-[#14213D]";
  const eyebrow = "flex items-center gap-3 mb-5 font-display font-bold uppercase text-[#1F5FE0]";
  return (
    <div className="bg-[#F6F8FC]">
      <section id="intro" className="bg-[#F6F8FC] border-b border-[#E3E8F0]" aria-label={about.hero.label}>
        <div className="relative mx-auto w-full max-w-[1280px] px-6 pt-40 pb-16 md:px-8 md:pt-44 md:pb-20">
          <div className="flex items-center gap-[15px] mb-6">
            <div className="h-[2px] w-10 bg-[#1F5FE0]" />
            <span className="font-display font-bold uppercase tracking-[0.3em] text-[0.8rem] text-[#14213D]">
              {about.hero.eyebrow}
            </span>
          </div>
          <h1
            className="font-display font-extrabold text-[#14213D] leading-[1.05] mb-8"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)", letterSpacing: "-0.04em" }}
          >
            {about.hero.titleLine1}
            <br />
            <span className="text-[#1F5FE0]">{about.hero.titleHighlight}</span>
          </h1>
          <p className="max-w-[560px] font-sans font-medium leading-[1.8] text-[1.1rem] text-[#4A5873]">
            {about.hero.description[0]}
            <br className="hidden md:block" /> {about.hero.description[1]}
          </p>
          <nav
            className="absolute right-8 bottom-8 hidden items-center gap-3 font-display font-bold uppercase tracking-[0.15em] text-[0.75rem] text-[#6b7280] md:flex"
            aria-label={about.breadcrumbLabel}
          >
            <Link href="/" className="hover:text-[#14213D] transition-colors">
              {common.home}
            </Link>
            <span className="text-[#d1d5db]">/</span>
            <span className="text-[#14213D]">{about.breadcrumbCurrent}</span>
          </nav>
        </div>
      </section>

      <section
        id="vision"
        className="bg-white"
        style={{ padding: "7rem 1.5rem" }}
        aria-label={about.intro.label}
      >
        <div className="mx-auto max-w-[1280px]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className={eyebrow} style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>
              <div className="h-[2px] w-6 bg-current" />
              {about.intro.eyebrow}
            </div>
            <h2
              className={`${sectionTitle} mb-8`}
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.03em" }}
            >
              {about.intro.title}
            </h2>
            <p className="max-w-[880px] font-sans text-[1.15rem] leading-[1.95] text-[#4A5873]">
              <RichText parts={about.intro.body} />
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <article className="rounded-[24px] bg-[#14213D] p-8 text-white md:p-10">
              <h3 className="font-display font-bold uppercase tracking-[0.2em] text-[0.95rem] text-white/70">
                {about.mission.title}
              </h3>
              <p className="mt-5 text-[1.15rem] leading-[1.85] text-white/85">
                <RichText parts={about.mission.body} boldClassName="font-bold text-white" />
              </p>
            </article>
            <article className="rounded-[24px] bg-[#1F5FE0] p-8 text-white md:p-10">
              <h3 className="font-display font-bold uppercase tracking-[0.2em] text-[0.95rem] text-white/75">
                {about.vision.title}
              </h3>
              <p className="mt-5 text-[1.15rem] leading-[1.85] text-white/90">
                <RichText parts={about.vision.body} boldClassName="font-bold text-white" />
              </p>
            </article>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-14"
          >
            <h3 className="font-display font-bold uppercase tracking-[0.2em] text-[0.85rem] text-[#14213D]">
              {about.coreServices.title}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-3">
              {about.coreServices.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[#D5DCE8] bg-[#F6F8FC] px-5 py-2.5 text-[0.95rem] font-semibold text-[#14213D]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section
        id="strengths"
        className="bg-[#f8f9fc]"
        style={{
          padding: "7rem 2rem",
        }}
        aria-label={about.strengths.label}
      >
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: "1280px",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-2 mb-5 font-display font-semibold uppercase"
              style={{
                fontSize: "0.72rem",
                color: "#1F5FE0",
                letterSpacing: "0.16em",
              }}
            >
              {about.strengths.eyebrow}
            </div>
            <h2
              className="font-display font-bold leading-[1.125]"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                color: "#14213D",
                letterSpacing: "-0.02em",
              }}
            >
              {about.strengths.title}
              <br />
              <span
                className="font-light italic"
                style={{
                  color: "rgba(19,39,79,0.4)",
                }}
              >
                {about.strengths.subtitle}
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {about.strengths.items.map((i, r) => (
              <motion.div
                key={r}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                }}
                variants={fadeUp}
                transition={{
                  delay: 0.1 * r,
                }}
                className="group relative bg-white rounded-[24px] p-8 pb-28 lg:pb-8 overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-2 lg:min-h-[400px]"
              >
                <div className="absolute inset-0 z-0">
                  <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                      backgroundImage:
                        'url("https://www.transparenttextures.com/patterns/natural-paper.png")',
                    }}
                  />
                  <div
                    className="absolute right-8 bottom-8 origin-bottom-right opacity-[0.12] group-hover:opacity-[0.3] group-hover:scale-[2.2] group-hover:animate-none animate-pulse transition-all duration-1000 pointer-events-none transform scale-[1.6] text-[#1F5FE0] z-10"
                    style={{
                      filter: "drop-shadow(0 0 10px rgba(31,95,224, 0.4))",
                    }}
                  >
                    {STRENGTH_ICONS[r]}
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden z-20">
                    <div
                      className="absolute inset-[-150%] bg-gradient-to-tr from-transparent via-white/60 to-transparent rotate-45 animate-[shimmer_2.5s_infinite]"
                      style={{
                        filter: "blur(20px)",
                      }}
                    />
                    <div
                      className="absolute inset-[-150%] bg-gradient-to-br from-transparent via-[#1F5FE0]/10 to-transparent -rotate-45 animate-[shimmer_4s_infinite]"
                      style={{
                        animationDirection: "reverse",
                        filter: "blur(40px)",
                      }}
                    />
                  </div>
                  <div className="absolute inset-4 border border-[#1F5FE0]/20 rounded-2xl z-30 pointer-events-none group-hover:border-[#1F5FE0]/40 transition-colors duration-500">
                    <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-[#1F5FE0] rounded-full animate-pulse" />
                  </div>
                  <div className="absolute inset-0 bg-white/40 group-hover:bg-white/5 transition-colors duration-700 ease-in-out z-20" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-50">
                    <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-[#1F5FE0] rounded-full animate-pulse shadow-[0_0_10px_#1F5FE0]" />
                    <div className="absolute top-[60%] left-[80%] w-1.5 h-1.5 bg-[#1F5FE0] rounded-full animate-pulse shadow-[0_0_10px_#1F5FE0]" />
                    <div className="absolute top-[40%] left-[10%] w-1.5 h-1.5 bg-[#1F5FE0] rounded-full animate-pulse shadow-[0_0_10px_#1F5FE0]" />
                    <div className="absolute top-[80%] left-[40%] w-1.5 h-1.5 bg-[#1F5FE0] rounded-full animate-pulse shadow-[0_0_10px_#1F5FE0]" />
                  </div>
                </div>
                <div className="relative z-50">
                  <div
                    className="font-display font-bold leading-none mb-6 text-[#1F5FE0] group-hover:text-[#14213D] transition-all duration-500 group-hover:scale-125 origin-left inline-flex items-baseline"
                    style={{
                      fontSize: "3.5rem",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {i.num}
                    <span
                      className="font-normal opacity-40 ml-1 text-gray-500 transition-all group-hover:text-[#14213D] group-hover:opacity-20 group-hover:scale-110 transform"
                      style={{
                        fontSize: "1.4rem",
                      }}
                    >
                      {i.unit}
                    </span>
                  </div>
                  <h3
                    className="font-sans font-bold mb-4 text-[#14213D]"
                    style={{
                      fontSize: "1.25rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {i.label}
                  </h3>
                  <p
                    className="font-sans font-medium leading-[1.8] text-gray-500 group-hover:text-[#14213D] transition-colors duration-500 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
                    style={{
                      fontSize: "0.95rem",
                    }}
                  >
                    {i.desc}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#14213D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="history"
        className="bg-white"
        style={{ padding: "7rem 1.5rem" }}
        aria-label={about.history.label}
      >
        <div className="mx-auto max-w-[1280px]">
          <div className={eyebrow} style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>
            <div className="h-[2px] w-6 bg-current" />
            {about.history.eyebrow}
          </div>
          <h2
            className={`${sectionTitle} mb-12`}
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            {about.history.title}
          </h2>
          <ol className="border-t border-[#E3E8F0]">
            {HISTORY.map((entry) => (
              <li
                key={entry.year}
                className="grid grid-cols-1 gap-4 border-b border-[#E3E8F0] py-8 md:grid-cols-[200px_1fr] md:gap-10 md:py-10"
              >
                <span
                  className="font-display font-extrabold leading-none text-[#1F5FE0]"
                  style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
                >
                  {entry.year}
                </span>
                <ul className="space-y-3">
                  {entry.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[1.05rem] leading-[1.75] text-[#14213D]"
                    >
                      <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-[#1F5FE0]" />
                      {item[locale]}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="network"
        className="bg-[#F6F8FC]"
        style={{ padding: "7rem 1.5rem" }}
        aria-label={about.network.label}
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 text-center">
            <div className="mb-5 font-display font-semibold uppercase text-[0.75rem] tracking-[0.16em] text-[#1F5FE0]">
              {about.network.eyebrow}
            </div>
            <h2
              className={`${sectionTitle} mb-4`}
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              {about.network.title}
            </h2>
            <p className="mx-auto max-w-[620px] font-sans text-[1rem] leading-[1.8] text-[#4A5873]">
              {about.network.description}
            </p>
          </div>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[2.4fr_1fr]">
            <div className="overflow-hidden rounded-[24px] border border-[#E3E8F0] bg-white p-3 md:p-5">
              <NetworkMap
                labels={about.network.mapLabels as Record<RegionKey, string>}
                headOfficeLabel={about.network.headOffice}
                ariaLabel={about.network.mapAlt}
                regions={V3_REGIONS}
                palette={MAP_PALETTE}
              />
            </div>
            <div className="rounded-[24px] border border-[#E3E8F0] bg-white">
              <div className="flex items-center gap-3 border-b border-[#E3E8F0] px-6 py-4">
                <div className="h-4 w-1.5 rounded-full bg-[#1F5FE0]" />
                <span className="font-display font-bold uppercase text-[0.75rem] tracking-[0.3em] text-[#14213D]">
                  {about.network.listTitle}
                </span>
              </div>
              <ul className="divide-y divide-[#EEF1F6]">
                {about.network.regions.map((region) => (
                  <li key={region.key} className="px-6 py-4">
                    <span className="block font-display font-bold text-[1rem] text-[#14213D]">
                      {region.name}
                    </span>
                    <span className="mt-1 block text-[0.85rem] leading-snug text-[#4A5873]">
                      {region.countries}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <CtaSection
        highlight={about.cta.highlight}
        title={
          <>
            {about.cta.titleLead}{" "}
            <span className="text-[#1F5FE0] font-bold underline underline-offset-8 decoration-2">
              {about.cta.titleHighlight}
            </span>
            {about.cta.titleTail} <br className="hidden md:block" />
            {about.cta.titleLine2}
          </>
        }
        description={about.cta.description}
      />
    </div>
  );
}
