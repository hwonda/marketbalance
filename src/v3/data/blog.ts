/**
 * Blog cards on the home page (change request §7).
 *
 * SAMPLE DATA: the official Naver blog has no posts wired in yet, so these three entries only show the layout.
 * Replace them with real posts (title, date, thumbnail, post URL), or feed them from the blog's RSS later.
 * A card links to its post only when `url` is set.
 */
export type BlogPost = {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  title: { ko: string; en: string };
  /** Path under public/ (or an absolute URL) */
  image: string;
  url: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "sample-ie-expo-china",
    date: "2026-10-30",
    title: {
      ko: "IE expo China 한국관 참가 현장 스케치",
      en: "On site at the Korea Pavilion, IE expo China",
    },
    image: "/image/main/m-4.jpg",
    url: "",
  },
  {
    id: "sample-intersolar",
    date: "2026-10-21",
    title: {
      ko: "인터솔라 유럽 공동관 바이어 상담회 후기",
      en: "Buyer meetings at the Intersolar Europe joint pavilion",
    },
    image: "/image/main/m-8.jpg",
    url: "",
  },
  {
    id: "sample-materials-week",
    date: "2026-10-08",
    title: {
      ko: "고기능소재위크 해외바이어 초청 상담회 현장",
      en: "Overseas buyer meetings at Advanced Materials Week",
    },
    image: "/image/main/m-5.jpg",
    url: "",
  },
];
