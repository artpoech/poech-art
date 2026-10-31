Templates used by the n8n page creator. GitHub Pages does not publish folders starting with "_".

zoom.html placeholders:
  {{TITLE}} {{SLUG}} {{CODE}} {{COLLECTION}} {{COLLECTION_SLUG}} {{PAINTING}}
  {{SEO_TITLE}}         page title, e.g. Tiles Adrift | Red and Turquoise Abstract Wall Art Print
  {{ALT_TEXT}}          main image alt text, e.g. Tiles Adrift, red and turquoise abstract wall art print by POECH ART
  {{META_DESCRIPTION}}  plain text, about 150 characters, unique per page
  {{DESCRIPTION}}       <p>...</p><p>...</p><p class="about-print"><b>About this print:</b> ...</p>
  {{BUY_BUTTONS}}       one <a class="btn" href="STORE_URL" target="_blank" rel="noopener">Buy on Saatchi Art</a> per live store
  {{MOCKUPS}}           5 of: <div class="ph"><img loading="lazy" src="../../assets/img/mockups/CODE/1.jpg" alt="TITLE shown in a room setting"></div>

Page goes to: art/{{SLUG}}/index.html
When a zoom goes live, also update data/zooms.json for that code: status "live", live_date YYYY-MM-DD, page_url "art/SLUG/index.html", stores.
The home page hero, the counters, the Coming soon / Available now tiles and the "More from" row on zoom pages all update themselves from data/zooms.json.
