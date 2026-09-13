# AGENTS.md — Mirelly & Lucas wedding invitation

Purpose: everything an agent needs to edit this site on-style without re-reading the source. Values below are copied verbatim from the code. Update this file in the same commit when they change.

## Stack & files

- Static site, no build, no deps, no framework, no tests. Deployed as-is to GitHub Pages (`main`, root).
- `index.html` (183 lines) — single page, all copy in PT + EN.
- `css/style.css` (603 lines) — one file, sections in DOM order, banner comments `/* --- Nome --- */` in Portuguese.
- `js/main.js` (68 lines) — language switch, countdown, RSVP.
- `assets/ceremony-sketch.png` (2.5 MB, hero illustration), `assets/venue.webp` (~200 KB, venue photo).
- Code comments: Portuguese. README/AGENTS: English. Hex colors uppercase. 2-space indent.

## Layout

- One centered column: `.page { max-width: 480px; margin: 0 auto; background: #FFFFFF; border-left/right: 1px solid #E3DFD3; min-height: 100vh }`. Same on every viewport.
- **No media queries anywhere.** Do not add responsive breakpoints unless asked.
- `html { scroll-behavior: smooth }`. Sticky header: `.site-header` `position: sticky; top: 0; z-index: 50; padding: 12px 20px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px); border-bottom: 1px solid #DFD9C9`.
- Every anchored section has `scroll-margin-top: 64px` (offsets the sticky header). Add it to any new `id`-targeted section.
- Cards and buttons are square-cornered except pills (`border-radius: 100px`) and circles (`50%`). No shadows anywhere.

## DOM order and anchors

| # | id | class | notes |
|---|----|-------|-------|
| 0 | — | `.site-header` | `.logo` "M\|L" (links `#inicio`) + `.lang-switch` (`#btn-pt` / `#btn-en`) |
| 1 | `inicio` | `.hero` | `.hero-frame` bordered box, names, date, `.hero-nav`, `.hero-sketch` |
| 2 | — | `.countdown` | dark band, ids `cd-days/cd-hours/cd-minutes/cd-seconds` |
| 3 | `local` | `.venue` | `.venue-card` with photo, address, map button |
| 4 | `traje` | `.dress` | kicker + `.script-title` + `.dress-note` |
| 5 | `presentes` | `.gifts` | `.gifts-card` + gift-list button |
| 6 | `rsvp` | `.rsvp` | `#rsvp-form` + `#rsvp-confirmation` |
| 7 | — | `.site-footer` | `.footer-names`, `.footer-date`, `.divider` |

Hero nav order is `#local → #presentes → #traje → #rsvp`, which differs from DOM order (dress before gifts). Intentional.

Section paddings: hero `28px 20px 56px` · countdown `44px 24px` · venue `56px 24px 64px` · dress `0 28px 64px` · gifts `0 24px 72px` · rsvp `60px 28px 72px` · footer `56px 24px 44px`.

## Bilingual pattern (PT default)

- `<html lang="pt-BR" data-lang="pt">`. CSS: `html[data-lang="pt"] .lang-en, html[data-lang="en"] .lang-pt { display: none !important; }`.
- **Every visible string exists twice**, as sibling elements with `.lang-pt` and `.lang-en` (`<p>`, `<span>`, or `<div>` wrapping several `<p>`). Never leave a string in one language only. Names, venue name, address, "10 . 01 . 2027", monogram and `<title>`/meta description are the exceptions (not translated).
- `setLang(lang)` in `main.js` sets `data-lang`, sets `html.lang` to `pt-BR`/`en`, toggles `.active` on `#btn-pt`/`#btn-en`. Choice is **not persisted** (no localStorage, no URL param) and there is no browser-language detection.
- Button/link labels: `<span class="lang-pt">…</span><span class="lang-en">…</span>` inside the `<a>`/`<button>`.

## Palette (exact hex → role)

