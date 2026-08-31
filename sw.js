/* Service worker v12.2 : application utilisable sans reseau,
   mais qui recupere toujours la derniere version quand le reseau est la. */
var CACHE = "edl-v12-2";
var FICHIERS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icone-192.png",
  "./icone-512.png",
  "./icone-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return Promise.all(FICHIERS.map(function(f){
        return c.add(f).catch(function(){});
      }));
    })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(k){
    return Promise.all(k.map(function(nom){ return nom === CACHE ? null : caches.delete(nom); }));
  }).then(function(){ return self.clients.claim(); }));
});

function estPage(req){
  return req.mode === "navigate" ||
         (req.headers.get("accept") || "").indexOf("text/html") !== -1;
}

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;

  var url;
  try{ url = new URL(req.url); }catch(err){ return; }
  if(url.origin !== self.location.origin) return;
  if(url.pathname.indexOf("sw.js") !== -1) return;

  if(estPage(req)){
    e.respondWith(
      fetch(req, {cache:"no-store"}).then(function(net){
        /* On ne met en cache qu'une page reellement valide : sinon une panne
           passagere du serveur (404, 503, page d'erreur) remplacerait
           l'application par la page d'erreur, y compris hors ligne. */
        if(net && net.ok){
          var copie = net.clone();
          caches.open(CACHE).then(function(c){ c.put("./index.html", copie).catch(function(){}); });
          return net;
        }
        /* Reponse d'erreur : on ressert la derniere version saine si on l'a. */
        return caches.match("./index.html").then(function(r){ return r || net; });
      }).catch(function(){
        return caches.match("./index.html").then(function(r){ return r || caches.match("./"); });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(function(rep){
      if(rep) return rep;
      return fetch(req).then(function(net){
        if(net && net.status === 200 && net.type === "basic"){
          var copie = net.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copie).catch(function(){}); });
        }
        return net;
      });
    })
  );
});
