var cacheName = "timesets-cache-" + Date.now();

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
    "/assets/now-sound.mp3",
    "/font/Manrope-Regular.woff",
    "/font/Manrope-Regular.woff2",
    "/font/TitilliumWeb-Regular.woff",
    "/font/TitilliumWeb-Regular.woff2",
    "https://cdn.ko-fi.com/cdn/kofi3.png?v=2"
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