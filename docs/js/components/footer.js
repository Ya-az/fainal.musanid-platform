(function () {
    const footerElements = document.querySelectorAll('[data-site-footer]');
    if (!footerElements.length) {
        return;
    }

    footerElements.forEach((footer) => {
        const basePath = footer.getAttribute('data-base') || './';
        const year = new Date().getFullYear();
        const normalize = (path) => {
            if (!path) {
                return '';
            }
            return path.endsWith('/') ? path : `${path}`;
        };
        const base = normalize(basePath);

        footer.innerHTML = `
            <div class="container">
                <div class="site-footer__grid">
                    <div class="site-footer__grid-large layout-stack">
                        <a href="${base}index-standalone.html" class="site-brand">مساند</a>
                        <p class="text-muted">
                            منصة عربية متكاملة للتعلم الإلكتروني، نصمم تجارب تعليمية تفاعلية تساعدك على بناء مهاراتك والارتقاء بمسارك المهني.
                        </p>
                    </div>
                    <div>
                        <h4>روابط سريعة</h4>
                        <ul class="layout-stack layout-stack--tight">
                            <li><a href="${base}about-musanid.html">عن المنصة</a></li>
                            <li><a href="${base}course/cr_index.html">الدورات</a></li>
                            <li><a href="${base}faq.html">الأسئلة الشائعة</a></li>
                            <li><a href="${base}support/sp_index.html">الدعم الفني</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>المصادر</h4>
                        <ul class="layout-stack layout-stack--tight">
                            <li><a href="${base}manifest.json">التطبيق التقدمي PWA</a></li>
                            <li><a href="${base}offline.html">وضع عدم الاتصال</a></li>
                            <li><a href="${base}support/sp_index.html#contact">مركز المساعدة</a></li>
                            <li><a href="${base}faq.html#general">أهم الأسئلة</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>تواصل معنا</h4>
                        <ul class="layout-stack layout-stack--tight">
                            <li><a href="mailto:contact@musanid.com">contact@musanid.com</a></li>
                            <li><a href="tel:+966501234567">+966 50 123 4567</a></li>
                            <li><span class="pill">جدة - المملكة العربية السعودية</span></li>
                        </ul>
                    </div>
                </div>
                <div class="site-footer__bottom">
                    <p class="copyright-text">© ${year} مساند. جميع الحقوق محفوظة.</p>
                    <div class="social-links">
                        <a href="#" aria-label="Twitter">ﻁ</a>
                        <a href="#" aria-label="LinkedIn">in</a>
                        <a href="#" aria-label="YouTube">▶</a>
                    </div>
                </div>
            </div>
        `;
    });
})();
