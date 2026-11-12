import ContactDetailPage from "@/views/ContactDetailPage";
import { pageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/[lang]/contact-detail">) {
  return pageMetadata(params, "contactDetail", "/contact-detail");
}

export default function Page() {
  return <ContactDetailPage />;
}
