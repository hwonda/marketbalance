import WorksPage from "@/v3/views/WorksPage";
import { pageMetadata } from "@/v3/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/v3/[lang]/works">) {
  return pageMetadata(params, "works", "/works");
}

export default function Page() {
  return <WorksPage />;
}
