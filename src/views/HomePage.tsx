"use client";

import { motion, MotionConfig } from "motion/react";
import { useDictionary } from "@/i18n/I18nProvider";
import Link from "@/i18n/Link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ContactBand from "@/components/ui/ContactBand";
import TextLink from "@/components/ui/TextLink";
import { ButtonLink } from "@/components/ui/Button";
import Waves from "@/components/ui/Waves";
import { NetworkMap, type RegionKey } from "@/components/maps";

export default function HomePage() {
  const { home } = useDictionary();
  const { hero, board, services, network } = home;

  return (
    <MotionConfig reducedMotion="user">
      {/* Hero: plain statement of what the company does, a real exhibition photo, then proof. */}
      <section className="bg-paper pt-28 md:pt-36">
        <Container className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h1 className="text-[2.25rem] leading-[1.2] font-extrabold tracking-[-0.03em] md:text-[3.25rem] lg:text-display lg:leading-[1.15]">
              <span className="block">{hero.titleLine1}</span>
              <span className="block">{hero.titleLine2}</span>
            </h1>
            <p className="mt-6 max-w-[44ch] text-lead leading-relaxed text-ink-soft">{hero.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">{hero.primary}</ButtonLink>
              <ButtonLink href="/works" variant="secondary">
                {hero.secondary}
              </ButtonLink>
            </div>
          </div>
          <div className="md:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/image/main/m-4.jpg"
              alt={hero.imageAlt}
              className="aspect-[16/10] w-full rounded-lg object-cover md:aspect-[4/5]"
              fetchPriority="high"
            />
          </div>
        </Container>
        <Waves className="mt-12 md:mt-16" />
      </section>

      {/* The one bold element: a directory board of real projects, like the listing at a fair entrance. */}
      <section aria-labelledby="board-title" className="-mt-px bg-blue-deep pt-6 pb-14 text-white md:pt-8 md:pb-20">
        <Container>
          <div className="flex items-baseline justify-between gap-6">
            <h2 id="board-title" className="text-h4 font-bold md:text-h3">
              {board.title}
            </h2>
            <Link href="/works" className="shrink-0 text-small font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline">
              {board.all}
            </Link>
          </div>

          <div
            role="table"
            aria-labelledby="board-title"
            className="mt-8 border-t border-white/25 md:mt-10"
          >
            <div role="row" className="sr-only">
              <span role="columnheader">{board.columns.place}</span>
              <span role="columnheader">{board.columns.project}</span>
              <span role="columnheader">{board.columns.client}</span>
            </div>
            {board.rows.map((row, i) => (
              <motion.div
                key={row.id}
                role="row"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                className="grid gap-1 border-b border-white/25 py-5 md:grid-cols-12 md:items-baseline md:gap-8 md:py-6"
              >
                <span
                  role="cell"
                  className="text-h4 leading-tight font-extrabold tracking-[-0.02em] text-[#00a8e8] md:col-span-3 md:text-h3"
                >
                  {row.place}
                </span>
                <span role="cell" className="text-body font-semibold md:col-span-6 md:text-lead md:leading-snug">
                  {row.project}
                </span>
                <span role="cell" className="text-caption text-white/70 md:col-span-3 md:text-small">
                  {row.client}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Section title={services.title} intro={services.intro}>
        <ul className="border-t border-line">
          {services.items.map((item) => (
            <li key={item.anchor} className="grid gap-3 border-b border-line py-8 md:grid-cols-8 md:gap-8">
              <h3 className="text-h4 font-bold md:col-span-3">{item.title}</h3>
              <div className="md:col-span-5">
                <p className="text-ink-soft">{item.desc}</p>
                {item.cases.length > 0 && (
                  <p className="mt-3 text-small">
                    <span className="mr-2 font-semibold text-ink">{services.casesLabel}</span>
                    <span className="text-ink-soft">{item.cases.join(", ")}</span>
                  </p>
                )}
                <TextLink href={`/services#${item.anchor}`} className="mt-4 inline-block text-small">
                  {services.more}
                </TextLink>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={network.title} intro={network.intro} tone="mist">
        <NetworkMap
          labels={Object.fromEntries(network.regions.map((r) => [r.key, r.name])) as Record<RegionKey, string>}
          headOfficeLabel={network.headOffice}
          ariaLabel={network.mapAlt}
        />
        <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {network.regions.map((region) => (
            <div key={region.name} className="border-t border-line pt-4">
              <dt className="font-bold">{region.name}</dt>
              <dd className="mt-1 text-small text-ink-soft">{region.countries}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <ContactBand />
    </MotionConfig>
  );
}
