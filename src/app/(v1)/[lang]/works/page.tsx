import WorksPage from "@/v1/views/WorksPage";
import { pageMetadata } from "@/v1/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/[lang]/works">) {
  return pageMetadata(params, "works", "/works");
}

export default function Page() {
  return <WorksPage />;
}
