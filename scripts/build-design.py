#!/usr/bin/env python3
"""Convert the Claude Design .dc.html mockups into Next-ready static fragments.

Faithful 1:1 transform. Only removes the design-tool runtime:
  - <x-dc>/<helmet> wrappers and the dc-script
  - <image-slot> custom element -> plain <img> to /media/*
  - style-hover="..." -> a generated .hv{n}:hover CSS rule + class
  - {{ animMode }} template var -> "running"
Dynamic figures from the checked-in, validated proof snapshot are swapped for
tokens (__DC_*__) the page component fills from proof.json.
"""
import re, os, sys, json, html as htmllib

def emit_ts(path, const_name, content):
    """Emit an importable TS module exporting the HTML as a JSON string
    (always valid TS — no template-literal escaping hazards)."""
    with open(path, "w") as f:
        f.write("// GENERATED from a Claude Design .dc.html mockup — do not edit by hand.\n")
        f.write("// Regenerate via scripts/build-design.py.\n")
        f.write(f"export const {const_name} = {json.dumps(content)};\n")

HANDOFF = sys.argv[1]
OUT = sys.argv[2]
os.makedirs(OUT, exist_ok=True)

# ---- alt text for the five image slots (id -> alt) ---------------------------
ALT = {
    "profile-hero": "Cheri Hewlett on the main stage",
    "profile-quote": "Quote card: as AI takes on more of the what and the how, leadership becomes even more about the why and the who",
    "profile-avatar": "Cheri Hewlett",
    "profile-audience": "Cheri Hewlett on the BeyondTheBlack main stage before a full audience",
    "profile-onesheet": "Cheri Hewlett speaker one-sheet",
}

def attr(tag, name):
    m = re.search(r'\b' + re.escape(name) + r'="([^"]*)"', tag)
    return m.group(1) if m else None

def remove_balanced_div(html, start_idx):
    """Remove the <div>…</div> element that begins at start_idx, matching
    nested divs so the whole block (and only it) is cut."""
    depth = 0
    for m in re.finditer(r'<(/?)div\b[^>]*>', html[start_idx:], re.I):
        depth += 1 if m.group(1) == '' else -1
        if depth == 0:
            return html[:start_idx] + html[start_idx + m.end():]
    return html

# The four Point-of-view belief cards inherit the icons that used to live in
# the hero pillars — each matched to its belief, in the pillars' thin-line teal
# style (24px, stroke #17b3c7).
def _icon(paths):
    return (
        '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" '
        'stroke="#17b3c7" stroke-width="1.5" stroke-linecap="round" '
        'stroke-linejoin="round" aria-hidden="true" '
        'style="display:block;margin:0 0 16px">' + paths + '</svg>'
    )

POV_ICONS = {
    # 01 Innovation is choosing the right problem -> a target (the right one)
    "01": _icon('<circle cx="12" cy="12" r="8.5"></circle>'
                '<circle cx="12" cy="12" r="3.3"></circle>'
                '<path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3"></path>'),
    # 02 ROI is the problem solved, not the time saved -> solved (check)
    "02": _icon('<circle cx="12" cy="12" r="9"></circle>'
                '<path d="M7.8 12.4l2.7 2.7 5.7-6.2"></path>'),
    # 03 Trust is the real moat -> shield, proven
    "03": _icon('<path d="M12 2.5l7.5 3.2v5.1c0 4.7-3.2 7.9-7.5 9.2-4.3-1.3-7.5-4.5-7.5-9.2V5.7L12 2.5Z"></path>'
                '<path d="M8.8 12.2l2.1 2.1 4.3-4.8"></path>'),
    # 04 How you treat people is the strategy -> people
    "04": _icon('<circle cx="9" cy="8" r="3.2"></circle>'
                '<path d="M3.5 20c0-3.1 2.5-5.2 5.5-5.2s5.5 2.1 5.5 5.2"></path>'
                '<path d="M16.5 7.2a3 3 0 0 1 0 5.6"></path>'
                '<path d="M18 20c0-2.4-1-4-2.6-4.8"></path>'),
}

