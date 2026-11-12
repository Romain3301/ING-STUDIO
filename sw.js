// ING STUDIO – fonctionnement hors connexion : la page et ses icônes sont gardées sur le téléphone
const C="ing-studio-v"+"202611121935";
const F=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{ self.skipWaiting(); e.waitUntil(caches.open(C).then(c=>c.addAll(F))); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())); });
// réseau d'abord (sans le cache HTTP du navigateur, sinon GitHub Pages garde l'ancienne page jusqu'à 10 min), cache si pas de connexion
self.addEventListener("fetch",e=>{ if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin) return;
  e.respondWith(fetch(e.request.url,{cache:"no-cache"}).then(r=>r.redirected?fetch(e.request):r).then(r=>{ const cp=r.clone(); caches.open(C).then(c=>c.put(e.request,cp)); return r; }).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html")))); });
