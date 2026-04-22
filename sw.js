const C="gl-v3";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.add("./index.html")));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res&&res.status===200){const c=res.clone();caches.open(C).then(ca=>ca.put(e.request,c))}return res}).catch(()=>caches.match("./index.html"))))});