def convert_image_slots(frag):
    def repl(m):
        tag = m.group(0)
        src = attr(tag, "src") or ""
        # media is served as right-sized WebP (see scripts image optimization)
        src = "/media/" + os.path.splitext(src.split("/")[-1])[0] + ".webp"
        style = attr(tag, "style") or ""
        fit = attr(tag, "fit") or "cover"
        shape = attr(tag, "shape") or "rounded"
        radius = attr(tag, "radius")
        _id = attr(tag, "id") or ""
        extra = f"object-fit:{fit}"
        if shape == "circle":
            extra += ";border-radius:50%"
        elif shape == "pill":
            extra += ";border-radius:999px"
        elif shape == "rounded":
            extra += f";border-radius:{radius or 12}px"
        style = (style.rstrip("; ") + ";" + extra) if style else extra
        alt = ALT.get(_id, "")
        # All media is now right-sized WebP (~330KB total), so load eagerly and
        # decode async — reliable, and lazy-loading buys nothing at this weight.
        return f'<img src="{src}" alt="{htmllib.escape(alt, quote=True)}" style="{style}" decoding="async">'
    return re.sub(r'<image-slot\b[^>]*>\s*</image-slot>', repl, frag)

HOVER = []
def convert_hover(frag):
    counter = {"n": 0}
    def repl(m):
        tag = m.group(0)
        val = attr(tag, "style-hover")
        counter["n"] += 1
        cls = f"dchv{counter['n']}"
        HOVER.append((cls, val))
        # drop the style-hover attribute
        tag2 = re.sub(r'\s*style-hover="[^"]*"', '', tag)
        # inject class
        if re.search(r'\bclass="', tag2):
            tag2 = re.sub(r'\bclass="', f'class="{cls} ', tag2, count=1)
        else:
            tag2 = tag2[:-1] + f' class="{cls}">' if tag2.endswith(">") else tag2
            # safer: insert before final >
        return tag2
    # only tags that contain style-hover
    return re.sub(r'<[a-zA-Z][^>]*style-hover="[^"]*"[^>]*>', repl, frag)

def extract_helmet_style(doc):
    m = re.search(r'<helmet>(.*?)</helmet>', doc, re.S)
    helmet = m.group(1)
    style = re.search(r'<style>(.*?)</style>', helmet, re.S)
    return style.group(1) if style else ""

# ============================ PROFILE =========================================
prof = open(os.path.join(HANDOFF, "Universal Profile.dc.html")).read()
base_css = extract_helmet_style(prof)
# body fragment = between </helmet> and </x-dc>
body = prof.split("</helmet>", 1)[1].rsplit("</x-dc>", 1)[0].strip()
body = body.replace("{{ animMode }}", "running")
body = convert_image_slots(body)
body = convert_hover(body)
# snapshot figures (Evidence, 26px Archivo numbers) -> tokens
body = body.replace('line-height:1">6,916</span>', 'line-height:1">__DC_AUTHORED_COMMITS__</span>')
body = body.replace('line-height:1">1,725</span>', 'line-height:1">__DC_MERGED_PRS__</span>')
body = body.replace('line-height:1">131</span>',   'line-height:1">__DC_EDGE_FUNCTIONS__</span>')

# ---- navigation wiring (Charlie-approved) -----------------------------------
# Résumé links open the in-site web résumé (/resume), which itself offers the
# PDF download — so the "PDF ↓" affordance labels move off these and onto that
# page. Keeps page-to-page navigation in-site and honest about where a click
# goes.
body = body.replace('href="/Cheri_Hewlett_Resume.pdf"', 'href="/resume"')
body = body.replace('>Résumé, PDF ↓</a>', '>Résumé →</a>')
body = body.replace('>Full résumé, PDF ↓</a>', '>Full résumé →</a>')
# The /systems "full engineering record" page is not built yet — remove the
# link cleanly, leaving the surrounding sentence intact.
body = body.replace(
    ' <a href="/systems">The full engineering record →</a>', ''
)

