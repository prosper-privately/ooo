# OOO. — A little further out

A responsive outdoor visual journal with large landscapes, a full-screen animated menu, a filterable collection, enlarged image views, and expandable field notes.

The website is plain HTML, CSS, and JavaScript. All pictures are included. There are no package installations, build tools, external fonts, API keys, analytics scripts, or server-side services required to run it.

## Publish with GitHub Pages

No custom workflow file is needed.

1. Extract this ZIP into an empty folder, then commit the extracted files at the root of the public GitHub repository. `index.html` should sit next to `README.md`. Include the `.nojekyll` file.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select **main** and **/ (root)**, then select **Save**. If the files are on another branch, select that branch instead.
5. Open the website address displayed on that Pages settings screen after the deployment completes. Later commits to the selected branch update the site.

Asset paths are relative, so the site works at both a repository project URL and a domain root. No username, repository name, custom domain, or base URL needs to be inserted into the code. The original private hosting service is not required.

Official instructions: [Configuring a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Preview locally

Open `index.html` in a current browser. For an HTTP preview, run the following from the extracted directory:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. No installation or build command is required. Stop the server with Ctrl+C.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Page layout and visible content |
| `styles.css` | Colors, typography, responsive layouts, and animations |
| `app.js` | Menu, landscape controls, filters, and enlarged views |
| `assets/` | Six responsive WebP images and the SVG favicon used by the site |
| `originals/` | All three original generated PNG images at their full source resolutions |
| `.nojekyll` | Requests plain static publishing on GitHub Pages |
| `.gitignore` | Excludes common local output and credential files from future commits |
| `DESIGN_RATIONALE.md` | Summary of design decisions and implementation tradeoffs |
| `ASSETS.md` | Image provenance, dimensions, and exact generation prompts |
| `VERIFICATION.md` | Completed checks and remaining verification limits |

The full-resolution originals are included for reuse and editing. The website loads the WebP versions, so the larger PNG files do not add to normal page-view downloads. With branch-based publishing, documentation and originals may also be accessible from the Pages site; all supplied files are intended for a public repository.

## Editing

- Change page copy and section structure in `index.html`.
- Change the colors and font stacks in the variables at the start of `styles.css`.
- Change landscape descriptions and image mappings in the `landscapes` object at the start of `app.js`.
- Keep replacement images local and update both the HTML and JavaScript references if filenames change.

Headings currently use Georgia, with Arial/Helvetica and the system sans-serif for interface and body text. Favorite font names were not provided in the brief, so these choices are provisional. The site uses the operating system's reduced-motion preference to shorten animations.

The landscapes are AI-generated images of fictional locations. They are identified as such on the page. The site is a design concept, not a travel booking service.

## Original prompt

The website was requested with the following prompt, reproduced verbatim:

```text
Machine,

Pls make website,

all responsive like,
w/ BIG pictures ooo,
use my fav fonts,
also fancy menus with whooosh on,
load fast pls

Thanks,
Human

PS no bugs :)
```

## AI creation details

| Detail | Available information |
| --- | --- |
| Product | OpenAI ChatGPT |
| Subscription context | ChatGPT Pro, as described by the requester; account billing was not independently verified |
| Model identification | GPT-6 Astra Pro, as identified to this conversation |
| Site work | AI-generated layout, copy, HTML, CSS, JavaScript, and documentation, with an additional source review |
| Image generation | ChatGPT's built-in image generation tool; its exact image-model identifier was not exposed |
| Export | Static files prepared for public GitHub hosting; no runtime AI service is used |

These details describe the creation context. They do not claim a separately verified model release, benchmark, parameter count, or image-model version. The website does not require a ChatGPT subscription or make AI API calls when hosted on GitHub Pages.

## Public export and verification

The export contains the site source, its assets, and the documentation listed above. It excludes the original Git repository and history, private hosting configuration and URLs, account-specific identifiers, workspace paths, credentials, and unrelated conversation material.

Image metadata and the packaged text files are checked for accidental private data. `.gitignore` provides useful exclusions for later work, but it is not a substitute for reviewing future additions before committing them.

See [VERIFICATION.md](VERIFICATION.md) for the exact checks and limitations. The export has not been deployed to a destination GitHub repository as part of this handoff.
