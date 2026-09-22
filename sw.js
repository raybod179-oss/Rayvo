/*!
 * Rayvo — Service Worker
 *
 * • Makes the site installable (PWA) and usable offline.
 * • Handles same-origin GET requests only; every other request (fonts, etc.)
 *   is left untouched.
 * • Pages: network-first (always fresh online, cached copy offline).
 * • Static files: stale-while-revalidate (instant, refreshed in the background).
 * • Paths are relative to the worker's scope, so this also works from a
 *   sub-path (e.g. GitHub Pages project sites).
 *
 * Bump CACHE_VERSION after a release so returning visitors drop the old cache.
 * Favicon/icon files are NOT in PRECACHE — add your own (see README → "Favicon"),
 * they get cached automatically the first time they're requested.
 */
const CACHE_VERSION = 'rayvo-v1';

const PRECACHE = [
  './',
  'assets/css/tailwind.css',
  'assets/js/theme-init.js',
  'assets/js/app.js',
  'assets/img/logo.jpg',
  'assets/img/logo-72.webp',
  'assets/img/projects/ak-planner.webp',
  'assets/img/projects/ak-spend.webp',
  'assets/img/projects/ak-notes.webp',
  'assets/img/projects/ak-kanban.webp',
  'assets/img/projects/ak-analytics-dashboard.webp',
  'assets/img/projects/taurustrade.webp',
  'assets/img/projects/raybod-akbarlou-portfolio.webp',
  'assets/img/projects/ak-ai-workspace.webp',
  'assets/img/projects/qelvexa.webp',
];

const scopeUrl = (path) => new URL(path, self.registration.scope).href;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      // Each file is cached independently: one missing/renamed asset (e.g. a
      // favicon you haven't added yet) must never abort the whole install.
      Promise.all(
        PRECACHE.map((path) => cache.add(scopeUrl(path)).catch(() => undefined)),
      ),
    ).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_VERSION);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request, { ignoreSearch: true })) || (await cache.match(scopeUrl('./'))) || Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then((response) => {
      if (response.ok && response.type === 'basic') cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);
  return cached || (await refresh) || Response.error();
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.href === self.location.href) return; // never cache sw.js itself

  event.respondWith(request.mode === 'navigate' ? networkFirst(request) : staleWhileRevalidate(request));
});
