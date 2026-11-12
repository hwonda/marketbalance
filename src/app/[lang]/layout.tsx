import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegacyHashRedirect from "@/components/LegacyHashRedirect";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { I18nProvider } from "@/i18n/I18nProvider";
import "wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.css";
import "../globals.css";
import { BASE_PATH, withBasePath } from "@/lib/basePath";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://marketbalance.vercel.app";
const OG_LOCALE = { ko: "ko_KR", en: "en_US" } as const;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { metadata: m } = await getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    applicationName: m.appName,
    // A sub-path build (e.g. /v2 preview) duplicates the live site, so keep it out of search results.
    ...(BASE_PATH ? { robots: { index: false, follow: false } } : {}),
    authors: [{ name: m.appName }],
    alternates: {
      canonical: withBasePath(`/${lang}`),
      languages: Object.fromEntries(locales.map((l) => [l, withBasePath(`/${l}`)])),
    },
    icons: {
      icon: { url: withBasePath("/image/logo/logo.png"), type: "image/png" },
      shortcut: withBasePath("/image/logo/logo.png"),
      apple: withBasePath("/image/logo/logo.png"),
    },
    appleWebApp: { capable: true, title: m.appName, statusBarStyle: "black-translucent" },
    openGraph: {
      type: "website",
      title: m.ogTitle,
      description: m.description,
      url: withBasePath(`/${lang}`),
      siteName: m.siteName,
      locale: OG_LOCALE[lang],
      images: [{ url: withBasePath("/image/logo/logo.png"), width: 1200, height: 630, alt: m.logoAlt, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.twitterTitle,
      description: m.twitterDescription,
      images: [withBasePath("/image/logo/logo.png")],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0C1A35",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body>
        <I18nProvider locale={lang} dict={dict}>
          <div className="min-h-screen flex flex-col font-sans">
            <LegacyHashRedirect />
            <Header />
            <div id="main" tabIndex={-1} className="flex-grow outline-none">
              {children}
            </div>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
