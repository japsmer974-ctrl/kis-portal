// KIS - Service Worker

const KIS_CACHE_NAME = "kis-portal-v56";

const KIS_FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./css/splash.css",
  "./js/firebase.js",
  "./js/lessons.js",
  "./js/quiz.js",
  "./js/admin.js",
  "./js/app.js",
  "./js/pwa.js",
  "./js/splash.js",
  "./assets/vendor/qrcode.min.js",
  "./assets/vendor/html5-qrcode.min.js",
  "./assets/canva-icon-192.png",
  "./assets/canva-icon-512.png",
  "./assets/kis-official-logo.jpeg",
  "./assets/kis-official-logo-transparent.png",
"./assets/kis-header-banner.jpg",
];

// Install service worker and cache local app files.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(KIS_CACHE_NAME)
      .then((cache) => cache.addAll(KIS_FILES_TO_CACHE))
  );

  self.skipWaiting();
});

// Activate service worker.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith("kis-portal-") &&
                            name !== KIS_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );

  self.clients.claim();
});

// Serve the latest homepage online, with offline fallback.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestURL = new URL(event.request.url);

  if (requestURL.origin !== self.location.origin) {
    return;
  }

  // Network-first strategy for homepage navigation.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseCopy = response.clone();

          caches.open(KIS_CACHE_NAME).then((cache) => {
            cache.put("./index.html", responseCopy);
          });

          return response;
        })
        .catch(() => {
          return caches.match("./index.html");
        })
    );

    return;
  }

// Network-first strategy for JavaScript files.
if (requestURL.pathname.endsWith(".js")) {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const responseCopy = response.clone();

          caches.open(KIS_CACHE_NAME).then((cache) => {
            cache.put(event.request, responseCopy);
          });
        }

        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );

  return;
}

// Network-first strategy for CSS files.
if (requestURL.pathname.endsWith(".css")) {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const responseCopy = response.clone();

          caches.open(KIS_CACHE_NAME).then((cache) => {
            cache.put(event.request, responseCopy);
          });
        }

        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );

  return;
}

// Cache-first strategy for other local resources.
event.respondWith(
  caches.match(event.request).then((cachedResponse) => {
    return cachedResponse || fetch(event.request);
  })
);

});
