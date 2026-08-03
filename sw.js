/* Service worker : rend l'application utilisable sans réseau. */
var CACHE = "edl-v10";
var FICHIERS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icone-192.png",
  "./icone-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FICHIERS); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(k){
    return Promise.all(k.map(function(n){ return n === CACHE ? null : caches.delete(n); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function(rep){
      if(rep) return rep;
      return fetch(e.request).then(function(net){
        var copie = net.clone();
        caches.open(CACHE).then(function(c){
          try{ c.put(e.request, copie); }catch(err){}
        });
        return net;
      }).catch(function(){
        return caches.match("./index.html");
      });
    })
  );
});
