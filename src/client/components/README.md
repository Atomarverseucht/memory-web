# Projektname
**Team:** Vorname Nachname (Matrikelnummer), Vorname Nachname (Matrikelnummer) <br>
**Repository:** https://github.com/Atomarverseucht/memory-web/tree/2.0.1
## Setup
Entweder im Web: https://memory-web.atomarverseucht.partykit.dev <br>
Oder lokal mit:
```bash
npm install
npm run dev
```
| Kriterium                 | Datei                                                            | Zeile / Hinweis                          |
|---------------------------|------------------------------------------------------------------|------------------------------------------|
| npm + Vite                | vite.config.ts (für Vite), <br/>package.json (für npm)           | Projekt-Root                             |
| TypeScript aktiv genutzt  | src/shared/MemorySet.ts     <br/> src/client/room/connService.ts | MemorySet (Interface)<br/> Z.6/7 (Types) |
| Komponentenzerlegung      | src/client/room/components/                                      | Board, NameSection, PlayerBar            |
| Props-Übergabe            | src/client/client.tsx                                            | Z. 17                                    |
| useState                  | src/client/room/state.tsx                                        | Z. 32                                    |
| useEffect                 | src/client/room/room.tsx                                         | Z. 22-24                                 |
| Durchgängige Nutzeraktion | src/client/component/UIMemSet.tsx                                | Z. 7                                     |
