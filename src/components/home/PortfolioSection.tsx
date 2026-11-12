"use client";

import { motion } from "motion/react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useDictionary } from "@/i18n/I18nProvider";

export default function PortfolioSection() {
  const n = useIsMobile();
  const { network } = useDictionary().home;
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "clamp(4.5rem, 9vw, 6.5rem) 1.5rem",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "1440px",
        }}
      >
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
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
            }}
          >
            <div
              className="flex justify-center items-center gap-3 mb-6"
              style={{
                color: "#2563EB",
              }}
            >
              <div
                className="bg-current"
                style={{
                  width: "32px",
                  height: "2px",
                }}
              />
              <span
                className="font-display font-bold uppercase tracking-[0.3em]"
                style={{
                  fontSize: "0.85rem",
                }}
              >
                {network.eyebrow}
              </span>
              <div
                className="bg-current"
                style={{
                  width: "32px",
                  height: "2px",
                }}
              />
            </div>
            <h2
              className="font-display font-bold leading-[1.2] mb-8 text-[#111827]"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {network.titleLead} <span className="text-[#E84B3A]">{network.titleHighlight}</span>
            </h2>
            <p
              className="mx-auto font-sans font-light leading-[1.8] text-[#64748b]"
              style={{
                fontSize: "1.1rem",
                maxWidth: "800px",
              }}
            >
              {network.descLead} <br className="hidden md:block" />
              {network.descTail}
            </p>
          </motion.div>
        </div>
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            className="w-full"
            {...(n
              ? {
                  whileInView: {
                    scale: [1, 1.02, 1],
                  },
                  transition: {
                    duration: 0.5,
                  },
                  viewport: {
                    once: true,
                  },
                }
              : {})}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
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
              }}
              className="w-full relative group"
            >
              <div className="relative p-0.5 md:p-1">
                <div className="absolute -inset-4 bg-brand-orange/10 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute -inset-8 bg-blue-500/5 rounded-[50px] blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-100" />
                <div className="relative aspect-[4/3] md:aspect-[16/10] bg-white rounded-[24px] md:rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                  <img
                    src="/image/main/m-2.jpg"
                    alt={network.mapAlt}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-4 border border-white/20 rounded-[20px] md:rounded-[28px] pointer-events-none" />
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl group-hover:translate-y-4 group-hover:translate-x-4 transition-transform duration-1000" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:-translate-y-4 group-hover:-translate-x-4 transition-transform duration-1000" />
              </div>
            </motion.div>
          </motion.div>
          <div className="md:hidden mt-8">
            <p className="font-display font-bold uppercase tracking-[0.2em] text-[0.75rem] text-[#64748b] text-center mb-4">
              {network.regionsLabel}
            </p>
            <ul className="flex flex-wrap justify-center gap-2 list-none p-0 m-0">
              {network.regions.map((region) => (
                <li
                  key={region}
                  className="px-4 py-2 rounded-full bg-[#f8fafc] border border-gray-100 font-sans font-semibold text-[0.85rem] text-[#111827]"
                >
                  {region}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
