import HomePage from "@/v3/views/HomePage";
import { pageMetadata } from "@/v3/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/v3/[lang]">) {
  return pageMetadata(params, "home", "/");
}

export default function Page() {
  return <HomePage />;
}
