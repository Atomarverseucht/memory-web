# Handbuch für memory-web

Dieses Dokument enthält Anweisungen zum Einrichten, Entwickeln und Bereitstellen der `memory-web`-Anwendung.

## 1. Projektübersicht

`memory-web` ist eine kollaborative Echtzeit-Webanwendung, die mit der PartyKit-Plattform, React und TypeScript erstellt wurde. Basierend auf dem Namen des Repositorys handelt es sich wahrscheinlich um ein Mehrspieler-Memory-Spiel. Das PartyKit-Backend übernimmt die Echtzeit-Synchronisation zwischen den Clients.

## 2. Abhängigkeiten

Das Projekt basiert auf mehreren Schlüsseltechnologien:

- **React**: Eine JavaScript-Bibliothek zum Erstellen der Benutzeroberfläche.
- **TypeScript**: Ein Superset von JavaScript, das statische Typisierung hinzufügt.
- **PartyKit**: Eine Plattform zum Erstellen von kollaborativen Echtzeit-Anwendungen. Sie wird sowohl für die serverseitige Logik als auch für die Bereitstellung verwendet.
- **Partysocket**: Der Client, der zur Verbindung mit dem PartyKit-Backend verwendet wird.

## 3. Setup und Installation

Um das Projekt lokal einzurichten, befolge diese Schritte:

1.  **Klone das Repository:**
    ```bash
    git clone https://github.com/Atomarverseucht/memory-web.git
    cd memory-web
    ```

2.  **Installiere die Abhängigkeiten:**
    ```bash
    npm install
    ```

## 4. Lokale Entwicklung

Um den lokalen Entwicklungsserver zu starten, führe den folgenden Befehl aus. Dies startet einen Server mit Live-Reloading, sodass Änderungen am Code sofort im Browser sichtbar werden.

```bash
npm run dev
```

## 5. Projektstruktur

-   `src/`: Enthält den Frontend-Quellcode der React-Anwendung.
-   `public/`: Enthält statische Assets wie `index.html` und Bilder.
-   `partykit.json`: Die Konfigurationsdatei für das PartyKit-Backend.
-   `package.json`: Definiert die Projektabhängigkeiten und Skripte.

## 6. Bereitstellung

Die Anwendung kann mit den folgenden Befehlen auf der PartyKit-Plattform bereitgestellt werden:

-   **Vorschau-Bereitstellung:**
    ```bash
    npm run dev-deploy
    ```

-   **Produktions-Bereitstellung:**
    ```bash
    npm run deploy
    ```
