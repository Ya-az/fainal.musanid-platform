(function () {
    // انتظار تحميل ملف التكوين
    if (typeof window.MusanidConfig === 'undefined') {
        console.warn('⚠️ Header: Waiting for MusanidConfig to load...');
        setTimeout(arguments.callee, 100);
        return;
    }

    const headers = document.querySelectorAll('[data-site-header]');
    if (!headers.length) {
        return;
    }

    const config = window.MusanidConfig;
    const normalize = (path) => {
        if (!path) {
            return '';
        }
        return path.endsWith('/') ? path : `${path}`;
    };

    headers.forEach((header, index) => {
        const basePath = header.getAttribute('data-base') || './';
        const base = normalize(basePath);
        const activeKey = header.getAttribute('data-active') || '';
        const navId = header.getAttribute('data-nav-id') || `siteNav${index + 1}`;
        const homePath = header.getAttribute('data-home') || 'index.html';

        const getText = (value, fallback) => (value && value.trim()) ? value.trim() : fallback;
        const getHref = (value, fallback) => (value && value.trim()) ? value.trim() : fallback;

        const primaryTextAttr = header.getAttribute('data-primary-text');
        const primaryHrefAttr = header.getAttribute('data-primary-href');
        const primaryVariant = getText(header.getAttribute('data-primary-variant'), config.navigation.actions.primary.variant);
        const secondaryTextAttr = header.getAttribute('data-secondary-text');
        const secondaryHrefAttr = header.getAttribute('data-secondary-href');
        const secondaryVariant = getText(header.getAttribute('data-secondary-variant'), config.navigation.actions.secondary.variant);

        // استخدام إعدادات من MusanidConfig
        const primaryText = getText(primaryTextAttr, config.navigation.actions.primary.text);
        const primaryHref = getHref(primaryHrefAttr, `${base}${config.navigation.actions.primary.href}`);
        const secondaryText = getText(secondaryTextAttr, config.navigation.actions.secondary.text);
        const secondaryHref = getHref(secondaryHrefAttr, `${base}${config.navigation.actions.secondary.href}`);

        const showPrimary = header.hasAttribute('data-primary-text') ? !!(primaryTextAttr && primaryTextAttr.trim()) : true;
        const showSecondary = header.hasAttribute('data-secondary-text') ? !!(secondaryTextAttr && secondaryTextAttr.trim()) : true;

        // بناء قائمة التنقل من MusanidConfig
        const navItems = config.navigation.main.map(item => ({
            ...item,
            href: `${base}${item.href}`
        }));

        const navLinks = navItems
            .map(item => `<a href="${item.href}" class="site-nav__link${item.key === activeKey ? ' is-active' : ''}" title="${item.label}">${item.label}</a>`)
            .join('');

        const actions = [
            showSecondary ? `<a href="${secondaryHref}" class="btn btn-${secondaryVariant}">${secondaryText}</a>` : '',
            showPrimary ? `<a href="${primaryHref}" class="btn btn-${primaryVariant}">${primaryText}</a>` : ''
        ].join('');

        header.innerHTML = `
            <div class="container">
                <nav class="site-nav">
                    <a href="${base}${homePath}" class="site-brand" title="${config.site.name} - الصفحة الرئيسية">
                        <span class="brand-icon">${config.site.icon}</span>
                        ${config.site.name}
                    </a>
                    <button class="site-nav__toggle" type="button" aria-label="فتح القائمة" data-nav-target="${navId}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                    <div class="site-nav__links" id="${navId}">
                        ${navLinks}
                    </div>
                    <div class="site-nav__actions">
                        ${actions}
                    </div>
                </nav>
            </div>
        `;
    });

    console.log('✅ Header component loaded with MusanidConfig');
})();