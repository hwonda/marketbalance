import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's built-in font sizes, so it would read our custom sizes
 * (`text-h4`, `text-small`, …) as colours and drop them whenever a colour like `text-blue` follows.
 * Registering them keeps size and colour classes independent. Keep in sync with `--text-*` in globals.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["caption", "small", "body", "lead", "h4", "h3", "h2", "h1", "display"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
