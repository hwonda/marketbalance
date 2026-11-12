import ContactPage from "@/v3/views/ContactPage";
import { pageMetadata } from "@/v3/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/v3/[lang]/contact">) {
  return pageMetadata(params, "contact", "/contact");
}

export default function Page() {
  return <ContactPage />;
}
