"use client";

import { useState, useEffect } from "react";
import Link from "@/v1/i18n/Link";
import { useHashScroll } from "@/v1/hooks/useHashScroll";
import { useDictionary } from "@/v1/i18n/I18nProvider";
import { motion, type Variants } from "motion/react";
import { User, Mail, Download, Phone, Calendar, MapPin, Building, Clock } from "lucide-react";
import CtaSection from "@/v1/components/CtaSection";

/**
 * Company brochure. Drop the PDF into `public/` (e.g. `public/brochure.pdf`) and set this to its path
 * (`"/brochure.pdf"`). While it is null the download card shows a disabled "coming soon" state.
 */
const BROCHURE_URL: string | null = null;

const INFO_CARDS = [
  { key: "company", icon: Building },
  { key: "ceo", icon: User },
  { key: "registration", icon: Calendar },
  { key: "phone", icon: Phone, href: "tel:031-425-9281" },
  { key: "email", icon: Mail, href: "mailto:marketbalancekorea@gmail.com" },
  { key: "address", icon: MapPin },
] as const;

export default function ContactDetailPage() {
  const { contactDetail: t, common } = useDictionary();
  const [r, setR] = useState(false);
  useEffect(() => {
    const f = () => setR(window.innerWidth < 768);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  useHashScroll({ offset: -100, resetWhenEmpty: true });
  const u: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  return (
    <main className="font-sans bg-white overflow-hidden">
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          height: "560px",
          paddingTop: "100px",
        }}
        aria-label={t.hero.ariaLabel}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80")',
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 z-0 overflow-hidden mix-blend-multiply opacity-70">
          <motion.div
            className="absolute top-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply"
            style={{
              backgroundColor: "rgba(56, 139, 219, 0.2)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply"
            style={{
              backgroundColor: "rgba(224, 75, 87, 0.15)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 15,
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
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />
        <div
          className="relative z-10 mx-auto w-full px-4 sm:px-8 md:px-12"
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
            className="max-w-[800px] bg-white/40 backdrop-blur-md p-8 sm:p-10 md:p-14 rounded-[32px] border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.03)]"
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
                {t.hero.eyebrow}
              </span>
            </div>
            <h1
              className="font-display font-extrabold text-[#111827] leading-[1.05] mb-8"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {t.hero.titleLine1}
              <br />
              <span
                style={{
                  color: "#E84B3A",
                }}
              >
                {t.hero.titleLine2}
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
              {t.hero.introLine1} <br className="hidden sm:block" />
              {t.hero.introLine2}
            </p>
          </motion.div>
        </div>
        <nav
          className="absolute hidden md:flex items-center gap-3 font-display font-bold uppercase tracking-[0.15em] z-20 md:bottom-[2.5rem] md:right-[3rem]"
          style={{
            fontSize: "0.75rem",
            color: "#6b7280",
          }}
          aria-label={t.breadcrumb.ariaLabel}
        >
          <Link
            href="/"
            className="inline-block py-3 -my-3 text-inherit no-underline hover:text-[#111827] transition-colors"
          >
            {common.home}
          </Link>
          <span
            aria-hidden="true"
            style={{
              color: "#d1d5db",
            }}
          >
            /
          </span>
          <span className="text-[#111827]" aria-current="page">
            {t.breadcrumb.current}
          </span>
        </nav>
      </section>
      <section className="relative py-20 md:py-32 bg-white">
        <div
          className="mx-auto px-4 sm:px-8 w-full"
          style={{
            maxWidth: "1280px",
          }}
        >
          <div id="location" className="space-y-24 md:space-y-40">
            <section>
              <div className="text-left mb-10 md:mb-16">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  variants={u}
                >
                  <div className="inline-flex items-center gap-3 mb-6">
                    <span className="font-display font-black text-[#E84B3A] text-4xl">01</span>
                    <div className="w-12 h-[2px] bg-gray-300" />
                    <span className="font-display font-bold text-gray-500 uppercase tracking-widest text-sm sm:text-lg">
                      {t.companyInfo.eyebrow}
                    </span>
                  </div>
                  <h2 className="font-display font-black text-[#111827] text-3xl md:text-4xl mb-0 md:mb-8 tracking-tighter">
                    {t.companyInfo.title}
                  </h2>
                </motion.div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-collapse max-w-[1200px] mx-auto border border-gray-100">
                {INFO_CARDS.map((f, h) => (
                  <motion.div
                    key={h}
                    initial="initial"
                    whileHover={r ? undefined : "hover"}
                    whileInView={r ? "hover" : undefined}
                    viewport={{
                      once: false,
                      amount: 0.2,
                    }}
                    className="group relative flex flex-row sm:flex-col items-center gap-5 sm:gap-0 px-5 py-5 sm:px-8 sm:py-16 transition-all duration-700 cursor-default overflow-hidden bg-white hover:bg-gray-50/30 rounded-none"
                  >
                    <div className="absolute inset-0 border border-gray-50 z-10 pointer-events-none" />
                    <div className="absolute -right-8 -bottom-8 w-40 h-40 hidden sm:block opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-700 group-hover:scale-110 group-hover:-rotate-12 transform-gpu pointer-events-none text-[#E84B3A]">
                      <f.icon size={160} strokeWidth={1} />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#E84B3A]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <motion.div
                      className="absolute top-0 left-0 h-[3px] bg-[#E84B3A] z-30"
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
                      className="absolute top-0 right-0 w-[4px] bg-[#E84B3A] z-30"
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
                      className="absolute bottom-0 right-0 h-[4px] bg-[#E84B3A] z-30"
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
                      className="absolute bottom-0 left-0 w-[4px] bg-[#E84B3A] z-30"
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
                    <motion.div className="relative z-10 shrink-0 sm:mb-10 w-14 h-14 sm:w-24 sm:h-24 flex items-center justify-center transition-all duration-700 sm:group-hover:-translate-y-4 transform-gpu">
                      <div className="absolute inset-0 bg-navy/10 rounded-2xl sm:rounded-3xl blur-xl group-hover:opacity-40 transition-opacity" />
                      <div className="absolute inset-0 bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_20px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,1)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_2px_8px_rgba(255,255,255,1)] transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl sm:rounded-3xl" />
                      <div className="relative z-10 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#E84B3A] group-hover:bg-navy group-hover:text-white transition-all duration-700">
                        <f.icon
                          size={36}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="w-6 h-6 sm:w-9 sm:h-9 drop-shadow-[0_4px_8px_rgba(232,75,58,0.2)] group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E84B3A] rounded-full border-4 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100" />
                    </motion.div>
                    <div className="relative z-10 min-w-0 flex-1 sm:flex-none text-left sm:text-center">
                      <div className="sm:mb-4">
                        <span
                          className="block font-display text-[#94a3b8] uppercase tracking-[0.25em] mb-2"
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 700,
                          }}
                        >
                          {t.companyInfo.cards[f.key].label}
                        </span>
                        <div className="hidden sm:block h-[1px] w-8 mx-auto bg-gray-200 mb-4 group-hover:w-16 group-hover:bg-[#E84B3A]/30 transition-all duration-700" />
                        <h4 className="font-sans font-black text-[#111827] leading-tight tracking-tighter group-hover:text-[#E84B3A] transition-colors duration-500 text-base md:text-xl lg:text-2xl break-keep [overflow-wrap:anywhere]">
                          {"href" in f ? (
                            <a
                              href={f.href}
                              className="inline-block py-[11px] -my-[11px] text-inherit no-underline hover:underline underline-offset-4"
                            >
                              {t.companyInfo.cards[f.key].value}
                            </a>
                          ) : (
                            t.companyInfo.cards[f.key].value
                          )}
                        </h4>
                      </div>
                      <p
                        className="mt-1 sm:mt-0 font-sans font-medium leading-relaxed text-gray-500 italic group-hover:text-gray-600 transition-colors duration-500"
                        style={{
                          fontSize: "0.9rem",
                        }}
                      >
                        {t.companyInfo.cards[f.key].sub}
                      </p>
                    </div>
                    <div className="absolute bottom-4 hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E84B3A]" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
            <section className="md:mb-40">
              <div className="max-w-[1240px] mx-auto">
                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: -30,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    className="relative overflow-hidden rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.1)] group bg-gray-50"
                  >
                    <div className="overflow-hidden">
                      <img
                        src="/image/contact/c-2.jpg"
                        alt={t.location.mapAlt}
                        width={2686}
                        height={1600}
                        className="block w-full h-auto transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                    <p className="m-0 px-6 py-4 md:px-8 md:py-5 font-display font-black text-navy text-xl md:text-2xl tracking-tighter border-t border-gray-100 bg-white">
                      {t.location.mapCaption}
                    </p>
                  </motion.div>
                  <div className="space-y-10 md:space-y-12">
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      className="flex items-center gap-5 md:gap-8 group"
                    >
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-50/50 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.05),0_10px_20px_rgba(37,99,235,0.1)] group-hover:bg-blue-100/50 transition-colors duration-500">
                          {
                            <MapPin
                              aria-hidden="true"
                              size={28}
                              className="text-[#388BDB] drop-shadow-[0_4px_8px_rgba(37,99,235,0.3)]"
                              strokeWidth={2.5}
                            />
                          }
                        </div>
                      </div>
                      <div>
                        <span className="block font-display font-medium text-gray-500 text-sm mb-1">
                          {t.location.addressLabel}
                        </span>
                        <h4 className="font-sans font-black text-navy text-lg md:text-2xl leading-tight tracking-tight">
                          {t.location.addressLine}
                          <br />
                          <span className="text-gray-500 font-bold text-base md:text-xl">
                            {t.location.addressDetail}
                          </span>
                        </h4>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: 0.1,
                      }}
                      className="flex items-center gap-5 md:gap-8 group"
                    >
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-50/50 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.05),0_10px_20px_rgba(37,99,235,0.1)] group-hover:bg-blue-100/50 transition-colors duration-500">
                          {
                            <Building
                              aria-hidden="true"
                              size={24}
                              className="text-[#388BDB] drop-shadow-[0_4px_8px_rgba(37,99,235,0.2)]"
                              strokeWidth={2.5}
                            />
                          }
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="block font-display font-medium text-gray-500 text-sm mb-3">
                          {t.location.transitLabel}
                        </span>
                        <div className="inline-flex items-center gap-3 md:gap-4 bg-gray-50/80 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 rounded-2xl border border-gray-100 group-hover:bg-white group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] transition-all duration-500">
                          <div
                            aria-hidden="true"
                            className="w-8 h-8 shrink-0 bg-[#00A4E3] rounded-lg flex items-center justify-center text-white font-display font-black text-lg shadow-lg shadow-[#00A4E3]/30"
                          >
                            4
                          </div>
                          <span className="font-sans font-black text-navy text-base md:text-xl tracking-tight">
                            {t.location.transitStation}{" "}
                            <span className="text-gray-500 text-sm md:text-lg font-bold whitespace-nowrap">
                              {t.location.transitWalk}
                            </span>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="text-left mb-10 md:mb-20">
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
                >
                  <div className="inline-flex items-center gap-3 mb-6">
                    <span className="font-display font-black text-[#2563EB] text-4xl tracking-tighter">
                      02
                    </span>
                    <div className="w-12 h-[2px] bg-gray-300" />
                    <span className="font-display font-bold text-gray-500 uppercase tracking-widest text-sm sm:text-lg">
                      {t.brochure.eyebrow}
                    </span>
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial="hidden"
                whileHover={r ? undefined : "visible"}
                whileInView={r ? "visible" : undefined}
                viewport={{
                  once: false,
                  amount: 0.1,
                }}
                id="brochure"
                className="relative overflow-hidden group shadow-[0_50px_100px_rgba(37,99,235,0.08)] border border-gray-100/50 rounded-none"
              >
                <div className="absolute inset-0 z-30 pointer-events-none">
                  <motion.div
                    className="absolute top-0 left-0 h-[4px] bg-[#E84B3A]"
                    variants={{
                      hidden: {
                        width: "0%",
                      },
                      visible: {
                        width: "100%",
                        transition: {
                          duration: 1,
                          delay: 0.2,
                        },
                      },
                    }}
                  />
                  <motion.div
                    className="absolute top-0 right-0 w-[4px] bg-[#2563EB]"
                    variants={{
                      hidden: {
                        height: "0%",
                      },
                      visible: {
                        height: "100%",
                        transition: {
                          duration: 1,
                          delay: 0.5,
                        },
                      },
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 h-[4px] bg-[#2563EB]"
                    variants={{
                      hidden: {
                        width: "0%",
                      },
                      visible: {
                        width: "100%",
                        transition: {
                          duration: 1,
                          delay: 0.8,
                        },
                      },
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-[4px] bg-[#E84B3A]"
                    variants={{
                      hidden: {
                        height: "0%",
                      },
                      visible: {
                        height: "100%",
                        transition: {
                          duration: 1,
                          delay: 1.1,
                        },
                      },
                    }}
                  />
                </div>
                <div className="absolute -inset-[2px] bg-gradient-to-r from-[#E84B3A]/20 via-[#2563EB]/20 to-[#E84B3A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[2px] z-10" />
                <div className="absolute inset-0 bg-[#f8fbff] group-hover:bg-white transition-colors duration-1000" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply opacity-5"
                    style={{
                      backgroundColor: "#2563EB",
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 30, 0],
                    }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage: "radial-gradient(#1a3a5f 1px, transparent 1px)",
                      backgroundSize: "64px 64px",
                    }}
                  />
                </div>
                <div className="relative z-20 px-6 py-12 sm:p-16 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16">
                  <div className="text-center lg:text-left flex-1">
                    <div className="inline-flex items-center gap-3 px-5 sm:px-6 py-2 bg-[#1a3a5f]/5 rounded-full text-[#1a3a5f] font-display font-bold text-[0.7rem] tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-8 border border-[#1a3a5f]/10">
                      {t.brochure.badge}
                    </div>
                    <h2
                      className="font-display font-black text-[#111827] leading-[1.2] mb-6 tracking-tighter"
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                      }}
                    >
                      {t.brochure.title}
                    </h2>
                    <p className="text-gray-500 font-sans font-medium text-lg md:text-xl max-w-[540px] leading-relaxed mb-0">
                      {t.brochure.description}
                    </p>
                  </div>
                  <div className="relative group/box shrink-0">
                    {BROCHURE_URL && (
                      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-[#E84B3A]/20 blur-2xl opacity-0 group-hover/box:opacity-100 transition-opacity duration-700" />
                    )}
                    {BROCHURE_URL ? (
                      <a
                        href={BROCHURE_URL}
                        download
                        className="group/dl relative flex items-center gap-6 sm:gap-8 bg-white text-[#1a3a5f] p-4 pr-8 sm:pr-12 rounded-[32px] transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] no-underline ring-1 ring-gray-100 overflow-hidden"
                      >
                        <div className="w-16 h-20 sm:w-20 sm:h-24 shrink-0 bg-navy rounded-2xl flex items-center justify-center text-white relative overflow-hidden transition-all duration-700 group-hover/dl:bg-[#E84B3A]">
                          <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 rounded-bl-3xl" />
                          <Download size={32} aria-hidden="true" className="relative z-10 animate-bounce" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-display font-bold text-[0.7rem] uppercase tracking-widest text-[#E84B3A] mb-1">
                            {t.brochure.kicker}
                          </span>
                          <span className="font-display font-black text-xl sm:text-2xl tracking-tighter">
                            {t.brochure.download}
                          </span>
                        </div>
                      </a>
                    ) : (
                      <div
                        aria-disabled="true"
                        className="relative flex items-center gap-6 sm:gap-8 bg-white/70 text-gray-500 p-4 pr-8 sm:pr-12 rounded-[32px] ring-1 ring-gray-200 cursor-not-allowed select-none"
                      >
                        <div className="w-16 h-20 sm:w-20 sm:h-24 shrink-0 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
                          <Clock size={30} aria-hidden="true" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-display font-bold text-[0.7rem] uppercase tracking-widest text-gray-500 mb-1">
                            {t.brochure.unavailableKicker}
                          </span>
                          <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-gray-600">
                            {t.brochure.unavailable}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      </section>
      <CtaSection
        highlight={t.cta.highlight}
        title={
          <>
            {t.cta.titleLead}{" "}
            <span className="text-[#2563EB] font-bold underline underline-offset-8 decoration-2 underline-[#2563EB]/40">
              {t.cta.titleHighlight}
            </span>
            {t.cta.titleAfterHighlight}
            <br className="hidden md:block" />
            {t.cta.titleTail}
          </>
        }
        description={t.cta.description}
      />
    </main>
  );
}