| hex | role / where |
|-----|--------------|
| `#171410` | ink: body text, links, borders of `.nav-icon` `.btn-outline` `.choice-dot`, bg of `.countdown` `.btn-solid` `.choice-dot-inner`, `.field-input:focus` border |
| `#F1EDE1` | text on ink: `.countdown` color, `.btn-solid` color, `.btn-outline:hover` color |
| `#F6F4EE` | ivory bg: `.rsvp` only |
| `#FFFFFF` | bg: `body`, `.page`, `.venue-card`, `.rsvp-confirmation`, header (92%) |
| `#CFC7B1` | sand: `.divider`, borders of `.hero-frame` `.gifts-card` `.rsvp-confirmation` |
| `#E3DFD3` | `.page` side borders, `.rsvp` border-top |
| `#DFD9C9` | `.site-header` border-bottom, `.venue-card` border |
| `#BEB6A0` | `.field-input` underline, `.choice` border |
| `#B3AA94` | separators: `.logo-sep`, `.lang-switch .slash` |
| `#A29A86` | input placeholder |
| `#D6CFBC` | on dark: `.countdown-title`, `.cd-label` |
| `#5C5546` | on dark: `.cd-sep` |
| `#5F584A` | `.section-kicker`, `.hero-amp` |
| `#494336` | `a:hover`, `.venue-address`, `.dress-note`, `.rsvp-deadline`, `.rsvp-confirmation-note`, `.footer-date` |
| `#37322A` | `.hero-tagline`, `.hero-venue`, `.venue-note`, `.field-label` |
| `#3D372E` | `.btn-solid:hover` bg, `.gifts-note` |

Pick from this table; do not introduce new hex values without a reason.

## Typography

- Google Fonts `<link>` in `<head>` (with `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`): `Cormorant Garamond` ital,wght `0,400;0,500;0,600;1,400;1,500` + `Great Vibes`, `display=swap`. Only these weights exist; do not use 300 or 700.
- `body`: `'Cormorant Garamond', serif`, `#171410`, `-webkit-font-smoothing: antialiased`, `font-variant-numeric: lining-nums`. `input, select, textarea, button` re-declare the same family and color.
- `'Great Vibes', cursive` only for: `.hero-names` 52px (line-height 1.08), `.script-title` 40px, `.footer-names` 44px.

| role | class(es) | size | tracking | weight | other |
|------|-----------|------|----------|--------|-------|
| kicker | `.section-kicker` | 11px | 0.22em | 500 | uppercase, `#5F584A`, `margin: 0` |
| kicker (hero) | `.hero-tagline` / `.hero-venue` | 11px / 12px | 0.2em / 0.18em | 500 | uppercase, `#37322A` |
| label | `.nav-label` `.cd-label` `.field-label` | 10px | 0.12 / 0.16 / 0.16em | 400 (unset) / 500 / 500 | uppercase |
| date | `.hero-date` | 19px | 0.1em | 600 | uppercase |
| heading | `.venue-name` / `.rsvp-confirmation-title` | 26px / 20px | — | 600 | |
| note | `.venue-note` `.dress-note` `.rsvp-deadline` `.rsvp-confirmation-note` | 15px | — | 500 | italic, `#494336` (`.venue-note`: `#37322A`) |
| note (gifts) | `.gifts-note` | 16px | — | 400 (unset) | italic, `#3D372E`; like `.dress-note`: `line-height: 1.6; max-width: 300px; margin: … auto 0` |
| number | `.cd-value` | 36px | — | 500 | `tabular-nums` |
| monogram | `.hero-monogram` / `.logo` | 30px / 16px | 0.22em / 0.14em | 500 / 600 | `.logo-sep` weight 400 (300 in hero), `padding: 0 5px` (8px in hero) |
| footer date | `.footer-date` | 12px | 0.3em | 500 | `#494336` |

