import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CoursesPage.css';

// مكون صفحة الدورات التعليمية
const CoursesPage = () => {
  // حالة البيانات
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    search: '',
  });

  // جلب بيانات الدورات
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // في الإنتاج، سيتم استبدال هذا بطلب API حقيقي
        const response = await fetch('/api/courses');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'حدث خطأ في جلب الدورات');
        }

        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        
        // بيانات تجريبية في حالة فشل الطلب
        setCourses([
          {
            id: 1,
            title: 'أساسيات البرمجة بلغة JavaScript',
            description: 'تعلم أساسيات البرمجة باستخدام لغة جافاسكريبت من الصفر للاحتراف',
            instructor: 'أحمد محمد',
            category: 'برمجة',
            level: 'مبتدئ',
            duration: '12 ساعة',
            enrolledStudents: 245,
            rating: 4.8,
            thumbnail: '/img/courses/javascript.jpg',
            price: 0 // مجاني
          },
          {
            id: 2,
            title: 'تطوير تطبيقات الويب باستخدام React',
            description: 'دورة شاملة في بناء تطبيقات الويب الحديثة باستخدام مكتبة React',
            instructor: 'سارة علي',
            category: 'تطوير الويب',
            level: 'متوسط',
            duration: '20 ساعة',
            enrolledStudents: 180,
            rating: 4.9,
            thumbnail: '/img/courses/react.jpg',
            price: 299
          },
          {
            id: 3,
            title: 'الذكاء الاصطناعي للمبتدئين',
            description: 'مدخل إلى عالم الذكاء الاصطناعي وتعلم الآلة مع تطبيقات عملية',
            instructor: 'خالد عبدالله',
            category: 'ذكاء اصطناعي',
            level: 'مبتدئ',
            duration: '15 ساعة',
            enrolledStudents: 320,
            rating: 4.7,
            thumbnail: '/img/courses/ai.jpg',
            price: 199
          },
          {
            id: 4,
            title: 'تصميم واجهات المستخدم UI/UX',
            description: 'تعلم أساسيات تصميم واجهات المستخدم وتجربة المستخدم مع مشاريع عملية',
            instructor: 'نورة أحمد',
            category: 'تصميم',
            level: 'مبتدئ',
            duration: '18 ساعة',
            enrolledStudents: 215,
            rating: 4.6,
            thumbnail: '/img/courses/ui-ux.jpg',
            price: 249
          },
          {
            id: 5,
            title: 'قواعد البيانات المتقدمة',
            description: 'دورة متقدمة في إدارة وتحسين قواعد البيانات وأمان البيانات',
            instructor: 'محمد العلي',
            category: 'قواعد البيانات',
            level: 'متقدم',
            duration: '25 ساعة',
            enrolledStudents: 120,
            rating: 4.9,
            thumbnail: '/img/courses/database.jpg',
            price: 349
          },
          {
            id: 6,
            title: 'أساسيات الأمن السيبراني',
            description: 'مدخل إلى عالم الأمن السيبراني وحماية البيانات والشبكات',
            instructor: 'عمر حسن',
            category: 'أمن معلومات',
            level: 'مبتدئ',
            duration: '14 ساعة',
            enrolledStudents: 280,
            rating: 4.7,
            thumbnail: '/img/courses/cybersecurity.jpg',
            price: 199
          },
        ]);
      }
    };

    fetchCourses();
  }, []);

  // تصفية الدورات
  const filteredCourses = courses.filter((course) => {
    return (
      (filters.category ? course.category === filters.category : true) &&
      (filters.level ? course.level === filters.level : true) &&
      (filters.search
        ? course.title.includes(filters.search) ||
          course.description.includes(filters.search)
        : true)
    );
  });

  // تحديث الفلاتر
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // إعادة تعيين الفلاتر
  const resetFilters = () => {
    setFilters({
      category: '',
      level: '',
      search: '',
    });
  };

  // قائمة الفئات المتاحة
  const categories = [
    'برمجة',
    'تطوير الويب',
    'تطوير تطبيقات',
    'ذكاء اصطناعي',
    'تصميم',
    'قواعد البيانات',
    'أمن معلومات',
  ];

  // قائمة المستويات المتاحة
  const levels = ['مبتدئ', 'متوسط', 'متقدم'];

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>الدورات التعليمية</h1>
        <p>استكشف مجموعة متنوعة من الدورات التعليمية عالية الجودة</p>
      </div>

      <div className="courses-filters">
        <div className="search-bar">
          <input
            type="text"
            name="search"
            placeholder="ابحث عن دورة..."
            value={filters.search}
            onChange={handleFilterChange}
          />
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="filter-options">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">جميع الفئات</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            name="level"
            value={filters.level}
            onChange={handleFilterChange}
          >
            <option value="">جميع المستويات</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <button className="reset-btn" onClick={resetFilters}>
            إعادة تعيين الفلاتر
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>جاري تحميل الدورات...</p>
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
        <>
          <div className="courses-count">
            تم العثور على {filteredCourses.length} دورة
          </div>

          <div className="courses-grid">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div key={course.id} className="course-card">
                  <div className="course-thumbnail">
                    <img src={course.thumbnail || '/img/default-course.jpg'} alt={course.title} />
                    {course.price === 0 ? (
                      <span className="course-badge free">مجاني</span>
                    ) : (
                      <span className="course-badge premium">{course.price} ر.س</span>
                    )}
                  </div>
                  <div className="course-details">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-description">{course.description}</p>
                    <div className="course-meta">
                      <span className="instructor">
                        <i className="fas fa-user"></i> {course.instructor}
                      </span>
                      <span className="category">
                        <i className="fas fa-tag"></i> {course.category}
                      </span>
                      <span className="level">
                        <i className="fas fa-signal"></i> {course.level}
                      </span>
                      <span className="duration">
                        <i className="fas fa-clock"></i> {course.duration}
                      </span>
                    </div>
                    <div className="course-stats">
                      <span className="students">
                        <i className="fas fa-users"></i> {course.enrolledStudents} طالب
                      </span>
                      <span className="rating">
                        <i className="fas fa-star"></i> {course.rating}
                      </span>
                    </div>
                    <div className="course-actions">
                      <Link to={`/course/${course.id}`} className="view-course-btn">
                        عرض التفاصيل
                      </Link>
                      <Link to={`/course/${course.id}/enroll`} className="enroll-btn">
                        الاشتراك الآن
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-courses">
                <i className="fas fa-search"></i>
                <h3>لا توجد دورات مطابقة</h3>
                <p>حاول تغيير معايير البحث أو تصفح جميع الدورات</p>
                <button className="reset-btn" onClick={resetFilters}>
                  عرض جميع الدورات
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesPage;