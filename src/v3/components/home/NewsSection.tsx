"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ExternalLink } from "lucide-react";
import Link from "@/v3/i18n/Link";
import { useDictionary, useLocale } from "@/v3/i18n/I18nProvider";
import { SOCIAL_LINKS } from "@/v3/config/social";
import { BLOG_POSTS } from "@/v3/data/blog";
import { sortedNotices } from "@/v3/data/notices";
import { cn } from "@/v3/lib/cn";

type Tab = "blog" | "notice";

/**
 * Change request §7: "행사 후기와 소식" with Blog (default, the lead) and Notices tabs.
 * Blog: three large photo cards. Notices: three plain "title + date" rows. The notice tab is hidden when there are none.
 */
export default function NewsSection() {
  const { home } = useDictionary();
  const locale = useLocale();
  const news = home.news;
  const notices = sortedNotices().slice(0, 3);
  const tabs: Tab[] = notices.length > 0 ? ["blog", "notice"] : ["blog"];
  const [active, setActive] = useState<Tab>("blog");
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ blog: null, notice: null });
  const blogUrl = SOCIAL_LINKS.blog;

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tabs[(tabs.indexOf(active) + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const viewAll =
    active === "notice" ? (
      <Link href="/notice" className="text-[14px] font-semibold text-[#14213D] hover:text-[#1F5FE0]">
        {news.viewAll}
      </Link>
    ) : blogUrl ? (
      <a
        href={blogUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#14213D] hover:text-[#1F5FE0]"
      >
        {news.viewAll}
        <ExternalLink size={14} aria-hidden />
        <span className="sr-only">({news.newWindow})</span>
      </a>
    ) : null;

  return (
    <section className="bg-[#F6F8FC] py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[12px] font-bold tracking-[0.3em] text-[#1F5FE0]">{news.eyebrow}</p>
            <h2 className="mt-3 text-[1.75rem] font-bold tracking-[-0.02em] text-[#14213D] md:text-[2.25rem]">
              {news.title}
            </h2>
          </div>
          {blogUrl ? (
            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-[#1F5FE0] px-6 text-[15px] font-bold text-white transition-colors hover:bg-[#174BB5] sm:self-auto"
            >
              {news.blogCta}
              <ExternalLink size={16} aria-hidden />
              <span className="sr-only">({news.newWindow})</span>
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex h-12 cursor-not-allowed items-center justify-center gap-2 self-start rounded-full border border-[#D5DCE8] bg-white px-6 text-[15px] font-bold text-[#4A5873] sm:self-auto"
            >
              {news.blogCta}
              <span className="rounded-full bg-[#F2F6FD] px-2 py-0.5 text-[12px] text-[#1F5FE0]">{news.pending}</span>
            </span>
          )}
        </div>

        <div className="mt-10 flex items-end justify-between gap-4 border-b border-[#D5DCE8]">
          <div role="tablist" aria-label={news.tabsLabel} className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[tab] = el;
                }}
                type="button"
                role="tab"
                id={`news-tab-${tab}`}
                aria-selected={active === tab}
                aria-controls={`news-panel-${tab}`}
                tabIndex={active === tab ? 0 : -1}
                onClick={() => setActive(tab)}
                onKeyDown={onTabKey}
                className={cn(
                  "relative -mb-px h-12 text-[16px] font-bold transition-colors",
                  active === tab
                    ? "border-b-[3px] border-[#1F5FE0] text-[#14213D]"
                    : "border-b-[3px] border-transparent text-[#4A5873] hover:text-[#14213D]",
                )}
              >
                {news.tabs[tab]}
              </button>
            ))}
          </div>
          <div className="pb-3">{viewAll}</div>
        </div>

        {active === "blog" && (
          <ul
            role="tabpanel"
            id="news-panel-blog"
            aria-labelledby="news-tab-blog"
            className="mt-8 grid gap-6 md:grid-cols-3"
          >
            {BLOG_POSTS.slice(0, 3).map((post) => {
              const card = (
                <>
                  <div className="overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt=""
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-4 text-[17px] leading-snug font-bold text-[#14213D] md:text-[18px]">
                    {post.title[locale]}
                  </h3>
                  <p className="mt-2 text-[14px] text-[#4A5873] tabular-nums">{post.date.replaceAll("-", ".")}</p>
                </>
              );
              return (
                <li key={post.id}>
                  {post.url ? (
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="group block">
                      {card}
                      <span className="sr-only">({news.newWindow})</span>
                    </a>
                  ) : (
                    <div className="group">{card}</div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {active === "notice" && (
          <ul role="tabpanel" id="news-panel-notice" aria-labelledby="news-tab-notice" className="mt-4">
            {notices.map((notice) => (
              <li key={notice.id} className="border-b border-[#E3E8F0]">
                <Link
                  href={`/notice/${notice.id}`}
                  className="flex min-h-14 items-center justify-between gap-6 py-4 text-[15px] text-[#14213D] hover:text-[#1F5FE0]"
                >
                  <span className="min-w-0 truncate font-medium">{notice.title[locale]}</span>
                  <span className="shrink-0 text-[14px] text-[#4A5873] tabular-nums">
                    {notice.date.replaceAll("-", ".")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