Small caps text = uppercase + wide tracking + weight 500 (600 only on `.hero-date` and `.logo`), never 700. `.hero-monogram .logo-sep` declares 300, which is not loaded and renders as 400.
Hero names (`.hero-names`, `max-width: 290px`) are hand-positioned: `.hero-name-first { transform: translateX(-6px) }`, `.hero-name-second { text-align: right; padding-right: 6px }`, `.hero-amp { translate(-14px, -14px); padding-right: 16px; font-size: 28px }`. Re-tune visually if the names change.

## Components (copy these, do not invent variants)

- **Divider** `.divider`: `width: 44px; height: 1px; background: #CFC7B1; margin: 26px auto`. Overrides: `.venue-card .divider` 36px / `22px auto`; `.site-footer .divider` 36px / `24px auto 0`.
- **Buttons**: pill, `font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; border-radius: 100px; display: inline-block`. Work as `<a>` or `<button>`.
  - `.btn-outline`: `padding: 13px 30px; border: 1px solid #171410; margin-top: 24px; transition: background 0.2s, color 0.2s`; hover → bg `#171410`, color `#F1EDE1`.
  - `.btn-solid`: `padding: 14px 34px; background: #171410; color: #F1EDE1; border: 0; margin-top: 26px; cursor: pointer; transition: background 0.2s`; hover → `#3D372E`. Inside `.rsvp-form`: `margin-top: 6px; padding: 16px 34px`.
- **Cards**: `border: 1px solid`, centered text, white or transparent bg, no radius. `.hero-frame` (`#CFC7B1`, `52px 22px 0`, `animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both`) · `.venue-card` (`#DFD9C9`, `14px 14px 30px`) · `.gifts-card` (`#CFC7B1`, `40px 26px`) · `.rsvp-confirmation` (`#CFC7B1`, `38px 26px`, `margin-top: 40px`).
- **Nav item** `.nav-item` (flex column, `gap: 9px; width: 76px`) → `.nav-icon` 58px circle `border: 1px solid #171410` → inline SVG `width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"` → `.nav-label` ×2 langs. `.hero-nav { display: flex; justify-content: center; gap: 20px; margin-top: 44px }`. Icons are hand-drawn paths, not an icon font. The check icon in `#rsvp-confirmation` reuses the same attributes at `width="30" height="30"`.
- **Lang switch** `.lang-switch` (flex, 13px, `letter-spacing: 0.12em`): `.lang-btn` unstyled button `opacity: 0.5`; `.lang-btn.active` → `opacity: 1; font-weight: 600; text-decoration: underline; text-underline-offset: 4px`. Separator `.slash` `#B3AA94`.
- **Form** `.rsvp-form { margin-top: 36px; text-align: left; display: flex; flex-direction: column; gap: 26px }`.
- **Form field** `<label class="field">` (flex column, `gap: 8px`) wrapping `.field-label` ×2 langs + `.field-input`. `.field-input`: `appearance: none; background: transparent; border: 0; border-bottom: 1px solid #BEB6A0; padding: 8px 2px; font-size: 17px; outline: none; border-radius: 0`; focus → underline `#171410`. `textarea.field-input { resize: vertical }`.
- **Choice (radio look-alike)** `<button type="button" class="choice">` in `.choice-group` (flex column, `gap: 10px`): pill, `border: 1px solid #BEB6A0; padding: 13px 20px; font-size: 16px; gap: 12px`, contains `.choice-dot` (17px circle, ink border) → `.choice-dot-inner` (9px ink dot, `display: block` only under `.choice.selected`). Not real radio inputs.
- **Utility** `.hidden { display: none !important }` — the only utility class.
- **Animation**: `@keyframes fadeUp` (opacity 0 → 1, `translateY(16px)` → none) is the only animation; used on `.hero-frame` only.
- **Images**: `img { max-width: 100% }`. `.hero-sketch` bleeds past the frame padding: `width: calc(100% + 44px); max-width: none; margin: 40px -22px 0; mix-blend-mode: multiply` (white PNG bg disappears on white). `.venue-photo { width: 100%; height: 210px; object-fit: cover }`.
- **Dark band** `.countdown`: `background: #171410; color: #F1EDE1; padding: 44px 24px`; `.countdown-grid` flex, `align-items: baseline; gap: 10px`; `.cd-unit` 56px (`.cd-days` 64px); `.cd-sep` ":" 24px `#5C5546`.

