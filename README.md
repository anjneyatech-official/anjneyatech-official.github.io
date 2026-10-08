# Anjneya Tech — Official Website

Static site for Anjneya Tech, served by GitHub Pages at https://anjneyatech-official.github.io/

## Files

| File | Purpose |
|------|---------|
| `index.html` | Homepage: app catalogue, principles, studio, contact |
| `privacy.html` | Privacy policy |
| `delete-account.html` | AdLens account & data deletion (Google Play requirement) |
| `404.html` | Not-found page |
| `style.css` | All styles (light/dark via `prefers-color-scheme`) |
| `main.js` | Mobile menu and app filters (site works without JS) |
| `assets/` | Logo, favicons and app icons (self-hosted) |
| `app-ads.txt` | Google AdMob app-ads.txt (IAB Tech Lab spec) |
| `robots.txt`, `sitemap.xml` | Search engine hints |

## Adding a new app

1. Save the Play Store icon as `assets/icons/<name>.webp` (256×256).
2. Copy an existing `<li class="app-card">` in `index.html` into the right group (apps or games) and update the text and Play link.
3. Update the counts in the filter buttons and hero stats.

## Security

- No third-party scripts, fonts or trackers; every asset is served from this domain.
- A strict Content-Security-Policy meta tag on every page — avoid inline `<script>`, `style="…"` attributes and `on*=` handlers, or the browser will block them.
- External links use `rel="noopener noreferrer"`.

## Contact

anjneyatech@gmail.com
