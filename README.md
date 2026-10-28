# MaddyZone

The independent product and writing home of Rituraj Singh Ratan, at [maddyzone.com](https://maddyzone.com).

The homepage is a personal digital workshop with a white and green palette, an asymmetric hero, an illustrated project board, a two-column work directory, and a dark green AI lab. **Gurus Classes of English** appears in the hero, the main project spotlight, and the footer, alongside Resume Tailor AI, PDFForge, NextUp, and the technical blog.

## Preview

No installation or build is required. From this directory, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. You can also open `index.html` directly. Google Fonts require an internet connection; system fonts provide a fallback. Images and icons are local.

## Files

- `index.html` — homepage content, project links, metadata, and structured data.
- `css/styles.css` — responsive layouts, project artwork, and reduced-motion support.
- `js/main.js` — mobile navigation, project filters, the sample AI workflow, motion controls, active section links, and the current year.
- `images/` — Rituraj’s portrait, the Gurus Classes logo, and the MaddyZone favicon.
- `CNAME` — existing GitHub Pages domain configuration.
- `ads.txt` — existing advertising verification.

## Updating the page

Edit project copy and URLs in `index.html`. Each project’s `data-category` matches a filter button’s `data-filter`. Update the displayed project count when adding or removing projects. Product previews are illustrative UI compositions. The Gurus Classes preview uses its real logo, teacher portrait, and homepage copy.

Contact links open the visitor’s email application with `contact@maddyzone.com` as the recipient. The site does not simulate message delivery or newsletter subscriptions.

Existing anchors `#home`, `#projects`, `#blog`, `#tools`, `#author`, and `#contact` are retained. The layout adapts to desktop, tablet, and mobile, with keyboard focus styles, an accessible menu toggle, and announced filter results.

## AI product preview

The homepage includes an interactive Resume Tailor AI example, with two fixed samples, an animated input-to-summary flow, and a link to the actual product. It is explicitly labelled as an illustrative sample; it does not call a model or collect visitor data. Choosing another sample resets the preview and cancels pending steps.

Visitors can pause animations. System reduced-motion preferences are respected, and ambient animation pauses when the page is hidden.

## Validation

```sh
node --check js/main.js
git diff --check
```

This is a static GitHub Pages site; deployment uses the existing repository’s publishing configuration. Updating local files does not publish the site.
