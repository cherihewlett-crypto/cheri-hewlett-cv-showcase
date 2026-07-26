#!/usr/bin/env python3
"""Convert the Claude Design .dc.html mockups into Next-ready static fragments.

Faithful 1:1 transform. Only removes the design-tool runtime:
  - <x-dc>/<helmet> wrappers and the dc-script
  - <image-slot> custom element -> plain <img> to /media/*
  - style-hover="..." -> a generated .hv{n}:hover CSS rule + class
  - {{ animMode }} template var -> "running"
Dynamic figures that the site recomputes each build are swapped for tokens
(__DC_*__) the page component fills from proof.json.
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

def convert_image_slots(frag):
    def repl(m):
        tag = m.group(0)
        src = attr(tag, "src") or ""
        src = "/media/" + src.split("/")[-1]
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
        lazy = "" if _id == "profile-hero" else ' loading="lazy" decoding="async"'
        return f'<img src="{src}" alt="{htmllib.escape(alt, quote=True)}" style="{style}"{lazy}>'
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
# dynamic figures (Evidence, 26px Archivo numbers) -> tokens
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

hover_css = "\n".join(f".{cls}:hover{{{val}}}" for cls, val in HOVER)
profile_css = base_css + GLOBAL_OVERRIDE + "\n/* generated hover states (from style-hover) */\n" + hover_css + "\n"
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
