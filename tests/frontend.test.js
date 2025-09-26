/**
 * @jest-environment jsdom
 */

// اختبارات للبرمجيات الأمامية

describe('اختبار وظائف واجهة المستخدم', () => {
  beforeEach(() => {
    // إعداد JSDOM لاختبار واجهة المستخدم
    document.body.innerHTML = `
    <div id="toastHolder"></div>
    <button id="darkModeToggle"></button>
    <div id="mobileMenu" class="hidden"></div>
    <button id="mobileMenuBtn"></button>
    <div class="favorites-count">0</div>
    <button class="favorite-btn" data-id="1" data-slug="test-lesson">
      <div class="favorite-icon"></div>
      <span class="favorite-text">إضافة إلى المفضلة</span>
    </button>
    `;
    
    // تهيئة localStorage محاكاة
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
      removeItem: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    // تحميل وظائف التطبيق
    require('../public/js/app.js');
  });
  
  test('عرض إشعار يجب أن يضيف عنصر للقائمة', () => {
    // تعريف showToast كدالة عامة أصبحت متاحة بعد تحميل app.js
    window.showToast('اختبار الإشعارات', false);
    
    // التأكد من إضافة الإشعار
    const toasts = document.querySelectorAll('#toastHolder > div');
    expect(toasts.length).toBe(1);
    expect(toasts[0].textContent).toBe('اختبار الإشعارات');
  });
  
  test.skip('النقر على زر القائمة المتنقلة يجب أن يزيل صنف hidden', () => {
    // محاكاة النقر على زر القائمة
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    expect(mobileMenu.classList.contains('hidden')).toBe(true);
    mobileMenuBtn.click();
    expect(mobileMenu.classList.contains('hidden')).toBe(false);
  });
});