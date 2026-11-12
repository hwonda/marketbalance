import NoticeListPage from "@/v3/views/NoticeListPage";
import { pageMetadata } from "@/v3/i18n/pageMetadata";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata(params, "notice", "/notice");
}

export default function Page() {
  return <NoticeListPage />;
}
