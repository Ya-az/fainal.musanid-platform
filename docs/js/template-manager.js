/**
 * Template Manager للموقع
 * يدير تحميل وتطبيق القوالب المشتركة
 */

(function() {
    'use strict';

    // قائمة بجميع الصفحات التي تحتاج تحديث
    const pagesToUpdate = [
        'pwa-info.html',
        'about-musanid.html',
        'faq.html',
        'offline.html',
        'auth/login.html',
        'auth/register.html',
        'course/cr_index.html',
        'support/sp_index.html'
    ];

    /**
     * إضافة ملف config.js لجميع الصفحات تلقائياً
     */
    function addConfigToAllPages() {
        // التحقق من وجود config.js في الصفحة الحالية
        const configExists = document.querySelector('script[src*="config.js"]');
        
        if (!configExists) {
            const configScript = document.createElement('script');
            const currentPath = window.location.pathname;
            
            // تحديد المسار النسبي لملف config.js حسب موقع الصفحة
            if (currentPath.includes('/auth/')) {
                configScript.src = '../js/config.js';
            } else if (currentPath.includes('/course/') || currentPath.includes('/support/')) {
                configScript.src = '../js/config.js';
            } else {
                configScript.src = 'js/config.js';
            }
            
            // إدراج config.js قبل أي سكريبت آخر
            const firstScript = document.querySelector('script');
            if (firstScript) {
                firstScript.parentNode.insertBefore(configScript, firstScript);
            } else {
                document.head.appendChild(configScript);
            }
            
            console.log('✅ Config.js added to page:', currentPath);
        }
    }

    /**
     * تحديث الصفحة الحالية بمكونات محدثة
     */
    function updateCurrentPage() {
        // إضافة config.js إذا لم يكن موجوداً
        addConfigToAllPages();
        
        // تحديث عنوان الصفحة إذا كان config متاحاً
        if (typeof window.MusanidConfig !== 'undefined') {
            updatePageTitle();
            updatePageMeta();
        } else {
            // انتظار تحميل config ثم التحديث
            setTimeout(() => {
                if (typeof window.MusanidConfig !== 'undefined') {
                    updatePageTitle();
                    updatePageMeta();
                }
            }, 200);
        }
    }

    /**
     * تحديث عنوان الصفحة
     */
    function updatePageTitle() {
        const config = window.MusanidConfig;
        const currentTitle = document.title;
        
        // إضافة لاحقة مساند إذا لم تكن موجودة
        if (!currentTitle.includes(config.seo.titleSuffix)) {
            document.title = currentTitle + config.seo.titleSuffix;
        }
    }

    /**
     * تحديث meta tags
     */
    function updatePageMeta() {
        const config = window.MusanidConfig;
        
        // إضافة أو تحديث meta tags
        const metaTags = [
            { name: 'author', content: config.seo.author },
            { name: 'keywords', content: config.seo.keywords },
            { name: 'language', content: config.seo.language }
        ];

        metaTags.forEach(tag => {
            let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
            if (!existingTag) {
                existingTag = document.createElement('meta');
                existingTag.name = tag.name;
                document.head.appendChild(existingTag);
            }
            existingTag.content = tag.content;
        });
    }

    /**
     * تصدير وظائف مفيدة للاستخدام العام
     */
    window.MusanidTemplateManager = {
        addConfigToAllPages,
        updateCurrentPage,
        updatePageTitle,
        updatePageMeta,
        
        // مساعدات إضافية
        getConfig: () => window.MusanidConfig,
        isConfigLoaded: () => typeof window.MusanidConfig !== 'undefined',
        
        // إنشاء روابط ديناميكية
        createNavLink: (item, basePath = '', activeKey = '') => {
            return `<a href="${basePath}${item.href}" class="site-nav__link${item.key === activeKey ? ' is-active' : ''}" title="${item.label}">${item.label}</a>`;
        },
        
        // بناء قائمة روابط
        buildLinksList: (links, basePath = '') => {
            return links.map(link => 
                `<li><a href="${basePath}${link.href}" title="${link.label}">${link.label}</a></li>`
            ).join('');
        }
    };

    // تنفيذ تلقائي عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateCurrentPage);
    } else {
        updateCurrentPage();
    }

    console.log('✅ Musanid Template Manager initialized');

})();