# ---- page-by-page layout wiring ---------------------------------------------
# The four hero link buttons (Résumé / Speaking / LinkedIn / GitHub) duplicate
# the header nav, so drop them — the pillars then close the intro screen.
_hero_btns = re.search(
    r'<div style="grid-column:1 / -1;display:flex;flex-wrap:wrap;gap:12px;'
    r'margin-top:clamp\(28px,4vw,40px\)">.*?</div>\s*',
    body, re.S,
)
if _hero_btns:
    body = body[:_hero_btns.start()] + body[_hero_btns.end():]

# Remove the four hero icon-pillars entirely — they duplicated the Point-of-view
# beliefs, and dropping them lets the intro sit on one screen. Their icons move
# onto the belief cards below.
_pillars_idx = body.find('<div data-pillars')
if _pillars_idx != -1:
    body = remove_balanced_div(body, _pillars_idx)

# Add the matched icon to the top of each Point-of-view card.
for num, svg in POV_ICONS.items():
    number_p = (
        '<p style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;'
        f'letter-spacing:.14em;color:#0e6d7c;margin:0 0 14px">{num}</p>'
    )
    body = body.replace(number_p, svg + '\n' + number_p, 1)

# Give every top-level section a stable id so the persistent section nav can
# target it and scroll-spy can track it. (pov / experience / speaking already
# carry ids in the source.)
for label, sid in [
    ("Hero", "intro"),
    ("Selected builds", "builds"),
    ("Evidence", "evidence"),
    ("Contact", "contact"),
]:
    body = body.replace(
        f'<section data-screen-label="{label}"',
        f'<section id="{sid}" data-screen-label="{label}"',
        1,
    )

# Section label rename requested by Charlie: "What I believe" -> "Point of view".
body = body.replace('<span>What I believe</span>', '<span>Point of view</span>')

# Step the intro's vertical rhythm down so the hero + pillars fit one screen:
# a slightly smaller hero headline and tighter margins on the eyebrow, headline
# and the two lede paragraphs. (Targeted, unique inline-style edits.)
body = body.replace(
    'font-size:clamp(40px,6.4vw,80px);line-height:.94;letter-spacing:-.02em;margin:0 0 30px',
    'font-size:clamp(36px,4.6vw,60px);line-height:.96;letter-spacing:-.02em;margin:0 0 18px',
)
body = body.replace(
    'letter-spacing:.18em;text-transform:uppercase;color:#17b3c7;margin:0 0 30px',
    'letter-spacing:.18em;text-transform:uppercase;color:#17b3c7;margin:0 0 16px',
)
body = body.replace(
    'line-height:1.42;color:#f2f9fa;max-width:48ch;margin:0 0 20px;text-wrap:pretty',
    'line-height:1.4;color:#f2f9fa;max-width:48ch;margin:0 0 14px;text-wrap:pretty',
)
body = body.replace(
    'color:#9ec6d2;max-width:54ch;margin:0 0 38px;text-wrap:pretty',
    'color:#9ec6d2;max-width:54ch;margin:0 0 6px;text-wrap:pretty',
)

open(os.path.join(OUT, "profile-body.html"), "w").write(body + "\n")
emit_ts(os.path.join(OUT, "profile-body.ts"), "PROFILE_HTML", body)

# The site's global stylesheet paints an ambient body::before bloom; the
# imported design supplies its own background system, so neutralise it on
# these routes to stay identical to the built mockup.
GLOBAL_OVERRIDE = (
    "\n/* neutralise the site-chrome ambient layer on this design route */\n"
    "body::before { content: none !important; }\n"
    "/* clean section-to-section navigation: smooth anchor jumps with breathing room */\n"
    "html { scroll-behavior: smooth; }\n"
    "section[id], [id][data-screen-label] { scroll-margin-top: 28px; }\n"
    "@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }\n"
)

