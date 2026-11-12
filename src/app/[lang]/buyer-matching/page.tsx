import BuyerMatchingPage from "@/views/BuyerMatchingPage";
import { pageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/[lang]/buyer-matching">) {
  return pageMetadata(params, "buyerMatching", "/buyer-matching");
}

export default function Page() {
  return <BuyerMatchingPage />;
}
