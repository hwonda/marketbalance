"use client";

import Link from "@/i18n/Link";
import { useHashScroll } from "@/hooks/useHashScroll";
import { motion } from "motion/react";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { useDictionary } from "@/i18n/I18nProvider";
import CtaSection from "@/components/CtaSection";
import { fadeUp, fadeRight, fadeLeft } from "@/lib/variants";

/** Decorative icons, in the same order as `about.strengths.items`. */
const STRENGTH_ICONS = [
  <svg
    key="strength-0"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 transition-transform duration-700 group-hover:scale-110"
  >
    <path
      d="M40 20v20h15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="40"
      cy="40"
      r="30"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="4 4"
      opacity="0.3"
    />
    <path
      d="M22 40c0-9.94 8.06-18 18-18"
      stroke="#E84B3A"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1" opacity="0.1" />
    <path d="M40 12v4M68 40h-4M40 68v-4M12 40h4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
  </svg>,
  <svg
    key="strength-1"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 transition-transform duration-700 group-hover:scale-110"
  >
    <circle cx="40" cy="30" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 60c0-11 9-20 20-20s20 9 20 20" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M52 35l5 5 10-10"
      stroke="#E84B3A"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1" opacity="0.1" />
    <path d="M15 60h50" stroke="currentColor" strokeWidth="1" opacity="0.2" />
  </svg>,
  <svg
    key="strength-2"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 transition-transform duration-700 group-hover:scale-110"
  >
    <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <ellipse cx="40" cy="40" rx="10" ry="28" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <ellipse cx="40" cy="40" rx="28" ry="10" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <circle cx="58" cy="32" r="4" fill="#E84B3A" opacity="0.9" />
    <circle cx="22" cy="48" r="4" fill="#2563EB" opacity="0.9" />
    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1" opacity="0.1" />
  </svg>,
  <svg
    key="strength-3"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 transition-transform duration-700 group-hover:scale-110"
  >
    <rect x="22" y="28" width="36" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M22 38h36" stroke="currentColor" strokeWidth="1.5" />
    <path d="M30 22v10M50 22v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="40" cy="48" r="6" stroke="#E84B3A" strokeWidth="2" />
    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1" opacity="0.1" />
  </svg>,
  <svg
    key="strength-4"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 transition-transform duration-700 group-hover:scale-110"
  >
    <path d="M25 55c0-8 6-15 15-15s15 7 15 15" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="40" cy="30" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M55 40l8-8M25 40l-8-8" stroke="#E84B3A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1" opacity="0.1" />
    <path d="M15 60h50" stroke="currentColor" strokeWidth="1" opacity="0.2" />
  </svg>,
];

/** Decorative icons, in the same order as `about.values.items`. */
const VALUE_ICONS = [
  <svg key="value-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
    <circle
      cx="40"
      cy="40"
      r="30"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      opacity="0.3"
    />
    <path
      d="M40 25v15l10 5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M22 40c0-9.94 8.06-18 18-18" stroke="#E84B3A" strokeWidth="3" strokeLinecap="round" />
  </svg>,
  <svg key="value-1" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
    <rect x="25" y="25" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
    <path d="M25 40h30M40 25v30" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <circle cx="55" cy="25" r="5" fill="#E84B3A" />
  </svg>,
  <svg key="value-2" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
    <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 40h40M40 12v56" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <path d="M40 12c12 0 12 56 0 56s-12-56 0-56z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="55" cy="30" r="3" fill="#E84B3A" />
  </svg>,
  <svg key="value-3" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
    <path
      d="M30 40l6 6 14-14"
      stroke="#E84B3A"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="20" y="20" width="40" height="40" rx="8" stroke="currentColor" strokeWidth="2" />
    <path d="M20 35h40" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>,
];

