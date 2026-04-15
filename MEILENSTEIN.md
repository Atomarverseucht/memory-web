# Memory-Web
**Team:** *********, *************  
**Repository:** https://github.com/Atomarverseucht/memory-web/tree/M1-HTML/CSS <br> (der branch soll ein Archiv für diese Abgabe sein)
## Projektidee
Memory-Web ist ein Lernprojekt mit Memory als Beispiel. In der Hauptseite wählt man ein Set aus,
welches von einer Datenbank geladen wird. Durch die Auswahl wird man in den Raum geleitet.
Der Name wird in Zukunft im Raum standardmäßig gesetzt (Standardwerte und Cookies) und kann bearbeitet werden.
Spiele sollen in Zukunft bei Nicht-Benutzung resettet werden.

## Wie starte ich die Webseite?
  - aktuellste Version (main-branch): https://memory-web.atomarverseucht.partykit.dev
  - diese Version: 
    - lade dieses Repo
    - evtl. "npm install" (falls packages nicht geladen)
    - folgender cmd im repo: "npm run dev"
## Kriterien-Zuordnung M1
| Kriterium                         | Datei                                                  | Zeile / Hinweis  |
|-----------------------------------|--------------------------------------------------------|------------------|
| Semantische HTML-Struktur         | src/client/index.html                                  | Z. 10 – 124      |
| Formular mit Labels               | src/client/room/index.html                             | Z. 18 - 22       |
| Responsives Layout (Flexbox/Grid) | src/client/styles.css                                  | Z. 42 - 56       |
| Media Query                       | src/client/styles.css                                  | Z. 50 - 56       |
| URL-Struktur                      | src/client/index.html, <br/>src/client/room/index.html | Pfade: /, /room/ |