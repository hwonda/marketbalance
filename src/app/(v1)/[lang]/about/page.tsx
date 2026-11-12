import AboutPage from "@/v1/views/AboutPage";
import { pageMetadata } from "@/v1/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  return pageMetadata(params, "about", "/about");
}

export default function Page() {
  return <AboutPage />;
}