export default function AboutPage() {
  useHashScroll({ offset: -100 });
  const { about, common } = useDictionary();
  return (
    <div className="bg-[#f8fafc]">
      <section
        id="intro"
        className="relative flex items-center overflow-hidden"
        style={{
          height: "560px",
          paddingTop: "100px",
        }}
        aria-label={about.hero.label}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80")',
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 z-0 overflow-hidden mix-blend-multiply opacity-70">
          <motion.div
            className="absolute top-[0%] -left-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply"
            style={{
              backgroundColor: "rgba(242, 114, 69, 0.2)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-[0%] right-[0%] w-[40vw] h-[60vw] rounded-l-[100vw] mix-blend-multiply"
            style={{
              backgroundColor: "rgba(56, 139, 219, 0.2)",
            }}
            animate={{
              x: [0, -20, 20, 0],
              scale: [1, 1.02, 0.98, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#111827 1px, transparent 1px), linear-gradient(90deg, #111827 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f8fafc] to-transparent z-10" />
        <div
          className="relative z-10 mx-auto w-full px-8 md:px-12"
          style={{
            maxWidth: "1440px",
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="max-w-[800px] bg-white/40 backdrop-blur-md p-10 md:p-14 rounded-[32px] border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.03)]"
          >
            <div className="flex items-center gap-[15px] mb-6">
              <div
                style={{
                  width: "40px",
                  height: "2px",
                  backgroundColor: "#E84B3A",
                }}
              />
              <span
                className="font-display font-bold uppercase tracking-[0.3em]"
                style={{
                  fontSize: "0.8rem",
                  color: "#111827",
                }}
              >
                {about.hero.eyebrow}
              </span>
            </div>
            <h1
              className="font-display font-extrabold text-[#111827] leading-[1.05] mb-8"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {about.hero.titleLine1}
              <br />
              <span
                style={{
                  color: "#2563EB",
                }}
              >
                {about.hero.titleHighlight}
              </span>
            </h1>
            <p
              className="font-sans font-medium leading-[1.8]"
              style={{
                fontSize: "1.15rem",
                color: "#4b5563",
                maxWidth: "560px",
                letterSpacing: "-0.01em",
              }}
            >
              {about.hero.description[0]}
              <br />
              {about.hero.description[1]}
            </p>
          </motion.div>
        </div>
        <nav
          className="absolute hidden md:flex items-center gap-3 font-display font-bold uppercase tracking-[0.15em] z-20 bottom-[2.5rem] right-[3rem]"
          style={{
            fontSize: "0.75rem",
            color: "#6b7280",
          }}
          aria-label={about.breadcrumbLabel}
        >
          <Link href="/" className="text-inherit no-underline hover:text-[#111827] transition-colors">
            {common.home}
          </Link>
          <span
            style={{
              color: "#d1d5db",
            }}
          >
            /
          </span>
          <span className="text-[#111827]">{about.breadcrumbCurrent}</span>
        </nav>
      </section>
      <section
        id="vision"
        className="bg-[#f8fafc] relative overflow-hidden"
        style={{
          padding: "8rem 2rem",
        }}
        aria-label={about.vision.label}
      >
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-white to-orange-50/50 rounded-bl-[100px] -z-10" />
        <div
          className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10"
          style={{
            maxWidth: "1280px",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeRight}
          >
            <div
              className="flex items-center gap-3 mb-6 font-display font-bold uppercase"
              style={{
                fontSize: "0.8rem",
                color: "#2563EB",
                letterSpacing: "0.2em",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "currentColor",
                }}
              />
              {about.vision.eyebrow}
            </div>
            <h2
              className="font-display font-bold leading-[1.15] mb-8"
              style={{
                fontSize: "clamp(2.5rem, 4vw, 3.8rem)",
                color: "#111827",
                letterSpacing: "-0.03em",
              }}
            >
              {about.vision.titleLine1}
              <br />
              <span className="relative inline-block text-[#E84B3A]">{about.vision.titleHighlight}</span>
            </h2>
            <p
              className="font-sans font-light leading-[1.9] text-[#6b7280]"
              style={{
                fontSize: "1.25rem",
                maxWidth: "480px",
              }}
            >
              {about.vision.description}
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeLeft}
            className="relative mt-12 lg:mt-24"
          >
            <div className="absolute -inset-6 bg-white/60 backdrop-blur-xl rounded-[32px] border border-white shadow-[0_20px_40px_rgba(0,0,0,0.03)] -z-10" />
            <div className="p-4">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-6 opacity-20"
              >
                <path
                  d="M11.6667 21.6667C11.6667 16.1438 16.1438 11.6667 21.6667 11.6667V1.66667C10.621 1.66667 1.66667 10.621 1.66667 21.6667H11.6667ZM21.6667 11.6667H31.6667V1.66667H21.6667V11.6667Z"
                  fill="#111827"
                />
                <path
                  d="M11.6667 38.3333V28.3333H1.66667V38.3333H11.6667ZM31.6667 28.3333V38.3333H21.6667V28.3333H31.6667Z"
                  fill="#111827"
                />
              </svg>
              <p
                className="font-display font-medium leading-[1.7] mb-8"
                style={{
                  fontSize: "1.25rem",
                  color: "#111827",
                }}
              >
                {about.vision.quote}
              </p>
              <ul className="list-none p-0 m-0 space-y-3">
                {about.vision.points.map((i, r) => (
                  <li
                    key={r}
                    className="flex items-center gap-3 font-sans font-medium text-[#4b5563]"
                    style={{
                      fontSize: "0.95rem",
                    }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E84B3A]/10 text-[#E84B3A] flex items-center justify-center">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
      <section
        id="strengths"
        className="bg-[#f8f9fc]"
        style={{
          padding: "7rem 2rem",
        }}
        aria-label={about.strengths.label}
      >
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: "1280px",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-2 mb-5 font-display font-semibold uppercase"
              style={{
                fontSize: "0.72rem",
                color: "#E84B3A",
                letterSpacing: "0.16em",
              }}
            >
              {about.strengths.eyebrow}
            </div>
            <h2
              className="font-display font-bold leading-[1.125]"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                color: "#13274F",
                letterSpacing: "-0.02em",
              }}
            >
              {about.strengths.title}
              <br />
              <span
                className="font-light italic"
                style={{
                  color: "rgba(19,39,79,0.4)",
                }}
              >
                {about.strengths.subtitle}
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {about.strengths.items.map((i, r) => (
              <motion.div
                key={r}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                }}
                variants={fadeUp}
                transition={{
                  delay: 0.1 * r,
                }}
                className="group relative bg-white rounded-[24px] p-8 pb-28 lg:pb-8 overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-2 lg:min-h-[400px]"
              >
                <div className="absolute inset-0 z-0">
                  <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                      backgroundImage:
                        'url("https://www.transparenttextures.com/patterns/natural-paper.png")',
                    }}
                  />
                  <div
                    className="absolute right-8 bottom-8 origin-bottom-right opacity-[0.12] group-hover:opacity-[0.3] group-hover:scale-[2.2] group-hover:animate-none animate-pulse transition-all duration-1000 pointer-events-none transform scale-[1.6] text-[#E84B3A] z-10"
                    style={{
                      filter: "drop-shadow(0 0 10px rgba(232, 75, 58, 0.4))",
                    }}
                  >
                    {STRENGTH_ICONS[r]}
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden z-20">
                    <div
                      className="absolute inset-[-150%] bg-gradient-to-tr from-transparent via-white/60 to-transparent rotate-45 animate-[shimmer_2.5s_infinite]"
                      style={{
                        filter: "blur(20px)",
                      }}
                    />
                    <div
                      className="absolute inset-[-150%] bg-gradient-to-br from-transparent via-[#E84B3A]/10 to-transparent -rotate-45 animate-[shimmer_4s_infinite]"
                      style={{
                        animationDirection: "reverse",
                        filter: "blur(40px)",
                      }}
                    />
                  </div>
                  <div className="absolute inset-4 border border-[#E84B3A]/20 rounded-2xl z-30 pointer-events-none group-hover:border-[#E84B3A]/40 transition-colors duration-500">
                    <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-[#E84B3A] rounded-full animate-pulse" />
                  </div>
                  <div className="absolute inset-0 bg-white/40 group-hover:bg-white/5 transition-colors duration-700 ease-in-out z-20" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-50">
                    <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-[#E84B3A] rounded-full animate-pulse shadow-[0_0_10px_#E84B3A]" />
                    <div className="absolute top-[60%] left-[80%] w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-pulse shadow-[0_0_10px_#2563EB]" />
                    <div className="absolute top-[40%] left-[10%] w-1.5 h-1.5 bg-[#E84B3A] rounded-full animate-pulse shadow-[0_0_10px_#E84B3A]" />
                    <div className="absolute top-[80%] left-[40%] w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-pulse shadow-[0_0_10px_#2563EB]" />
                  </div>
                </div>
                <div className="relative z-50">
                  <div
                    className="font-display font-bold leading-none mb-6 text-[#E84B3A] group-hover:text-[#111827] transition-all duration-500 group-hover:scale-125 origin-left inline-flex items-baseline"
                    style={{
                      fontSize: "3.5rem",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {i.num}
                    <span
                      className="font-normal opacity-40 ml-1 text-gray-500 transition-all group-hover:text-[#111827] group-hover:opacity-20 group-hover:scale-110 transform"
                      style={{
                        fontSize: "1.4rem",
                      }}
                    >
                      {i.unit}
                    </span>
                  </div>
                  <h3
                    className="font-sans font-bold mb-4 text-[#111827]"
                    style={{
                      fontSize: "1.25rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {i.label}
                  </h3>
                  <p
                    className="font-sans font-medium leading-[1.8] text-gray-500 group-hover:text-[#111827] transition-colors duration-500 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
                    style={{
                      fontSize: "0.95rem",
                    }}
                  >
                    {i.desc}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#111827] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="values"
        className="bg-white"
        style={{
          padding: "8rem 2rem",
        }}
        aria-label={about.values.label}
      >
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: "1280px",
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              variants={fadeUp}
            >
              <div
                className="flex items-center gap-2 mb-5 font-display font-semibold uppercase"
                style={{
                  fontSize: "0.72rem",
                  color: "#E84B3A",
                  letterSpacing: "0.16em",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "1.5px",
                    backgroundColor: "currentColor",
                  }}
                />
                {about.values.eyebrow}
              </div>
              <h2
                className="font-display font-bold leading-[1.15]"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  color: "#13274F",
                  letterSpacing: "-0.02em",
                }}
              >
                {about.values.title}
                <br />
                <span
                  className="font-light italic"
                  style={{
                    color: "rgba(19,39,79,0.4)",
                  }}
                >
                  {about.values.subtitle}
                </span>
              </h2>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.items.map((i, r) => (
              <motion.div
                key={r}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                }}
                variants={fadeUp}
                transition={{
                  delay: 0.1 * r,
                }}
                className="relative bg-[#f8f9fc] border border-[#e5e7eb] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] group"
                style={{
                  borderRadius: "24px",
                  padding: "3.5rem 2.5rem",
                }}
              >
                <div className="absolute inset-4 border border-[#E84B3A]/20 rounded-2xl z-20 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
                <div
                  className="absolute top-0 left-0 right-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{
                    height: "4px",
                    background: "#E84B3A",
                  }}
                />
                <div
                  className="absolute font-display font-bold leading-none pointer-events-none select-none transition-colors group-hover:opacity-10 z-0"
                  style={{
                    top: "-0.5rem",
                    right: "1.5rem",
                    fontSize: "7rem",
                    color: "rgba(19,39,79,0.04)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {String(r + 1).padStart(2, "0")}
                </div>
                <div
                  className="flex items-center justify-center transition-all bg-[#111827] text-white border border-white/10 shadow-2xl group-hover:bg-[#E84B3A] group-hover:shadow-[#E84B3A]/40 group-hover:-translate-y-2 z-10 relative transform-gpu"
                  style={{
                    width: "80px",
                    height: "80px",
                    padding: "16px",
                    marginBottom: "2.5rem",
                    borderRadius: "24px",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[24px]" />
                  <div className="absolute inset-[2px] border border-white/10 rounded-[22px] pointer-events-none" />
                  <div className="relative z-10 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
                    {VALUE_ICONS[r]}
                  </div>
                </div>
                <div className="relative z-10">
                  <h3
                    className="font-display font-bold text-[#111827]"
                    style={{
                      fontSize: "1.4rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {i.title}
                  </h3>
                  <div
                    className="font-sans font-bold text-[#E84B3A] mb-6"
                    style={{
                      fontSize: "0.85rem",
                    }}
                  >
                    {i.subtitle}
                  </div>
                  <p
                    className="font-sans font-medium leading-[1.85] text-gray-500 group-hover:text-[#111827] transition-colors"
                    style={{
                      fontSize: "0.95rem",
                    }}
                  >
                    {i.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="history"
        className="relative overflow-hidden bg-[#F8FAFC]"
        style={{
          padding: "12rem 2rem",
        }}
        aria-label={about.history.label}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[#E84B3A]/40 to-transparent rotate-[15deg] z-0" />
          <div className="absolute bottom-[20%] right-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent -rotate-[15deg] z-0" />
          <div className="absolute top-[50%] left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent -rotate-[5deg] z-0" />
          <motion.div
            animate={{
              rotate: [15, 30, 15],
              scale: [1, 1.25, 1],
              opacity: [0.04, 0.08, 0.04],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-[5%] right-[0%] z-0"
          >
            <svg
              width="500"
              height="500"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 5V95M5 50H95M25 25L5 50L25 75M75 25L95 50L75 75"
                stroke="#E84B3A"
                strokeWidth="1"
              />
              <circle cx="50" cy="50" r="42" stroke="#E84B3A" strokeWidth="0.3" opacity="0.6" />
            </svg>
          </motion.div>
          <motion.div
            animate={{
              rotate: [-15, -25, -15],
              scale: [1, 1.15, 1],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-[0%] left-[-5%] z-0"
          >
            <svg
              width="700"
              height="700"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 5V95M5 50H95M25 25L5 50L25 75M75 25L95 50L75 75"
                stroke="#2563EB"
                strokeWidth="1"
              />
              <circle cx="50" cy="50" r="47" stroke="#2563EB" strokeWidth="0.3" opacity="0.4" />
            </svg>
          </motion.div>
          <div className="absolute top-[-5%] right-[-5%] w-[60vw] h-[60vw] bg-[#E84B3A]/15 rounded-full blur-[180px]" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[60vw] h-[60vw] bg-[#2563EB]/15 rounded-full blur-[180px]" />
          <motion.div
            animate={{
              y: [0, -60, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[8%] right-[12%] w-48 h-48 border border-[#E84B3A]/40 rounded-full"
          />
          <motion.div
            animate={{
              y: [0, 60, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-[8%] left-[12%] w-72 h-72 border border-[#2563EB]/40 rounded-full"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0 opacity-[0.02]">
            <div
              className="font-display font-black text-[#111827]"
              style={{
                fontSize: "30vw",
                lineHeight: 0.8,
              }}
            >
              MB
            </div>
          </div>
          <div className="absolute top-[30%] right-[10%] opacity-[0.03] z-0">
            <svg
              width="200"
              height="200"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 10 L90 90 M90 10 L10 90" stroke="currentColor" strokeWidth="0.2" />
              <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="0.1" />
            </svg>
          </div>
        </div>
        <div
          className="relative z-10 mx-auto w-full"
          style={{
            maxWidth: "1200px",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              variants={fadeUp}
            >
              <div
                className="inline-flex items-center gap-3 mb-6 font-display font-bold uppercase tracking-[0.3em]"
                style={{
                  fontSize: "0.85rem",
                  color: "#E84B3A",
                }}
              >
                <div className="w-10 h-[2px] bg-[#E84B3A]" />
                {about.history.eyebrow}
              </div>
              <h2
                className="font-display font-black leading-[1] text-[#111827]"
                style={{
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  letterSpacing: "-0.05em",
                }}
              >
                {about.history.title}
                <span className="text-[#E84B3A]">.</span>
              </h2>
            </motion.div>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              variants={fadeLeft}
              className="font-sans font-medium text-gray-600 max-w-[420px] leading-[1.8]"
              style={{
                fontSize: "1.1rem",
              }}
            >
              {about.history.description[0]}
              <br />
              {about.history.description[1]}
            </motion.p>
          </div>
          <div className="relative">
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100 transform md:-translate-x-1/2" />
            <div className="space-y-40">
              {about.history.years.map((i, r) => (
                <div key={r} className="relative group">
                  <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 z-20">
                    <div className="relative">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl rotate-45 border-2 flex items-center justify-center transition-all duration-700 bg-white",
                          r === 0
                            ? "border-[#E84B3A] shadow-[0_20px_50px_rgba(232,75,58,0.15)]"
                            : "border-gray-200 group-hover:border-[#E84B3A]/30",
                        )}
                      >
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full -rotate-45 transition-all duration-500",
                            r === 0
                              ? "bg-[#E84B3A] shadow-[0_0_15px_#E84B3A]"
                              : "bg-gray-200 group-hover:bg-[#E84B3A]",
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flex flex-col md:flex-row items-center",
                      r % 2 === 0 ? "md:flex-row-reverse" : "",
                    )}
                  >
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{
                        once: true,
                        margin: "-100px",
                      }}
                      variants={r % 2 === 0 ? fadeLeft : fadeRight}
                      className="w-full md:w-1/2 pl-16 md:pl-0 md:px-16"
                    >
                      <div className="relative bg-white rounded-[40px] p-10 md:p-14 shadow-[0_30px_70px_rgba(0,0,0,0.03)] border border-gray-100 group-hover:shadow-[0_40px_90px_rgba(232,75,58,0.06)] transition-all duration-700 overflow-hidden">
                        <div
                          className={cn(
                            "absolute top-0 left-6 right-6 h-[3px] rounded-b-full transition-all duration-700",
                            r === 0 ? "bg-[#E84B3A]" : "bg-gray-100 group-hover:bg-[#E84B3A]/30",
                          )}
                        />
                        <div className="relative z-10">
                          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                            <span
                              className={cn(
                                "font-display font-black leading-none transition-colors duration-700 text-5xl md:text-8xl",
                                r === 0
                                  ? "text-[#111827]"
                                  : "text-[#111827] opacity-60 group-hover:opacity-100",
                              )}
                              style={{
                                letterSpacing: "-0.05em",
                              }}
                            >
                              {i.year}
                            </span>
                            <span className="font-display font-black text-[#E84B3A] uppercase tracking-[0.2em] mb-2 drop-shadow-sm text-sm md:text-lg">
                              {i.label}
                            </span>
                          </div>
                          <ul className="space-y-6">
                            {i.items.map((o, u) => (
                              <motion.li
                                key={u}
                                variants={{
                                  hidden: { opacity: 0, y: 10 },
                                  visible: { opacity: 1, y: 0, transition: { delay: 0.1 * u + 0.3 } },
                                }}
                                className="flex items-start gap-4 group/item"
                              >
                                <div className="mt-2 w-1.5 h-1.5 rounded-full border border-[#E84B3A] shrink-0 transition-all duration-300 group-hover/item:bg-[#E84B3A] group-hover/item:scale-125" />
                                <span
                                  className="font-sans font-semibold text-gray-700 leading-[1.4] md:leading-[1.6] group-hover/item:text-[#111827] transition-colors duration-300 text-sm md:text-base break-keep"
                                >
                                  {o}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        id="network"
        className="bg-[#f8f9fc]"
        style={{
          padding: "8rem 2rem",
        }}
        aria-label={about.network.label}
      >
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: "1280px",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-2 mb-5 font-display font-semibold uppercase"
              style={{
                fontSize: "0.72rem",
                color: "#E84B3A",
                letterSpacing: "0.16em",
              }}
            >
              {about.network.eyebrow}
            </div>
            <h2
              className="font-display font-bold leading-[1.125] mb-4"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                color: "#13274F",
                letterSpacing: "-0.02em",
              }}
            >
              {about.network.title}
              <br />
              <span
                className="font-light italic"
                style={{
                  color: "rgba(19,39,79,0.4)",
                }}
              >
                {about.network.subtitle}
              </span>
            </h2>
            <p
              className="font-sans font-light leading-[1.8] text-[#6b7280] mx-auto"
              style={{
                fontSize: "0.95rem",
                maxWidth: "600px",
              }}
            >
              {about.network.description}
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="grid grid-cols-1 lg:grid-cols-[2.6fr_1fr] gap-10 mb-20"
          >
            <div className="relative overflow-hidden rounded-[32px] md:rounded-[48px] group bg-white lg:min-h-[460px] shadow-[0_50px_100px_rgba(12,26,53,0.12)]">
              <img
                src="/image/main/m-2.jpg"
                alt={about.network.mapAlt}
                className="w-full aspect-[2660/1600] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="relative p-8 md:p-10 lg:p-0 lg:absolute lg:bottom-12 lg:left-12 lg:right-12 text-navy">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/20 border border-brand-orange/30 backdrop-blur-md mb-6">
                  <Globe size={16} className="text-brand-orange animate-spin-slow" />
                  <span className="font-display font-bold text-[11px] uppercase tracking-[0.2em] text-brand-orange">
                    {about.network.badge}
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl md:text-3xl lg:text-4xl tracking-tighter leading-[1.1] mb-4">
                  {about.network.cardTitle[0]}
                  <br />
                  {about.network.cardTitle[1]}
                </h3>
                <p className="font-sans font-medium text-navy/70 text-base lg:text-lg leading-relaxed max-w-sm">
                  {about.network.cardDescription}
                </p>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-[32px] md:rounded-[48px] overflow-hidden border border-gray-100 shadow-[0_40px_100px_rgba(12,26,53,0.08)] h-full flex flex-col relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white/10 pointer-events-none" />
                <div className="relative z-10 bg-white/60 backdrop-blur-3xl border-b border-gray-100/50 p-4 lg:p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-4 bg-brand-orange rounded-full shadow-[0_0_20px_rgba(232,75,58,0.5)]" />
                    <span className="font-display font-black text-navy text-[11px] lg:text-xs uppercase tracking-[0.4em] opacity-80">
                      {about.network.listTitle}
                    </span>
                  </div>
                </div>
                <div className="relative z-10 flex-1 flex flex-col divide-y divide-gray-100/30">
                  {about.network.regions.map((i, r) => (
                    <motion.div
                      key={r}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { delay: 0.05 * r, duration: 0.6 } },
                      }}
                      className="group/row flex items-center px-6 md:px-8 py-3 hover:bg-white/40 transition-all duration-700 flex-1 relative cursor-default overflow-hidden"
                    >
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover/row:h-1/2 bg-brand-orange transition-all duration-500 ease-out rounded-r-full shadow-[4px_0_20px_rgba(232,75,58,0.4)]" />
                      <div className="flex flex-col w-full group-hover/row:translate-x-2 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                        <span className="font-display font-black text-navy text-sm md:text-base lg:text-lg tracking-tight mb-0.5 group-hover/row:text-brand-orange transition-colors duration-500">
                          {i.name}
                        </span>
                        <p className="font-sans font-bold text-gray-500 text-[11px] lg:text-[12px] leading-snug group-hover/row:text-gray-600 transition-colors duration-700">
                          {i.countries}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/0 via-brand-orange/[0.02] to-transparent -translate-x-full group-hover/row:translate-x-full transition-transform duration-1000 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <CtaSection
        highlight={about.cta.highlight}
        title={
          <>
            {about.cta.titleLead}{" "}
            <span className="text-[#2563EB] font-bold underline underline-offset-8 decoration-2 underline-[#2563EB]/40">
              {about.cta.titleHighlight}
            </span>
            {about.cta.titleTail} <br className="hidden md:block" />
            {about.cta.titleLine2}
          </>
        }
        description={about.cta.description}
      />
    </div>
  );
}
