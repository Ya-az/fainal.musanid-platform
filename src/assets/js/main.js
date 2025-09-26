// main.js - سكربت مساعد لفريق التطوير

// التحكم في القائمة المتنقلة
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // إخفاء القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// إضافة تأثير تحميل الصفحة
function pageTransition() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// تأثيرات النقر على الروابط
function setupLinkEffects() {
    document.querySelectorAll('a').forEach(link => {
        // تجاهل الروابط التي تفتح في نافذة جديدة
        if (!link.target) {
            link.addEventListener('click', (e) => {
                if (!e.ctrlKey && !e.shiftKey && !e.metaKey) {
                    e.preventDefault();
                    document.body.style.opacity = '0';
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 300);
                }
            });
        }
    });
}

// التحقق من صحة النماذج
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // إظهار تأثير التحميل
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.innerText;
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="inline-block animate-spin mr-2">⏳</span> جاري المعالجة...';
                
                // محاكاة إرسال النموذج
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerText = originalText;
                    // هنا سيتم إضافة الكود الفعلي لإرسال النموذج
                }, 1500);
            }
        });
    });
}

// تأثيرات التمرير
function setupScrollEffects() {
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('opacity-100');
                element.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    };

    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // تشغيل مرة عند تحميل الصفحة
}

// تهيئة جميع الوظائف
function initializeAll() {
    pageTransition();
    setupMobileMenu();
    setupLinkEffects();
    setupFormValidation();
    setupScrollEffects();
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initializeAll);