import WorksPage from "@/views/WorksPage";
import { pageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/[lang]/works">) {
  return pageMetadata(params, "works", "/works");
}

export default function Page() {
  return <WorksPage />;
}
