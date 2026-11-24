import { defineConfig } from 'vite';
import { createHash } from 'node:crypto';

export default defineConfig({
  plugins: [{
    name: 'offline-app',
    generateBundle(_, bundle) {
      const files = Object.keys(bundle).map((file) => '/' + file);
      const version = createHash('sha256').update(files.join('\n')).digest('hex').slice(0, 16);
      this.emitFile({
        type: 'asset',
        fileName: 'sw.js',
        source: `
const prefix = 'mis-cualidades-';
const cacheName = prefix + '${version}';
const appFiles = ${JSON.stringify(['/', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png'])}.concat(${JSON.stringify(files)});

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(appFiles)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key.startsWith(prefix) && key !== cacheName)
      .map((key) => caches.delete(key))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.open(cacheName).then((cache) => cache.match('/'))));
  } else {
    event.respondWith(caches.open(cacheName).then((cache) => cache.match(request)).then((cached) => cached || fetch(request)));
  }
});
`,
      });
    },
  }],
});
