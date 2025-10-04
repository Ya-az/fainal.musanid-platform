// Service Worker لدعم خاصية التطبيقات التقدمية (PWA)
const CACHE_NAME = 'musanid-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/styles.css',
  '/js/main.js',
  '/manifest.json',
  '/img/icons/icon-192x192.png',
  '/img/icons/icon-512x512.png'
];

// تثبيت Service Worker وتخزين الملفات الأساسية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم فتح ذاكرة التخزين المؤقت');
        return cache.addAll(urlsToCache);
      })
  );
});

// استراتيجية الشبكة أولاً، ثم التخزين المؤقت
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // إذا فشل الطلب، حاول الوصول إلى النسخة المخزنة مؤقتًا
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            // إذا كان الطلب لصفحة HTML، قم بإرجاع صفحة التصفح بدون اتصال
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            // إذا لم يتم العثور على الملف في ذاكرة التخزين المؤقت، أرجع خطأ
            return new Response('حدث خطأ في الاتصال بالإنترنت', {
              status: 503,
              statusText: 'خدمة غير متوفرة',
              headers: new Headers({
                'Content-Type': 'text/plain; charset=utf-8'
              })
            });
          });
      })
  );
});

// تحديث ذاكرة التخزين المؤقت عند تغيير إصدار Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // حذف ذاكرات التخزين المؤقت القديمة
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});