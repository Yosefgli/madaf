const CACHE_NAME = "restock-pwa-v3";
const ASSETS = [
  "/madaf/",
  "/madaf/index.html",
  "/madaf/manifest.json",
  "/madaf/icons/icon-192.png",
  "/madaf/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((c) => c || fetch(event.request)));
});
