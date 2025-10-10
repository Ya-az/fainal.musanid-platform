/**
 * ملف JavaScript الرئيسي لمنصة مساند التعليمية
 * يحتوي على وظائف عامة مستخدمة في جميع أنحاء الموقع
 */

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    initAccordions();
    initFaqFilters();
    initFaqSearch();
    setupContactForm();
});

function setupNavigation() {
    const navPairs = [];

    document.querySelectorAll('[data-nav-target]').forEach(toggle => {
        const targetId = toggle.getAttribute('data-nav-target');
        const menu = document.getElementById(targetId);

        if (!menu) {
            return;
        }

        navPairs.push({ toggle, menu });
        toggle.setAttribute('aria-expanded', menu.classList.contains('is-open') ? 'true' : 'false');

        toggle.addEventListener('click', event => {
            event.stopPropagation();
            const willOpen = !menu.classList.contains('is-open');

            navPairs.forEach(pair => {
                if (pair.menu !== menu) {
                    pair.menu.classList.remove('is-open');
                    pair.toggle.setAttribute('aria-expanded', 'false');
                }
            });

            menu.classList.toggle('is-open', willOpen);
            toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        });
    });

    if (!navPairs.length) {
        return;
    }

    document.addEventListener('click', event => {
        navPairs.forEach(({ toggle, menu }) => {
            if (!menu.contains(event.target) && !toggle.contains(event.target)) {
                if (menu.classList.contains('is-open')) {
                    menu.classList.remove('is-open');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 960) {
            navPairs.forEach(({ toggle, menu }) => {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        }
    });
}

function initAccordions() {
    document.querySelectorAll('.accordion').forEach(accordion => {
        const items = accordion.querySelectorAll('.accordion__item');
        const allowMultiple = accordion.getAttribute('data-allow-multiple') === 'true';

        items.forEach(item => {
            const trigger = item.querySelector('.accordion__trigger');
            if (!trigger) {
                return;
            }

            trigger.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');

                if (!allowMultiple) {
                    items.forEach(el => el.classList.remove('is-open'));
                }

                item.classList.toggle('is-open', !isOpen);
            });
        });
    });
}

function initFaqFilters() {
    const filterButtons = document.querySelectorAll('[data-faq-filter]');
    const faqPanels = document.querySelectorAll('[data-faq-panel]');

    if (!filterButtons.length || !faqPanels.length) {
        return;
    }

    const togglePanels = value => {
        faqPanels.forEach(panel => {
            const matches = value === 'all' || panel.getAttribute('data-faq-panel') === value;
            panel.style.display = matches ? '' : 'none';
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-faq-filter');

            filterButtons.forEach(btn => btn.classList.remove('is-active'));
            button.classList.add('is-active');

            togglePanels(value);
        });
    });

    const firstButton = filterButtons[0];
    if (firstButton) {
        firstButton.click();
    }
}

function initFaqSearch() {
    const searchInput = document.getElementById('faqSearch');
    if (!searchInput) {
        return;
    }

    const faqItems = document.querySelectorAll('[data-faq-question]');
    const panels = document.querySelectorAll('[data-faq-panel]');

    const applySearch = term => {
        const normalizedTerm = term.trim().toLowerCase();

        faqItems.forEach(item => {
            const content = item.getAttribute('data-faq-question');
            const matches = !normalizedTerm || (content && content.includes(normalizedTerm));
            item.style.display = matches ? '' : 'none';
        });

        panels.forEach(panel => {
            const hasVisibleItem = Array.from(panel.querySelectorAll('[data-faq-question]'))
                .some(item => item.style.display !== 'none');
            panel.style.display = hasVisibleItem ? '' : 'none';
        });
    };

    searchInput.addEventListener('input', () => applySearch(searchInput.value));
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        return;
    }

    contactForm.addEventListener('submit', event => {
        event.preventDefault();

        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const subjectInput = contactForm.querySelector('#subject');
        const messageInput = contactForm.querySelector('#message');

        if (!nameInput?.value || !emailInput?.value || !messageInput?.value) {
            showMessage('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }

        showMessage('تم إرسال رسالتك بنجاح. سنتواصل معك قريبًا.', 'success');
        contactForm.reset();
    });
}

function showMessage(message, type = 'info') {
    const existingToast = document.querySelector('.site-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.textContent = message;
    toast.classList.add('site-toast');

    if (type === 'success') {
        toast.classList.add('site-toast--success');
    } else if (type === 'error') {
        toast.classList.add('site-toast--error');
    } else {
        toast.classList.add('site-toast--info');
    }

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4500);
}

// تحسينات الأداء وإمكانية الوصول المتقدمة
(function() {
    'use strict';

    // Performance optimization: Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Lazy loading for images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Accessibility improvements
    function enhanceAccessibility() {
        // Add main landmark if not exists
        if (!document.getElementById('main')) {
            const main = document.querySelector('main');
            if (main) {
                main.id = 'main';
                main.setAttribute('role', 'main');
            }
        }

        // Announce dynamic content changes
        if (!document.getElementById('announcer')) {
            const announcer = document.createElement('div');
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            announcer.id = 'announcer';
            announcer.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0;';
            document.body.appendChild(announcer);
        }
    }

    // Service Worker registration
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js', { scope: '/' })
                .then(registration => {
                    console.log('SW registered:', registration.scope);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }
    }

    // Initialize improvements
    function initPerformanceEnhancements() {
        initLazyLoading();
        enhanceAccessibility();
        registerServiceWorker();

        // Handle offline/online status
        window.addEventListener('online', () => {
            const announcer = document.getElementById('announcer');
            if (announcer) {
                announcer.textContent = 'تم استعادة الاتصال بالإنترنت';
            }
        });
        
        window.addEventListener('offline', () => {
            const announcer = document.getElementById('announcer');
            if (announcer) {
                announcer.textContent = 'انقطع الاتصال بالإنترنت. بعض الميزات قد لا تعمل';
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPerformanceEnhancements);
    } else {
        initPerformanceEnhancements();
    }

})();