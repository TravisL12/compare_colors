# ColorSnippet

**[colorsnippet.com](https://colorsnippet.com)** — paste any text and every
colour in it becomes a swatch you can compare, sort and copy.

Drop in a stylesheet, a design token file, a config, an email from a client, and
ColorSnippet pulls out every hex, `rgb()`, `hsl()` and CSS colour name it finds.
Click a colour in the text to jump to its swatch, click a swatch to jump back to
the text, and click any value to copy it.

Everything runs in the browser. Nothing is uploaded.

## Features

- **Extraction** — hex (3, 4, 6 and 8 digit), `rgb()`/`rgba()`, `hsl()`/`hsla()`
  and all 148 CSS colour names, with alpha preserved.
- **Two-way navigation** — text ⇄ grid, including stepping through every
  occurrence of a repeated colour.
- **Closest-match sorting** — order swatches by distance from a comparison
  colour, either straight RGB distance (chromatic) or CIELAB Delta-E 94, which
  ranks by perceived rather than numeric difference.
- **One-click copy** in any format.

## Development

```bash
yarn install
yarn dev          # vite dev server on :5173
```

| Script | What it does |
| --- | --- |
| `yarn dev` | Dev server with HMR |
| `yarn build` | Typechecks (`tsc -b`) then builds to `dist/` |
| `yarn preview` | Serve the built output locally |
| `yarn test` | Run the test suite once |
| `yarn test:watch` | Tests in watch mode |
| `yarn lint` | ESLint |
| `yarn verify` | Typecheck + lint + tests — run this before deploying |

The build **will fail on a type error**. That is deliberate: `vite build` alone
strips types without checking them, so `tsc -b` runs first.

## Architecture

```
src/
  models/color.ts            One Color class — the single parsing boundary.
                             Give it any notation, get every other one back.
  utilities/
    parse-color-text.ts      Slices raw text into offset-tagged segments so a
                             click can resolve to the exact occurrence.
    color-utils.ts           Matching regexes, clipboard, contrast picking.
    hexadecimal-utils.ts     Hex <-> channels.
    rgb-utils.ts             rgb() <-> hex.
    hsl-utils.ts             hsl() <-> rgb.
    distance-utils.ts        CIELAB conversion and Delta-E 94.
  components/
    App/                     Owns the text, parses it, owns the selection.
    ColorInput/              The textarea with the highlight layer behind it.
    ColorGrid/               Swatch grid, comparison panel, selection details.
```

Two things worth knowing before editing:

- **Parsing happens once, in `App`.** Both panes read the same `segments` array.
  Don't re-parse in a child, and don't write state back up during render.
- **The colour-matching regexes must never be shared `/g` instances.** `.test()`
  on a global regex advances `lastIndex`, so a shared one returns alternating
  answers for the same input. `highlightRegex()` returns a fresh instance per
  call for exactly this reason, and there are tests pinning that behaviour.

## Deployment

The build is a static bundle — no server, no runtime config. `yarn build`
produces `dist/`, which is served from the **domain root** (`base: "/"` in
`vite.config.ts`).

The repo is cloned on the VPS and built there. A shared Caddy container serves
several sites, mounting each one's `dist/` under `/srv`:

```yaml
# docker-compose.yaml, alongside the Caddyfile
services:
  caddy:
    image: caddy
    restart: always
    ports:
      - 80:80
      - 443:443
    volumes:
      - ./data:/data
      - ./config:/config
      - ./Caddyfile:/etc/caddy/Caddyfile
      - /home/travis/development/compare_colors/dist:/srv/colorsnippet:ro
```

```caddyfile
colorsnippet.com, www.colorsnippet.com {
    root * /srv/colorsnippet
    encode gzip zstd

    # Hashed asset filenames are safe to cache forever.
    @assets path /assets/*
    header @assets Cache-Control "public, max-age=31536000, immutable"

    # The HTML shell must not be cached, or a deploy won't be picked up.
    header /index.html Cache-Control "no-cache"

    header {
        X-Content-Type-Options nosniff
        Referrer-Policy strict-origin-when-cross-origin
    }

    try_files {path} /index.html
    file_server
}
```

Deploy is a rebuild in place:

```bash
git pull
yarn install
yarn verify && yarn build     # writes dist/, which Caddy is already serving
```

Notes:

- **Point DNS at the VPS before adding the site block.** Caddy provisions the
  certificate on the first request for the hostname; if the name does not
  resolve to the box yet, the ACME challenge fails and Caddy backs off before
  retrying.
- **Changing the volume list needs `docker compose up -d`**, not a restart.
- **`dist/` is gitignored**, so a fresh clone has no `dist` directory and Docker
  will create an empty one at that path. Caddy serves 404s until the first
  build.
- **HSTS is deliberately not set.** `Strict-Transport-Security` is cached by
  browsers for its full max-age and cannot be revoked, so only add it once the
  domain is permanently HTTPS.

## Licence

Colour conversion and distance routines are adapted from prior work, credited
inline at each function.
