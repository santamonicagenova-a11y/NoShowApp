// NoShowApp — Service Worker
// Cache della shell per accesso offline + connessioni instabili nel ristorante.
// Network-first per API/Supabase, cache-first per asset statici.

const CACHE = 'noshowapp-v2';
const SHELL = [
  '/',
  '/index.html',
  '/pwa/icons/site.webmanifest',
  '/pwa/icons/web-app-manifest-192x192.png',
  '/pwa/icons/web-app-manifest-512x512.png',
  '/pwa/icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // addAll è atomico: se uno fallisce, salta tutta l'operazione.
      // Usiamo add singoli con catch per essere tolleranti a 404 isolati.
      Promise.all(SHELL.map((url) => c.add(url).catch((err) =>
        console.warn('[SW] skip', url, err.message)
      )))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // API / Supabase / esterni — network first, no cache
  if (
    url.hostname.includes('supabase') ||
    url.hostname.includes('stripe') ||
    url.pathname.startsWith('/api/') ||
    url.origin !== self.location.origin
  ) {
    return; // lascia passare, non intercettare
  }

  // Asset same-origin — cache first
  e.respondWith(
    caches.match(e.request).then((hit) =>
      hit ||
      fetch(e.request).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match('/index.html'))
    )
  );
});
