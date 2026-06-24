import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    // Vite schaut jetzt primär in den Ordner src/client/
    root: 'src/client',
    server: {
        proxy: {
            '/api': 'http://localhost:3000',  // ← API-Requests an Express
        },
    },
    build: {
        // Da das Rootverzeichnis verschoben wurde, bauen wir den Output
        // drei Ebenen höher in das Hauptverzeichnis (dist-client)
        outDir: resolve(__dirname, 'dist-client'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                // Die Pfade sind nun relativ zu src/client/
                main: resolve(__dirname, 'src/client/index.html')
            },
        },
    },
});