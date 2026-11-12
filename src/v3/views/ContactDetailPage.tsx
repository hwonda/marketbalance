"use client";

import Link from "@/v3/i18n/Link";
import { useHashScroll } from "@/v3/hooks/useHashScroll";
import { useDictionary } from "@/v3/i18n/I18nProvider";
import { motion, type Variants } from "motion/react";
import { User, Mail, Phone, Calendar, MapPin, Building, TrainFront, ExternalLink, ArrowRight } from "lucide-react";
import CtaSection from "@/v3/components/CtaSection";
import { LocationMap } from "@/components/maps";
import { NAVER_MAP_URL } from "@/v3/config/social";

/**
 * Company information cards. The registration number and the mobile number were removed
 * (change request §15), so those two cards show their main value only.
 */
const INFO_CARDS = [
  { key: "company", icon: Building },
  { key: "ceo", icon: User },
  { key: "registration", icon: Calendar },
  { key: "phone", icon: Phone, href: "tel:031-425-9281" },
  { key: "email", icon: Mail, href: "mailto:marketbalancekorea@gmail.com" },
  { key: "address", icon: MapPin },
] as const;

/*
 * The shared map (src/components/maps) is styled with the v2 stylesheet. v3's stylesheet only scans src/v3,
 * so its layout classes are listed here for Tailwind to generate, and its v2 colour tokens are mapped onto
 * the client palette by MAP_THEME below. Remove both once src/v3/globals.css sources the maps folder.
 * h-[360px] md:h-[480px] h-px h-0 w-0 size-11 size-2.5 size-4 top-3 right-3 border-[3px] border-x-[7px]
 * border-t-[8px] border-x-transparent ring-1 shadow shadow-sm shadow-[0_8px_24px_rgba(32,24,32,0.25)]
 * text-[12px] text-[13px] leading-snug leading-none whitespace-nowrap pointer-events-none transition-opacity
 * aspect-[4/3] sm:aspect-[2/1] gap-1.5 px-2.5 px-3 py-1 py-2 mt-1 rounded-md rounded-lg text-white/70
 */
