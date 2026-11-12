import ContactDetailPage from "@/v1/views/ContactDetailPage";
import { pageMetadata } from "@/v1/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/[lang]/contact-detail">) {
  return pageMetadata(params, "contactDetail", "/contact-detail");
}

export default function Page() {
  return <ContactDetailPage />;
}
