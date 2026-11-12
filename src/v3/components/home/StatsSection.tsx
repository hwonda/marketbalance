"use client";

import { useDictionary } from "@/v3/i18n/I18nProvider";

/** Change request §1: title + four figure cards, with "2026년 기준" shown directly under the cards (mandatory). */
export default function StatsSection() {
  const { home } = useDictionary();
  const stats = home.stats;
  return (
    <section className="bg-[#F6F8FC] py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <p className="text-[12px] font-bold tracking-[0.3em] text-[#1F5FE0]">{stats.eyebrow}</p>
        <h2 className="mt-3 text-[1.75rem] font-bold tracking-[-0.02em] text-[#14213D] md:text-[2.25rem]">
          {stats.title}
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {stats.items.map((item) => (
            <li key={item.label} className="rounded-2xl border border-[#E3E8F0] bg-white p-6 md:p-8">
              <p className="flex items-baseline gap-1 text-[#1F5FE0]">
                <span className="font-display text-[2rem] leading-none font-bold tabular-nums md:text-[2.75rem]">
                  {item.value}
                </span>
                {item.unit && <span className="text-[15px] font-semibold md:text-[17px]">{item.unit}</span>}
              </p>
              <p className="mt-3 text-[14px] font-medium text-[#4A5873] md:text-[15px]">{item.label}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-right text-[13px] font-medium text-[#4A5873]">{stats.basis}</p>
      </div>
    </section>
  );
}
