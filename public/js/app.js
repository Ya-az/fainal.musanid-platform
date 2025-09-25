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

  // Dashboard Progress + Lessons toggle
  async function fetchProgress(updateLessons){
    const progressBar = qs('#progressBar');
    const completedEl = qs('#completedLessons');
    const totalEl = qs('#totalLessons');
    if(!progressBar) return; // ليس في لوحة التحكم
    try {
      const url = '/api/progress' + (updateLessons ? '?include=lessons' : '');
      const r = await fetch(url, { headers: { 'Accept':'application/json' }});
      if(!r.ok) return;
      const data = await r.json();
      const { percent=0, completed=0, total=0 } = data;
      progressBar.setAttribute('aria-valuenow', percent);
      requestAnimationFrame(()=> progressBar.style.width = percent + '%');
      if(completedEl) completedEl.textContent = completed;
      if(totalEl) totalEl.textContent = total;
      if(updateLessons && data.lessons){ rebuildLessons(data.lessons); }
    } catch(e){ /* تجاهل */ }
  }

  function rebuildLessons(lessons){
    const list = qs('#lessonsList');
    if(!list) return;
    list.innerHTML = '';
    if(!lessons.length){ list.innerHTML = '<p class="text-sm text-gray-500">لا يوجد دروس حالياً.</p>'; return; }
    lessons.forEach(l => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `<div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">\n        <div class=\"flex items-center\">\n          <span class=\"${l.completed ? 'text-green-500' : 'text-gray-400'} ml-2\">${l.completed ? '✅' : '⌛'}<\/span>\n          <div>\n            <h3 class=\"font-bold text-gray-900\">${l.title}<\/h3>\n            <p class=\"text-sm text-gray-600\">المدة: ${l.durationMinutes} دقيقة<\/p>\n          </div>\n        </div>\n        <div class=\"flex gap-2\">\n          <a href=\"/course/${l.slug}\" class=\"btn-primary text-sm\">فتح<\/a>\n          <button data-slug=\"${l.slug}\" data-completed=\"${l.completed}\" class=\"toggleLesson btn-secondary text-sm\">${l.completed? 'إلغاء' : 'اكتمال'}<\/button>\n        </div>\n      </div>`;
      list.appendChild(wrapper.firstChild);
    });
  }

  async function toggleLesson(slug, completed){
    try {
      const method = completed ? 'DELETE' : 'POST';
      const r = await fetch('/api/progress/' + slug, { method, headers: { 'CSRF-Token': getCsrf() }});
      if(r.ok){
        const data = await r.json();
        showToast(data.message || 'تم');
        fetchProgress(true);
      } else {
        showToast('فشل التحديث', true);
      }
    } catch { showToast('تعذر الاتصال', true); }
  }

  function initDashboard(){
    if(!qs('#progressBar')) return; // ليس في لوحة التحكم
    // تشغيل بداية الحركة للقيمة المخزنة في data-progress (محقونة من السيرفر)
    const bar = qs('#progressBar');
    const initial = parseFloat(bar.getAttribute('data-progress')) || 0;
    requestAnimationFrame(()=> bar.style.width = initial + '%');
    document.addEventListener('click', (e)=>{
      const btn = e.target.closest('.toggleLesson');
      if(!btn) return;
      const slug = btn.getAttribute('data-slug');
      const completed = btn.getAttribute('data-completed') === 'true';
      btn.disabled = true; btn.textContent = '...';
      toggleLesson(slug, completed).finally(()=> btn.disabled = false);
    });
  }

  // Lesson page logic
  async function refreshGlobalProgress(){
    const bar = qs('#globalProgressBar');
    if(!bar) return; // ليس صفحة درس
    try {
      const r = await fetch('/api/progress', { headers: { 'Accept':'application/json' }});
      if(!r.ok) return; const data = await r.json();
      const { percent=0, completed=0, total=0 } = data;
      requestAnimationFrame(()=> bar.style.width = percent + '%');
      const txt = qs('#globalProgressText');
      if(txt) txt.textContent = `أكملت ${completed} من ${total} ( ${percent}% )`;
    } catch{ /* */ }
  }

  function initLessonPage(){
    const btn = qs('#toggleCompleteBtn');
    if(!btn) return;
    refreshGlobalProgress();
    btn.addEventListener('click', async function(){
      const completed = this.getAttribute('data-completed') === 'true';
      this.disabled = true; const old = this.textContent; this.textContent = '...';
      const slug = this.getAttribute('data-slug') || window.location.pathname.split('/').pop();
      try {
        const method = completed ? 'DELETE' : 'POST';
        const r = await fetch('/api/progress/' + slug, { method, headers: { 'CSRF-Token': getCsrf() }});
        if(r.ok){
          const data = await r.json();
            showToast(data.message || 'تم');
            this.setAttribute('data-completed', (!completed).toString());
            this.textContent = completed ? 'تعليم كمكتمل' : 'إلغاء إكمال';
            refreshGlobalProgress();
        } else {
          showToast('تعذر تحديث التقدم', true); this.textContent = old;
        }
      } catch { showToast('تعذر الاتصال', true); this.textContent = old; }
      this.disabled = false;
    });
  }

  // Password strength helper (client side optional)
  function initPasswordStrength(){
    // تسجيل: name="password"
    const regPwd = qs('form input[name="password"]');
    const regMeter = qs('#passwordStrength');
    if(regPwd && regMeter){
      regPwd.addEventListener('input', ()=>{ regMeter.value = passwordScore(regPwd.value||''); });
    }
    // الإعدادات: name="newPassword" في نموذج تغيير كلمة المرور
    const newPwd = qs('form input[name="newPassword"]');
    if(newPwd && regMeter){
      newPwd.addEventListener('input', ()=>{ regMeter.value = passwordScore(newPwd.value||''); });
    }
  }

  function passwordScore(p){
    let s = 0; if(p.length >= 8) s++; if(/[A-Z]/.test(p)) s++; if(/[a-z]/.test(p)) s++; if(/[0-9]/.test(p)) s++; if(/[^A-Za-z0-9]/.test(p)) s++; return s; }

  function init(){
    initMobileMenu();
    initDashboard();
    initLessonPage();
    initPasswordStrength();
    initSettingsForms();
    initSupportForm();
  }

  document.addEventListener('DOMContentLoaded', init);

  // إعداد نماذج الإعدادات (بروفايل + كلمة مرور) AJAX
  function initSettingsForms(){
    const profileForm = document.querySelector('form[action="/settings/profile"]');
    if(profileForm){
      profileForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const btn = profileForm.querySelector('button[type="submit"], button:not([type])') || profileForm.querySelector('button');
        if(btn){ btn.disabled = true; var old = btn.textContent; btn.textContent = '...'; }
        const fd = new FormData(profileForm);
        try {
          const r = await fetch('/settings/profile', { method:'POST', headers: { 'CSRF-Token': getCsrf() }, body: fd });
          const ok = r.ok;
          let msg = 'تم';
          if(ok){ const data = await r.json().catch(()=>({message:'تم'})); msg = data.message || msg; }
          else { msg = 'فشل تحديث الملف'; }
          showToast(msg, !ok);
        } catch { showToast('خطأ اتصال', true); }
        if(btn){ btn.disabled = false; btn.textContent = old; }
      });
    }
    const pwdForm = document.querySelector('form[action="/settings/password"]');
    if(pwdForm){
      pwdForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const btn = pwdForm.querySelector('[data-password-change]');
        if(btn){ btn.disabled = true; var oldT = btn.textContent; btn.textContent = '...'; }
        const fd = new FormData(pwdForm);
        try {
          const r = await fetch('/settings/password', { method:'POST', headers: { 'CSRF-Token': getCsrf() }, body: fd });
          const resp = await r.json().catch(()=>({message:'تم'}));
          showToast(resp.message || 'تم', !r.ok);
          if(r.ok){ pwdForm.reset(); }
        } catch { showToast('خطأ اتصال', true); }
        if(btn){ btn.disabled = false; btn.textContent = oldT; }
      });
    }
  }

  function initSupportForm(){
    const form = document.getElementById('supportForm');
    if(!form) return;
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const btn = form.querySelector('[data-support-submit]');
      if(btn){ btn.disabled = true; var old = btn.textContent; btn.textContent = '...'; }
      const fd = new FormData(form);
      try {
        const r = await fetch('/support', { method:'POST', headers: { 'CSRF-Token': getCsrf() }, body: fd });
        const data = await r.json().catch(()=>({message:'تم'}));
        showToast(data.message || 'تم', !r.ok);
        if(r.ok) form.reset();
      } catch { showToast('خطأ اتصال', true); }
      if(btn){ btn.disabled = false; btn.textContent = old; }
    });
  }
})();
