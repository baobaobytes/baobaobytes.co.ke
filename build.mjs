// Builds the BaobaoBytes site.
//   node build.mjs   ->  site/      (upload this folder to baobaobytes.co.ke)
//                        preview/   (same pages; home page without <html>/<head> wrapper, for the Claude artifact preview)
// English pages live in src/pages, Kiswahili pages in src/sw (same file names). Kiswahili pages are built into sw/.
// Each page starts with a line:  <!--meta {"title":"…","skin":"…","desc":"…"}-->
// Placeholders: {{game:SET}} inserts the Spot the Trick game, {{help}} inserts the helpline box.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, cpSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const SRC = join(root, 'src');
const FONTS = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Lilita+One&family=Sora:wght@500;700&display=swap';

// Text for the shared menu, footer and boxes, per language.
const T = {
  en: {
    dir: 'pages', out: '', assets: 'assets/', other: 'sw', otherLabel: 'Kiswahili',
    nav: [['./', 'Home', 'index'], ['chipukizi.html', 'Chipukizi 9–11', 'chipukizi'], ['wabunifu.html', 'Wabunifu 12–14', 'wabunifu'],
      ['walinzi.html', 'Walinzi 15–18', 'walinzi'], ['wazazi.html', 'Wazazi · Parents', 'wazazi'], ['apps.html', 'Safe apps', 'apps'],
      ['safety.html', 'Safety', 'safety'], ['about.html', 'About', 'about'], ['get-involved.html', 'Get involved', 'get-involved']],
    skip: 'Skip to content', home: 'BaobaoBytes home', menu: 'Menu', navLabel: 'Main',
    lite: 'Low-data', liteTitle: 'Turns off animations to save data and battery',
    helpEyebrow: 'Something online worried you?',
    helpText: 'Tell a trusted adult. You are not in trouble. In Kenya you can also call Childline, free, any time:',
    helpDanger: 'In danger right now? Call 999 or 112.',
    tagline: 'Fun, practical online safety for Kenyan children aged 9–18 and the adults who care for them.',
    paths: 'Paths', fChipukizi: 'Chipukizi · 9–11', fWabunifu: 'Wabunifu · 12–14', fWalinzi: 'Walinzi · 15–18', fWazazi: 'Wazazi · Parents',
    aboutUs: 'About us', safeApps: 'Safe apps', safeguarding: 'Safeguarding', schools: 'Schools and partners', contact: 'Contact',
    needHelp: 'Need help now?', sos: 'Childline Kenya: free, any time. In danger: 999 or 112.',
    fine: 'This website does not collect personal data. Games run on your device.',
  },
  sw: {
    dir: 'sw', out: 'sw', assets: '../assets/', other: 'en', otherLabel: 'English',
    nav: [['./', 'Nyumbani', 'index'], ['chipukizi.html', 'Chipukizi 9–11', 'chipukizi'], ['wabunifu.html', 'Wabunifu 12–14', 'wabunifu'],
      ['walinzi.html', 'Walinzi 15–18', 'walinzi'], ['wazazi.html', 'Wazazi', 'wazazi'], ['apps.html', 'Programu salama', 'apps'],
      ['safety.html', 'Usalama', 'safety'], ['about.html', 'Kuhusu', 'about'], ['get-involved.html', 'Shiriki nasi', 'get-involved']],
    skip: 'Ruka hadi maudhui', home: 'Ukurasa wa nyumbani wa BaobaoBytes', menu: 'Menyu', navLabel: 'Kuu',
    lite: 'Data kidogo', liteTitle: 'Huzima michoro inayosonga ili kuokoa data na betri',
    helpEyebrow: 'Kuna kitu mtandaoni kimekutia wasiwasi?',
    helpText: 'Mwambie mtu mzima unayemwamini. Hujakosea. Kenya unaweza pia kupiga simu Childline, bure, wakati wowote:',
    helpDanger: 'Uko hatarini sasa hivi? Piga 999 au 112.',
    tagline: 'Usalama mtandaoni wa kufurahisha na wa vitendo kwa watoto wa Kenya wa miaka 9–18 na watu wazima wanaowalea.',
    paths: 'Njia', fChipukizi: 'Chipukizi · 9–11', fWabunifu: 'Wabunifu · 12–14', fWalinzi: 'Walinzi · 15–18', fWazazi: 'Wazazi',
    aboutUs: 'Kuhusu sisi', safeApps: 'Programu salama', safeguarding: 'Ulinzi wa watoto', schools: 'Shule na washirika', contact: 'Wasiliana nasi',
    needHelp: 'Unahitaji msaada sasa?', sos: 'Childline Kenya: bure, wakati wowote. Ukiwa hatarini: 999 au 112.',
    fine: 'Tovuti hii haikusanyi taarifa zako binafsi. Michezo inaendeshwa kwenye kifaa chako.',
  },
};

const game = (set) => `<div class="game" id="game" data-set="${set}">
  <div class="phone"><div class="screen" aria-live="polite"></div></div>
  <div class="quiz"></div>
</div>`;
const help = (t) => `<div class="help">
  <p class="eyebrow">${t.helpEyebrow}</p>
  <p style="font-size:19px">${t.helpText}</p>
  <span class="num">116</span>
  <p class="small" style="color:#E4DFFA">${t.helpDanger}</p>
</div>`;

