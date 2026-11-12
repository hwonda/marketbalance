import ContactDetailPage from "@/views/ContactDetailPage";
import { pageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/v2/[lang]/contact-detail">) {
  return pageMetadata(params, "contactDetail", "/contact-detail");
}

export default function Page() {
  return <ContactDetailPage />;
}
