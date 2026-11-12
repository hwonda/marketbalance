"use client";

import { ChevronLeft } from "lucide-react";
import Link from "@/v3/i18n/Link";
import { useDictionary, useLocale } from "@/v3/i18n/I18nProvider";
import { findNotice } from "@/v3/data/notices";

/** One notice: title, date, body with its line breaks, and a way back to the list. */
export default function NoticeDetailPage({ id }: { id: string }) {
  const { notice: t } = useDictionary();
  const locale = useLocale();
  const notice = findNotice(id);
  if (!notice) return null;

  return (
    <main className="bg-white pt-[132px] pb-20 md:pt-[160px] md:pb-28">
      <article className="mx-auto max-w-[880px] px-6 md:px-8">
        <Link
          href="/notice"
          className="inline-flex h-11 items-center gap-1 text-[14px] font-semibold text-[#4A5873] hover:text-[#1F5FE0]"
        >
          <ChevronLeft size={16} aria-hidden />
          {t.title}
        </Link>
        <header className="mt-4 border-y-2 border-[#14213D] py-6">
          <h1 className="text-[1.5rem] leading-snug font-bold text-[#14213D] md:text-[2rem]">{notice.title[locale]}</h1>
          <p className="mt-3 text-[14px] text-[#4A5873] tabular-nums">
            <span className="sr-only">{t.columns.date} </span>
            {notice.date.replaceAll("-", ".")}
          </p>
        </header>
        <div className="border-b border-[#E3E8F0] py-10 text-[16px] leading-[1.9] whitespace-pre-line text-[#14213D]">
          {notice.body[locale]}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/notice"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#14213D] px-8 text-[15px] font-bold text-white transition-colors hover:bg-[#1F5FE0]"
          >
            {t.back}
          </Link>
        </div>
      </article>
    </main>
  );
}
