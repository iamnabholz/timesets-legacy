var cacheName = "timesets-cache-v1.1.00014";

var filesToCache = [
    "/",
    "/index.html",
    "/global.css",
    "/main.js",
    "/build/bundle.js",
    "/build/bundle.css",
    "/assets/pause.svg",
    "/assets/start.svg",
    "/assets/stop-active.svg",
    "/assets/now-sound.ogg",
    "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&family=Manrope:wght@400;600;700&display=swap"
];

self.addEventListener("install", function (e) {
    self.skipWaiting();
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (thisCacheName) {
                    if (thisCacheName !== cacheName) {
                        return caches.delete(thisCacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        (async function () {
            const response = await caches.match(e.request);
            return response || fetch(e.request);
        })()
    );
});