import ServicesPage from "@/v3/views/ServicesPage";
import { pageMetadata } from "@/v3/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/v3/[lang]/services">) {
  return pageMetadata(params, "services", "/services");
}

export default function Page() {
  return <ServicesPage />;
}
