# Local fonts

Drop `.woff2` files here and load them with `next/font/local`.

Needed for the faces the skills name that are **not** on Google Fonts and have no
npm package: `Satoshi`, `Cabinet Grotesk`, `Switzer`, `Clash Display` (free from
[Fontshare](https://www.fontshare.com)), plus commercial faces like
`Monument Extended`, `PP Editorial New`, `Lyon Text` and `Neue Haas`.

```ts
// app/layout.tsx
import localFont from "next/font/local";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-sans",
  display: "swap",
});
```

Everything else the skills name is reachable through `next/font/google` with no
download. See CLAUDE.md for the verified list.

Do not load fonts with a `<link>` tag. `design-taste-frontend` forbids it, and it
costs you the zero-layout-shift guarantee `next/font` provides.
