import ContactPage from "@/views/ContactPage";
import { pageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/v2/[lang]/contact">) {
  return pageMetadata(params, "contact", "/contact");
}

export default function Page() {
  return <ContactPage />;
}
