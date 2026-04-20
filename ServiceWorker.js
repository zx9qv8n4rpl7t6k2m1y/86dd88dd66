const cacheName = "GoGoMan-Funny City Gopniks-1.11";
const contentToCache = [
    "Build/83cbc69280df1032fc7206db435c9bb6.loader.js",
    "Build/332d115891b7bc45885dfd1db543bc96.framework.js.unityweb",
    "Build/d0a276550058e04f5e66c0561d0cef39.data.unityweb",
    "Build/64a3756e786780c55c83887ba94f46a0.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
