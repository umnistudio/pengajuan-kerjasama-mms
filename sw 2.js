// Service Worker — Divisi Humas MMS
// Fungsi: (1) syarat wajib supaya web ini bisa di-"Install" sebagai app di HP,
// (2) menampilkan notifikasi reminder/pengajuan lewat reg.showNotification().

const CACHE_NAME = 'humas-mms-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Wajib ada minimal 1 fetch handler supaya Chrome menganggap SW ini "aktif"
// dan situs memenuhi syarat installable (bukan cuma "Add to Home Screen").
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});

// Saat notifikasi diklik, buka/fokuskan tab web yang sudah ada, atau buka baru.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('/');
    })
  );
});
