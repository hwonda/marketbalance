import HomePage from "@/views/HomePage";
import { pageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/[lang]">) {
  return pageMetadata(params, "home", "/");
}

export default function Page() {
  return <HomePage />;
}
