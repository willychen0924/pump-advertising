# PUMP Advertising

Public portfolio migrated from https://pumpad.carbonmade.com, preserving the owner's published content and original design.

Site: https://willychen0924.github.io/pump-advertising/

## Contents

- Work homepage, About, Contact, and four categories in their original order.
- Video: 39 videos, including 37 HLS streams with their original highest public resolution and audio, plus 2 MP4 files.
- Graphic: 63 images. Package: 31 images. Web: 4 images and 4 original external project links.
- The cover, thumbnail variants, posters, styles, icon fonts, and web fonts are served from this repository. There are no runtime Carbonmade CDN dependencies.

## Maintenance

This is a static website. GitHub Pages serves `main` from the repository root. To preview locally, run `python3 -m http.server 8917` and visit http://localhost:8917.

Keep all files in `assets/video/` together: each HLS video has local master, video, and audio playlists plus all initialization and media segments. The streams keep their highest public quality rather than all redundant lower-resolution encodings. No source video was re-encoded.

Contact's Submit button opens a mail draft to the original public email address. The visitor must send it from their own mail application. GitHub Pages does not provide Carbonmade's server-side messaging backend.

The four external web project links remain dependent on their respective third-party sites and retain their original addresses. Some older campaign links may no longer be available.

This migration preserves publicly served image/video renditions. Editable design source files, private works, account details, and payment settings are not part of this repository.

The website is about 912 MB. [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) allow published sites up to 1 GB and specify a soft monthly bandwidth limit of 100 GB. Every file here is below GitHub's 100 MiB individual-file limit; the largest is approximately 5.4 MB. Check total size before adding more media.

Portfolio works remain the property of their respective owners; no additional reuse license is granted by this migration.
