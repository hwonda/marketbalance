"use client";

import { useState, useEffect } from "react";
import Link from "@/i18n/Link";
import { usePathname } from "@/i18n/usePathname";
import { useDictionary } from "@/i18n/I18nProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { notifyHashNav } from "@/hooks/useHashScroll";

type SubItem = { name: string; path: string; hash?: string };
type NavItem = { name: string; path: string; subItems?: SubItem[] };

/** The original bundle ships this menu behind a flag that is always on. */
const SHOW_BUYER_MATCHING = true;

/** Sub-menu links target a section: `/about` + `vision` -> `/about#vision`. */
function subItemHref(item: SubItem) {
  const [base, pathHash] = item.path.split("#");
  const hash = item.hash || pathHash;
  return hash ? `${base}#${hash}` : base;
}

export default function Header() {
  const [n, setN] = useState(false);
  const [r, setR] = useState(false);
  const [u, setU] = useState<string | null>(null);
  const pathname = usePathname();
  const { nav, common } = useDictionary();
  const x: NavItem[] = [
    {
      name: nav.about,
      path: "/about",
      subItems: [
        {
          name: nav.aboutIntro,
          path: "/about",
          hash: "vision",
        },
        {
          name: nav.aboutHistory,
          path: "/about#history",
        },
      ],
    },
    {
      name: nav.service,
      path: "/services",
      subItems: [
        {
          name: nav.serviceExhibition,
          path: "/services#exhibition",
        },
        {
          name: nav.serviceMarketing,
          path: "/services#marketing",
        },
        {
          name: nav.serviceMice,
          path: "/services#mice",
        },
        {
          name: nav.serviceBuyer,
          path: "/services#buyer",
        },
        {
          name: nav.serviceTrade,
          path: "/services#trade",
        },
      ],
    },
    {
      name: nav.portfolio,
      path: "/works",
      subItems: [
        {
          name: nav.portfolioWorks,
          path: "/works",
        },
      ],
    },
    {
      name: nav.contact,
      path: "/contact-detail",
      subItems: [
        {
          name: nav.contactLocation,
          path: "/contact-detail#location",
        },
        {
          name: nav.contactBrochure,
          path: "/contact-detail#brochure",
        },
      ],
    },
    {
      name: nav.qna,
      path: "/contact",
      subItems: [
        {
          name: nav.qnaInquiry,
          path: "/contact#qna",
        },
      ],
    },
    ...(SHOW_BUYER_MATCHING
      ? [
          {
            name: nav.buyerMatching,
            path: "/buyer-matching",
          },
        ]
      : []),
  ];
  useEffect(() => {
    const y = () => setN(window.scrollY > 40);
    window.addEventListener("scroll", y, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", y);
  }, []);
  return (
    <>
      <header id="gnb" className={cn("fixed top-0 left-0 right-0 z-[1000] transition-all duration-500")}>
        <div
          className={cn(
            "mx-auto transition-all duration-500",
            n ? "py-4 px-6 md:px-8 max-w-[1200px]" : "py-6 px-10 max-w-[1440px]",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between rounded-full transition-all duration-500",
              n
                ? "bg-white/70 backdrop-blur-md shadow-lg border border-white/40 px-6 h-16"
                : "bg-white/40 backdrop-blur-sm border border-white/30 px-8 h-20",
            )}
          >
            <Link href="/" className="flex items-center gap-3 no-underline shrink-0 group">
              <img
                src="/image/logo/logo.png"
                alt="Market Balance"
                className={cn(
                  "transition-transform group-hover:scale-105",
                  n ? "h-8 md:h-14" : "h-12 md:h-20",
                )}
                style={{
                  objectFit: "contain",
                }}
              />
            </Link>
            <nav className="hidden lg:flex items-center">
              <ul className="flex items-center list-none p-0 m-0 gap-6">
                {x.map((y) => {
                  const b = pathname === y.path;
                  return (
                    <li
                      key={y.name}
                      className="relative"
                      onMouseEnter={() => setU(y.name)}
                      onMouseLeave={() => setU(null)}
                    >
                      <Link
                        href={y.path}
                        className={cn(
                          "relative flex items-center gap-1.5 py-4 font-sans font-medium hover:text-black transition-colors",
                        )}
                        style={{
                          fontSize: "1rem",
                          color: b ? "#000" : "rgba(0,0,0,0.6)",
                        }}
                      >
                        {y.name}
                        {y.subItems && (
                          <ChevronDown
                            size={14}
                            className={cn(
                              "transition-transform duration-300 opacity-60",
                              u === y.name && "rotate-180 opacity-100",
                            )}
                          />
                        )}
                        {b && (
                          <motion.div
                            layoutId="navUnderline"
                            className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                            style={{
                              backgroundColor: "#E84B3A",
                            }}
                          />
                        )}
                      </Link>
                      {
                        <AnimatePresence>
                          {y.subItems && u === y.name && (
                            <motion.ul
                              initial={{
                                opacity: 0,
                                y: 15,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                                y: 15,
                              }}
                              transition={{
                                duration: 0.3,
                                ease: "easeOut",
                              }}
                              className="absolute top-full -left-4 w-max min-w-[220px] bg-white/95 backdrop-blur-md border border-black/5 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] py-4 mt-1 flex flex-col list-none z-50 overflow-hidden"
                            >
                              {y.subItems.map((w) => (
                                <li key={w.name} className="relative z-10">
                                  <Link
                                    href={subItemHref(w)}
                                    onClick={notifyHashNav}
                                    className="block px-6 py-3 text-black/60 hover:text-black hover:bg-black/5 transition-all no-underline"
                                    style={{
                                      fontSize: "0.9rem",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {w.name}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      }
                    </li>
                  );
                })}
              </ul>
              <LanguageSwitcher className="ml-6" />
            </nav>
            <button
              type="button"
              onClick={() => setR(!r)}
              aria-label={r ? common.menuClose : common.menuOpen}
              aria-expanded={r}
              className="lg:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: r ? 45 : 0,
                  y: r ? 8 : 0,
                  backgroundColor: "#000000",
                }}
                className="block w-6 h-0.5 rounded-full"
              />
              <motion.div
                animate={{
                  opacity: r ? 0 : 1,
                }}
                className="block w-6 h-0.5 bg-black rounded-full"
              />
              <motion.div
                initial={false}
                animate={{
                  rotate: r ? -45 : 0,
                  y: r ? -8 : 0,
                  backgroundColor: "#000000",
                }}
                className="block w-6 h-0.5 rounded-full"
              />
            </button>
          </div>
        </div>
      </header>
      {
        <AnimatePresence>
          {r && (
            <motion.nav
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              className="fixed left-0 right-0 z-[999] backdrop-blur-xl border-b px-8 py-6 max-h-[calc(100vh-75px)] overflow-y-auto"
              style={{
                top: "75px",
                backgroundColor: "rgba(12, 26, 53, 0.98)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <ul className="flex flex-col gap-1 list-none p-0 m-0">
                {x.map((y) => (
                  <li key={y.name} className="flex flex-col">
                    <div
                      className="flex items-center justify-between py-3 font-display font-medium no-underline"
                      style={{
                        fontSize: "0.95rem",
                        letterSpacing: "0.12em",
                        color: "rgba(255,255,255,0.8)",
                        borderBottom: y.subItems ? "none" : "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <Link
                        href={y.path}
                        onClick={() => setR(false)}
                        className="flex items-center gap-3 text-inherit no-underline"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E84B3A]" />
                        {y.name}
                      </Link>
                    </div>
                    {y.subItems && (
                      <ul className="flex flex-col list-none pl-7 pb-1 border-b border-white/5">
                        {y.subItems.map((b) => (
                          <li key={b.name}>
                            <Link
                              href={subItemHref(b)}
                              onClick={() => {
                                setR(false);
                                notifyHashNav();
                              }}
                              className="block py-1.5 text-white/40 hover:text-[#E84B3A] no-underline transition-colors"
                              style={{
                                fontSize: "0.85rem",
                              }}
                            >
                              {b.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex">
                <LanguageSwitcher tone="dark" onNavigate={() => setR(false)} />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      }
    </>
  );
}
