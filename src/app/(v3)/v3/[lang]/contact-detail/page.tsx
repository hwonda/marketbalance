import ContactDetailPage from "@/v3/views/ContactDetailPage";
import { pageMetadata } from "@/v3/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/v3/[lang]/contact-detail">) {
  return pageMetadata(params, "contactDetail", "/contact-detail");
}

export default function Page() {
  return <ContactDetailPage />;
}
