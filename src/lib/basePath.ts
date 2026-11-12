/**
 * Sub-path this build is served under, e.g. "/v2" when the redesign runs as a zone of the main site.
 * Empty for a root deployment. Set NEXT_PUBLIC_BASE_PATH at build time (next.config reads the same value).
 *
 * next/link, the router and Next's own assets get the base path automatically;
 * plain <img src>, CSS url(), fetch() and metadata URLs do not, so wrap those with `withBasePath`.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  return path.startsWith("/") ? `${BASE_PATH}${path}` : path;
}
