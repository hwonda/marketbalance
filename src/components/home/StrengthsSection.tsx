"use client";

import { useState, useEffect } from "react";
import Link from "@/i18n/Link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useDictionary } from "@/i18n/I18nProvider";

/** Icons for `home.strengths.items`, in the same order. */
const STRENGTH_ICONS = [
  <svg
    key="experience"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-20 h-20"
  >
    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <path d="M40 15v50M15 40h50" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <path
      d="M40 10v6M10 40h6M40 64v6M64 40h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M32 40l6 6 12-12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25 55l10-15h10l10-15"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="4 4"
      opacity="0.5"
    />
    <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1.2" />
  </svg>,
  <svg key="network" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
    <path
      d="M40 8c17.673 0 32 14.327 32 32S57.673 72 40 72 8 57.673 8 40s14.327-32 32-32z"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="3 3"
    />
    <path
      d="M40 8c8.837 0 16 14.327 16 32S48.837 72 40 72s-16-14.327-16-32S31.163 8 40 8z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path d="M8 40h64M14 22h52M14 58h52" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <circle cx="40" cy="40" r="4" fill="currentColor" />
    <path d="M40 40l18-18m-18 18l-12 24m12-24l22 4" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <path d="M58 22a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1" />
  </svg>,
  <svg
    key="projects"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-20 h-20"
  >
    <rect x="15" y="15" width="50" height="50" rx="4" stroke="currentColor" strokeWidth="1.2" />
    <path d="M15 28h50M28 15v6M52 15v6" stroke="currentColor" strokeWidth="1.2" />
    <path d="M22 40h20M22 48h28M22 56h12" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    <rect
      x="52"
      y="48"
      width="12"
      height="12"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M54 54l2 2 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M60 40H74v25" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
  </svg>,
  <svg
    key="workforce"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-20 h-20"
  >
    <path
      d="M40 35c8.284 0 15-6.716 15-15S48.284 5 40 5s-15 6.716-15 15 6.716 15 15 15z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path d="M15 65c0-11.046 11.193-20 25-20s25 8.954 25 20" stroke="currentColor" strokeWidth="1.2" />
    <path d="M40 45v10m-15 15h30" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <path d="M60 25l6 6-6 6M20 25l-6 6 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="40" cy="20" r="5" fill="currentColor" fillOpacity="0.1" />
    <path
      d="M34 55l6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
];

export default function StrengthsSection() {
  const { strengths } = useDictionary().home;
  const [n, setN] = useState(false);
  useEffect(() => {
    const r = () => setN(window.innerWidth < 768);
    r();
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);
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
                color: "#E84B3A",
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
                {strengths.eyebrow}
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
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {strengths.titleLead} <span className="text-[#2563EB]">{strengths.titleHighlight}</span>{" "}
              {strengths.titleTail}
            </h2>
            <h3 className="sr-only">{strengths.srTitle}</h3>
            <p
              className="mx-auto font-sans font-light leading-[1.8] text-[#64748b]"
              style={{
                fontSize: "1.1rem",
                maxWidth: "700px",
              }}
            >
              {strengths.descLead} <br className="hidden md:block" />
              {strengths.descTail}
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-collapse">
          {strengths.items.map((r, o) => (
            <motion.div
              key={o}
              initial="initial"
              whileHover={n ? undefined : "hover"}
              whileInView={n ? "hover" : undefined}
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className="group relative flex flex-col items-center px-6 py-10 md:px-8 md:py-14 transition-all duration-700 cursor-default overflow-hidden bg-white hover:bg-gray-50/10"
            >
              <div className="absolute -right-8 -bottom-8 w-32 h-32 md:w-40 md:h-40 opacity-[0.01] group-hover:opacity-[0.08] transition-opacity duration-700 group-hover:scale-110 group-hover:-rotate-12 transform-gpu pointer-events-none">
                {STRENGTH_ICONS[o]}
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#E84B3A]/2 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 border border-gray-50 -z-10" />
              <motion.div
                className="absolute top-0 left-0 h-[3px] bg-[#E84B3A] z-20"
                variants={{
                  initial: {
                    width: "0%",
                  },
                  hover: {
                    width: "100%",
                    transition: {
                      duration: 0.3,
                      delay: 0,
                    },
                  },
                }}
              />
              <motion.div
                className="absolute top-0 right-0 w-[3px] bg-[#E84B3A] z-20"
                variants={{
                  initial: {
                    height: "0%",
                  },
                  hover: {
                    height: "100%",
                    transition: {
                      duration: 0.3,
                      delay: 0.2,
                    },
                  },
                }}
              />
              <motion.div
                className="absolute bottom-0 right-0 h-[3px] bg-[#E84B3A] z-20"
                variants={{
                  initial: {
                    width: "0%",
                  },
                  hover: {
                    width: "100%",
                    transition: {
                      duration: 0.3,
                      delay: 0.4,
                    },
                  },
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-[3px] bg-[#E84B3A] z-20"
                variants={{
                  initial: {
                    height: "0%",
                  },
                  hover: {
                    height: "100%",
                    transition: {
                      duration: 0.3,
                      delay: 0.6,
                    },
                  },
                }}
              />
              <motion.div
                className="relative z-10 mb-6 md:mb-8 p-2 transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-sm [&_svg]:w-14 [&_svg]:h-14 md:[&_svg]:w-20 md:[&_svg]:h-20"
                style={{
                  color: "#E84B3A",
                }}
              >
                {STRENGTH_ICONS[o]}
              </motion.div>
              <div className="relative z-10 text-center mb-4">
                <span
                  className="block font-display text-[#94a3b8] uppercase tracking-[0.25em] mb-3"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 500,
                  }}
                >
                  {r.en}
                </span>
                <div className="h-[1px] w-8 mx-auto bg-gray-200 mb-4 group-hover:w-16 group-hover:bg-[#E84B3A]/30 transition-all duration-700" />
                <h4
                  className="font-sans font-bold text-[#111827] leading-tight group-hover:text-[#E84B3A] transition-colors duration-500"
                  style={{
                    fontSize: "1.25rem",
                  }}
                >
                  {r.title}
                </h4>
              </div>
              <p
                className="relative z-10 font-sans font-light leading-relaxed text-gray-500 text-center group-hover:text-gray-600 transition-colors duration-500"
                style={{
                  fontSize: "0.925rem",
                  whiteSpace: "pre-line",
                }}
              >
                {r.sub}
              </p>
              <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E84B3A]" />
              </div>
            </motion.div>
          ))}
        </div>
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
            delay: 0.6,
            duration: 0.8,
          }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/about"
            className="group flex items-center gap-6 no-underline px-10 py-5 bg-[#111827] rounded-full text-white transition-all duration-500 hover:bg-[#2563EB] hover:scale-105 shadow-2xl shadow-blue-900/10"
          >
            <span
              className="font-display font-bold uppercase"
              style={{
                fontSize: "0.9rem",
                letterSpacing: "0.15em",
              }}
            >
              {strengths.cta}
            </span>
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
