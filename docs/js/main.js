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

        // Click handler
        toggle.addEventListener('click', event => {
            event.stopPropagation();
            const willOpen = !menu.classList.contains('is-open');

            // Close other open menus
            navPairs.forEach(pair => {
                if (pair.menu !== menu) {
                    pair.menu.classList.remove('is-open');
                    pair.toggle.setAttribute('aria-expanded', 'false');
                }
            });

            menu.classList.toggle('is-open', willOpen);
            toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
            
            // Focus management for accessibility
            if (willOpen) {
                const firstLink = menu.querySelector('.site-nav__link');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        });

        // Keyboard navigation support
        toggle.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggle.click();
            }
            if (event.key === 'Escape') {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });

        // Menu keyboard navigation
        menu.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });
    });

    if (!navPairs.length) {
        return;
    }

    // Click outside to close
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

    // Close on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 960) {
            navPairs.forEach(({ toggle, menu }) => {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        }
    });

    console.log('✅ Enhanced navigation setup complete with accessibility features');
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

    function runWhenIdle(callback, fallbackDelay = 200) {
        if (typeof callback !== 'function') {
            return;
        }

        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(callback, { timeout: fallbackDelay * 4 });
        } else {
            window.setTimeout(callback, fallbackDelay);
        }
    }

    function loadDeferredSource(element) {
        if (!element || !element.getAttribute) {
            return;
        }

        const src = element.getAttribute('data-src');
        if (!src) {
            return;
        }

        element.setAttribute('src', src);
        element.removeAttribute('data-src');
        element.classList?.remove('lazy');
    }

    // Lazy loading for images and embeds
    function initLazyLoading() {
        if (typeof document === 'undefined') {
            return;
        }

        const candidates = document.querySelectorAll('[data-src]');
        if (!candidates.length) {
            return;
        }

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        loadDeferredSource(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '120px 0px' });

            candidates.forEach(element => observer.observe(element));
            return;
        }

        candidates.forEach(loadDeferredSource);
    }

    function optimizeImages() {
        const images = document.querySelectorAll('img');
        if (!images.length) {
            return;
        }

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
        let eagerBudget = 2;

        images.forEach(img => {
            if (!img || typeof img.getBoundingClientRect !== 'function') {
                return;
            }

            const priority = img.dataset.priority;
            const rect = img.getBoundingClientRect();
            const isNearViewport = rect.top < viewportHeight * 1.25 && rect.bottom > 0;

            let shouldEager = priority === 'high';

            if (!shouldEager && priority !== 'low' && eagerBudget > 0 && isNearViewport) {
                shouldEager = true;
                eagerBudget -= 1;
            }

            const loadingValue = shouldEager ? 'eager' : 'lazy';

            if (!img.hasAttribute('loading') || img.getAttribute('loading') !== loadingValue) {
                img.setAttribute('loading', loadingValue);
            }

            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }

            if (!img.hasAttribute('fetchpriority')) {
                img.setAttribute('fetchpriority', shouldEager ? 'high' : 'low');
            }
        });
    }

    function optimizeEmbeds() {
        const frames = document.querySelectorAll('iframe');
        if (!frames.length) {
            return;
        }

        frames.forEach(frame => {
            if (!frame) {
                return;
            }

            if (frame.dataset.priority === 'high') {
                frame.setAttribute('loading', 'eager');
                return;
            }

            if (!frame.hasAttribute('loading')) {
                frame.setAttribute('loading', 'lazy');
            }
        });
    }

    function observeMediaMutations() {
        if (typeof MutationObserver === 'undefined' || !document.body) {
            return;
        }

        const observer = new MutationObserver(mutations => {
            const hasMedia = mutations.some(mutation => {
                if (!mutation.addedNodes?.length) {
                    return false;
                }

                return Array.from(mutation.addedNodes).some(node => {
                    if (!(node instanceof Element)) {
                        return false;
                    }

                    if (node.tagName === 'IMG' || node.tagName === 'IFRAME') {
                        return true;
                    }

                    return Boolean(node.querySelector?.('img,iframe'));
                });
            });

            if (hasMedia) {
                runWhenIdle(optimizeMedia, 150);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    function optimizeMedia() {
        optimizeImages();
        optimizeEmbeds();
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
        if (!('serviceWorker' in navigator)) {
            return;
        }

        const headerEl = document.querySelector('[data-site-header]');
        const baseAttr = headerEl ? headerEl.getAttribute('data-base') || './' : './';
        const normalizedBase = baseAttr === './' ? '' : baseAttr;
        const baseCandidate = normalizedBase
            ? `${normalizedBase.replace(/\/+$/, '')}/sw.js`
            : 'sw.js';

        const candidatePaths = Array.from(new Set([
            baseCandidate,
            'sw.js',
            '/sw.js'
        ]));

        const tryRegister = (index = 0) => {
            if (index >= candidatePaths.length) {
                console.log('SW registration failed: no valid service worker path found');
                return;
            }

            const path = candidatePaths[index];
            navigator.serviceWorker.register(path)
                .then(registration => {
                    console.log('SW registered:', registration.scope);
                })
                .catch(error => {
                    console.log(`SW registration failed for ${path}:`, error);
                    tryRegister(index + 1);
                });
        };

        tryRegister();
    }

    // Initialize improvements
    function initPerformanceEnhancements() {
        initLazyLoading();
        enhanceAccessibility();
        registerServiceWorker();

        runWhenIdle(optimizeMedia, 200);
        window.addEventListener('load', optimizeMedia, { once: true });
        window.addEventListener('resize', debounce(() => runWhenIdle(optimizeMedia, 200), 300));
        window.addEventListener('orientationchange', () => runWhenIdle(optimizeMedia, 200));
        observeMediaMutations();

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
        document.addEventListener('DOMContentLoaded', () => {
            initPerformanceEnhancements();
            runWhenIdle(optimizeMedia, 200);
        });
    } else {
        initPerformanceEnhancements();
        runWhenIdle(optimizeMedia, 200);
    }

    window.musanidOptimizeMedia = optimizeMedia;

})();