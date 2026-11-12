"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Pin } from "lucide-react";
import Link from "@/v3/i18n/Link";
import { useDictionary, useLocale } from "@/v3/i18n/I18nProvider";
import { sortedNotices } from "@/v3/data/notices";
import { cn } from "@/v3/lib/cn";

const PER_PAGE = 10;

/** Change request §7: full notice list (title + date), pinned first then newest, 10 per page. */
export default function NoticeListPage() {
  const { notice: t } = useDictionary();
  const locale = useLocale();
  const notices = sortedNotices();
  const pages = Math.max(1, Math.ceil(notices.length / PER_PAGE));
  const [page, setPage] = useState(1);
  const visible = notices.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <main>
      <section className="bg-[#F6F8FC] pt-[132px] pb-14 md:pt-[160px] md:pb-16">
        <div className="mx-auto max-w-[1080px] px-6 md:px-8">
          <p className="text-[12px] font-bold tracking-[0.3em] text-[#1F5FE0]">{t.eyebrow}</p>
          <h1 className="mt-3 text-[2rem] font-bold tracking-[-0.02em] text-[#14213D] md:text-[2.75rem]">{t.title}</h1>
          <p className="mt-4 text-[16px] leading-relaxed text-[#4A5873]">{t.lead}</p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1080px] px-6 md:px-8">
          {notices.length === 0 ? (
            <p className="border-y border-[#E3E8F0] py-16 text-center text-[15px] text-[#4A5873]">{t.empty}</p>
          ) : (
            <>
              <div className="hidden grid-cols-[1fr_8rem] border-y-2 border-[#14213D] py-3 text-[14px] font-bold text-[#14213D] md:grid">
                <span className="pl-2">{t.columns.title}</span>
                <span className="text-center">{t.columns.date}</span>
              </div>
              <ul className="border-t-2 border-[#14213D] md:border-t-0">
                {visible.map((notice) => (
                  <li key={notice.id} className="border-b border-[#E3E8F0]">
                    <Link
                      href={`/notice/${notice.id}`}
                      className="grid gap-1 px-2 py-5 transition-colors hover:bg-[#F6F8FC] md:grid-cols-[1fr_8rem] md:items-center md:gap-0"
                    >
                      <span className="flex min-w-0 items-center gap-2 text-[16px] font-medium text-[#14213D]">
                        {notice.pinned && (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#F2F6FD] px-2 py-0.5 text-[12px] font-bold text-[#1F5FE0]">
                            <Pin size={12} aria-hidden />
                            {t.pinned}
                          </span>
                        )}
                        <span className="truncate">{notice.title[locale]}</span>
                      </span>
                      <span className="text-[14px] text-[#4A5873] tabular-nums md:text-center">
                        {notice.date.replaceAll("-", ".")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {pages > 1 && (
                <nav aria-label={t.title} className="mt-10 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    aria-label={t.prev}
                    className="flex size-11 items-center justify-center rounded-full border border-[#E3E8F0] text-[#14213D] disabled:opacity-40"
                  >
                    <ChevronLeft size={18} aria-hidden />
                  </button>
                  {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPage(n)}
                      aria-current={n === page ? "page" : undefined}
                      aria-label={t.page.replace("{page}", String(n))}
                      className={cn(
                        "flex size-11 items-center justify-center rounded-full text-[15px] font-semibold tabular-nums",
                        n === page ? "bg-[#14213D] text-white" : "border border-[#E3E8F0] text-[#14213D]",
                      )}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(pages, p + 1))}
                    disabled={page === pages}
                    aria-label={t.next}
                    className="flex size-11 items-center justify-center rounded-full border border-[#E3E8F0] text-[#14213D] disabled:opacity-40"
                  >
                    <ChevronRight size={18} aria-hidden />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
