import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Header from "@/v3/components/Header";
import Footer from "@/v3/components/Footer";
import { hasLocale, localePath, locales } from "@/v3/i18n/config";
import { getDictionary } from "@/v3/i18n/dictionaries";
import { I18nProvider } from "@/v3/i18n/I18nProvider";
import "@/v3/globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://marketbalance.vercel.app";
const OG_LOCALE = { ko: "ko_KR", en: "en_US" } as const;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/v3/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { metadata: m } = await getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    applicationName: m.appName,
    // A preview next to the live site (/ko, /en); keep it out of search results until it replaces it.
    robots: { index: false, follow: false },
    authors: [{ name: m.appName }],
    alternates: {
      canonical: localePath(lang),
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l)])),
    },
    icons: {
      icon: { url: "/image/logo/logo.png", type: "image/png" },
      shortcut: "/image/logo/logo.png",
      apple: "/image/logo/logo.png",
    },
    appleWebApp: { capable: true, title: m.appName, statusBarStyle: "black-translucent" },
    openGraph: {
      type: "website",
      title: m.ogTitle,
      description: m.description,
      url: localePath(lang),
      siteName: m.siteName,
      locale: OG_LOCALE[lang],
      images: [{ url: "/image/logo/logo.png", width: 1200, height: 630, alt: m.logoAlt, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.twitterTitle,
      description: m.twitterDescription,
      images: ["/image/logo/logo.png"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0C1A35",
};

export default async function RootLayout({ children, params }: LayoutProps<"/v3/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body>
        <I18nProvider locale={lang} dict={dict}>
          <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
