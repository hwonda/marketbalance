import BuyerMatchingPage from "@/v3/views/BuyerMatchingPage";
import { pageMetadata } from "@/v3/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/v3/[lang]/buyer-matching">) {
  return pageMetadata(params, "buyerMatching", "/buyer-matching");
}

export default function Page() {
  return <BuyerMatchingPage />;
}
