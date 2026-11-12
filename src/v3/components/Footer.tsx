"use client";

import type { ReactNode, SVGProps } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useDictionary } from "@/v3/i18n/I18nProvider";
import Link from "@/v3/i18n/Link";
import { SOCIAL_LINKS, type SocialKey } from "@/v3/config/social";

/** Same order as `footer.structureLinks` / `footer.expertiseLinks` in the dictionaries. */
const STRUCTURE_HREFS = ["/", "/about", "/services", "/works", "/contact"];
const EXPERTISE_HREFS = [
  "/services#mice",
  "/services#marketing",
  "/services#exhibition",
  "/services#buyer",
  "/services#trade",
];

type IconProps = SVGProps<SVGSVGElement>;
const Svg = ({ children, ...props }: IconProps & { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    {children}
  </svg>
);

/** Line icons in the same style as the rest of the set (lucide v1 ships no brand icons). */
const SOCIAL_ICONS: Record<SocialKey, ReactNode> = {
  blog: (
    <Svg>
      <rect width="18" height="18" x="3" y="3" rx="4" />
      <path d="M9 16V8l6 8V8" />
    </Svg>
  ),
  linkedin: (
    <Svg>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </Svg>
  ),
  instagram: (
    <Svg>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </Svg>
  ),
  youtube: (
    <Svg>
      <path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </Svg>
  ),
};

const ROUND =
  "flex size-10 items-center justify-center rounded-full border border-[#D5DCE8] text-[#4A5873] transition-colors";

export default function Footer() {
  const { footer } = useDictionary();
  const contactRow = "flex items-center gap-3 text-[14px] text-[#14213D]";

  return (
    <footer className="border-t border-[#E3E8F0] bg-white" role="contentinfo">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 pt-20 pb-14 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/image/logo/logo.png" alt="Market Balance" className="h-16 w-auto md:h-20" />
          <p className="mt-6 max-w-[380px] text-[14px] leading-[1.9] text-[#4A5873]">{footer.description}</p>
          <ul className="mt-8 flex gap-3">
            {(Object.keys(SOCIAL_ICONS) as SocialKey[]).map((key) => {
              const url = SOCIAL_LINKS[key];
              const label = footer.sns[key];
              return (
                <li key={key}>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={label}
                      className={`${ROUND} hover:border-[#14213D] hover:bg-[#14213D] hover:text-white`}
                    >
                      {SOCIAL_ICONS[key]}
                      <span className="sr-only">{label}</span>
                    </a>
                  ) : (
                    <span
                      role="link"
                      aria-disabled="true"
                      title={`${label} (${footer.sns.pending})`}
                      className={`${ROUND} cursor-not-allowed opacity-50`}
                    >
                      {SOCIAL_ICONS[key]}
                      <span className="sr-only">{`${label} (${footer.sns.pending})`}</span>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label={footer.structure} className="lg:col-span-2">
          <h2 className="text-[12px] font-bold tracking-[0.2em] text-[#14213D] uppercase">{footer.structure}</h2>
          <ul className="mt-6 grid gap-2">
            {footer.structureLinks.map((label, i) => (
              <li key={label}>
                <Link href={STRUCTURE_HREFS[i]} className="text-[14px] text-[#4A5873] hover:text-[#1F5FE0]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={footer.expertise} className="lg:col-span-2">
          <h2 className="text-[12px] font-bold tracking-[0.2em] text-[#14213D] uppercase">{footer.expertise}</h2>
          <ul className="mt-6 grid gap-2">
            {footer.expertiseLinks.map((label, i) => (
              <li key={label}>
                <Link href={EXPERTISE_HREFS[i]} className="text-[14px] text-[#4A5873] hover:text-[#1F5FE0]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-[12px] font-bold tracking-[0.2em] text-[#14213D] uppercase">{footer.collective}</h2>
          <ul className="mt-6 grid gap-4">
            <li className="flex items-start gap-3 text-[14px] leading-relaxed text-[#14213D]">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F2F6FD] text-[#1F5FE0]">
                <MapPin size={16} aria-hidden />
              </span>
              <span>
                {footer.addressLine1}
                <br />
                {footer.addressLine2}
              </span>
            </li>
            <li>
              <a href={`tel:${footer.phone}`} className={contactRow} aria-label={`${footer.phoneLabel} ${footer.phone}`}>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F2F6FD] text-[#1F5FE0]">
                  <Phone size={16} aria-hidden />
                </span>
                {footer.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${footer.email}`} className={contactRow} title={footer.emailLabel}>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F2F6FD] text-[#1F5FE0]">
                  <Mail size={16} aria-hidden />
                </span>
                <span className="break-all">{footer.email}</span>
              </a>
            </li>
            <li>
              <Link href="/contact-detail" className="text-[14px] font-semibold text-[#1F5FE0] hover:underline">
                {footer.contactDetails}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#E3E8F0] bg-[#F6F8FC]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-1 px-6 py-6 text-[12px] text-[#6B7280] sm:flex-row sm:gap-6 md:px-8">
          <p>© 2024–2026 Market Balance Co., Ltd.</p>
          <p>{footer.businessInfo}</p>
        </div>
      </div>
    </footer>
  );
}
