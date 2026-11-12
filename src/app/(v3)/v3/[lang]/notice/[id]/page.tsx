import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NoticeDetailPage from "@/v3/views/NoticeDetailPage";
import { pageMetadata } from "@/v3/i18n/pageMetadata";
import { hasLocale } from "@/v3/i18n/config";
import { getDictionary } from "@/v3/i18n/dictionaries";
import { findNotice, NOTICES } from "@/v3/data/notices";

type Props = { params: Promise<{ lang: string; id: string }> };

export function generateStaticParams() {
  return NOTICES.map((notice) => ({ id: notice.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  const notice = findNotice(id);
  const base = await pageMetadata(params, "notice", `/notice/${id}`);
  if (!notice || !hasLocale(lang)) return base;
  const dict = await getDictionary(lang);
  return { ...base, title: `${notice.title[lang]} | ${dict.metadata.appName}`, description: notice.summary[lang] };
}

/** Reading `params` is request data under Cache Components, so it happens inside a Suspense boundary. */
async function NoticeDetail({ params }: Props) {
  const { id } = await params;
  if (!findNotice(id)) notFound();
  return <NoticeDetailPage id={id} />;
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <NoticeDetail params={params} />
    </Suspense>
  );
}
