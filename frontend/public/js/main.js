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