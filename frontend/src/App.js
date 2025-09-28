import React, { useState, useEffect } from 'react';
import './App.css';

// مكون الصفحة الرئيسية للموقع
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // محاكاة تحميل البيانات
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // معالجة الأخطاء
  if (error) {
    return (
      <div className="error-container">
        <h2>عذراً، حدث خطأ</h2>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>إعادة المحاولة</button>
      </div>
    );
  }
  
  // شاشة التحميل
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>جاري تحميل منصة مساند...</p>
      </div>
    );
  }
  
  // الصفحة الرئيسية
  return (
    <div className="app" dir="rtl">
      {/* شريط التنقل */}
      <header className="navbar">
        <div className="container">
          <h1 className="logo">مساند<span className="highlight">التعليمية</span></h1>
          <nav>
            <ul className="nav-links">
              <li><a href="#home" className="active">الرئيسية</a></li>
              <li><a href="#courses">الدورات</a></li>
              <li><a href="#about">من نحن</a></li>
              <li><a href="#contact">اتصل بنا</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="main-content">
        {/* قسم الترحيب */}
        <section id="home" className="hero-section">
          <div className="container">
            <h2>أهلاً بك في منصة مساند التعليمية</h2>
            <p>منصة متخصصة في تعليم تطوير الويب وتقنية المعلومات</p>
            <button className="cta-button">تصفح الدورات</button>
          </div>
        </section>

        {/* قسم المميزات */}
        <section id="features" className="features-section">
          <div className="container">
            <h2 className="section-title">مميزاتنا</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3>محتوى عربي متميز</h3>
                <p>دروس ومقالات باللغة العربية لتسهيل عملية التعلم</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">👨‍💻</div>
                <h3>مدربون محترفون</h3>
                <p>نخبة من الخبراء في مجال تطوير الويب</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏆</div>
                <h3>شهادات معتمدة</h3>
                <p>احصل على شهادات تثبت مهاراتك</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* قسم الدورات */}
        <section id="courses" className="courses-section">
          <div className="container">
            <h2 className="section-title">أحدث الدورات</h2>
            <div className="courses-grid">
              <div className="course-card">
                <div className="course-image"></div>
                <h3>أساسيات HTML و CSS</h3>
                <p>تعلم أساسيات تصميم صفحات الويب باستخدام HTML و CSS</p>
                <div className="course-meta">
                  <span>15 درس</span>
                  <span>مبتدئ</span>
                </div>
                <button className="secondary-button">عرض التفاصيل</button>
              </div>
              <div className="course-card">
                <div className="course-image"></div>
                <h3>JavaScript للمبتدئين</h3>
                <p>تعلم أساسيات البرمجة باستخدام JavaScript</p>
                <div className="course-meta">
                  <span>20 درس</span>
                  <span>مبتدئ</span>
                </div>
                <button className="secondary-button">عرض التفاصيل</button>
              </div>
              <div className="course-card">
                <div className="course-image"></div>
                <h3>تطوير تطبيقات React</h3>
                <p>تعلم كيفية بناء تطبيقات ويب تفاعلية باستخدام React</p>
                <div className="course-meta">
                  <span>25 درس</span>
                  <span>متقدم</span>
                </div>
                <button className="secondary-button">عرض التفاصيل</button>
              </div>
            </div>
          </div>
        </section>
        
        {/* قسم من نحن */}
        <section id="about" className="about-section">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2 className="section-title">من نحن</h2>
                <p>منصة مساند التعليمية هي مبادرة تهدف إلى نشر المعرفة التقنية وتطوير المهارات في مجال تكنولوجيا المعلومات للناطقين بالعربية.</p>
                <p>نسعى لتوفير محتوى تعليمي عربي عالي الجودة في مجالات البرمجة وتطوير الويب، من خلال دورات تدريبية متخصصة ومشاريع عملية تساعد المتعلمين على اكتساب المهارات اللازمة لسوق العمل.</p>
                <button className="secondary-button">اقرأ المزيد</button>
              </div>
              <div className="about-image"></div>
            </div>
          </div>
        </section>
        
        {/* قسم الاتصال */}
        <section id="contact" className="contact-section">
          <div className="container">
            <h2 className="section-title">اتصل بنا</h2>
            <div className="contact-content">
              <div className="contact-info">
                <h3>معلومات التواصل</h3>
                <p>يمكنك التواصل معنا عبر القنوات التالية:</p>
                <ul className="contact-details">
                  <li>
                    <span className="icon">📧</span>
                    <span>info@musanid.com</span>
                  </li>
                  <li>
                    <span className="icon">📱</span>
                    <span>+966 123 456 789</span>
                  </li>
                  <li>
                    <span className="icon">📍</span>
                    <span>الرياض، المملكة العربية السعودية</span>
                  </li>
                </ul>
              </div>
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">الاسم</label>
                  <input type="text" id="name" placeholder="أدخل اسمك" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">البريد الإلكتروني</label>
                  <input type="email" id="email" placeholder="أدخل بريدك الإلكتروني" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">الرسالة</label>
                  <textarea id="message" rows="5" placeholder="اكتب رسالتك هنا"></textarea>
                </div>
                <button type="submit" className="submit-button">إرسال الرسالة</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* تذييل الصفحة */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>منصة مساند التعليمية</h3>
              <p>منصة تعليمية متخصصة في مجال تطوير الويب وتقنية المعلومات.</p>
            </div>
            <div className="footer-section">
              <h3>روابط سريعة</h3>
              <ul className="footer-links">
                <li><a href="#home">الرئيسية</a></li>
                <li><a href="#courses">الدورات</a></li>
                <li><a href="#about">من نحن</a></li>
                <li><a href="#contact">اتصل بنا</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>تواصل معنا</h3>
              <ul className="footer-social">
                <li><a href="#">فيسبوك</a></li>
                <li><a href="#">تويتر</a></li>
                <li><a href="#">إنستغرام</a></li>
                <li><a href="#">لينكد إن</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>جميع الحقوق محفوظة &copy; منصة مساند التعليمية {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;