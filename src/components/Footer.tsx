"use client";

import { useDictionary } from "@/i18n/I18nProvider";
import Link from "@/i18n/Link";

/** Same order as `footer.structureLinks` / `footer.expertiseLinks` in the dictionaries. */
const STRUCTURE_HREFS = ["/", "/about", "/services", "/works", "/contact"];
const EXPERTISE_HREFS = [
  "/services#exhibition",
  "/services#marketing",
  "/services#mice",
  "/services#buyer",
  "/services#trade",
];

export default function Footer() {
  const { footer } = useDictionary();
  return (
    <footer
      style={{
        backgroundColor: "#ffffff",
        color: "#6b7280",
      }}
      className="font-sans border-t border-gray-100"
      role="contentinfo"
    >
      <div className="flex h-[1px]">
        <div
          style={{
            flex: 1,
            background: "rgba(232, 75, 58, 0.4)",
          }}
        />
        <div
          style={{
            flex: 1,
            background: "rgba(37, 99, 235, 0.4)",
          }}
        />
        <div
          style={{
            flex: 1,
            background: "rgba(45, 122, 95, 0.4)",
          }}
        />
      </div>
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12"
        style={{
          maxWidth: "1280px",
          padding: "6rem 2rem 5rem",
        }}
      >
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4 mb-8">
            <img
              src="/image/logo/logo.png"
              alt="Market Balance"
              className="h-16 md:h-24"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <p
            className="font-sans font-light leading-[1.9] mb-10 break-keep"
            style={{
              fontSize: "0.9rem",
              maxWidth: "380px",
              color: "#6b7280",
            }}
          >
            {footer.description}
          </p>
        </div>
        <div className="lg:col-span-2">
          <h4
            className="font-display font-bold text-[#111827] uppercase tracking-[0.2em] mb-8"
            style={{
              fontSize: "0.72rem",
            }}
          >
            {footer.structure}
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            {footer.structureLinks.map((n, i) => (
              <li key={n}>
                <Link
                  href={STRUCTURE_HREFS[i]}
                  className="no-underline transition-colors hover:text-[#2563EB]"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    color: "#4b5563",
                  }}
                >
                  {n}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h4
            className="font-display font-bold text-[#111827] uppercase tracking-[0.2em] mb-8"
            style={{
              fontSize: "0.72rem",
            }}
          >
            {footer.expertise}
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            {footer.expertiseLinks.map((n, i) => (
              <li key={n}>
                <Link
                  href={EXPERTISE_HREFS[i]}
                  className="no-underline transition-colors hover:text-[#2563EB]"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    color: "#4b5563",
                  }}
                >
                  {n}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h4
            className="font-display font-bold text-[#2563EB] md:text-[#111827] uppercase tracking-[0.2em] mb-8"
            style={{
              fontSize: "0.85rem md:0.72rem",
            }}
          >
            {footer.collective}
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-6">
            <li className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-xl bg-blue-100 md:bg-blue-50 flex items-center justify-center shrink-0 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-500">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <path
                    d="M12 21c3.5-3.5 7-7 7-11a7 7 0 10-14 0c0 4 3.5 7.5 7 11z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div
                className="break-keep pt-1"
                style={{
                  fontSize: "0.85rem",
                  lineHeight: "1.7",
                  color: "#1f2937",
                }}
              >
                {footer.addressLine1}
                <br />
                {footer.addressLine2}
              </div>
            </li>
            <li className="flex gap-4 items-center group">
              <div className="w-10 h-10 rounded-xl bg-blue-100 md:bg-blue-50 flex items-center justify-center shrink-0 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-500">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <a
                  href="tel:031-425-9281"
                  className="no-underline transition-colors hover:text-[#2563EB]"
                  style={{
                    fontSize: "0.85rem",
                    color: "#1f2937",
                    fontWeight: 500,
                  }}
                >
                  031.425.9281
                </a>
                <a
                  href="tel:010-8838-9281"
                  className="no-underline transition-colors hover:text-[#2563EB]"
                  style={{
                    fontSize: "0.85rem",
                    color: "#1f2937",
                    fontWeight: 500,
                  }}
                >
                  010.8838.9281
                </a>
              </div>
            </li>
            <li className="flex gap-4 items-center group">
              <div className="w-10 h-10 rounded-xl bg-orange-100 md:bg-orange-50 flex items-center justify-center shrink-0 text-[#E84B3A] group-hover:bg-[#E84B3A] group-hover:text-white transition-all duration-500">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6l-10 7L2 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Link
                href="/contact-detail"
                className="no-underline font-bold text-[#2563EB] md:text-[#111827] transition-colors hover:text-[#2563EB]"
                style={{
                  fontSize: "0.85rem",
                }}
              >
                {footer.contactDetails}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100 bg-[#f8f9fc]">
        <div
          className="mx-auto px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            maxWidth: "1280px",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <p
              className="text-center sm:text-left m-0"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.02em",
                color: "#9ca3af",
              }}
            >
              © 2024–2025 Market Balance Co., Ltd.
            </p>
            <div className="hidden sm:block h-3 w-[1px] bg-gray-200" />
            <p
              className="text-center sm:text-left m-0"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.02em",
                color: "#9ca3af",
              }}
            >
              {footer.businessInfo}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
