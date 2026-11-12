"use client";

import { CalendarDays, Handshake, MapPin, MessageSquareText, Presentation, TrendingUp } from "lucide-react";
import Link from "@/v3/i18n/Link";
import { useDictionary } from "@/v3/i18n/I18nProvider";

/** Change request §1: six quick links — inquiry, four services, location. Same order as `home.quick.items`. */
const LINKS = [
  { href: "/contact", Icon: MessageSquareText },
  { href: "/services#mice", Icon: CalendarDays },
  { href: "/services#marketing", Icon: TrendingUp },
  { href: "/services#exhibition", Icon: Presentation },
  { href: "/services#buyer", Icon: Handshake },
  { href: "/contact-detail", Icon: MapPin },
];

export default function QuickMenu() {
  const { home } = useDictionary();
  return (
    <nav aria-label={home.quick.label} className="bg-white py-12 md:py-14">
      <ul className="mx-auto grid max-w-[1280px] grid-cols-2 gap-3 px-6 sm:grid-cols-3 md:px-8 lg:grid-cols-6 lg:gap-4">
        {LINKS.map(({ href, Icon }, i) => (
          <li key={href}>
            <Link
              href={href}
              className="flex h-full min-h-[120px] flex-col items-center justify-center gap-3 rounded-2xl border border-[#E3E8F0] bg-white px-3 py-5 text-center transition-colors hover:border-[#1F5FE0] hover:bg-[#F6F8FC]"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-[#F2F6FD] text-[#1F5FE0]">
                <Icon size={22} strokeWidth={1.8} aria-hidden />
              </span>
              <span className="text-[14px] leading-snug font-semibold text-[#14213D]">{home.quick.items[i]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