// Link to the same page in the other language.
const otherHref = (lang, f) => {
  const name = f === 'index.html' ? '' : f;
  return lang === 'en' ? `sw/${name}` : `../${name}` || '../';
};
const langToggle = (lang, f) => {
  const t = T[lang];
  return `<a class="lang" href="${otherHref(lang, f) || '../'}" hreflang="${t.other}" lang="${t.other}">${t.otherLabel}</a>`;
};

const header = (lang, page, f) => {
  const t = T[lang];
  return `<a class="skip" href="#main">${t.skip}</a>
<header class="top">
  <div class="wrap">
    <a class="logo" href="./" aria-label="${t.home}"><span class="mark">B<sup>3</sup></span><b>BaobaoBytes</b></a>
    <button class="menu" type="button" aria-expanded="false" aria-controls="nav">${t.menu}</button>
    <nav class="links" id="nav" aria-label="${t.navLabel}">
      ${t.nav.map(([href, label, id]) => `<a href="${href}"${id === page ? ' aria-current="page"' : ''}>${label}</a>`).join('\n      ')}
    </nav>
    ${langToggle(lang, f)}
    <button class="lite" id="lite" type="button" aria-pressed="false" title="${t.liteTitle}">${t.lite}</button>
  </div>
</header>`;
};

const footer = (lang) => {
  const t = T[lang];
  return `<footer>
  <div class="wrap">
    <div class="cols">
      <div style="display:flex;flex-direction:column;gap:10px">
        <a class="logo" href="./"><span class="mark">B<sup>3</sup></span><b>BaobaoBytes</b></a>
        <p>${t.tagline}</p>
      </div>
      <div><h4>${t.paths}</h4><ul>
        <li><a href="chipukizi.html">${t.fChipukizi}</a></li><li><a href="wabunifu.html">${t.fWabunifu}</a></li>
        <li><a href="walinzi.html">${t.fWalinzi}</a></li><li><a href="wazazi.html">${t.fWazazi}</a></li></ul></div>
      <div><h4>BaobaoBytes</h4><ul>
        <li><a href="about.html">${t.aboutUs}</a></li><li><a href="apps.html">${t.safeApps}</a></li><li><a href="safety.html">${t.safeguarding}</a></li>
        <li><a href="get-involved.html">${t.schools}</a></li><li><a href="get-involved.html#contact">${t.contact}</a></li></ul></div>
      <div class="sos"><span style="font-weight:800;font-size:14px">${t.needHelp}</span><b>116</b><p>${t.sos}</p></div>
    </div>
    <div class="fine"><span>© 2026 BaobaoBytes · B³ · baobaobytes.co.ke</span><span>${t.fine}</span></div>
  </div>
</footer>`;
};

function headBits(lang, meta, f) {
  const a = T[lang].assets;
  const enHref = lang === 'en' ? (f === 'index.html' ? './' : f) : otherHref('sw', f) || '../';
  const swHref = lang === 'sw' ? (f === 'index.html' ? './' : f) : otherHref('en', f);
  return `<title>${meta.title}</title>
<meta name="description" content="${meta.desc}">
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="alternate" hreflang="en" href="${enHref}">
<link rel="alternate" hreflang="sw" href="${swHref}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${a}b3.css">`;
}
function bodyBits(lang, meta, page, f, content) {
  const a = T[lang].assets;
  const sw = lang === 'sw' ? `<script src="${a}b3-sw.js"></script>\n` : '';
  return `<div id="app" data-skin="${meta.skin}">
${header(lang, page, f)}
<main id="main">
${content}
</main>
${footer(lang)}
</div>
${sw}<script src="${a}b3.js"></script>`;
}
const full = (lang, meta, page, f, content) => `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#1A1446">
${headBits(lang, meta, f)}
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}[hidden]{display:none!important}img{max-width:100%}</style>
</head>
<body>
${bodyBits(lang, meta, page, f, content)}
</body>
</html>
`;
const fragment = (lang, meta, page, f, content) => `${headBits(lang, meta, f)}\n${bodyBits(lang, meta, page, f, content)}\n`;

for (const out of ['site', 'preview']) {
  rmSync(join(root, out), { recursive: true, force: true });
  mkdirSync(join(root, out, 'sw'), { recursive: true });
  cpSync(join(SRC, 'assets'), join(root, out, 'assets'), { recursive: true });
}

const enPages = readdirSync(join(SRC, 'pages')).filter((f) => f.endsWith('.html'));
const missing = enPages.filter((f) => !existsSync(join(SRC, 'sw', f)));
if (missing.length) throw new Error(`No Kiswahili version in src/sw for: ${missing.join(', ')}`);

for (const lang of ['en', 'sw']) {
  const t = T[lang];
  for (const f of enPages) {
    const raw = readFileSync(join(SRC, t.dir, f), 'utf8');
    const m = raw.match(/^<!--meta (\{.*\})-->\n/);
    if (!m) throw new Error(`${t.dir}/${f}: missing <!--meta {...}--> first line`);
    const meta = JSON.parse(m[1]);
    const page = f.replace(/\.html$/, '');
    const content = raw.slice(m[0].length)
      .replace(/\{\{game:(\w+)\}\}/g, (_, s) => game(s))
      .replace(/\{\{help\}\}/g, help(t))
      .replace(/(src|href)="assets\//g, `$1="${t.assets}`);
    writeFileSync(join(root, 'site', t.out, f), full(lang, meta, page, f, content));
    writeFileSync(join(root, 'preview', t.out, f),
      lang === 'en' && page === 'index' ? fragment(lang, meta, page, f, content) : full(lang, meta, page, f, content));
    console.log('built', join(t.out, f));
  }
}