# Page-by-page reading experience: each section (and each build) starts on a
# clean screen, the four beliefs sit as a 2x2 instead of a 3+1 orphan, and the
# intro closes with its pillars rather than spilling onto a second screen.
HOMEPAGE_CSS = """
/* ---- page-by-page section scrolling ----
   Snap to each section's start so scrolling lands cleanly at the top of a
   section (no forced full-height voids). Proximity keeps tall sections — the
   builds, especially — free to scroll internally. */
html { scroll-snap-type: y proximity; scroll-padding-top: 10px; }
#intro, #pov, #experience, #builds, #evidence, #speaking, #contact,
#builds article { scroll-snap-align: start; scroll-margin-top: 108px; }

/* ---- beliefs: clean 2x2, no orphan card ---- */
@media (min-width: 700px) {
  #pov > div[style*="repeat(auto-fit,minmax(280px,1fr))"] {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

/* ---- intro: sits on one screen (pillars removed; icons moved to POV) ---- */
#intro { padding-top: clamp(24px, 4vw, 44px) !important; padding-bottom: clamp(28px, 4vw, 48px) !important; }
@media (min-width: 1000px) {
  /* keep content clear of the fixed right-hand section rail */
  [data-anim] > div { padding-right: clamp(52px, 6vw, 132px); }
}

/* ---- mobile: clear the fixed bottom section bar ---- */
@media (max-width: 999px) {
  [data-anim] { padding-bottom: 68px; }
}
"""

hover_css = "\n".join(f".{cls}:hover{{{val}}}" for cls, val in HOVER)
profile_css = base_css + GLOBAL_OVERRIDE + HOMEPAGE_CSS + "\n/* generated hover states (from style-hover) */\n" + hover_css + "\n"
open(os.path.join(OUT, "profile.css"), "w").write(profile_css)
print("profile: body", len(body), "chars; hover rules", len(HOVER))

# ============================ RESUME ==========================================
HOVER.clear()
res = open(os.path.join(HANDOFF, "Resume.dc.html")).read()
res_base = extract_helmet_style(res)
# body fragment = the <doc-page ...>...</doc-page>
m = re.search(r'(<doc-page\b.*?</doc-page>)', res, re.S)
res_body = m.group(1)
open(os.path.join(OUT, "resume-body.html"), "w").write(res_body + "\n")
# Screen-only résumé chrome (a back link + PDF download). Styled to sit on the
# doc-page desk and match the document's ink/teal palette; hidden entirely at
# print so the PDF is just the sheet.
RESUME_NAV_CSS = """
/* résumé page chrome — screen only */
.resume-nav {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  max-width: 8.5in; margin: 0 auto; padding: 14px 24px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 12px; letter-spacing: .08em; text-transform: uppercase;
  background: rgba(245,245,244,.85); backdrop-filter: saturate(140%) blur(8px);
  border-bottom: 1px solid #e3ded7;
}
.resume-nav a { color: #0e6d7c; text-decoration: none; }
.resume-nav a:hover { color: #04141e; }
@media print { .resume-nav { display: none !important; } }

/* The résumé is a real letter-width sheet (great for print/desktop). On
   narrow screens it would overflow and clip, so a small inline script in the
   page scales the sheet down (numeric `zoom`) to fit the viewport — the full
   page stays visible and pinch-zoomable, with no sideways scrolling. Print is
   unaffected. Here we just let the nav span the full width on mobile. */
@media screen and (max-width: 900px) {
  .resume-nav { max-width: none; }
}
"""
emit_ts(os.path.join(OUT, "resume-body.ts"), "RESUME_HTML", res_body)
open(os.path.join(OUT, "resume.css"), "w").write(res_base + GLOBAL_OVERRIDE + RESUME_NAV_CSS)
print("resume: body", len(res_body), "chars")
