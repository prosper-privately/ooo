# Design rationale

This document summarizes the design choices, implementation decisions, and tradeoffs behind OOO. It records the rationale for the finished site in a form that is useful to a future maintainer.

## 1. Turn an open brief into a coherent site

The original prompt requested a responsive website, large pictures, favorite fonts, animated menus, and fast loading. It did not specify a business, subject, audience, or conversion goal.

An outdoor visual journal provides a concrete setting for those requirements. Landscapes benefit from large presentation, and a journal supports a complete sequence: an opening view, a small collection to explore, short field notes, and an explanation of the idea. The name OOO. and the phrase “A little further out” establish a relaxed tone without inventing a real business, customer testimonials, or commercial claims.

This is an illustrative concept, not a travel booking service or a guide to real destinations. The page identifies its landscapes as AI-created, and individual views describe them as imagined landscapes.

## 2. Give the pictures most of the visual weight

The hero uses a wide landscape with a large headline and a single link into the collection. The image stays visible across most of the screen. A directional dark overlay provides a more readable surface for the text while allowing the landscape on the opposite side to remain prominent.

The three landscapes vary in color and shape: a green alpine valley, a turquoise cove, and warm desert dunes. That variety makes switching views meaningful. The same images reappear in the cards and enlarged views, creating visual continuity and allowing the browser to reuse downloaded assets.

Large images alone would make the page repetitive. The collection, split image-and-text field notes, and oversized footer therefore use different compositions while sharing the same colors and typography.

## 3. Use quiet colors and familiar fonts

Warm off-white, deep green, and restrained terracotta accents frame the images without competing with them. Thin borders and modest corner rounding keep the page closer to an editorial layout than a dashboard.

Georgia supplies the large serif headings; Arial, Helvetica, and the browser's sans-serif fallback supply interface and body text. These were provisional choices because the request did not include favorite font names and the preference lookup was unavailable. They should not be represented as confirmed user preferences.

System font stacks avoid font downloads and external font services. The tradeoff is that the exact font appearance can vary by operating system. The `--serif` and `--sans` variables near the start of `styles.css` make the pairing easy to replace.

## 4. Adapt the layout to the available space

The desktop collection places three landscape cards in a row. Narrow layouts stack the cards, simplify the header, and convert the field-notes section to one column. Fluid heading sizes and several media queries adapt spacing, typography, and navigation as the viewport changes.

The hero uses `object-fit: cover` so the image fills its frame, including on tall phone screens. That necessarily crops parts of the landscape. The selected compositions have useful detail throughout the frame, reducing dependence on one small focal point.

The full-screen menu removes the need to squeeze all navigation links into a small header. Dialog heights use dynamic viewport units to fit the visible browser area. These layout rules are implemented, but the original build did not receive a completed visual test across real devices.

## 5. Make the “whoosh” controlled and reversible

The menu opens with a short transform-and-opacity animation. It does not play sound. Landscape changes and hover states also use brief transitions, and the page respects the operating system's reduced-motion preference.

The hero changes only when a visitor activates a control. It has no autoplay timer. This keeps the current image and reading position under the visitor's control and avoids unnecessary background activity.

Native HTML dialogs provide modal behavior. Close controls and Escape dismiss the menu or enlarged view. Navigation links inside the menu preserve browser history. Filters expose their selected state, and returning to “All views” restores the collection.

## 6. Add interactions that serve the images

The website offers three related interactions: changing the hero landscape, filtering the collection by setting, and opening a larger image with a short description. These make the imagery easier to explore without introducing accounts, forms, payments, or a backend.

The field notes use native `details` and `summary` elements. They remain expandable without JavaScript. The menu, filters, carousel, and enlarged-view controls require JavaScript; a `noscript` message explains that limitation.

## 7. Keep the implementation small

The runtime consists of one HTML file, one stylesheet, one JavaScript file, and local image assets. A client-side framework would add dependencies and a build process without being necessary for these interactions.

Responsive WebP variants let browsers select an appropriate image resource. The hero has high fetch priority, while images below it use lazy loading. Explicit dimensions help the browser reserve image space. There are no external font requests, third-party scripts, analytics calls, background videos, or runtime API requests in the website source.

The smaller and larger image variants together occupy roughly 1.1 MB. Individual page loads can use a subset of those files depending on viewport, pixel density, scrolling, and interaction. This is an asset-size observation, not a measured load-time guarantee.

## 8. Make the GitHub export portable

The public export places `index.html`, `styles.css`, `app.js`, and `assets/` at the repository root. All runtime asset references are relative. The same files can therefore work under a GitHub Pages project path or at a domain root without editing a hard-coded base URL.

The original private hosting URL and hosting configuration are omitted. There is no dependency on the original hosting service, its access gate, or its source repository. The export contains no Git history.

The repository uses GitHub Pages publishing from a branch, with no custom workflow files and no build step. A `.nojekyll` file keeps the site as plain static files. Documentation and full-resolution original PNGs are included in the public repository and may also be served by Pages, but ordinary page views load only the referenced web assets.

## 9. Document provenance without exporting private context

The README preserves the website request exactly and records the available AI product and model details. `ASSETS.md` contains image provenance and generation prompts. This document explains the final design decisions and their tradeoffs.

The export is assembled from an explicit set of site files and documentation. Private hosting identifiers, account-specific hostnames, workspace paths, repository internals, credentials, and unrelated conversation material are excluded. The images are checked for embedded metadata as part of export validation.

## 10. Keep validation claims specific

The original source checks covered JavaScript syntax, local asset references, internal anchors, and unique HTML IDs. A source review identified two issues that were corrected: stale carousel transitions during rapid clicks, and menu navigation that did not preserve browser Back history.

Export validation adds checks for GitHub Pages path compatibility, image inclusion, archive integrity, and accidental private data. `VERIFICATION.md` records the completed checks and their limits. Neither static review nor a clean archive establishes that every browser interaction is bug-free.
