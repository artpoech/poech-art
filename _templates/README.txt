Templates used by the n8n page creator. GitHub Pages does not publish folders starting with "_".

zoom.html placeholders:
  {{TITLE}} {{SLUG}} {{CODE}} {{COLLECTION}} {{COLLECTION_SLUG}} {{PAINTING}}
  {{META_DESCRIPTION}}  plain text, about 150 characters, unique per page
  {{DESCRIPTION}}       one or more <p>...</p> paragraphs, unique per page
  {{BUY_BUTTONS}}       one <a class="btn" href="STORE_URL" target="_blank" rel="noopener">Buy on Saatchi Art</a> per live store
  {{MOCKUPS}}           4 to 6 of: <div class="ph"><img loading="lazy" src="../../assets/img/mockups/CODE/1.jpg" alt="TITLE shown in a room setting"></div>
  {{RELATED}}           4 tiles of other live zooms in the same collection, same markup as the home page grid

Page goes to: art/{{SLUG}}/index.html
When a zoom goes live, also update data/zooms.json for that code: status "live", live_date YYYY-MM-DD, page_url "art/SLUG/index.html", stores.
The home page hero, the counters and the Coming soon / Available now tiles update themselves from data/zooms.json.
