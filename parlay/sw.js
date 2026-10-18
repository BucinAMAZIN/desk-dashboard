// Parlay Desk service worker: push alerts only. No caching: every request goes straight to the network.
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(_){d={body:e.data&&e.data.text()}}
 e.waitUntil(self.registration.showNotification(d.title||'Parlay Desk',{body:d.body||'',tag:d.tag||undefined,icon:'icon-192.png',badge:'icon-192.png',data:{url:d.url||'/desk-dashboard/parlay/'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=(e.notification.data&&e.notification.data.url)||'/desk-dashboard/parlay/';
 e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(ws=>{for(const w of ws){if(w.url.includes('/desk-dashboard/parlay/')&&'focus' in w){w.navigate&&w.navigate(u);return w.focus()}}return clients.openWindow(u)}))});
