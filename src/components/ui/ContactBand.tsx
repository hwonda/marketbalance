"use client";

import { useDictionary } from "@/i18n/I18nProvider";
import Container from "./Container";
import { ButtonLink } from "./Button";

/** Closing block on every page: one sentence, the phone number, and the inquiry button. */
export default function ContactBand() {
  const { contactBand } = useDictionary();
  return (
    <section className="bg-blue-deep py-16 text-white md:py-20">
      <Container className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <h2 className="text-h3 font-bold md:text-h2">{contactBand.title}</h2>
          <p className="mt-4 max-w-[40ch] text-white/75">{contactBand.description}</p>
        </div>
        <div className="flex flex-col gap-4 md:col-span-5 md:items-end">
          <a href={`tel:${contactBand.phone}`} className="tabular text-h4 font-bold text-white no-underline">
            {contactBand.phoneLabel} {contactBand.phone}
          </a>
          <ButtonLink href="/contact" className="w-full md:w-auto">
            {contactBand.action}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
