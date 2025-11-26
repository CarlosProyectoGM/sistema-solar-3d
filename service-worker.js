self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("solar-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "script.js",
        "assets/"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
