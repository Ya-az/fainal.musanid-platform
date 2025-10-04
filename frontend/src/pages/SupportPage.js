import React from 'react';
import { Link } from 'react-router-dom';
import './SupportPage.css';

// مكون صفحة الدعم الفني
const SupportPage = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [category, setCategory] = React.useState('general');
  const [submitted, setSubmitted] = React.useState(false);

  // إرسال نموذج الدعم
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // في التطبيق الحقيقي، سيتم إرسال البيانات إلى خادم الدعم الفني
    console.log({ name, email, subject, message, category });
    
    // محاكاة نجاح الإرسال
    setTimeout(() => {
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setCategory('general');
    }, 1000);
  };

  // قائمة الأسئلة الشائعة
  const faqItems = [
    {
      question: 'كيف يمكنني التسجيل في دورة؟',
      answer: 'يمكنك التسجيل في الدورات من خلال صفحة الدورات، اختر الدورة التي ترغب فيها ثم اضغط على زر "التسجيل الآن". ستحتاج لتسجيل الدخول أو إنشاء حساب جديد لإكمال عملية التسجيل.'
    },
    {
      question: 'هل يمكنني الوصول إلى الدورات بدون اتصال بالإنترنت؟',
      answer: 'نعم، بعد التسجيل في الدورة يمكنك تنزيل محتوى الدورة للوصول إليه بدون اتصال بالإنترنت من خلال تطبيقنا على الجوال. يرجى ملاحظة أن بعض الميزات مثل المناقشات والاختبارات المباشرة قد تتطلب اتصالاً بالإنترنت.'
    },
    {
      question: 'كيف يمكنني الحصول على شهادة إتمام الدورة؟',
      answer: 'للحصول على الشهادة، عليك إكمال جميع الدروس والاختبارات في الدورة بنجاح. بمجرد إكمال جميع المتطلبات، ستتمكن من طلب الشهادة من خلال الضغط على زر "طلب الشهادة" في صفحة الدورة أو من خلال صفحة الشهادات في حسابك.'
    },
    {
      question: 'هل يمكنني طلب استرداد المبلغ؟',
      answer: 'نعم، يمكنك طلب استرداد المبلغ خلال 14 يومًا من تاريخ الشراء إذا لم تكمل أكثر من 25% من محتوى الدورة. لطلب استرداد المبلغ، يرجى زيارة صفحة "طلبات الدعم" وتحديد نوع الطلب "استرداد المبلغ".'
    },
    {
      question: 'كيف يمكنني تغيير معلومات حسابي أو كلمة المرور؟',
      answer: 'يمكنك تغيير معلومات حسابك وكلمة المرور من خلال صفحة "الإعدادات" في حسابك. انتقل إلى لوحة التحكم، ثم اضغط على "الإعدادات" في القائمة الجانبية.'
    },
    {
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نقبل مجموعة متنوعة من طرق الدفع بما في ذلك بطاقات الائتمان (فيزا وماستركارد)، وبطاقات مدى، و Apple Pay، و STC Pay، بالإضافة إلى التحويل البنكي للدورات المؤسسية.'
    },
    {
      question: 'كيف يمكنني الاتصال بمدرب الدورة؟',
      answer: 'يمكنك التواصل مع مدرب الدورة من خلال منتدى المناقشة في صفحة الدورة. كما يمكنك أيضًا إرسال رسالة مباشرة للمدرب من خلال صفحة ملفه الشخصي.'
    },
    {
      question: 'هل توفرون دورات مخصصة للشركات والمؤسسات؟',
      answer: 'نعم، نقدم دورات مخصصة للشركات والمؤسسات التعليمية. لمعرفة المزيد حول برامجنا المؤسسية والحصول على عرض سعر، يرجى التواصل معنا عبر البريد الإلكتروني: business@musanid.edu'
    }
  ];

  return (
    <div className="support-page">
      <div className="support-header">
        <h1>الدعم الفني</h1>
        <p>نحن هنا لمساعدتك. اطرح سؤالك أو تواصل معنا وسنرد في أقرب وقت ممكن</p>
      </div>

      <div className="support-content">
        <div className="faq-section">
          <h2>الأسئلة الشائعة</h2>
          <div className="faq-list">
            {faqItems.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-section">
          <h2>تواصل معنا</h2>
          
          {submitted ? (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <h3>تم إرسال رسالتك بنجاح!</h3>
              <p>سنقوم بالرد عليك في أقرب وقت ممكن. شكرًا للتواصل معنا.</p>
              <button onClick={() => setSubmitted(false)} className="new-request-btn">
                إرسال طلب جديد
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">الاسم الكامل</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">نوع الاستفسار</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="general">استفسار عام</option>
                  <option value="technical">مشكلة تقنية</option>
                  <option value="billing">الفواتير والمدفوعات</option>
                  <option value="content">محتوى الدورات</option>
                  <option value="certificate">الشهادات</option>
                  <option value="refund">طلب استرداد</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">عنوان الرسالة</label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="أدخل عنوان رسالتك"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">نص الرسالة</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب رسالتك هنا بالتفصيل..."
                  rows={5}
                  required
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  إرسال الرسالة
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="support-info">
        <div className="info-card">
          <div className="info-icon">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <h3>العنوان</h3>
          <p>الرياض، المملكة العربية السعودية<br />ص.ب 12345</p>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <h3>البريد الإلكتروني</h3>
          <p>support@musanid.edu<br />info@musanid.edu</p>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <i className="fas fa-phone"></i>
          </div>
          <h3>رقم الهاتف</h3>
          <p>+966 50 123 4567<br />+966 11 123 4567</p>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <i className="fas fa-clock"></i>
          </div>
          <h3>ساعات العمل</h3>
          <p>الأحد - الخميس: 9 صباحًا - 5 مساءً<br />الجمعة - السبت: مغلق</p>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;