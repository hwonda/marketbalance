"use client";

import { useDictionary } from "@/i18n/I18nProvider";
import Link from "@/i18n/Link";
import Container from "@/components/ui/Container";
import { withBasePath } from "@/lib/basePath";

export default function Footer() {
  const { footer, nav, metadata } = useDictionary();

  const pages = [
    { label: nav.about, href: "/about" },
    { label: nav.service, href: "/services" },
    { label: nav.portfolio, href: "/works" },
    { label: nav.buyerMatching, href: "/buyer-matching" },
    { label: nav.contact, href: "/contact-detail" },
    { label: nav.qna, href: "/contact" },
  ];

  return (
    <footer className="border-t border-line bg-paper py-14 text-small md:py-16">
      <Container className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBasePath("/image/logo/logo.png")} alt={metadata.logoAlt} className="h-14 w-auto" />
          <p className="mt-5 max-w-[32ch] text-ink-soft">{footer.description}</p>
        </div>

        <nav aria-label={footer.menuTitle} className="md:col-span-2">
          <h2 className="text-small font-bold">{footer.menuTitle}</h2>
          <ul className="mt-4 grid gap-2">
            {pages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-ink-soft transition-colors hover:text-blue">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-small font-bold">{footer.contactTitle}</h2>
          <dl className="mt-4 grid gap-y-3">
            <div>
              <dt className="text-caption text-ink-faint">{footer.phoneLabel}</dt>
              <dd>
                <a href={`tel:${footer.phone}`} className="tabular hover:text-blue">
                  {footer.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-caption text-ink-faint">{footer.mobileLabel}</dt>
              <dd>
                <a href={`tel:${footer.mobile}`} className="tabular hover:text-blue">
                  {footer.mobile}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-caption text-ink-faint">{footer.emailLabel}</dt>
              <dd>
                <a href={`mailto:${footer.email}`} className="hover:text-blue">
                  {footer.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-small font-bold">{footer.addressTitle}</h2>
          <address className="mt-4 not-italic text-ink-soft">
            {footer.addressLine1}
            <br />
            {footer.addressLine2}
          </address>
          <Link
            href="/contact-detail#location"
            className="mt-3 inline-block font-semibold text-blue hover:underline"
          >
            {footer.directions}
          </Link>
        </div>

        <div className="border-t border-line pt-6 text-caption text-ink-faint md:col-span-12">
          <dl className="flex flex-wrap gap-x-6 gap-y-1">
            <div>
              <dt className="sr-only">{metadata.siteName}</dt>
              <dd>{footer.companyName}</dd>
            </div>
            <div className="flex gap-2">
              <dt>{footer.ceoLabel}</dt>
              <dd>{footer.ceo}</dd>
            </div>
            <div className="flex gap-2">
              <dt>{footer.bizNoLabel}</dt>
              <dd className="tabular">{footer.bizNo}</dd>
            </div>
          </dl>
          <p className="mt-2">© 2024–2026 {footer.companyName}</p>
        </div>
      </Container>
    </footer>
  );
}
