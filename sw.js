// Mon Budget — fonctionnement hors ligne
const C='monbudget-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
  const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>hit);
  return hit||net}))});
