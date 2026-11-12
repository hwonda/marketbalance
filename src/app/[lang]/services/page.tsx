import ServicesPage from "@/views/ServicesPage";
import { pageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/[lang]/services">) {
  return pageMetadata(params, "services", "/services");
}

export default function Page() {
  return <ServicesPage />;
}
