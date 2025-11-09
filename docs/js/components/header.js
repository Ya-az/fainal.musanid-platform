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
    const ensureTrailingSlash = (path) => {
        if (!path) {
            return '';
        }
        return path.endsWith('/') ? path : `${path}/`;
    };

    headers.forEach((header, index) => {
        const basePath = header.getAttribute('data-base') || './';
        const base = ensureTrailingSlash(basePath.trim());
        const activeKey = header.getAttribute('data-active') || '';
        const navId = header.getAttribute('data-nav-id') || `siteNav${index + 1}`;
        const homePath = header.getAttribute('data-home') || 'index.html';

        const getText = (value, fallback) => (value && value.trim()) ? value.trim() : fallback;
        const getHref = (value, fallback) => (value && value.trim()) ? value.trim() : fallback;

        // Resolve href in a robust way across different page roots.
        // If the value is absolute (protocol, //, or starts with / or #) return as-is.
        // Otherwise, use the page-provided `base` (if present) or the current location
        // to resolve the relative path via the URL constructor so links are consistent
        // across pages served from different folders (e.g. docs/ vs project root).
        const resolveHref = (rawHref, fallback) => {
            const target = getHref(rawHref, fallback);
            if (!target) return '';

            const trimmed = target.trim();
            if (/^(?:[a-z]+:|\/\/|#|\/)/i.test(trimmed)) {
                return trimmed;
            }

            // Try to resolve relative URL against provided base (if any) or current page
            try {
                // base may be a relative token like './' or '../' — convert it to an absolute base
                const baseCandidate = base && base !== './' ? new URL(base, window.location.href).href : window.location.href;
                const resolved = new URL(trimmed, baseCandidate).href;
                // Return a path-relative URL (strip origin) so links work in different hosts
                return resolved.replace(window.location.origin, '');
            } catch (e) {
                // Fallback to simple concatenation if URL resolution fails
                return `${base}${trimmed}`;
            }
        };

        const primaryTextAttr = header.getAttribute('data-primary-text');
        const primaryHrefAttr = header.getAttribute('data-primary-href');
        const primaryVariant = getText(header.getAttribute('data-primary-variant'), config.navigation.actions.primary.variant);
        const secondaryTextAttr = header.getAttribute('data-secondary-text');
        const secondaryHrefAttr = header.getAttribute('data-secondary-href');
        const secondaryVariant = getText(header.getAttribute('data-secondary-variant'), config.navigation.actions.secondary.variant);

        // استخدام إعدادات من MusanidConfig
    const primaryText = getText(primaryTextAttr, config.navigation.actions.primary.text);
    const primaryHref = resolveHref(primaryHrefAttr, config.navigation.actions.primary.href);
    const secondaryText = getText(secondaryTextAttr, config.navigation.actions.secondary.text);
    const secondaryHref = resolveHref(secondaryHrefAttr, config.navigation.actions.secondary.href);

        const showPrimary = header.hasAttribute('data-primary-text') ? !!(primaryTextAttr && primaryTextAttr.trim()) : true;
        const showSecondary = header.hasAttribute('data-secondary-text') ? !!(secondaryTextAttr && secondaryTextAttr.trim()) : true;

        // بناء قائمة التنقل من MusanidConfig
        const navItems = config.navigation.main.map(item => ({
            ...item,
            href: resolveHref(item.href)
        }));

        const navLinks = navItems
            .map(item => `<a href="${item.href}" class="site-nav__link${item.key === activeKey ? ' is-active' : ''}" title="${item.label}">${item.label}</a>`)
            .join('');

        const actions = [
            showSecondary ? `<a href="${secondaryHref}" class="btn btn-${secondaryVariant}">${secondaryText}</a>` : '',
            showPrimary ? `<a href="${primaryHref}" class="btn btn-${primaryVariant}">${primaryText}</a>` : ''
        ].join('');

        const brandHref = resolveHref(homePath);

        header.innerHTML = `
            <div class="container">
                <nav class="site-nav">
                    <a href="${brandHref}" class="site-brand" title="${config.site.name} - الصفحة الرئيسية">
                        <span class="brand-icon">${config.site.icon}</span>
                        ${config.site.name}
                    </a>
                    <button class="site-nav__toggle" type="button" aria-label="فتح القائمة" aria-controls="${navId}" aria-expanded="false" data-nav-target="${navId}">
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