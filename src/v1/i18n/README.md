# i18n (ko / en)

Routes live under `src/app/[lang]/`. `src/proxy.ts` redirects un-prefixed URLs (`/about`) to a locale
(`/ko/about`), choosing by the `NEXT_LOCALE` cookie (set by the language switcher), then
`Accept-Language`, then `ko`. Old hash links (`/#/about`) are forwarded by `LegacyHashRedirect`.

## Files

```
dictionaries/
  ko/common.json        shared shell: metadata, nav, footer, cta, languageSwitcher, common
  ko/<page>.json        one namespace per page: home, about, services, works,
                        contact, contactDetail, buyerMatching
  en/...                same files, same keys
dictionaries.ts         loads and merges them; the Korean files define the `Dictionary` type,
                        so a key missing from an English file fails `tsc` / `next build`
pageMetadata.ts         per-page <title>/description from `<namespace>.meta` + hreflang alternates
I18nProvider.tsx        useDictionary() / useLocale() for client components
Link.tsx                next/link wrapper that prefixes the current locale
usePathname.ts          pathname without the locale prefix
```

## Editing copy

Change the string in both `ko/<page>.json` and `en/<page>.json`. Components read it with
`const { about, common } = useDictionary();`.

## Rules

- Import `Link` from `@/i18n/Link`, not `next/link`.
- Use `usePathname` from `@/i18n/usePathname` when comparing against un-prefixed paths.
- Keep inline highlights as separate keys (`titleLead` / `titleHighlight` / `titleTail`); do not put
  HTML in the dictionaries.
- Adding a language: add it to `locales` in `config.ts`, add a `dictionaries/<lang>/` folder with every
  namespace, and register the loader in `dictionaries.ts`.
