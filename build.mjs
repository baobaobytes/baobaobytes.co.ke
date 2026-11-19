// Builds the BaobaoBytes site.
//   node build.mjs   ->  site/      (upload this folder to baobaobytes.co.ke)
//                        preview/   (same pages; home page without <html>/<head> wrapper, for the Claude artifact preview)
// Each page in src/pages starts with a line:  <!--meta {"title":"…","skin":"…","desc":"…"}-->
// Placeholders: {{game:SET}} inserts the Spot the Trick game, {{help}} inserts the helpline box.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, cpSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const SRC = join(root, 'src');
const NAV = [
  ['./', 'Home', 'index'],
  ['chipukizi.html', 'Chipukizi 9–11', 'chipukizi'],
  ['wabunifu.html', 'Wabunifu 12–14', 'wabunifu'],
  ['walinzi.html', 'Walinzi 15–18', 'walinzi'],
  ['wazazi.html', 'Wazazi · Parents', 'wazazi'],
  ['apps.html', 'Safe apps', 'apps'],
  ['safety.html', 'Safety', 'safety'],
  ['about.html', 'About', 'about'],
  ['get-involved.html', 'Get involved', 'get-involved'],
];
const FONTS = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Lilita+One&family=Sora:wght@500;700&display=swap';

const game = (set) => `<div class="game" id="game" data-set="${set}">
  <div class="phone"><div class="screen" aria-live="polite"></div></div>
  <div class="quiz"></div>
</div>`;
const help = `<div class="help">
  <p class="eyebrow">Something online worried you?</p>
  <p style="font-size:19px">Tell a trusted adult. You are not in trouble. In Kenya you can also call Childline, free, any time:</p>
  <span class="num">116</span>
  <p class="small" style="color:#E4DFFA">In danger right now? Call 999 or 112.</p>
</div>`;

const header = (page) => `<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <div class="wrap">
    <a class="logo" href="./" aria-label="BaobaoBytes home"><span class="mark">B<sup>3</sup></span><b>BaobaoBytes</b></a>
    <button class="menu" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav class="links" id="nav" aria-label="Main">
      ${NAV.map(([href, label, id]) => `<a href="${href}"${id === page ? ' aria-current="page"' : ''}>${label}</a>`).join('\n      ')}
    </nav>
    <button class="lite" id="lite" type="button" aria-pressed="false" title="Turns off animations to save data and battery">Low-data</button>
  </div>
</header>`;

const footer = `<footer>
  <div class="wrap">
    <div class="cols">
      <div style="display:flex;flex-direction:column;gap:10px">
        <a class="logo" href="./"><span class="mark">B<sup>3</sup></span><b>BaobaoBytes</b></a>
        <p>Fun, practical online safety for Kenyan children aged 9–18 and the adults who care for them.</p>
      </div>
      <div><h4>Paths</h4><ul>
        <li><a href="chipukizi.html">Chipukizi · 9–11</a></li><li><a href="wabunifu.html">Wabunifu · 12–14</a></li>
        <li><a href="walinzi.html">Walinzi · 15–18</a></li><li><a href="wazazi.html">Wazazi · Parents</a></li></ul></div>
      <div><h4>BaobaoBytes</h4><ul>
        <li><a href="about.html">About us</a></li><li><a href="apps.html">Safe apps</a></li><li><a href="safety.html">Safeguarding</a></li>
        <li><a href="get-involved.html">Schools and partners</a></li><li><a href="get-involved.html#contact">Contact</a></li></ul></div>
      <div class="sos"><span style="font-weight:800;font-size:14px">Need help now?</span><b>116</b><p>Childline Kenya: free, any time. In danger: 999 or 112.</p></div>
    </div>
    <div class="fine"><span>© 2026 BaobaoBytes · B³ · baobaobytes.co.ke</span><span>This website does not collect personal data. Games run on your device.</span></div>
  </div>
</footer>`;

function headBits(meta) {
  return `<title>${meta.title}</title>
<meta name="description" content="${meta.desc}">
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="assets/b3.css">`;
}
function bodyBits(meta, page, content) {
  return `<div id="app" data-skin="${meta.skin}">
${header(page)}
<main id="main">
${content}
</main>
${footer}
</div>
<script src="assets/b3.js"></script>`;
}
const full = (meta, page, content) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#1A1446">
${headBits(meta)}
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}[hidden]{display:none!important}img{max-width:100%}</style>
</head>
<body>
${bodyBits(meta, page, content)}
</body>
</html>
`;
const fragment = (meta, page, content) => `${headBits(meta)}\n${bodyBits(meta, page, content)}\n`;

for (const out of ['site', 'preview']) {
  rmSync(join(root, out), { recursive: true, force: true });
  mkdirSync(join(root, out), { recursive: true });
  cpSync(join(SRC, 'assets'), join(root, out, 'assets'), { recursive: true });
}
for (const f of readdirSync(join(SRC, 'pages')).filter((f) => f.endsWith('.html'))) {
  const raw = readFileSync(join(SRC, 'pages', f), 'utf8');
  const m = raw.match(/^<!--meta (\{.*\})-->\n/);
  if (!m) throw new Error(`${f}: missing <!--meta {...}--> first line`);
  const meta = JSON.parse(m[1]);
  const page = f.replace(/\.html$/, '');
  const content = raw.slice(m[0].length).replace(/\{\{game:(\w+)\}\}/g, (_, s) => game(s)).replace(/\{\{help\}\}/g, help);
  writeFileSync(join(root, 'site', f), full(meta, page, content));
  writeFileSync(join(root, 'preview', f), page === 'index' ? fragment(meta, page, content) : full(meta, page, content));
  console.log('built', f);
}
