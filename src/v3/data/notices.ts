/**
 * Notices (change request §7). Until an admin screen exists, notices are edited here.
 * The four entries below are the client's EXAMPLE notices from the change request (dates and titles verbatim);
 * their summaries and bodies are placeholders to be replaced with the real announcements.
 */
export type Notice = {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  /** Pinned notices are listed first. */
  pinned?: boolean;
  title: { ko: string; en: string };
  summary: { ko: string; en: string };
  /** Line breaks are preserved on the detail page. */
  body: { ko: string; en: string };
};

const PLACEHOLDER = {
  ko: "※ 예시 공지입니다. 실제 공지 내용은 등록 후 교체됩니다.",
  en: "※ This is a sample notice. The actual announcement will replace it once it is published.",
};

export const NOTICES: Notice[] = [
  {
    id: "2026-export-meetings-recruitment",
    date: "2026-11-10",
    title: {
      ko: "2026년 하반기 수출상담회 참가기업 모집 안내",
      en: "Call for participants: 2026 second-half export meetings",
    },
    summary: {
      ko: "하반기 수출상담회에 참가할 국내 기업을 모집합니다.",
      en: "We are recruiting Korean companies for the second-half export meetings.",
    },
    body: {
      ko: `하반기 수출상담회에 참가할 국내 기업을 모집합니다.\n모집 일정과 신청 방법은 확정되는 대로 안내드립니다.\n\n${PLACEHOLDER.ko}`,
      en: `We are recruiting Korean companies for the second-half export meetings.\nSchedules and how to apply will be announced once confirmed.\n\n${PLACEHOLDER.en}`,
    },
  },
  {
    id: "awc-bangkok-2026",
    date: "2026-11-04",
    title: {
      ko: "AWC 태국 방콕 2026 수출상담회 개최 안내",
      en: "AWC Bangkok, Thailand 2026 export meetings",
    },
    summary: {
      ko: "AWC 태국 방콕 2026 수출상담회 개최 일정을 안내합니다.",
      en: "Dates and details for the AWC Bangkok 2026 export meetings.",
    },
    body: {
      ko: `AWC 태국 방콕 2026 수출상담회 개최 일정을 안내합니다.\n\n${PLACEHOLDER.ko}`,
      en: `Dates and details for the AWC Bangkok 2026 export meetings.\n\n${PLACEHOLDER.en}`,
    },
  },
  {
    id: "naver-blog-launch",
    date: "2026-10-28",
    title: {
      ko: "마켓발란스 공식 네이버 블로그를 개설했습니다",
      en: "Market Balance has opened its official Naver blog",
    },
    summary: {
      ko: "행사 후기와 소식을 공식 블로그에서 전해 드립니다.",
      en: "Event reviews and news are now posted on our official blog.",
    },
    body: {
      ko: `행사 후기와 소식을 공식 블로그에서 전해 드립니다.\n\n${PLACEHOLDER.ko}`,
      en: `Event reviews and news are now posted on our official blog.\n\n${PLACEHOLDER.en}`,
    },
  },
  {
    id: "year-end-office-hours",
    date: "2026-10-15",
    title: {
      ko: "연말·연초 사무실 운영 일정 안내",
      en: "Office hours over the year-end holidays",
    },
    summary: {
      ko: "연말·연초 기간의 사무실 운영 일정을 안내합니다.",
      en: "Our office schedule over the year-end and new-year period.",
    },
    body: {
      ko: `연말·연초 기간의 사무실 운영 일정을 안내합니다.\n\n${PLACEHOLDER.ko}`,
      en: `Our office schedule over the year-end and new-year period.\n\n${PLACEHOLDER.en}`,
    },
  },
];

/** Pinned first, then newest first. */
export function sortedNotices(list: Notice[] = NOTICES): Notice[] {
  return [...list].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.date.localeCompare(a.date));
}

export function findNotice(id: string): Notice | undefined {
  return NOTICES.find((notice) => notice.id === id);
}
