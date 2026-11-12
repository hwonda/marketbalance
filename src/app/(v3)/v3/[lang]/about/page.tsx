import AboutPage from "@/v3/views/AboutPage";
import { pageMetadata } from "@/v3/i18n/pageMetadata";

export function generateMetadata({ params }: PageProps<"/v3/[lang]/about">) {
  return pageMetadata(params, "about", "/about");
}

export default function Page() {
  return <AboutPage />;
}
