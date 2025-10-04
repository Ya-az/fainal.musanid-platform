import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

// مكون صفحة "عن مساند"
const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>مساند - المنصة التعليمية الرائدة</h1>
          <p>نحن نساعد الطلاب والمتعلمين على تحقيق طموحاتهم من خلال دورات عالية الجودة وتجربة تعلم متميزة</p>
        </div>
      </section>

      <section className="vision-mission">
        <div className="vision-box">
          <h2>رؤيتنا</h2>
          <p>أن نكون المنصة التعليمية الرائدة في العالم العربي، ونسهم في بناء مستقبل أفضل من خلال التعليم الإلكتروني عالي الجودة.</p>
        </div>
        <div className="mission-box">
          <h2>رسالتنا</h2>
          <p>توفير تجربة تعليمية متميزة وسهلة الوصول لجميع المتعلمين، تمكنهم من اكتساب المهارات اللازمة للنجاح في سوق العمل وتحقيق طموحاتهم الشخصية والمهنية.</p>
        </div>
      </section>

      <section className="our-story">
        <h2>قصتنا</h2>
        <div className="story-content">
          <div className="story-image"></div>
          <div className="story-text">
            <p>بدأت مساند في عام 2018 كفكرة بسيطة لتوفير دورات تعليمية بجودة عالية باللغة العربية. في ذلك الوقت، كان هناك نقص في المحتوى التعليمي العربي عالي الجودة عبر الإنترنت.</p>
            
            <p>بدأنا بفريق صغير من المتحمسين للتعليم، وقمنا بتطوير منصتنا الأولى مع عدد قليل من الدورات التعليمية في مجالات التكنولوجيا والبرمجة.</p>
            
            <p>مع مرور الوقت، توسعت رؤيتنا وفريقنا، وأصبحنا الآن منصة تعليمية شاملة تقدم مئات الدورات في مختلف المجالات، من تطوير البرمجيات وتصميم المواقع إلى إدارة الأعمال والمهارات الشخصية.</p>
            
            <p>اليوم، نفخر بتقديم خدمات تعليمية عالية الجودة لأكثر من 500,000 طالب من جميع أنحاء العالم العربي، ونواصل العمل على تطوير منصتنا وتوسيع نطاق دوراتنا لتلبية احتياجات المتعلمين المتغيرة.</p>
          </div>
        </div>
      </section>

      <section className="values">
        <h2>قيمنا</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-medal"></i>
            </div>
            <h3>الجودة</h3>
            <p>نلتزم بتقديم محتوى تعليمي عالي الجودة يلبي أعلى المعايير العالمية</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>الشمولية</h3>
            <p>نؤمن بحق الجميع في الوصول إلى التعليم الجيد بغض النظر عن الخلفية أو الظروف</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3>الابتكار</h3>
            <p>نسعى دائمًا للتطوير والتحسين المستمر في طرق التدريس وتجربة المستخدم</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-handshake"></i>
            </div>
            <h3>النزاهة</h3>
            <p>نعمل بشفافية ومصداقية في جميع تعاملاتنا مع الطلاب والشركاء والمدربين</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3>التمكين</h3>
            <p>نهدف إلى تمكين المتعلمين من تحقيق أهدافهم الشخصية والمهنية</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>التواصل</h3>
            <p>نحرص على الاستماع لملاحظات المتعلمين والتفاعل مع احتياجاتهم</p>
          </div>
        </div>
      </section>

      <section className="team">
        <h2>فريقنا</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-image member1"></div>
            <h3>أحمد الفهد</h3>
            <p className="member-title">المؤسس والرئيس التنفيذي</p>
            <p className="member-bio">خبير في مجال التعليم الإلكتروني مع أكثر من 15 عامًا من الخبرة في التكنولوجيا والتعليم</p>
          </div>
          <div className="team-member">
            <div className="member-image member2"></div>
            <h3>سارة العمري</h3>
            <p className="member-title">المدير التعليمي</p>
            <p className="member-bio">حاصلة على دكتوراه في تكنولوجيا التعليم وخبيرة في تطوير المناهج التعليمية الرقمية</p>
          </div>
          <div className="team-member">
            <div className="member-image member3"></div>
            <h3>خالد السعيد</h3>
            <p className="member-title">مدير التكنولوجيا</p>
            <p className="member-bio">مهندس برمجيات ذو خبرة واسعة في تطوير المنصات التعليمية وتحسين تجربة المستخدم</p>
          </div>
          <div className="team-member">
            <div className="member-image member4"></div>
            <h3>نورة الزهراني</h3>
            <p className="member-title">مديرة خدمة العملاء</p>
            <p className="member-bio">متخصصة في تجربة العملاء مع شغف كبير لمساعدة المتعلمين على تحقيق أهدافهم</p>
          </div>
        </div>
      </section>

      <section className="achievements">
        <h2>إنجازاتنا</h2>
        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-number">500K+</div>
            <div className="achievement-text">متعلم مسجل</div>
          </div>
          <div className="achievement-card">
            <div className="achievement-number">300+</div>
            <div className="achievement-text">دورة تعليمية</div>
          </div>
          <div className="achievement-card">
            <div className="achievement-number">150+</div>
            <div className="achievement-text">مدرب محترف</div>
          </div>
          <div className="achievement-card">
            <div className="achievement-number">25+</div>
            <div className="achievement-text">جائزة وتكريم</div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>ماذا يقول طلابنا</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="quote-icon">
              <i className="fas fa-quote-right"></i>
            </div>
            <p className="testimonial-text">"مساند غيرت حياتي المهنية بشكل كامل. بعد إكمال دورة تطوير الويب، حصلت على وظيفة أحلامي كمطور ويب في شركة كبيرة."</p>
            <div className="testimonial-author">
              <div className="author-image student1"></div>
              <div className="author-info">
                <h4>محمد العتيبي</h4>
                <p>مطور ويب</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">
              <i className="fas fa-quote-right"></i>
            </div>
            <p className="testimonial-text">"المحتوى التعليمي في مساند ممتاز جدًا. المدربون محترفون وطريقة شرحهم واضحة وسهلة الفهم. أنصح به بشدة."</p>
            <div className="testimonial-author">
              <div className="author-image student2"></div>
              <div className="author-info">
                <h4>لينا الشمري</h4>
                <p>مصممة جرافيك</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">
              <i className="fas fa-quote-right"></i>
            </div>
            <p className="testimonial-text">"أحببت مرونة الدراسة في مساند. يمكنني التعلم في أي وقت يناسبني، والدورات تتناسب مع جدولي المزدحم كأب وموظف."</p>
            <div className="testimonial-author">
              <div className="author-image student3"></div>
              <div className="author-info">
                <h4>فهد العنزي</h4>
                <p>مدير مشاريع</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="partners">
        <h2>شركاؤنا</h2>
        <div className="partners-logos">
          <div className="partner-logo logo1"></div>
          <div className="partner-logo logo2"></div>
          <div className="partner-logo logo3"></div>
          <div className="partner-logo logo4"></div>
          <div className="partner-logo logo5"></div>
          <div className="partner-logo logo6"></div>
        </div>
      </section>

      <section className="join-us">
        <div className="join-content">
          <h2>انضم إلى رحلة التعلم معنا</h2>
          <p>ابدأ رحلتك التعليمية اليوم واكتشف آلاف الدورات التدريبية المصممة لمساعدتك على تحقيق أهدافك</p>
          <Link to="/auth/login" className="join-button">ابدأ الآن</Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;