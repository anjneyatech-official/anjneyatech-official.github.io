# Anjneya Tech - Official Website

Static site for Anjneya Tech, served by GitHub Pages at https://anjneyatech-official.github.io/

## Files

| File | Purpose |
|------|---------|
| `index.html` | Homepage: app catalogue, principles, studio, contact |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of Use |
| `delete-account.html` | Account and data deletion for all apps (Google Play data deletion URL for AdLens) |
| `404.html` | Not-found page |
| `style.css` | All styles (light/dark via `prefers-color-scheme`, design rules at the top) |
| `main.js` | Mobile menu, scroll entrance, active nav link (site works without JS) |
| `assets/` | Logo, favicons, app icons, Play Store screenshots and the Geist font (OFL, licence included) |
| `app-ads.txt` | Google AdMob app-ads.txt (IAB Tech Lab spec) |
| `robots.txt`, `sitemap.xml` | Search engine hints |

## Adding a new app

1. Save the app icon as `assets/icons/<name>-128.webp` and a Play Store screenshot as `assets/shots/<name>.jpg` (JPEG, quality ~70).
2. Tools: copy an `<a class="tile">` block in `index.html` and give it a grid area in `.bento` (`style.css`). Games: copy an `<li>` in `.posters`.
3. Update the numbers in the facts strip.
4. Keep copy free of em dashes and only claim what the Play listing says.

## Security

- No third-party scripts, fonts or trackers; every asset is served from this domain.
- A strict Content-Security-Policy meta tag on every page - avoid inline `<script>`, `style="…"` attributes and `on*=` handlers, or the browser will block them.
- External links use `rel="noopener noreferrer"`.

## Contact

anjneyatech@gmail.com
