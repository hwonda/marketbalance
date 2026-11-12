"use client";

import HeroSection from "@/components/home/HeroSection";
import StrengthsSection from "@/components/home/StrengthsSection";
import ServicesSection from "@/components/home/ServicesSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import ContactBanner from "@/components/home/ContactBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StrengthsSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactBanner />
    </>
  );
}
