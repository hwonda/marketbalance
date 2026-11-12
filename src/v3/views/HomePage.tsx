"use client";

import HeroSection from "@/v3/components/home/HeroSection";
import QuickMenu from "@/v3/components/home/QuickMenu";
import StatsSection from "@/v3/components/home/StatsSection";
import ServicesSection from "@/v3/components/home/ServicesSection";
import NewsSection from "@/v3/components/home/NewsSection";
import ContactBanner from "@/v3/components/home/ContactBanner";

/** Change request §1: hero → quick menu → figures → five services → reviews & news → contact banner. No global network here. */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickMenu />
      <StatsSection />
      <ServicesSection />
      <NewsSection />
      <ContactBanner />
    </>
  );
}
