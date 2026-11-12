"use client";

import { useHashScroll } from "@/hooks/useHashScroll";
import { useDictionary, useLocale } from "@/i18n/I18nProvider";
import PageIntro from "@/components/ui/PageIntro";
import Section from "@/components/ui/Section";
import ContactBand from "@/components/ui/ContactBand";
import TextLink from "@/components/ui/TextLink";
import { buttonClass } from "@/components/ui/Button";
import { LocationMap, OFFICE } from "@/components/maps";

/**
 * Company brochure. Put the PDF in `public/` and set its path here (e.g. "/brochure.pdf").
 * While this is null the section explains that the brochure is not ready and points to the inquiry form.
 */
const BROCHURE_URL: string | null = null;

const externalLinkClass =
  "inline-flex min-h-11 items-center font-semibold text-blue underline decoration-blue/30 underline-offset-4 transition-colors hover:decoration-blue";

export default function ContactDetailPage() {
  const { contactDetail, footer } = useDictionary();
  const locale = useLocale();
  const { intro, location, company, brochure } = contactDetail;
  useHashScroll({ offset: -96, resetWhenEmpty: true });

  const naverUrl = `https://map.naver.com/p/search/${encodeURIComponent(location.naverQuery)}`;
  // Kakao Map is what most Korean visitors use; English readers get Google Maps instead.
  const otherMapUrl =
    locale === "ko"
      ? `https://map.kakao.com/link/map/${encodeURIComponent(location.map.officeName)},${OFFICE.lat},${OFFICE.lon}`
      : `https://www.google.com/maps/search/?api=1&query=${OFFICE.lat},${OFFICE.lon}`;

  return (
    <>
      <PageIntro title={intro.title} lead={intro.lead} />

      <Section id="location" title={location.title}>
        <LocationMap {...location.map} />

        <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="border-t border-line pt-4 sm:col-span-2">
            <dt className="text-small text-ink-soft">{location.addressLabel}</dt>
            <dd className="mt-1 text-lead font-semibold leading-snug">{location.address}</dd>
            <dd className="mt-1 text-small text-ink-soft">{location.addressDetail}</dd>
          </div>
          <div className="border-t border-line pt-4">
            <dt className="text-small text-ink-soft">{location.transitLabel}</dt>
            <dd className="mt-1 font-semibold">{location.transit}</dd>
          </div>
          <div className="border-t border-line pt-4">
            <dt className="text-small text-ink-soft">{location.phoneLabel}</dt>
            <dd className="mt-1">
              <a href={`tel:${footer.phone}`} className="tabular font-semibold hover:text-blue">
                {footer.phone}
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-x-8">
          <a href={naverUrl} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
            {location.naverMap}
            <span className="sr-only"> {location.newTab}</span>
          </a>
          <a href={otherMapUrl} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
            {location.otherMap}
            <span className="sr-only"> {location.newTab}</span>
          </a>
        </div>
      </Section>

      <Section title={company.title} tone="mist">
        <dl className="border-t border-line">
          {company.rows.map((row) => (
            <div key={row.label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-3 sm:gap-6">
              <dt className="text-ink-soft">{row.label}</dt>
              <dd className="font-semibold sm:col-span-2">{row.value}</dd>
            </div>
          ))}
          <div className="grid gap-1 border-b border-line py-4 sm:grid-cols-3 sm:gap-6">
            <dt className="text-ink-soft">{company.emailLabel}</dt>
            <dd className="sm:col-span-2">
              <a
                href={`mailto:${footer.email}`}
                className="font-semibold break-all text-blue hover:underline"
              >
                {footer.email}
              </a>
            </dd>
          </div>
        </dl>
      </Section>

      <Section id="brochure" title={brochure.title}>
        {BROCHURE_URL ? (
          <>
            <p className="max-w-[48ch] text-ink-soft">{brochure.readyText}</p>
            <a href={BROCHURE_URL} download className={buttonClass("secondary", "mt-6")}>
              {brochure.download}
            </a>
          </>
        ) : (
          <>
            <p className="max-w-[48ch] text-ink-soft">{brochure.pendingText}</p>
            <TextLink href="/contact" className="mt-4 inline-block">
              {brochure.pendingAction}
            </TextLink>
          </>
        )}
      </Section>

      <ContactBand />
    </>
  );
}
