"use client";

import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import Link from "@/v3/i18n/Link";
import { usePathname } from "@/v3/i18n/usePathname";
import { useDictionary } from "@/v3/i18n/I18nProvider";
import { notifyHashNav } from "@/v3/hooks/useHashScroll";
import LanguageSwitcher from "@/v3/components/LanguageSwitcher";
import { cn } from "@/v3/lib/cn";

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

/**
 * Change request §1, §3, §4, §6: opaque white bar with a light bottom rule, logo + menu,
 * BUYER MATCHING as a blue button, globe language menu at the far right (always visible on mobile).
 */
export default function Header() {
  const pathname = usePathname();
  const { nav, common } = useDictionary();
  const [dropdown, setDropdown] = useState<string | null>(null);
  // The mobile menu remembers the page it was opened on, so navigating anywhere closes it.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const mobileOpen = openedOn === pathname;
  const suppressFocusOpen = useRef(false);

  const items: NavItem[] = [
    {
      label: nav.about,
      href: "/about",
      children: [
        { label: nav.aboutIntro, href: "/about#vision" },
        { label: nav.aboutHistory, href: "/about#history" },
      ],
    },
    {
      label: nav.service,
      href: "/services",
      // Order and names from change request §12.
      children: [
        { label: nav.serviceMice, href: "/services#mice" },
        { label: nav.serviceMarketing, href: "/services#marketing" },
        { label: nav.serviceExhibition, href: "/services#exhibition" },
        { label: nav.serviceBuyer, href: "/services#buyer" },
        { label: nav.serviceTrade, href: "/services#trade" },
      ],
    },
    { label: nav.portfolio, href: "/works", children: [{ label: nav.portfolioWorks, href: "/works" }] },
    {
      label: nav.contact,
      href: "/contact-detail",
      children: [
        { label: nav.contactLocation, href: "/contact-detail#location" },
        { label: nav.contactBrochure, href: "/contact-detail#brochure" },
      ],
    },
    {
      label: nav.qna,
      href: "/contact",
      children: [
        { label: nav.qnaInquiry, href: "/contact" },
        { label: nav.notice, href: "/notice" },
      ],
    },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const closeOnBlur = (e: FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDropdown(null);
  };
  const closeOnEscape = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key !== "Escape") return;
    setDropdown(null);
    suppressFocusOpen.current = true;
    e.currentTarget.querySelector<HTMLAnchorElement>("a")?.focus();
    suppressFocusOpen.current = false;
  };

  return (
    <header id="gnb" className="fixed inset-x-0 top-0 z-[1000] border-b border-[#E3E8F0] bg-white">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/image/logo/logo.png" alt="Market Balance" className="h-11 w-auto md:h-14" />
        </Link>

        <nav aria-label="Main" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-7">
            {items.map((item) => (
              <li
                key={item.label}
                className="relative flex h-full items-center"
                onMouseEnter={() => item.children && setDropdown(item.label)}
                onMouseLeave={() => setDropdown(null)}
                onFocus={() => {
                  if (item.children && !suppressFocusOpen.current) setDropdown(item.label);
                }}
                onBlur={closeOnBlur}
                onKeyDown={closeOnEscape}
              >
                <Link
                  href={item.href}
                  onClick={() => setDropdown(null)}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "relative flex h-full items-center gap-1 text-[15px] font-semibold transition-colors",
                    isCurrent(item.href) ? "text-[#1F5FE0]" : "text-[#14213D] hover:text-[#1F5FE0]",
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} aria-hidden className="opacity-60" />}
                  {isCurrent(item.href) && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[#1F5FE0]" />}
                </Link>
                {item.children && (
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-1 transition-opacity duration-150",
                      dropdown === item.label ? "visible opacity-100" : "invisible opacity-0",
                    )}
                  >
                    <ul className="min-w-56 rounded-xl border border-[#E3E8F0] bg-white py-2 shadow-[0_12px_32px_rgba(20,33,61,0.12)]">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => {
                              setDropdown(null);
                              notifyHashNav();
                            }}
                            className="block px-5 py-2.5 text-[14px] text-[#4A5873] transition-colors hover:bg-[#F6F8FC] hover:text-[#14213D]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/buyer-matching"
            className="hidden h-10 items-center rounded-full bg-[#1F5FE0] px-5 text-[13px] font-bold tracking-wide text-white transition-colors hover:bg-[#174BB5] lg:flex"
          >
            {nav.buyerMatching}
          </Link>
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpenedOn(mobileOpen ? null : pathname)}
            aria-label={mobileOpen ? common.menuClose : common.menuOpen}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="flex size-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-6 bg-[#14213D] transition-transform",
                  mobileOpen ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-6 bg-[#14213D] transition-transform",
                  mobileOpen ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="h-[calc(100dvh-76px)] overflow-y-auto border-t border-[#E3E8F0] bg-white px-5 pb-10 lg:hidden">
          <ul>
            {items.map((item) => (
              <li key={item.label} className="border-b border-[#E3E8F0] py-4">
                <Link
                  href={item.href}
                  className={cn("block py-1 text-[18px] font-bold", isCurrent(item.href) ? "text-[#1F5FE0]" : "text-[#14213D]")}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mt-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={notifyHashNav} className="block py-2 text-[15px] text-[#4A5873]">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/buyer-matching"
            className="mt-6 flex h-12 items-center justify-center rounded-full bg-[#1F5FE0] text-[15px] font-bold text-white"
          >
            {nav.buyerMatching}
          </Link>
        </div>
      )}
    </header>
  );
}
