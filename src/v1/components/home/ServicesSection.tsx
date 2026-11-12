"use client";

import Link from "@/v1/i18n/Link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useDictionary } from "@/v1/i18n/I18nProvider";

/** Visuals and section anchors for `home.services.items`, in the same order. */
const SERVICES = [
  {
    num: "01",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 transition-transform duration-700 group-hover:scale-110"
      >
        <rect x="15" y="45" width="50" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M20 45V25c0-2.21 1.79-4 4-4h32c2.21 0 4 1.79 4 4v20" stroke="currentColor" strokeWidth="2" />
        <path d="M30 45V32h20v13" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="40" cy="21" r="8" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
        <path d="M40 13v16M32 21h16" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      </svg>
    ),
    anchor: "exhibition",
    image: "/image/main/m-4.jpg",
  },
  {
    num: "02",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 transition-transform duration-700 group-hover:scale-110"
      >
        <circle cx="40" cy="40" r="25" stroke="currentColor" strokeWidth="2" />
        <path d="M15 40h50M40 15v50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path
          d="M40 15c8 0 14 11 14 25s-6 25-14 25-14-11-14-25 6-25 14-25z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      </svg>
    ),
    anchor: "buyer",
    image: "/image/main/m-8.jpg",
  },
  {
    num: "03",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 transition-transform duration-700 group-hover:scale-110"
      >
        <path
          d="M15 65l15-15 10 10 25-25"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50 35h15v15"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="55"
          y="15"
          width="10"
          height="10"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
          fillOpacity="0.6"
        />
        <path d="M15 65h50" stroke="currentColor" strokeWidth="1.2" opacity="1" />
        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <path d="M22 25h12M22 33h8" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    anchor: "marketing",
    image: "/image/main/m-6.jpg",
  },
  {
    num: "04",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 transition-transform duration-700 group-hover:scale-110"
      >
        <path d="M20 25h40v35H20V25z" stroke="currentColor" strokeWidth="2" />
        <path d="M30 25v-5c0-4 3-8 10-8s10 4 10 8v5" stroke="currentColor" strokeWidth="2" />
        <path d="M25 35h30" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      </svg>
    ),
    anchor: "mice",
    image: "/image/main/m-5.jpg",
  },
  {
    num: "05",
    icon: (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 transition-transform duration-700 group-hover:scale-110"
      >
        <path
          d="M20 40l10 10 30-30"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M15 65h50" stroke="currentColor" strokeWidth="1.2" opacity="1" />
        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      </svg>
    ),
    anchor: "trade",
    image: "/image/main/m-7.jpg",
  },
];

export default function ServicesSection() {
  const { services } = useDictionary().home;
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "clamp(4.5rem, 9vw, 6.5rem) 1.5rem",
        backgroundColor: "#f8fafc",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "1600px",
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
                {services.eyebrow}
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
              {services.titleLead}
              <br />
              <span className="text-[#E84B3A]">{services.titleHighlight}</span>
            </h2>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
          {SERVICES.map((n, i) => {
            const text = services.items[i];
            return (
              <motion.div
                key={i}
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
                  amount: 0.1,
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.8,
                }}
                className="h-full"
              >
                <Link
                  href={`/services#${n.anchor}`}
                  className="group relative block h-full bg-white rounded-[3rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] no-underline border border-gray-100"
                >
                  <div className="flex flex-col h-full p-4">
                    <div className="relative w-full h-[200px] shrink-0 rounded-[2.5rem] overflow-hidden bg-gray-50 mb-6">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 md:group-hover:scale-110"
                        style={{
                          backgroundImage: `url("${n.image}")`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent opacity-40 md:group-hover:opacity-20 transition-opacity" />
                      <div className="absolute inset-x-6 top-6 flex justify-between items-start z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center text-brand-orange border border-white/40 shadow-sm transition-transform duration-700 md:group-hover:scale-90">
                          {n.icon}
                        </div>
                        <span className="font-display font-black text-white/40 text-4xl select-none transition-transform duration-700 md:group-hover:scale-75">
                          {n.num}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col px-4 pb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                        <span
                          className="font-display font-bold text-[#2563EB] uppercase tracking-[0.15em]"
                          style={{
                            fontSize: "0.6875rem",
                          }}
                        >
                          {text.en}
                        </span>
                      </div>
                      <h3
                        className="font-display font-bold text-[#111827] text-[1.25rem] leading-tight mb-4 md:group-hover:text-brand-orange transition-colors duration-500"
                        style={{
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {text.title}
                      </h3>
                      <div>
                        <p
                          className="font-sans font-medium text-gray-500 leading-relaxed"
                          style={{
                            fontSize: "0.9rem",
                            wordBreak: "keep-all",
                          }}
                        >
                          {text.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
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
            href="/services"
            className="group flex items-center gap-4 no-underline text-[#111827] hover:text-[#2563EB] transition-colors"
          >
            <span
              className="font-display font-bold uppercase tracking-[0.2em]"
              style={{
                fontSize: "0.85rem",
              }}
            >
              {services.cta}
            </span>
            <div className="w-12 h-12 rounded-full bg-[#2563EB] border-[#2563EB] text-white md:bg-transparent md:border-gray-200 md:text-[#111827] flex items-center justify-center transition-all duration-500 md:group-hover:bg-[#2563EB] md:group-hover:border-[#2563EB] md:group-hover:text-white md:group-hover:scale-110">
              <ArrowRight size={20} />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
