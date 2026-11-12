/**
 * Official channels shown in the footer (change request §5). Paste each URL when the client sends it;
 * an empty value renders the icon as a disabled "coming soon" item instead of a dead link.
 */
export const SOCIAL_LINKS = {
  blog: "", // Naver blog, e.g. https://blog.naver.com/<id>
  linkedin: "",
  instagram: "",
  youtube: "",
} as const;

export type SocialKey = keyof typeof SOCIAL_LINKS;

/** Naver Map search for the office, opened from the location section (change request §16). */
export const NAVER_MAP_URL = `https://map.naver.com/p/search/${encodeURIComponent("경기도 안양시 동안구 시민대로 398")}`;
