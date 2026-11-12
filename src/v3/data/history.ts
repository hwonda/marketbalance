/**
 * Company history shown on the About page (change request §8, rows 6–8).
 * Newest year first; add a year or an item here and the timeline grows without layout changes.
 * Each item carries both languages so the list stays in one place.
 */
export type HistoryEntry = {
  year: string;
  items: { ko: string; en: string }[];
};

export const HISTORY: HistoryEntry[] = [
  {
    year: "2025",
    items: [
      {
        ko: "제1회 대한민국 산업단지 수출박람회 수행사 선정",
        en: "Selected as the operator of the 1st Korea Industrial Complex Export Fair",
      },
      {
        ko: "(재)전북특별자치도경제통상진흥원 해외 파트너사 선정",
        en: "Selected as an overseas partner of the Jeonbuk State Business Promotion Agency",
      },
      {
        ko: "메쎄뮌헨 IFAT의 시리즈 전시인 IE EXPO China (상하이, 청두, 광저우) 한국대표부 업무 시작",
        en: "Began serving as the Korea representative for IE expo China (Shanghai, Chengdu, Guangzhou), part of Messe München's IFAT series",
      },
    ],
  },
  {
    year: "2024",
    items: [{ ko: "회사설립 '마켓발란스 주식회사'", en: "Founded as Market Balance Co., Ltd." }],
  },
];
