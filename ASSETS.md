# Landscape assets

All three landscapes were generated for this website using the built-in image generation tool in ChatGPT. They depict fictional locations, not verified photographs of specific destinations. No reference images were supplied. The exact image-model identifier was not exposed by the image tool.

All images needed to display the website are included locally in `assets/`. Full-resolution generated PNG originals are included in `originals/` for future editing. Branch-based GitHub Pages can publish the original files too, but the website does not request them during normal browsing; it uses the smaller WebP files.

The PNG copies preserve the original image pixels and dimensions. Embedded C2PA provenance blocks were removed from this public export to omit generation identifiers, timestamps, and certificate details. AI-generation attribution and the image prompts remain documented here and on the website.

## Included images

| Landscape | Generated original | Responsive web images |
| --- | --- | --- |
| Alpine lake | `originals/alpine.png` — 1672 × 941 | `assets/alpine-768.webp` — 768 × 432; `assets/alpine-1920.webp` — 1920 × 1081 |
| Rocky cove | `originals/coast.png` — 1536 × 1024 | `assets/coast-768.webp` — 768 × 512; `assets/coast-1600.webp` — 1600 × 1067 |
| Desert dunes | `originals/dunes.png` — 1536 × 1024 | `assets/dunes-768.webp` — 768 × 512; `assets/dunes-1600.webp` — 1600 × 1067 |

The WebP variants were produced at quality 82 with Lanczos resizing. The large variants were modestly enlarged from the original generated resolutions; the larger dimensions do not imply additional source detail. The HTML image dimensions reflect the actual asset dimensions.

`assets/favicon.svg` is a simple vector mark created for this site. No third-party font files, stock-photo downloads, or runtime image services are required.

## Exact image generation prompts


### alpine

Use case: photorealistic-natural. Asset type: full-width website hero photograph for OOO., an outdoor visual journal. Create a breathtaking wide 16:9 photograph, approximately 1920 by 1080 pixels, of a fictional alpine valley: dramatic sunlit green mountain walls surrounding a deep clear blue lake, a narrow shoreline trail, richly textured grass and rock, distant hazy peaks. Elevated wide-angle perspective, believable geographic forms and natural summer afternoon light, subtly warm analog film palette, editorial travel photography, quiet and spacious. Composition should offer visual interest across the entire frame, with no single tiny subject needed for meaning. Absolutely no people, words, lettering, logos, watermarks, frames or borders. This is a landscape photo, not a website screenshot.

### coast

Use case: photorealistic-natural. Asset type: large landscape photograph for OOO., an outdoor visual journal. Create a wide 3:2 editorial photograph, approximately 1800 by 1200 pixels, of a fictional Mediterranean-style secluded cove viewed from the limestone cliffs above: crystal turquoise water, soft pale stone formations, a small pebbled beach, dark pines at the edges, sunlit blue horizon. Rich natural textures, tasteful warm analog film palette, calm midday summer light, restrained realistic colors. Photography that feels spacious and calm, highly believable natural geography. Absolutely no buildings, people, boats, words, logos, watermarks, frames or borders. This is a landscape photo, not a website screenshot.

### dunes

Use case: photorealistic-natural. Asset type: large landscape photograph for OOO., an outdoor visual journal. Create a wide 3:2 editorial photograph, approximately 1800 by 1200 pixels, of a fictional desert landscape of sweeping sculptural sand dunes at golden hour: warm coral and terracotta sand, crisp curving ridgelines, fine ripples in the foreground, deep softly purple shaded slopes, distant soft pale peach sky. Spacious minimal but richly textured composition, natural untouched landscape, subtle analog film palette, sophisticated travel editorial photography with realistic fine detail. Absolutely no people, buildings, animals, footprints, words, logos, watermarks, frames or borders. This is a landscape photo, not a website screenshot.
