"use client";

import { useDictionary } from "@/i18n/I18nProvider";
import { useHashScroll } from "@/hooks/useHashScroll";
import PageIntro from "@/components/ui/PageIntro";
import Section from "@/components/ui/Section";
import ContactBand from "@/components/ui/ContactBand";
import { NetworkMap, type RegionKey } from "@/components/maps";
import { withBasePath } from "@/lib/basePath";

export default function AboutPage() {
  const { about } = useDictionary();
  const { intro, vision, strengths, history, network } = about;
  useHashScroll({ offset: -88 });

  return (
    <>
      <PageIntro title={intro.title} lead={intro.lead} />

      <Section id="vision" title={vision.title}>
        <div className="max-w-[40em] space-y-5 text-lead leading-relaxed">
          {vision.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBasePath("/image/main/m-1.jpg")}
          alt={vision.photoAlt}
          className="mt-10 aspect-[16/9] w-full rounded-lg object-cover"
          loading="lazy"
        />
        <h3 className="mt-12 text-h4 font-bold">{vision.principlesTitle}</h3>
        <dl className="mt-4 border-t border-line">
          {vision.principles.map((item) => (
            <div key={item.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-8 md:gap-8">
              <dt className="font-bold md:col-span-3">{item.title}</dt>
              <dd className="text-ink-soft md:col-span-5">{item.desc}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title={strengths.title} intro={strengths.intro} tone="mist">
        <ul className="border-t border-line">
          {strengths.items.map((item) => (
            <li key={item.title} className="grid gap-2 border-b border-line py-7 md:grid-cols-8 md:gap-8">
              <h3 className="text-lead leading-snug font-bold md:col-span-3">{item.title}</h3>
              <p className="text-ink-soft md:col-span-5">{item.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="history" title={history.title}>
        <ol className="border-t border-line">
          {history.years.map((year) => (
            <li key={year.year} className="grid gap-4 border-b border-line py-8 md:grid-cols-8 md:gap-8">
              <h3 className="tabular text-h3 leading-none font-extrabold text-blue md:col-span-2">{year.year}</h3>
              <ul className="space-y-3 md:col-span-6">
                {year.items.map((item) => (
                  <li key={item} className="relative pl-5">
                    <span aria-hidden className="absolute top-[0.7em] left-0 size-1.5 rounded-full bg-ink-faint" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={network.title} intro={network.intro} tone="mist">
        <NetworkMap
          labels={Object.fromEntries(network.regions.map((r) => [r.key, r.name])) as Record<RegionKey, string>}
          headOfficeLabel={network.headOffice}
          ariaLabel={network.mapAlt}
        />
        <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {network.regions.map((region) => (
            <div key={region.key} className="border-t border-line pt-4">
              <dt className="font-bold">{region.name}</dt>
              <dd className="mt-1 text-small text-ink-soft">{region.countries}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <ContactBand />
    </>
  );
}