## JavaScript (`js/main.js`)

- One IIFE, `'use strict'`, `var` only, ES5 style (only newer API: `String.prototype.padStart`). No modules, no deps, no event delegation. Loaded with `<script src="js/main.js">` at end of `<body>`, no `defer`.
- DOM access **only via `getElementById`**; state changes only via `classList.toggle/add/remove`. ids are JS hooks + anchors; classes are for CSS. Keep that split.
- Countdown: `TARGET = new Date('2027-01-10T16:00:00-03:00').getTime()`; `tick()` runs once then `setInterval(tick, 1000)`; `diff = Math.max(0, TARGET - Date.now())` (stops at 0, no "married" state); days unpadded, h/m/s `pad()` to 2 digits. HTML placeholders are `—`.
- RSVP: **no backend.** `#rsvp-form` has `input[name=name]` (required) and `textarea[name=note]`. Attendance is a `var attending = 'yes'` toggled by `#choice-yes` / `#choice-no` (`.selected`). On submit: `preventDefault`, toggle `.hidden` on `#msg-yes` / `#msg-no`, add `.hidden` to the form, remove it from `#rsvp-confirmation`. Nothing is sent or stored. To wire a service, add a `fetch` inside the submit handler before the class toggles and read `attending`, `form.elements.name.value`, `form.elements.note.value` (not `form.name`, which is the form's own `name` attribute).

## Copy & facts (all hardcoded in `index.html` unless noted)

| fact | value | where |
|------|-------|-------|
| couple | Mirelly & Lucas (Mirelly first everywhere; JS/CSS headers say "Lucas & Mirelly") | hero, footer, `<title>` |
| date/time | 10 Jan 2027, 16h (Brasília, UTC−3) | `<title>` "10 . 01 . 2027", meta description, `.hero-date` ×2, `.footer-date`, `.venue-note` ×2, JS `TARGET` |
| venue | Chácara Florestal, Estrada Florestal, 650 — Parelheiros, Parque Florestal, São Paulo — SP, 01000-999 | `.hero-venue`, `.venue-name`, `.venue-address` |
| map | `https://maps.app.goo.gl/L81L3up8Kb1vSAAV8` | `.btn-outline` in venue |
| gift list | `https://noivos.casar.com/lucas-e-mirelly` | `.btn-solid` in gifts |
| dress code | "Esporte fino" / "Semi-formal"; reserve white for the bride | `.script-title`, `.dress-note` |
| RSVP deadline | 10 Dec 2026 | `.rsvp-deadline` ×2 |

External links use `target="_blank" rel="noopener"`. Changing the date means touching all six places listed above.

## Recipes

- **Edit copy**: change both `.lang-pt` and `.lang-en` siblings. Keep `&amp;` for "&" in HTML text.
- **New section**: `<section id="x" class="x">` placed in DOM order, `scroll-margin-top: 64px`, `.section-kicker` ×2 langs first, optional `.divider`, buttons from the table above. Add a CSS block with the `/* --- Nome --- */` banner. Add a `.nav-item` with a 22px stroke SVG if it needs a hero shortcut.
- **New color/size**: reuse the palette/type tables. If truly new, add it to this file.
- **Replace an image**: keep `.hero-sketch` white-background PNG (multiply blend) or switch to a transparent PNG and drop `mix-blend-mode`; venue photo is cropped to 210px tall.

## Current limitations (intentional or accepted — do not "fix" uninvited)

- No media queries; 480px column on desktop is the design.
- RSVP is UI-only; language not persisted; no favicon, no Open Graph tags.
- `alt` texts and `<title>`/meta description are PT only.
- `ceremony-sketch.png` is 2.5 MB and unoptimized.
- Countdown shows `0 00 00 00` after the event.
