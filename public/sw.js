/**
 * @file sw.js - Service Worker للتطبيقات التقدمية (PWA) لمنصة مساند التعليمية
 * @description هذا الملف يتحكم بإدارة التخزين المؤقت واستراتيجيات الوصول للموارد عندما يكون المستخدم غير متصل بالإنترنت
 * @version 1.2.0
 */

// إصدار الكاش - يجب تحديث هذا الرقم عند إجراء تغييرات جوهرية
const CACHE_NAME = 'musanid-cache-v5';

/**
 * قائمة الموارد الأساسية للتخزين المؤقت الأولي
 * تشمل ملفات التصميم، سكربتات جافاسكريبت، الأيقونات، والصفحات الرئيسية
 */
const urlsToCache = [
  '/',
  '/css/styles.css',
  '/js/app.js',
  '/js/profile-page.js',
  '/js/favorites-page.js',
  '/manifest.json',
  '/offline.html',
  '/img/icons/logo.svg',
  '/img/icons/icon-192x192.png',
  '/img/icons/icon-512x512.png',
  '/img/icons/maskable-192.png',
  // صفحات ديناميكية ستُجلب عبر الشبكة أولاً ثم تُخزن تلقائياً
];

/**
 * حدث تثبيت Service Worker
 * يقوم بتخزين جميع الموارد الأساسية مؤقتًا للاستخدام دون اتصال
 */
self.addEventListener('install', (event) => {
  // التحديث الفوري للخدمة دون انتظار تحديث صفحة المتصفح
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('تهيئة الذاكرة المخبأة: ' + CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('فشل في تخزين الموارد الأساسية:', error);
      })
  );
});

/**
 * حدث الاستلام (fetch) - يتحكم باستراتيجية الوصول للموارد
 * يستخدم استراتيجيات مختلفة بناءً على نوع المورد المطلوب:
 * 1. للملفات الثابتة (CSS/JS/صور): استراتيجية الكاش أولاً
 * 2. لصفحات التنقل (HTML): استراتيجية الشبكة أولاً مع التحول لـ offline.html عند فشل الاتصال
 * 3. لبقية الطلبات (مثل API): استراتيجية الشبكة أولاً ثم المخبأ
 */
self.addEventListener('fetch', (event) => {
  // تجاهل طلبات غير HTTP/HTTPS (مثل chrome-extension:// أو blob:)
  if (!event.request.url.startsWith('http')) return;
  
  // معالجة الملفات الثابتة - CSS، JS، الصور والخطوط (استراتيجية: الكاش أولاً)
  if (
    event.request.url.match(/\.(css|js|svg|png|jpg|jpeg|gif|woff2?|ico)$/) ||
    event.request.url.includes('/img/')
  ) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // إذا وجدت نسخة مخبأة، استخدمها
          if (response) {
            return response;
          }
          
          // إذا لم توجد، اطلبها من الشبكة
          return fetch(event.request)
            .then((fetchResponse) => {
              // تأكد من أن الاستجابة صالحة
              if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                return fetchResponse;
              }
              
              // تخزين النسخة الجديدة في الكاش للاستخدام المستقبلي
              const responseToCache = fetchResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseToCache))
                .catch(err => console.warn('فشل تخزين المورد في الكاش:', err));
                
              return fetchResponse;
            })
            .catch(error => {
              console.error('فشل جلب المورد:', error);
              return new Response('فشل تحميل المورد', { status: 408, headers: { 'Content-Type': 'text/plain' } });
            });
        })
    );
    return;
  }
  
  /**
   * معالجة طلبات التنقل (الصفحات HTML)
   * استراتيجية الشبكة أولاً مع التحول لصفحة offline.html عند عدم وجود اتصال
   */
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // تخزين صفحات التنقل الناجحة للاستخدام المستقبلي
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache))
              .catch(err => console.warn('فشل تخزين صفحة التنقل في الكاش:', err));
          }
          return response;
        })
        .catch((error) => {
          console.log('فشل التنقل، محاولة استخدام الكاش:', error);
          return caches.match(event.request)
            .then((response) => {
              // إذا وجدت النسخة المخبأة، استخدمها
              if (response) {
                console.log('تم استخدام نسخة مخبأة من صفحة:', event.request.url);
                return response;
              }
              
              // إذا لم توجد، استخدم صفحة عدم الاتصال
              console.log('استخدام صفحة عدم الاتصال');
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }

  /**
   * معالجة بقية الطلبات (مثل API والموارد الأخرى)
   * استراتيجية الشبكة أولاً ثم الكاش إذا فشلت الشبكة
   */
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // لا نخزن الطلبات غير الناجحة أو طلبات من نطاقات أخرى
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // تخزين الاستجابة الناجحة في الكاش
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => cache.put(event.request, responseToCache))
          .catch(err => console.warn('فشل تخزين استجابة API في الكاش:', err));
          
        return response;
      })
      .catch((error) => {
        console.log('فشل طلب API، محاولة استخدام الكاش:', error);
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // إذا لم يوجد نسخة مخبأة للـ API، نعيد رسالة خطأ بتنسيق JSON
            return new Response(JSON.stringify({
              error: true,
              message: 'لا يمكن الوصول إلى الخادم. يرجى التحقق من اتصالك بالإنترنت.'
            }), { 
              status: 503, 
              headers: { 'Content-Type': 'application/json' }
            });
          });
      })
  );
});

/**
 * حدث التفعيل (activate) - يُستخدم لتنظيف المخبآت القديمة
 * يُنفذ عند تفعيل إصدار جديد من Service Worker
 */
self.addEventListener('activate', (event) => {
  // قائمة المخبآت التي نريد الاحتفاظ بها
  const cacheWhitelist = [CACHE_NAME];
  console.log('تفعيل Service Worker الجديد:', CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // حذف المخبآت القديمة التي ليست في القائمة البيضاء
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('حذف المخبأ القديم:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // المطالبة بالسيطرة على جميع العملاء دون الحاجة لتحديث الصفحة
      return self.clients.claim();
    }).catch(error => {
      console.error('فشل في تنظيف المخبآت القديمة:', error);
    })
  );
});

/**
 * حدث رسالة (message) - يتعامل مع الرسائل من الصفحات
 * يمكن استخدامه لتحديث الكاش أو تنفيذ أوامر خاصة
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.action === 'clearCache') {
    caches.delete(CACHE_NAME).then(() => {
      console.log('تم مسح الكاش بنجاح');
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ success: true });
      }
    }).catch(error => {
      console.error('فشل في مسح الكاش:', error);
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ success: false, error: error.message });
      }
    });
  }
});