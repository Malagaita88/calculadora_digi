const CACHE = 'digi-calc-v1';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalar: guardar archivos en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ARCHIVOS))
  );
  self.skipWaiting();
});

// Activar: limpiar cachés viejas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: servir desde caché primero, luego red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
