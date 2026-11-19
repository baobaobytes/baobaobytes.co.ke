# baobaobytes.co.ke

Website for **BaobaoBytes (B³)**, a practical, game-based cybersecurity and AI literacy programme for Kenyan children and their parents and guardians.

The site is plain HTML, CSS and JavaScript. It has no framework, and nothing needs installing apart from Node.js to run the build script.

## Pages

| File | Page |
|---|---|
| `index.html` | Landing page with skin switcher and the Spot the Trick game |
| `chipukizi.html` | Chipukizi path |
| `wabunifu.html` | Wabunifu path |
| `walinzi.html` | Walinzi path |
| `wazazi.html` | Parents and guardians |
| `apps.html` | Safe apps showcase |
| `safety.html` | Safeguarding |
| `about.html` | About |
| `get-involved.html` | Schools, partners and contact |

## Folders

- `src/pages/`: one file per page (edit these)
- `src/assets/`: shared `b3.css`, `b3.js` and images
- `build.mjs`: adds the shared menu and footer, and writes the finished site
- `site/`: the built website (upload the contents of this folder to the web host)

## Build

```sh
node build.mjs
```

This rebuilds `site/` from `src/`. Edit the files in `src/`, not `site/`.

## Privacy

The website collects no personal data. Games and tools run in the visitor's browser. The only thing stored is the low-data mode setting, kept in the visitor's own browser.

## License

Proprietary. Copyright © 2026 BaobaoBytes. All rights reserved. See [LICENSE](LICENSE). For commercial licensing, contact hello@baobaobytes.co.ke.
