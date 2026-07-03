# memory-web

The old partykit-version (v2.2.0):

Stable: https://memory-web.atomarverseucht.partykit.dev

Dev: https://dev.memory-web.atomarverseucht.partykit.dev

### Since version 3.0.0 is no public server hosted:
- install git repo
- npm install
- npm run dev

## Architektur

Kein SSR/SSG nötig: Echtzeit-Mehrspieler-Spiel mit socketgesteuertem Board-Zustand pro Session – der initiale HTML-Shell + Client-Bundle ist sofort geladen, SEO irrelevant, und jeder gerenderte Server-Zustand wäre sofort veraltet. Daher reicht ein einfaches Vite-SPA völlig aus.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Vite SPA)                                 │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  src/client/Main.tsx (BrowserRouter)                                 │   │
│  │  src/client/App.tsx (Routes)                                         │   │
│  │                                                                      │   │
│  │  ┌──────────┐  ┌───────────────┐  ┌──────────┐  ┌───────────────┐   │   │
│  │  │  HomePage │  │  Room         │  │  Login   │  │  Register     │   │   │
│  │  │  /        │  │  /room/:id    │  │  /login  │  │  /register    │   │   │
│  │  └────┬─────┘  └──────┬────────┘  └────┬─────┘  └──────┬────────┘   │   │
│  │       │               │                 │               │            │   │
│  │       │        ┌──────┴──────┐          │               │            │   │
│  │       │        │  UIProvider │          │               │            │   │
│  │       │        │ (Context)   │          │               │            │   │
│  │       │        └──────┬──────┘          │               │            │   │
│  │       │               │                 │               │            │   │
│  │  ┌────┴─────┐   ┌─────┴──────────────┐  │               │            │   │
│  │  │UIMemSet  │   │  Board │ PlayerBar │  │               │            │   │
│  │  │codeSec   │   │  NameSection       │  │               │            │   │
│  │  └────┬─────┘   └─────┬──────────────┘  │               │            │   │
│  │       │               │                 │               │            │   │
│  │       └───────┬───────┘                 │               │            │   │
│  │               │                         │               │            │   │
│  │      ┌────────┴────────┐                │               │            │   │
│  │      │  connService    │◄──── Socket.IO ────────────────┼────────────┼───┤
│  │      │  (Socket.IO)    │                │               │            │   │
│  │      └────────┬────────┘                │               │            │   │
│  │               │                         │               │            │   │
│  │               ├── fetch /api/memSets ────┼───────────────┼────────────┼───┤
│  │               ├── fetch /api/login   ────┼───────────────┼────────────┼───┤
│  │               └── fetch /api/register────┼───────────────┼────────────┼───┤
│  └──────────────────────────────────────────┼───────────────┼────────────┼───┘
│                                             │               │            │
├─────────────────────────────────────────────┼───────────────┼────────────┼───┤
│               SERVER (Express + Socket.IO)  │               │            │   │
│  ┌──────────────────────────────────────────┼───────────────┼────────────┼───┘
│  │  src/server/app.ts                       │               │            │
│  │                                          │               │            │
│  │  ┌─────────────────────┐                 │               │            │
│  │  │  REST-Endpoints     │◄────────────────┼───────────────┼────────────┘
│  │  │  GET  /api/health   │                 │               │
│  │  │  GET  /api/memSets  │                 │               │
│  │  │  POST /api/register │                 │               │
│  │  │  POST /api/login    │                 │               │
│  │  └─────────────────────┘                 │               │
│  │                                          │               │
│  │  ┌─────────────────────┐                 │               │
│  │  │  WebSocket (wss)    │◄────────────────┼───────────────┘
│  │  │  Socket.IO Server   │                 │
│  │  └────────┬────────────┘                 │
│  │           │ initUser / onMessage         │
│  │  ┌────────┴────────────┐                 │
│  │  │  Room               │                 │
│  │  │  - users: Player[]  │                 │
│  │  │  - sockets: Socket[]│                 │
│  │  │  - broadcast()      │                 │
│  │  └────────┬────────────┘                 │
│  │           │ openField(clientID, index)   │
│  │  ┌────────┴────────────┐                 │
│  │  │  Game               │                 │
│  │  │  - BoardUI (64)     │                 │
│  │  │  - Karten-matching  │                 │
│  │  │  - Timeout 3s       │                 │
│  │  └─────────────────────┘                 │
│  │                                          │
│  │  ┌─────────────────────┐                 │
│  │  │  Auth               │                 │
│  │  │  - JWT sign/verify  │                 │
│  │  │  - authenticateSocket                │
│  │  └────────┬────────────┘                 │
│  │           │                              │
│  │  ┌────────┴────────────┐                 │
│  │  │  Database (SQLite)  │                 │
│  │  │  - users-Tabelle    │                 │
│  │  │  - bcrypt-Hashing   │                 │
│  │  └─────────────────────┘                 │
│  └──────────────────────────────────────────┘
│
└─────────────────────────────────────────────────────────────────────────────┘

### Datenfluss (Memory-Spiel)

1. Spieler öffnet `/` → HomePage fetcht `GET /api/memSets`
2. Klick auf ein Theme → navigiert zu `/room/:randomId?memID=N`
3. Room baut Socket.IO-Verbindung auf (`connService`)
4. Server: `connection` → `authenticateSocket()` → `Room.initUser()`
5. `initUser` sendet initialen State (`board`, `users`, `ownId`) via Socket
6. Klick auf Karte → `connService.sendMessage({cmd:"open", param:index})`
7. Server: `Game.openField()` matcht Paare, broadcastet neues Board
8. Bei Fehlpaar: 3s Timeout, dann Karten wieder schließen
9. `PlayerBar` zeigt aktuelle Spieler und Punktestände