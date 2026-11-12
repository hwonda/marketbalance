import AboutPage from "@/views/AboutPage";
import { pageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  return pageMetadata(params, "about", "/about");
}

export default function Page() {
  return <AboutPage />;
}
