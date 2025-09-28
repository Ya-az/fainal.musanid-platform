import React from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetailsPage.css';

// مكون صفحة تفاصيل الدورة التعليمية
const CourseDetailsPage = () => {
  const { courseId } = useParams();
  
  // في التطبيق الحقيقي، سيتم جلب بيانات الدورة من الخادم باستخدام courseId
  // هنا سنستخدم بيانات تجريبية للعرض
  const course = {
    id: parseInt(courseId) || 1,
    title: 'أساسيات البرمجة بلغة JavaScript',
    description: 'تعلم أساسيات البرمجة باستخدام لغة جافاسكريبت من الصفر للاحتراف. هذه الدورة مصممة للمبتدئين الذين ليس لديهم خبرة سابقة في البرمجة وتغطي جميع المفاهيم الأساسية وصولاً إلى المتقدمة.',
    instructor: {
      name: 'أحمد محمد',
      bio: 'مطور ويب مع خبرة 10 سنوات في تطوير JavaScript وتقنيات الويب الحديثة',
      avatar: '/img/instructors/ahmed.jpg'
    },
    category: 'برمجة',
    level: 'مبتدئ',
    duration: '12 ساعة',
    enrolledStudents: 245,
    rating: 4.8,
    ratingCount: 87,
    thumbnail: '/img/courses/javascript.jpg',
    price: 0, // مجاني
    objectives: [
      'فهم أساسيات البرمجة والمفاهيم الكائنية',
      'تعلم كتابة كود JavaScript فعال وقوي',
      'فهم التعامل مع DOM وتطوير تطبيقات تفاعلية',
      'التعامل مع APIs وطلبات الشبكة',
      'بناء مشاريع عملية كاملة باستخدام JavaScript'
    ],
    requirements: [
      'لا تحتاج إلى خبرة سابقة في البرمجة',
      'جهاز كمبيوتر مع متصفح حديث',
      'محرر نصوص (سيتم شرح التثبيت في الدورة)',
      'الرغبة في التعلم والتطبيق العملي'
    ],
    lessons: [
      {
        id: 1,
        title: 'مقدمة في البرمجة ولغة JavaScript',
        duration: '45 دقيقة',
        isFree: true
      },
      {
        id: 2,
        title: 'المتغيرات وأنواع البيانات',
        duration: '60 دقيقة',
        isFree: true
      },
      {
        id: 3,
        title: 'العمليات الحسابية والمنطقية',
        duration: '55 دقيقة',
        isFree: false
      },
      {
        id: 4,
        title: 'جمل التحكم الشرطية',
        duration: '65 دقيقة',
        isFree: false
      },
      {
        id: 5,
        title: 'الحلقات التكرارية',
        duration: '70 دقيقة',
        isFree: false
      },
      {
        id: 6,
        title: 'الدوال Functions',
        duration: '75 دقيقة',
        isFree: false
      },
      {
        id: 7,
        title: 'المصفوفات Arrays',
        duration: '65 دقيقة',
        isFree: false
      },
      {
        id: 8,
        title: 'الكائنات Objects',
        duration: '80 دقيقة',
        isFree: false
      },
      {
        id: 9,
        title: 'التعامل مع DOM',
        duration: '90 دقيقة',
        isFree: false
      },
      {
        id: 10,
        title: 'التعامل مع الأحداث Events',
        duration: '70 دقيقة',
        isFree: false
      },
      {
        id: 11,
        title: 'طلبات AJAX وواجهات API',
        duration: '85 دقيقة',
        isFree: false
      },
      {
        id: 12,
        title: 'مشروع تطبيقي كامل',
        duration: '120 دقيقة',
        isFree: false
      }
    ],
    reviews: [
      {
        id: 1,
        userName: 'علي محمد',
        rating: 5,
        date: '2025-08-15',
        comment: 'دورة ممتازة وشرح مبسط ومفهوم. استفدت كثيرا من المحتوى والتطبيقات العملية.'
      },
      {
        id: 2,
        userName: 'سارة أحمد',
        rating: 4,
        date: '2025-08-10',
        comment: 'المحتوى قوي ومفيد. لكن كان بإمكانهم إضافة المزيد من التمارين العملية.'
      },
      {
        id: 3,
        userName: 'محمد خالد',
        rating: 5,
        date: '2025-07-30',
        comment: 'من أفضل الدورات التي حضرتها. الشرح واضح والأمثلة مفيدة جدا.'
      }
    ]
  };

  return (
    <div className="course-details-page">
      <div className="course-header">
        <div className="header-container">
          <div className="course-info">
            <h1>{course.title}</h1>
            <p className="course-description">{course.description}</p>
            
            <div className="course-meta">
              <div className="meta-item">
                <i className="fas fa-user"></i>
                <span>{course.instructor.name}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-tag"></i>
                <span>{course.category}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-signal"></i>
                <span>{course.level}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-clock"></i>
                <span>{course.duration}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-users"></i>
                <span>{course.enrolledStudents} طالب</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-star"></i>
                <span>{course.rating} ({course.ratingCount} تقييم)</span>
              </div>
            </div>
            
            <div className="course-actions">
              {course.price === 0 ? (
                <button className="enroll-btn">التسجيل في الدورة مجانًا</button>
              ) : (
                <button className="enroll-btn">التسجيل الآن - {course.price} ر.س</button>
              )}
              <button className="save-btn">
                <i className="far fa-bookmark"></i>
                حفظ للمشاهدة لاحقًا
              </button>
              <button className="share-btn">
                <i className="fas fa-share-alt"></i>
                مشاركة
              </button>
            </div>
          </div>
          
          <div className="course-preview">
            <img src={course.thumbnail || '/img/courses/default-course.jpg'} alt={course.title} />
            {course.price === 0 && <div className="free-badge">مجاني</div>}
          </div>
        </div>
      </div>
      
      <div className="course-content">
        <div className="content-section">
          <div className="about-course">
            <h2>عن الدورة</h2>
            <div className="course-objectives">
              <h3>ماذا ستتعلم</h3>
              <ul>
                {course.objectives.map((objective, index) => (
                  <li key={index}>
                    <i className="fas fa-check-circle"></i>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="course-requirements">
              <h3>المتطلبات</h3>
              <ul>
                {course.requirements.map((requirement, index) => (
                  <li key={index}>
                    <i className="fas fa-circle"></i>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="instructor-info">
            <h2>المدرب</h2>
            <div className="instructor-card">
              <div className="instructor-avatar">
                <img src={course.instructor.avatar || '/img/instructors/default-avatar.jpg'} alt={course.instructor.name} />
              </div>
              <div className="instructor-details">
                <h3>{course.instructor.name}</h3>
                <p>{course.instructor.bio}</p>
              </div>
            </div>
          </div>
          
          <div className="course-reviews">
            <h2>تقييمات الطلاب</h2>
            <div className="reviews-summary">
              <div className="average-rating">
                <div className="rating-number">{course.rating}</div>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fas fa-star ${
                        star <= course.rating ? 'filled' : ''
                      }`}
                    ></i>
                  ))}
                </div>
                <div className="rating-count">{course.ratingCount} تقييم</div>
              </div>
            </div>
            
            <div className="reviews-list">
              {course.reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-name">{review.userName}</div>
                    <div className="review-date">{review.date}</div>
                  </div>
                  <div className="review-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`fas fa-star ${
                          star <= review.rating ? 'filled' : ''
                        }`}
                      ></i>
                    ))}
                  </div>
                  <div className="review-comment">{review.comment}</div>
                </div>
              ))}
              
              <button className="load-more-btn">عرض المزيد من التقييمات</button>
            </div>
          </div>
        </div>
        
        <div className="course-sidebar">
          <div className="lessons-section">
            <h2>محتوى الدورة</h2>
            <div className="lessons-info">
              <div className="lessons-count">{course.lessons.length} درس</div>
              <div className="lessons-duration">{course.duration}</div>
            </div>
            
            <ul className="lessons-list">
              {course.lessons.map((lesson) => (
                <li key={lesson.id} className="lesson-item">
                  <div className="lesson-title">
                    <i className="fas fa-play-circle"></i>
                    <span>{lesson.title}</span>
                  </div>
                  <div className="lesson-meta">
                    <span className="lesson-duration">{lesson.duration}</span>
                    {lesson.isFree ? (
                      <span className="lesson-preview">معاينة مجانية</span>
                    ) : (
                      <i className="fas fa-lock"></i>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="certificate-info">
            <h3>شهادة إتمام</h3>
            <p>ستحصل على شهادة معتمدة عند إكمال هذه الدورة</p>
            <img src="/img/certificates/sample-certificate.jpg" alt="شهادة إتمام الدورة" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;