// app.js - سكربت موحّد للوظائف التفاعلية
(function(){
  'use strict';

  function qs(sel, ctx){ return (ctx||document).querySelector(sel); }
  function qsa(sel, ctx){ return Array.from((ctx||document).querySelectorAll(sel)); }

  function getCsrf(){ return (qs('meta[name="csrf-token"]')||{}).content || ''; }

  // Toast System
  function showToast(msg, isError){
    const holder = qs('#toastHolder');
    if(!holder){ alert(msg); return; }
    const el = document.createElement('div');
    el.className = 'px-4 py-2 rounded shadow text-sm transition ' + (isError ? 'bg-red-600 text-white' : 'bg-musanid-dark text-white');
    el.textContent = msg;
    holder.appendChild(el);
    setTimeout(()=>{ el.classList.add('opacity-0'); setTimeout(()=> el.remove(), 400); }, 2500);
  }
  window.showToast = showToast; // متاح عام عند الحاجة

  // Mobile Menu (كان inline)
  function initMobileMenu(){
    const btn = qs('#mobileMenuBtn');
    const menu = qs('#mobileMenu');
    if(!btn || !menu) return;
    btn.addEventListener('click', ()=> menu.classList.toggle('hidden'));
    document.addEventListener('click', (e)=>{
      if(e.target.closest('#mobileMenuBtn') || e.target.closest('#mobileMenu')) return;
      menu.classList.add('hidden');
    });
  }
  
  // تهيئة الوضع المظلم
  function initDarkMode() {
    const darkModeToggle = qs('#darkModeToggle');
    const htmlElement = document.documentElement;
    
    // فحص التفضيل المحفوظ مسبقًا
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    
    // تهيئة زر التبديل
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        // تبديل الوضع
        if (htmlElement.classList.contains('dark')) {
          htmlElement.classList.remove('dark');
          localStorage.setItem('darkMode', 'light');
        } else {
          htmlElement.classList.add('dark');
          localStorage.setItem('darkMode', 'dark');
        }
      });
    }
    
    // فحص تفضيل النظام (إذا لم يتم تعيين تفضيل)
    if (!savedDarkMode) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        htmlElement.classList.add('dark');
        localStorage.setItem('darkMode', 'dark');
      }
    }
  }

  // Favorites: تحميل الحالة وتحديث الشارة وتبديل الأزرار
  async function initFavoritesUI(){
    const favBtns = qsa('.favorite-btn');
    const badge = qs('.favorites-count');
    // إن لم توجد أزرار ولا شارة، لا نعمل شيء
    if(!favBtns.length && !badge) return;
    try{
      const r = await fetch('/api/favorites', { headers: { 'Accept':'application/json' }, credentials: 'same-origin' });
      if(r.status === 401) return; // غير مسجل دخول
      if(!r.ok) return;
      const data = await r.json();
      // تحديث الشارة
      if(badge){
        const c = data.count || 0;
        badge.textContent = c;
        badge.classList.toggle('hidden', c === 0);
      }
      const favSet = new Set(data.ids || []);
      // تحديث أزرار المفضلة وفق ids
      favBtns.forEach(btn=>{
        const id = parseInt(btn.getAttribute('data-id'), 10);
        if(id && favSet.has(id)){
          btn.classList.add('is-favorite');
          const icon = btn.querySelector('.favorite-icon');
          if(icon){ icon.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>'; }
          const text = btn.querySelector('.favorite-text');
          if(text) text.textContent = 'إزالة من المفضلة';
        }
      });
    } catch {}

    // تفويض حدث النقر للتبديل
    document.addEventListener('click', async (e)=>{
      const btn = e.target.closest('.favorite-btn');
      if(!btn) return;
      e.preventDefault();
      const slug = btn.getAttribute('data-slug');
      if(!slug) return;
      const isFav = btn.classList.contains('is-favorite');
      const method = isFav ? 'DELETE' : 'POST';
      btn.classList.add('loading');
      btn.setAttribute('disabled','true');
      try{
        const r = await fetch('/api/favorites/' + slug, { method, headers: { 'CSRF-Token': getCsrf(), 'Accept':'application/json' }, credentials: 'same-origin' });
        const data = await r.json().catch(()=>({}));
        if(r.ok){
          btn.classList.toggle('is-favorite');
          const delta = isFav ? -1 : 1;
          const b = qs('.favorites-count');
          if(b){
            const current = parseInt(b.textContent||'0',10) || 0;
            const next = Math.max(0, current + delta);
            b.textContent = next; b.classList.toggle('hidden', next===0);
          }
          const icon = btn.querySelector('.favorite-icon');
          if(icon){ icon.innerHTML = isFav
            ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>'
            : '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>';
          }
          const text = btn.querySelector('.favorite-text');
          if(text) text.textContent = isFav ? 'إضافة إلى المفضلة' : 'إزالة من المفضلة';
          showToast(data.message || 'تم');
        } else {
          showToast(data.message || 'حدث خطأ أثناء تحديث المفضلة', true);
        }
      } catch { showToast('خطأ اتصال', true); }
      finally{ btn.classList.remove('loading'); btn.removeAttribute('disabled'); }
    });
  }
  
  function init(){
    initMobileMenu();
    initDarkMode();
    initFavoritesUI();
    // تسجيل Service Worker مع معالجة أفضل
    if('serviceWorker' in navigator){
      window.addEventListener('load', ()=>{
        navigator.serviceWorker.register('/sw.js')
          .then(reg => {
            console.log('Service Worker مسجل بنجاح مع النطاق: ', reg.scope);
            
            // التعامل مع تحديثات الخدمة
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // توجد نسخة جديدة جاهزة للاستخدام - إظهار إشعار للمستخدم
                  showToast('توجد نسخة جديدة من التطبيق متاحة! أعد تحميل الصفحة للتحديث.', false);
                }
              });
            });
          })
          .catch(error => {
            console.error('فشل تسجيل Service Worker: ', error);
          });
        
        // التحقق من حالة الاتصال وتوفير تجربة offline أفضل
        window.addEventListener('online', () => showToast('تم استعادة الاتصال بالإنترنت.', false));
        window.addEventListener('offline', () => showToast('أنت الآن غير متصل بالإنترنت. بعض الوظائف قد لا تعمل.', true));
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();