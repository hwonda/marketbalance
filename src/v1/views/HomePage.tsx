"use client";

import HeroSection from "@/v1/components/home/HeroSection";
import StrengthsSection from "@/v1/components/home/StrengthsSection";
import ServicesSection from "@/v1/components/home/ServicesSection";
import PortfolioSection from "@/v1/components/home/PortfolioSection";
import ContactBanner from "@/v1/components/home/ContactBanner";

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
