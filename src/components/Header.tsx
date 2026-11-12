"use client";

import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { usePathname } from "@/i18n/usePathname";
import { useDictionary } from "@/i18n/I18nProvider";
import Link from "@/i18n/Link";
import { notifyHashNav } from "@/hooks/useHashScroll";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { withBasePath } from "@/lib/basePath";

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export default function Header() {
  const pathname = usePathname();
  const { nav, common, metadata } = useDictionary();
  // The menu remembers the page it was opened on, so navigating anywhere closes it.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (next: boolean) => setOpenedOn(next ? pathname : null);
  const [scrolled, setScrolled] = useState(false);
  // Desktop dropdowns are driven by state, not :hover/:focus-within, so a click can close them
  // even though the clicked link keeps keyboard focus.
  const [dropdown, setDropdown] = useState<string | null>(null);
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
      children: [
        { label: nav.serviceExhibition, href: "/services#exhibition" },
        { label: nav.serviceBuyer, href: "/services#buyer" },
        { label: nav.serviceMarketing, href: "/services#marketing" },
        { label: nav.serviceMice, href: "/services#mice" },
        { label: nav.serviceTrade, href: "/services#trade" },
      ],
    },
    { label: nav.portfolio, href: "/works" },
    { label: nav.buyerMatching, href: "/buyer-matching" },
    {
      label: nav.contact,
      href: "/contact-detail",
      children: [
        { label: nav.contactLocation, href: "/contact-detail#location" },
        { label: nav.contactBrochure, href: "/contact-detail#brochure" },
      ],
    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const closeDropdownOnBlur = (event: FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDropdown(null);
  };
  const closeDropdownOnEscape = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key !== "Escape") return;
    setDropdown(null);
    // Return focus to the top-level link without reopening the menu it belongs to.
    suppressFocusOpen.current = true;
    event.currentTarget.querySelector<HTMLAnchorElement>("a")?.focus();
    suppressFocusOpen.current = false;
  };

  return (
    <>
      <a
        href="#main"
        className="fixed top-2 left-2 z-[1100] -translate-y-24 rounded bg-ink px-4 py-2 text-small text-white focus:translate-y-0"
      >
        {common.skipToContent}
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[1000] border-b bg-paper transition-[border-color] duration-200",
          scrolled || open ? "border-line" : "border-transparent",
        )}
      >
        <Container className="flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label={metadata.appName}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBasePath("/image/logo/logo.png")} alt={metadata.logoAlt} className="h-12 w-auto md:h-14" />
          </Link>

          <nav aria-label={nav.primary} className="hidden h-full lg:block">
            <ul className="flex h-full items-center gap-1">
              {items.map((item) => (
                <li
                  key={item.href}
                  className="relative flex h-full items-center"
                  onMouseEnter={() => item.children && setDropdown(item.href)}
                  onMouseLeave={() => setDropdown(null)}
                  onFocus={() => {
                    if (item.children && !suppressFocusOpen.current) setDropdown(item.href);
                  }}
                  onBlur={closeDropdownOnBlur}
                  onKeyDown={closeDropdownOnEscape}
                >
                  <Link
                    href={item.href}
                    onClick={() => setDropdown(null)}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className={cn(
                      "relative flex h-full items-center px-3 text-small font-semibold transition-colors",
                      isCurrent(item.href) ? "text-blue" : "text-ink hover:text-blue",
                    )}
                  >
                    {item.label}
                    {isCurrent(item.href) && <span className="absolute inset-x-3 bottom-0 h-[3px] bg-blue" />}
                  </Link>
                  {item.children && (
                    <div
                      className={cn(
                        "absolute top-full left-0 pt-2 transition-opacity duration-150",
                        dropdown === item.href ? "visible opacity-100" : "invisible opacity-0",
                      )}
                    >
                      <ul className="min-w-56 rounded-lg border border-line bg-paper py-2 shadow-[0_12px_32px_rgba(32,24,32,0.12)]">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => {
                                setDropdown(null);
                                notifyHashNav();
                              }}
                              className="block px-4 py-2.5 text-small text-ink-soft transition-colors hover:bg-mist hover:text-ink"
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

          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitcher />
            <ButtonLink href="/contact" className="min-h-11 px-5">
              {nav.inquiryAction}
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? common.menuClose : common.menuOpen}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex size-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-6 bg-ink transition-transform duration-200",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-6 bg-ink transition-transform duration-200",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </Container>

        {open && (
          <div
            id="mobile-menu"
            className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-paper pb-10 lg:hidden"
          >
            <Container>
              <nav aria-label={nav.primary}>
                <ul>
                  {items.map((item) => (
                    <li key={item.href} className="border-b border-line py-4">
                      <Link
                        href={item.href}
                        aria-current={isCurrent(item.href) ? "page" : undefined}
                        className={cn("block py-1 text-h4 font-bold", isCurrent(item.href) && "text-blue")}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <ul className="mt-1 grid gap-0.5">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => {
                                  setOpen(false);
                                  notifyHashNav();
                                }}
                                className="block py-2 text-small text-ink-soft"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-8 flex flex-col gap-4">
                <ButtonLink href="/contact" className="w-full">
                  {nav.inquiryAction}
                </ButtonLink>
                <LanguageSwitcher onNavigate={() => setOpen(false)} />
              </div>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}
