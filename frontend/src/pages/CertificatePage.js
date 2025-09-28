import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CertificatePage.css';

// مكون صفحة الشهادات
const CertificatePage = () => {
  // حالة البيانات
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // جلب بيانات الشهادات
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        // في الإنتاج، سيتم استبدال هذا بطلب API حقيقي
        const response = await fetch('/api/certificates');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'حدث خطأ في جلب الشهادات');
        }

        setCertificates(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        
        // بيانات تجريبية في حالة فشل الطلب
        setCertificates([
          {
            id: 'cert-123',
            courseId: 1,
            courseTitle: 'أساسيات البرمجة بلغة JavaScript',
            issueDate: '2025-08-15',
            expiryDate: null, // لا تنتهي صلاحية الشهادة
            studentName: 'محمد أحمد',
            studentId: 'ST-1001',
            instructorName: 'أحمد محمد',
            grade: 'ممتاز',
            score: 95,
            completionDate: '2025-08-10',
            credentialId: 'CR-JS-1234567890',
            downloadUrl: '#',
            thumbnail: '/img/certificates/js-certificate.jpg',
            verified: true
          },
          {
            id: 'cert-456',
            courseId: 2,
            courseTitle: 'تطوير تطبيقات الويب باستخدام React',
            issueDate: '2025-09-05',
            expiryDate: null,
            studentName: 'محمد أحمد',
            studentId: 'ST-1001',
            instructorName: 'سارة علي',
            grade: 'جيد جداً',
            score: 88,
            completionDate: '2025-09-01',
            credentialId: 'CR-REACT-0987654321',
            downloadUrl: '#',
            thumbnail: '/img/certificates/react-certificate.jpg',
            verified: true
          },
          {
            id: 'cert-789',
            courseId: 4,
            courseTitle: 'تصميم واجهات المستخدم UI/UX',
            issueDate: '2025-07-20',
            expiryDate: null,
            studentName: 'محمد أحمد',
            studentId: 'ST-1001',
            instructorName: 'نورة أحمد',
            grade: 'ممتاز',
            score: 92,
            completionDate: '2025-07-15',
            credentialId: 'CR-UIUX-5678901234',
            downloadUrl: '#',
            thumbnail: '/img/certificates/uiux-certificate.jpg',
            verified: true
          }
        ]);
      }
    };

    fetchCertificates();
  }, []);

  // البحث في الشهادات
  const filteredCertificates = certificates.filter((certificate) =>
    certificate.courseTitle.includes(searchTerm) ||
    certificate.instructorName.includes(searchTerm) ||
    certificate.credentialId.includes(searchTerm)
  );

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
  };

  // تحميل الشهادة
  const downloadCertificate = (id) => {
    alert(`جاري تحميل الشهادة رقم ${id}`);
    // في التطبيق الحقيقي، سيتم توجيه المستخدم إلى رابط التحميل
  };

  // مشاركة الشهادة
  const shareCertificate = (id) => {
    const shareUrl = `https://musanid.edu/certificate/verify/${id}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'شهادة منصة مساند التعليمية',
        text: 'أود مشاركة شهادتي من منصة مساند التعليمية',
        url: shareUrl,
      });
    } else {
      // نسخ الرابط إلى الحافظة
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('تم نسخ رابط الشهادة');
      });
    }
  };

  return (
    <div className="certificate-page">
      <div className="certificate-header">
        <h1>شهاداتي</h1>
        <p>جميع الشهادات التي حصلت عليها من منصة مساند التعليمية</p>
      </div>

      <div className="certificate-search">
        <input
          type="text"
          placeholder="ابحث عن شهادة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>جاري تحميل الشهادات...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>عذراً، حدث خطأ: {error}</p>
          <button
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            إعادة المحاولة
          </button>
        </div>
      ) : (
        <div className="certificates-container">
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map((certificate) => (
              <div key={certificate.id} className="certificate-card">
                <div className="certificate-preview">
                  <img 
                    src={certificate.thumbnail || '/img/certificates/default-certificate.jpg'} 
                    alt={`شهادة ${certificate.courseTitle}`} 
                  />
                  {certificate.verified && (
                    <div className="certificate-verified">
                      <i className="fas fa-check-circle"></i>
                      موثقة
                    </div>
                  )}
                </div>
                <div className="certificate-info">
                  <h3>{certificate.courseTitle}</h3>
                  <div className="certificate-meta">
                    <div className="meta-item">
                      <span className="meta-label">تاريخ الإصدار:</span>
                      <span className="meta-value">{formatDate(certificate.issueDate)}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">المدرب:</span>
                      <span className="meta-value">{certificate.instructorName}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">التقدير:</span>
                      <span className="meta-value">{certificate.grade} ({certificate.score}%)</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">رقم الشهادة:</span>
                      <span className="meta-value credential-id">{certificate.credentialId}</span>
                    </div>
                  </div>
                  <div className="certificate-actions">
                    <button
                      className="download-btn"
                      onClick={() => downloadCertificate(certificate.id)}
                    >
                      <i className="fas fa-download"></i>
                      تحميل
                    </button>
                    <button
                      className="share-btn"
                      onClick={() => shareCertificate(certificate.id)}
                    >
                      <i className="fas fa-share-alt"></i>
                      مشاركة
                    </button>
                    <Link
                      to={`/certificate/${certificate.id}`}
                      className="view-btn"
                    >
                      <i className="fas fa-eye"></i>
                      عرض
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-certificates">
              <i className="fas fa-award"></i>
              <h3>لا توجد شهادات</h3>
              {searchTerm ? (
                <>
                  <p>لم يتم العثور على شهادات مطابقة لبحثك</p>
                  <button
                    className="clear-search-btn"
                    onClick={() => setSearchTerm('')}
                  >
                    مسح البحث
                  </button>
                </>
              ) : (
                <>
                  <p>
                    لم تحصل على أي شهادات بعد. أكمل الدورات التعليمية للحصول على
                    شهادات.
                  </p>
                  <Link to="/course" className="browse-courses-btn">
                    تصفح الدورات
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <div className="certificate-verification">
        <h2>التحقق من شهادة</h2>
        <p>يمكن لأي شخص التحقق من صحة شهاداتك باستخدام رمز التحقق أو رابط الشهادة</p>
        
        <div className="verification-form">
          <input type="text" placeholder="أدخل رقم الشهادة للتحقق" />
          <button className="verify-btn">تحقق</button>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;