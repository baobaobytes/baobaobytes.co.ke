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

Every page also has a Kiswahili version at `sw/<same file name>`. The **Kiswahili / English** button in the menu switches between the two versions of the same page. It is a plain link, so it works without JavaScript and stores nothing.

## Folders

- `src/pages/`: one file per page in English (edit these)
- `src/sw/`: the same pages in Kiswahili, with the same file names. When you change an English page, change its Kiswahili copy too. The build stops if a Kiswahili page is missing.
- `src/assets/`: shared `b3.css`, `b3.js` and images. `b3-sw.js` holds the Kiswahili text for the games and tools and loads only on Kiswahili pages.
- `build.mjs`: adds the shared menu and footer (in both languages), and writes the finished site
- `site/`: the built website (upload the contents of this folder to the web host)

## Build

```sh
node build.mjs
```

This rebuilds `site/` from `src/`. Edit the files in `src/`, not `site/`.

## Deploy

The site is published with GitHub Pages. The workflow in `.github/workflows/pages.yml` runs `node build.mjs` and publishes `site/` on every push to `main`. You can also run it by hand from the **Actions** tab.

One-time setup in the GitHub repo:

1. **Settings → Pages → Source:** choose **GitHub Actions**.
2. **Custom domain:** enter `baobaobytes.co.ke` under Settings → Pages, then point the domain's DNS at GitHub Pages. Tick **Enforce HTTPS** once the certificate is ready.

## Privacy

The website collects no personal data. Games and tools run in the visitor's browser. The only thing stored is the low-data mode setting, kept in the visitor's own browser.

## License

Proprietary. Copyright © 2026 BaobaoBytes. All rights reserved. See [LICENSE](LICENSE). For commercial licensing, contact hello@baobaobytes.co.ke.
