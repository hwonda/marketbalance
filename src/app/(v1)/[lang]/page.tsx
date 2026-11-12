import HomePage from "@/v1/views/HomePage";
import { pageMetadata } from "@/v1/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/[lang]">) {
  return pageMetadata(params, "home", "/");
}

export default function Page() {
  return <HomePage />;
}
