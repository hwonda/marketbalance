import ContactPage from "@/v1/views/ContactPage";
import { pageMetadata } from "@/v1/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  return pageMetadata(params, "contact", "/contact");
}

export default function Page() {
  return <ContactPage />;
}
