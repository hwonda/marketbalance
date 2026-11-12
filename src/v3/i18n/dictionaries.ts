import "server-only";
import type { Locale } from "./config";

/**
 * One JSON file per namespace and locale. `common` holds the shared shell (metadata, nav, footer, CTA);
 * every page has its own namespace. The Korean files define the type, so a key missing from an English
 * file fails the type check.
 */

type KoCommon = typeof import("./dictionaries/ko/common.json");
type KoPages = {
  home: typeof import("./dictionaries/ko/home.json");
  about: typeof import("./dictionaries/ko/about.json");
  services: typeof import("./dictionaries/ko/services.json");
  works: typeof import("./dictionaries/ko/works.json");
  contact: typeof import("./dictionaries/ko/contact.json");
  contactDetail: typeof import("./dictionaries/ko/contactDetail.json");
  buyerMatching: typeof import("./dictionaries/ko/buyerMatching.json");
  notice: typeof import("./dictionaries/ko/notice.json");
};

export type Dictionary = Omit<KoCommon, "default"> & { [K in keyof KoPages]: Omit<KoPages[K], "default"> };

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  ko: async () => ({
    ...(await import("./dictionaries/ko/common.json")).default,
    home: (await import("./dictionaries/ko/home.json")).default,
    about: (await import("./dictionaries/ko/about.json")).default,
    services: (await import("./dictionaries/ko/services.json")).default,
    works: (await import("./dictionaries/ko/works.json")).default,
    contact: (await import("./dictionaries/ko/contact.json")).default,
    contactDetail: (await import("./dictionaries/ko/contactDetail.json")).default,
    buyerMatching: (await import("./dictionaries/ko/buyerMatching.json")).default,
    notice: (await import("./dictionaries/ko/notice.json")).default,
  }),
  en: async () => ({
    ...(await import("./dictionaries/en/common.json")).default,
    home: (await import("./dictionaries/en/home.json")).default,
    about: (await import("./dictionaries/en/about.json")).default,
    services: (await import("./dictionaries/en/services.json")).default,
    works: (await import("./dictionaries/en/works.json")).default,
    contact: (await import("./dictionaries/en/contact.json")).default,
    contactDetail: (await import("./dictionaries/en/contactDetail.json")).default,
    buyerMatching: (await import("./dictionaries/en/buyerMatching.json")).default,
    notice: (await import("./dictionaries/en/notice.json")).default,
  }),
};

export const getDictionary = (locale: Locale) => loaders[locale]();

