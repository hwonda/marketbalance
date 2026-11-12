import WorksPage from "@/views/WorksPage";
import { pageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/v2/[lang]/works">) {
  return pageMetadata(params, "works", "/works");
}

export default function Page() {
  return <WorksPage />;
}
