import type { ReactNode } from "react";
import Container from "./Container";

type PageIntroProps = {
  title: ReactNode;
  lead?: ReactNode;
  /** Anything placed under the lead, such as buttons or a section index. */
  children?: ReactNode;
};

/** Opening block of a sub page: the page name as the h1 and one sentence on what the page is for. */
export default function PageIntro({ title, lead, children }: PageIntroProps) {
  return (
    <section className="border-b border-line bg-paper pt-32 pb-12 md:pt-40 md:pb-16">
      <Container>
        <h1 className="max-w-[18ch] text-h2 font-extrabold md:text-h1">{title}</h1>
        {lead && <p className="mt-5 max-w-[40ch] text-lead leading-relaxed text-ink-soft">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
