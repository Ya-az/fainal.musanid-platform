/**
 * ملف التكوين المركزي لموقع مساند
 * Site Configuration - Single Source of Truth
 * 
 * هذا الملف يحتوي على جميع البيانات المشتركة للموقع
 * أي تعديل هنا سيؤثر على جميع الصفحات تلقائياً
 */

window.MusanidConfig = {
    // معلومات أساسية عن الموقع
    site: {
        name: 'مساند',
        icon: '🎓',
        description: 'منصة عربية متكاملة للتعلم الإلكتروني، نصمم تجارب تعليمية تفاعلية تساعدك على بناء مهاراتك والارتقاء بمسارك المهني.',
        year: new Date().getFullYear(),
        version: '2.0.0'
    },

    // معلومات التواصل
    contact: {
        email: 'contact@musanid.com',
        phone: '+966 50 123 4567',
        address: 'جدة - المملكة العربية السعودية',
        social: {
            twitter: '#',
            linkedin: '#',
            youtube: '#',
            instagram: '#',
            github: 'https://github.com/Ya-az/fainal.musanid-platform'
        }
    },

    // قائمة الروابط الرئيسية
    navigation: {
        main: [
            { key: 'home', label: 'الرئيسية', href: 'index.html', icon: '🏠' },
            { key: 'courses', label: 'الدورات', href: 'course/cr_index.html', icon: '📚' },
            { key: 'faq', label: 'الأسئلة الشائعة', href: 'faq.html', icon: '❓' },
            { key: 'support', label: 'الدعم الفني', href: 'support/sp_index.html', icon: '🛠️' },
            { key: 'about', label: 'عن مساند', href: 'about-musanid.html', icon: 'ℹ️' }
        ],
        
        // روابط سريعة للفوتر
        quickLinks: [
            { label: 'عن المنصة', href: 'about-musanid.html' },
            { label: 'الدورات', href: 'course/cr_index.html' },
            { label: 'الأسئلة الشائعة', href: 'faq.html' },
            { label: 'الدعم الفني', href: 'support/sp_index.html' }
        ],

        // روابط المصادر
        resources: [
            { label: 'التطبيق التقدمي PWA', href: 'pwa-info.html' },
            { label: 'وضع عدم الاتصال', href: 'offline.html' },
            { label: 'مركز المساعدة', href: 'support/sp_index.html#contact' },
            { label: 'أهم الأسئلة', href: 'faq.html#general' }
        ],

        // أزرار الإجراءات في الهيدر
        actions: {
            primary: {
                text: 'ابدأ التعلم',
                href: 'course/cr_index.html',
                variant: 'primary'
            },
            secondary: {
                text: 'تسجيل الدخول',
                href: 'auth/login.html',
                variant: 'secondary'
            }
        }
    },

    // إعدادات الألوان والتصميم
    theme: {
        colors: {
            primary: '#5b21b6',        // البنفسجي الأساسي
            primaryDark: '#4c1d95',    // البنفسجي الغامق
            secondary: '#7c3aed',      // البنفسجي الثانوي
            accent: '#a78bfa',         // اللون المميز
            success: '#10b981',        // الأخضر
            warning: '#f59e0b',        // البرتقالي
            error: '#ef4444',          // الأحمر
            neutral: '#6b7280'         // الرمادي
        },
        
        fonts: {
            primary: 'Cairo, sans-serif',
            secondary: 'Tajawal, sans-serif'
        }
    },

    // رسائل النظام والنصوص الثابتة
    messages: {
        loading: 'جاري التحميل...',
        error: 'حدث خطأ ما، الرجاء المحاولة مرة أخرى',
        success: 'تم بنجاح!',
        noConnection: 'لا يوجد اتصال بالإنترنت',
        copyright: `© ${new Date().getFullYear()} مساند. جميع الحقوق محفوظة.`,
        
        // رسائل خاصة بـ PWA
        pwa: {
            installPrompt: 'قم بتثبيت مساند كتطبيق على جهازك للحصول على تجربة أفضل',
            updateAvailable: 'يتوفر تحديث جديد للتطبيق',
            offlineMode: 'أنت في وضع عدم الاتصال'
        }
    },

    // إعدادات المنصة والدورات
    platform: {
        courses: {
            categories: [
                { key: 'networking', label: 'الشبكات', color: '#3b82f6' },
                { key: 'programming', label: 'البرمجة', color: '#10b981' },
                { key: 'security', label: 'الأمن السيبراني', color: '#ef4444' },
                { key: 'linux', label: 'لينكس', color: '#f59e0b' }
            ]
        },
        
        features: [
            { key: 'certificates', label: 'شهادات معتمدة', icon: '🏆' },
            { key: 'community', label: 'مجتمع داعم', icon: '👥' },
            { key: 'practice', label: 'مشاريع تطبيقية', icon: '🛠️' },
            { key: 'progress', label: 'تتبع التقدم', icon: '📊' }
        ]
    },

    // إعدادات SEO والميتا
    seo: {
        defaultTitle: 'منصة مساند - لتعليم أفضل بخطوات واضحة',
        titleSuffix: ' | مساند',
        defaultDescription: 'منصة عربية متخصصة في التعليم التقني. تعلم البرمجة، الشبكات، والأمن السيبراني مع دورات عربية احترافية ومشاريع تطبيقية.',
        keywords: 'تعلم البرمجة, دورات عربية, الأمن السيبراني, شبكات الحاسوب, لينكس, شهادات معتمدة',
        author: 'فريق مساند',
        language: 'ar',
        direction: 'rtl'
    },

    // مسارات الملفات والموارد
    paths: {
        images: 'img/',
        icons: 'img/icons/',
        css: 'css/',
        js: 'js/',
        fonts: 'fonts/'
    },

    // إعدادات الـ API والخدمات الخارجية (للمستقبل)
    api: {
        baseUrl: 'https://api.musanid.com',
        timeout: 10000,
        retryAttempts: 3
    }
};

// تجميد الكائن لمنع التعديل غير المقصود
Object.freeze(window.MusanidConfig);

// تصدير للاستخدام في Node.js إذا كان متاحاً
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.MusanidConfig;
}

console.log('✅ Musanid Configuration loaded successfully');