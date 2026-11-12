"use client";

import { ArrowRight } from "lucide-react";
import Link from "@/v3/i18n/Link";
import { useDictionary } from "@/v3/i18n/I18nProvider";

/** Change request §12: five services in the new order and names. Same order as `home.services.items`. */
const SERVICES = [
  { anchor: "mice", image: "/image/main/m-5.jpg" },
  { anchor: "marketing", image: "/image/main/m-6.jpg" },
  { anchor: "exhibition", image: "/image/main/m-4.jpg" },
  { anchor: "buyer", image: "/image/main/m-8.jpg" },
  { anchor: "trade", image: "/image/main/m-7.jpg" },
];

export default function ServicesSection() {
  const { home } = useDictionary();
  const services = home.services;
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <p className="text-[12px] font-bold tracking-[0.3em] text-[#1F5FE0]">{services.eyebrow}</p>
        <h2 className="mt-3 text-[1.75rem] font-bold tracking-[-0.02em] text-[#14213D] md:text-[2.25rem]">
          {services.title}
        </h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const item = services.items[i];
            return (
              <li key={service.anchor}>
                <Link
                  href={`/services#${service.anchor}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E3E8F0] bg-white transition-shadow hover:shadow-[0_16px_40px_rgba(20,33,61,0.08)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.image} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <p className="text-[13px] font-bold text-[#1F5FE0] tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-[19px] font-bold text-[#14213D]">{item.title}</h3>
                    <p className="mt-3 flex-1 text-[15px] leading-[1.75] text-[#4A5873]">{item.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1F5FE0]">
                      {services.more}
                      <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
