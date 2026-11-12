"use client";

import Link from "@/v3/i18n/Link";
import { useDictionary } from "@/v3/i18n/I18nProvider";

/** Main photo (change request §2: the client will send a replacement; any wide photo works, it is cropped with object-fit: cover). */
export const HERO_IMAGE = "/image/main/m-1.jpg";

/** Change request §6: solid light ground, text on the left, photo only in the right half, no text over the photo. */
export default function HeroSection() {
  const { home } = useDictionary();
  const hero = home.hero;

  return (
    <section className="bg-[#F6F8FC] pt-[116px] pb-16 md:pt-[140px] md:pb-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="flex items-center gap-3 text-[12px] font-bold tracking-[0.3em] text-[#1F5FE0]">
            <span className="h-px w-8 bg-[#1F5FE0]" aria-hidden />
            {hero.label}
          </p>
          <h1 className="mt-6 font-display text-[2.5rem] leading-[1.12] font-bold tracking-[-0.02em] text-[#14213D] md:text-[3.5rem] xl:text-[4rem]">
            <span className="block">
              {hero.titleLead}
              <span className="text-[#1F5FE0]">{hero.titleHighlight}</span>
            </span>
            <span className="block">{hero.titleLine2}</span>
          </h1>
          <p className="mt-6 text-[17px] leading-[1.8] text-[#4A5873] md:text-[18px]">
            {hero.introLine1}
            <br />
            {hero.introLine2}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#14213D] px-8 text-[15px] font-bold text-white transition-colors hover:bg-[#1F5FE0]"
            >
              {hero.primary}
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center text-[15px] font-semibold text-[#14213D] underline decoration-[#14213D]/40 decoration-2 underline-offset-[6px] transition-colors hover:text-[#1F5FE0] hover:decoration-[#1F5FE0]"
            >
              {hero.secondary}
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-[28px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt={hero.imageAlt}
            className="aspect-[4/3] h-full w-full object-cover lg:aspect-[5/4]"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