const MAP_THEME = [
  "[&_.bg-ink]:bg-[#14213D]",
  "[&_.text-ink]:text-[#14213D]",
  "[&_.border-t-ink]:border-t-[#14213D]",
  "[&_.bg-blue]:bg-[#1F5FE0]",
  "[&_.bg-blue-deep]:bg-[#14213D]",
  "[&_.bg-mist]:bg-[#F6F8FC]",
  "[&_.bg-line]:bg-[#E3E8F0]",
  "[&_.border-line]:border-[#E3E8F0]",
  "[&_.ring-line]:ring-[#E3E8F0]",
  "[&_.text-h4]:text-2xl",
  "[&_.text-small]:text-base",
  "[&_button:hover]:bg-[#F6F8FC]",
  "[&_.pointer-events-none.absolute.inset-0]:bg-[#14213D]/45",
].join(" ");

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ContactDetailPage() {
  const { contactDetail: t, common } = useDictionary();
  useHashScroll({ offset: -100, resetWhenEmpty: true });

  return (
    <main className="font-sans bg-white overflow-hidden">
      {/* Page header: plain section ground, no photo behind the text, no glass card or decorative circles (§2). */}
      <section aria-label={t.hero.ariaLabel} className="relative border-b border-[#E3E8F0] bg-[#F6F8FC]">
        <div className="relative mx-auto w-full max-w-[1440px] px-5 pt-[132px] pb-14 sm:px-8 md:px-12 md:pt-[164px] md:pb-20">
          <div className="mb-6 flex items-center gap-[15px]">
            <div className="h-[2px] w-10 bg-[#1F5FE0]" />
            <span className="font-display text-[0.8rem] font-bold tracking-[0.3em] text-[#14213D] uppercase">
              {t.hero.eyebrow}
            </span>
          </div>
          <h1
            className="mb-6 font-display leading-[1.05] font-extrabold text-[#14213D]"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.25rem)", letterSpacing: "-0.04em" }}
          >
            {t.hero.titleLine1}
            <br />
            <span className="text-[#1F5FE0]">{t.hero.titleLine2}</span>
          </h1>
          <p className="max-w-[560px] font-sans text-[1.1rem] leading-[1.8] font-medium text-[#4A5873]">
            {t.hero.introLine1} <br className="hidden sm:block" />
            {t.hero.introLine2}
          </p>
          <nav
            aria-label={t.breadcrumb.ariaLabel}
            className="mt-8 flex items-center gap-3 font-display text-[0.75rem] font-bold tracking-[0.15em] text-[#6b7280] uppercase md:absolute md:right-12 md:bottom-8 md:mt-0"
          >
            <Link href="/" className="inline-flex min-h-11 items-center hover:text-[#14213D]">
              {common.home}
            </Link>
            <span aria-hidden="true" className="text-[#d1d5db]">
              /
            </span>
            <span aria-current="page" className="text-[#14213D]">
              {t.breadcrumb.current}
            </span>
          </nav>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1280px] space-y-24 px-5 py-20 sm:px-8 md:space-y-32 md:py-28">
        {/* 01 Company info */}
        <section aria-labelledby="company-info-title">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10 md:mb-14">
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="font-display text-4xl font-black text-[#1F5FE0]">01</span>
              <div className="h-[2px] w-12 bg-[#D5DCE8]" />
              <span className="font-display text-sm font-bold tracking-widest text-[#4A5873] uppercase sm:text-lg">
                {t.companyInfo.eyebrow}
              </span>
            </div>
            <h2 id="company-info-title" className="font-display text-3xl font-black tracking-tighter text-[#14213D] md:text-4xl">
              {t.companyInfo.title}
            </h2>
          </motion.div>
          <ul className="grid grid-cols-1 border border-[#E3E8F0] sm:grid-cols-2 lg:grid-cols-3">
            {INFO_CARDS.map((card) => {
              const info = t.companyInfo.cards[card.key];
              const sub = "sub" in info ? info.sub : null;
              return (
                <li
                  key={card.key}
                  className="group flex items-center gap-5 border border-[#E3E8F0] bg-white px-5 py-5 transition-colors hover:bg-[#F6F8FC] sm:flex-col sm:gap-0 sm:px-8 sm:py-14 sm:text-center"
                >
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#F2F6FD] text-[#1F5FE0] transition-colors group-hover:bg-[#1F5FE0] group-hover:text-white sm:mb-8 sm:size-20">
                    <card.icon aria-hidden="true" className="size-6 sm:size-8" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1 sm:flex-none">
                    <span className="mb-2 block font-display text-[0.75rem] font-bold tracking-[0.2em] text-[#4A5873] uppercase">
                      {info.label}
                    </span>
                    <p
                      className={
                        card.key === "email"
                          ? "text-base leading-tight font-black tracking-tight text-[#14213D] md:text-lg"
                          : "text-base leading-tight font-black tracking-tight break-keep text-[#14213D] [overflow-wrap:anywhere] md:text-xl lg:text-2xl"
                      }
                    >
                      {"href" in card ? (
                        <a href={card.href} className="inline-block py-[11px] -my-[11px] hover:text-[#1F5FE0] hover:underline underline-offset-4">
                          {/* Long addresses wrap after "@" rather than mid-word. */}
                          {card.key === "email" ? (
                            <>
                              {info.value.split("@")[0]}@<wbr />
                              {info.value.split("@")[1]}
                            </>
                          ) : (
                            info.value
                          )}
                        </a>
                      ) : (
                        info.value
                      )}
                    </p>
                    {sub && <p className="mt-2 text-[0.9rem] font-medium text-[#4A5873]">{sub}</p>}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Location (§16): title above the section, interactive map filling its card, details beside it. */}
        <section id="location" aria-labelledby="location-title" className="scroll-mt-24">
          <h2
            id="location-title"
            className="mb-10 text-center font-display text-3xl font-black tracking-tighter text-[#14213D] md:mb-14 md:text-4xl"
          >
            {t.location.title}
          </h2>
          <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-3">
              <div className={MAP_THEME}>
                <LocationMap {...t.location.map} />
              </div>
            </div>
            <dl className="space-y-8 lg:col-span-2">
              <div className="flex items-start gap-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F2F6FD] text-[#1F5FE0]">
                  <MapPin aria-hidden="true" size={22} strokeWidth={2.25} />
                </span>
                <div className="min-w-0">
                  <dt className="mb-1 text-sm font-medium text-[#4A5873]">{t.location.addressLabel}</dt>
                  <dd>
                    <p className="text-[1.05rem] leading-snug font-bold tracking-tight text-[#14213D] md:text-lg xl:whitespace-nowrap">
                      {t.location.addressLine}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#4A5873]">{t.location.addressDetail}</p>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F2F6FD] text-[#1F5FE0]">
                  <TrainFront aria-hidden="true" size={22} strokeWidth={2.25} />
                </span>
                <div>
                  <dt className="mb-2 text-sm font-medium text-[#4A5873]">{t.location.transitLabel}</dt>
                  <dd className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#00A4E3] font-display text-base font-black text-white"
                    >
                      4
                    </span>
                    <span className="text-[1.05rem] font-bold tracking-tight text-[#14213D] md:text-lg">
                      {t.location.transitStation}
                      <span className="mt-0.5 block text-sm font-medium text-[#4A5873]">{t.location.transitWalk}</span>
                    </span>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F2F6FD] text-[#1F5FE0]">
                  <Phone aria-hidden="true" size={22} strokeWidth={2.25} />
                </span>
                <div>
                  <dt className="mb-1 text-sm font-medium text-[#4A5873]">{t.location.phoneLabel}</dt>
                  <dd>
                    <a
                      href="tel:031-425-9281"
                      className="inline-flex min-h-11 items-center text-[1.05rem] font-bold tracking-tight text-[#14213D] hover:text-[#1F5FE0] md:text-lg"
                    >
                      {t.location.phone}
                    </a>
                  </dd>
                </div>
              </div>
              <a
                href={NAVER_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#03C75A] px-6 font-bold text-white transition-colors hover:bg-[#02a84c]"
              >
                {t.location.naverMap}
                <ExternalLink aria-hidden="true" size={16} />
                <span className="sr-only">({t.location.newTab})</span>
              </a>
            </dl>
          </div>
        </section>

        {/* 02 Contact us (§17): replaces the brochure download. Keeps the #brochure anchor used by the header menu. */}
        <section id="brochure" aria-labelledby="contact-us-title" className="scroll-mt-24">
          <div className="mb-10 inline-flex items-center gap-3 md:mb-14">
            <span className="font-display text-4xl font-black tracking-tighter text-[#1F5FE0]">
              {t.contactUs.sectionNumber}
            </span>
            <div className="h-[2px] w-12 bg-[#D5DCE8]" />
            <span className="font-display text-sm font-bold tracking-widest text-[#4A5873] uppercase sm:text-lg">
              {t.contactUs.eyebrow}
            </span>
          </div>
          <div className="flex flex-col items-center justify-between gap-10 rounded-3xl bg-[#F2F6FD] px-6 py-12 sm:p-14 md:p-20 lg:flex-row lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <span className="mb-6 inline-flex items-center rounded-full border border-[#1F5FE0]/20 bg-white px-5 py-2 font-display text-[0.75rem] font-bold tracking-[0.2em] text-[#1F5FE0] uppercase">
                {t.contactUs.tag}
              </span>
              <h2
                id="contact-us-title"
                className="mb-5 font-display leading-[1.2] font-black tracking-tighter text-[#14213D]"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}
              >
                {t.contactUs.title}
              </h2>
              <p className="mx-auto max-w-[540px] text-lg leading-relaxed font-medium text-[#4A5873] lg:mx-0">
                {t.contactUs.description}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-4">
              <span aria-hidden="true" className="flex size-20 items-center justify-center rounded-2xl bg-white text-[#1F5FE0] shadow-sm">
                <Mail size={34} strokeWidth={1.75} />
              </span>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#14213D] px-8 font-bold text-white transition-colors hover:bg-[#1F5FE0]"
              >
                {t.contactUs.button}
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <a href="tel:031-425-9281" className="inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-semibold text-[#14213D] hover:text-[#1F5FE0]">
                <Phone aria-hidden="true" size={16} />
                {t.contactUs.phoneLabel} {t.contactUs.phone}
              </a>
            </div>
          </div>
        </section>
      </div>

      <CtaSection
        highlight={t.cta.highlight}
        title={
          <>
            {t.cta.titleLead}{" "}
            <span className="font-bold text-[#1F5FE0] underline decoration-2 underline-offset-8">{t.cta.titleHighlight}</span>
            {t.cta.titleAfterHighlight}
            <br className="hidden md:block" />
            {t.cta.titleTail}
          </>
        }
        description={t.cta.description}
      />
    </main>
  );
}
