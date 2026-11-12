import ServicesPage from "@/v1/views/ServicesPage";
import { pageMetadata } from "@/v1/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/[lang]/services">) {
  return pageMetadata(params, "services", "/services");
}

export default function Page() {
  return <ServicesPage />;
}
