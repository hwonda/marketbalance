"use client";

import type { ReactNode } from "react";
import { useDictionary } from "@/v3/i18n/I18nProvider";
import Link from "@/v3/i18n/Link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

type CtaSectionProps = {
  highlight?: string;
  title: ReactNode;
  description: ReactNode;
  /** Hide the "view track record" button, e.g. on the track record page itself. */
  hideWorksLink?: boolean;
};

export default function CtaSection({
  highlight = "Ready to Scale",
  title,
  description,
  hideWorksLink = false,
}: CtaSectionProps) {
  const { cta } = useDictionary();
  return (
    <section
      className="relative overflow-hidden bg-[#0A0C10]"
      style={{
        padding: "4rem 2rem",
      }}
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")',
          }}
        />
        <div
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#1F5FE0]/20 rounded-full blur-[120px] animate-pulse"
          style={{
            animationDuration: "8s",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#1F5FE0]/20 rounded-full blur-[120px] animate-pulse"
          style={{
            animationDuration: "12s",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: "1280px",
        }}
      >
        <div className="relative group overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="max-w-3xl text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 md:gap-4 mb-8">
                <span className="w-8 md:w-16 h-[1px] shrink-0 bg-brand-orange" />
                <span
                  className="font-display font-bold tracking-[0.25em] md:tracking-[0.4em] uppercase text-brand-orange whitespace-nowrap"
                  style={{
                    fontSize: "0.85rem",
                  }}
                >
                  {highlight}
                </span>
                <span className="w-8 md:w-16 h-[1px] shrink-0 bg-brand-orange lg:hidden" />
              </div>
              <h2
                className="font-display font-medium text-white leading-[1.3] mb-8 lg:text-left"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.3rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {title}
              </h2>
              <p
                className="font-sans font-light text-white/60 leading-relaxed max-w-xl mx-auto lg:mx-0"
                style={{
                  fontSize: "1rem",
                }}
              >
                {description}
              </p>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
              className="flex flex-col md:flex-row gap-4 relative shrink-0 w-full md:w-auto"
            >
              <div className="absolute -top-12 -right-12 w-20 h-20 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center animate-bounce duration-[3000ms] pointer-events-none hidden xl:flex">
                <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange shadow-[0_0_15px_rgba(31,95,224,0.4)]">
                  <ArrowRight size={20} className="-rotate-45" />
                </div>
              </div>
              <Link
                href="/contact"
                className="group relative flex items-center justify-center gap-2 text-white rounded-2xl font-display font-bold no-underline overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 whitespace-nowrap w-full md:w-auto px-6 py-[1.2rem] md:px-10"
                style={{
                  fontSize: "1rem",
                  backgroundColor: "#1F5FE0",
                  letterSpacing: "0.05em",
                  boxShadow: "0 20px 40px rgba(31,95,224,0.3)",
                }}
              >
                <div className="absolute inset-0 bg-[#174BB5] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">{cta.consult}</span>
                <ArrowRight
                  size={20}
                  className="relative z-10 shrink-0 group-hover:translate-x-1 transition-transform duration-500"
                />
              </Link>
              {!hideWorksLink && (
              <Link
                href="/works"
                className="group relative flex items-center justify-center gap-2 text-white rounded-2xl font-display font-bold no-underline border border-white/20 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-[#1F5FE0] hover:border-[#1F5FE0] active:scale-95 whitespace-nowrap w-full md:w-auto px-6 py-[1.2rem] md:px-10"
                style={{
                  fontSize: "1rem",
                  letterSpacing: "0.05em",
                }}
              >
                <span className="relative z-10 transition-colors">{cta.works}</span>
              </Link>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
