import type { Locale } from "@/v3/i18n/config";

/**
 * Event photos and results per portfolio project (change request §13).
 *
 * Keyed by the project id used in `works.projects` (src/v3/i18n/dictionaries/{ko,en}/works.json).
 * A project with no photos and no results is listed but not clickable; add either one and its row
 * gets a ">" and opens the detail popup.
 *
 * Results are plain text: line breaks are kept, and lines starting with "- " or "• " render as a bullet list.
 *
 * Example:
 *   3: {
 *     photos: [
 *       { src: "/image/works/3-1.jpg", alt: { ko: "IE expo China 한국관 전경", en: "Korea Pavilion at IE expo China" } },
 *     ],
 *     results: {
 *       ko: "참가기업 12개사 상담 지원\n- 상담 120건\n- 계약 추진 8건",
 *       en: "Supported 12 exhibitors\n- 120 meetings\n- 8 deals in progress",
 *     },
 *   },
 *
 * Put the image files in public/ (e.g. public/image/works/) and reference them from the site root.
 * An admin screen to manage this is out of scope for now; edit this file instead.
 */

export type WorkPhoto = { src: string; alt: Record<Locale, string> };
export type WorkMedia = { photos: WorkPhoto[]; results: Record<Locale, string> };

export const WORK_MEDIA: Partial<Record<number, WorkMedia>> = {};

/** Media for a project, or null when there is nothing to show (the row is then not clickable). */
export function mediaFor(id: number): WorkMedia | null {
  const media = WORK_MEDIA[id];
  if (!media) return null;
  const hasResults = Object.values(media.results).some((text) => text.trim().length > 0);
  return media.photos.length > 0 || hasResults ? media : null;
}
