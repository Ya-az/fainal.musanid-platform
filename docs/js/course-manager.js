// Course data management for Musanid Platform - Fixed Version
class CourseManager {
    constructor() {
        this.passThreshold = 70; // Default pass percentage
        this.courses = {
            'cisco-packet-tracer': {
                title: 'أساسيات Cisco Packet Tracer',
                category: 'networking',
                badge: 'شبكات',
                passThreshold: 75,
                description: 'تعلم تصميم وإدارة الشبكات باستخدام محاكي Cisco Packet Tracer من الصفر حتى الاحتراف.',
                duration: '4 ساعات',
                level: 'مبتدئ',
                videoCount: 5,
                lessons: [
                    {
                        id: 1,
                        title: 'مقدمة عن Packet Tracer',
                        videoUrl: 'https://www.youtube.com/watch?v=6f5MFLjrBzw',
                        duration: '15:30',
                        description: 'يتعرف المتعلم في هذا الدرس على بيئة عمل Cisco Packet Tracer وكيفية التنقل بين أدواته الأساسية.',
                        summary: [
                            'التعرّف على واجهة Packet Tracer ومكونات الشاشة الرئيسية.',
                            'التمييز بين وضع الوقت الحقيقي ووضع المحاكاة.',
                            'إضافة أجهزة (Router، Switch، PC) إلى مساحة العمل.',
                            'استخدام أداة التوصيل المناسبة بين الأجهزة.',
                            'حفظ المشروع وفتح مشاريع سابقة.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'ما الهدف الأساسي من Cisco Packet Tracer؟', options: ['محاكاة الشبكات', 'اختبار سرعة الإنترنت', 'إدارة كلمات المرور', 'محرر نصوص'], correct: 0, explanation: 'Packet Tracer هو برنامج لمحاكاة الشبكات يساعد على تصميم واختبار الشبكات افتراضيًا.' },
                            { type: 'tf', question: 'يمكن استخدام وضع المحاكاة لمراقبة مرور الحزم خطوة بخطوة.', options: ['صح', 'خطأ'], correct: 0, explanation: 'وضع Simulation يعرض انتقال الحزم عبر الشبكة خطوة بخطوة لتحليل السلوك.' },
                            { type: 'mcq', question: 'أي من التالي ليس جهاز شبكة يمكن إضافته في Packet Tracer؟', options: ['سويتش', 'راوتر', 'حاسوب شخصي', 'طابعة ثلاثية الأبعاد'], correct: 3, explanation: 'الخيارات الثلاثة الأولى مدعومة، بينما الطابعة ثلاثية الأبعاد ليست جهاز شبكة.' },
                            { type: 'mcq', question: 'ما الفرق بين وضع الوقت الحقيقي (Realtime) ووضع المحاكاة (Simulation)؟', options: ['Realtime أسرع بدون تتبع الحزم، Simulation للتتبع', 'لا فرق بينهما', 'Simulation أسرع من Realtime', 'Realtime يعطل الشبكة'], correct: 0, explanation: 'Realtime يحاكي التشغيل الفعلي دون تتبع مفصل، Simulation يتيح تتبع الحزم.' },
                            { type: 'tf', question: 'لا يمكن حفظ ملفات المشاريع بصيغة .pkt في Packet Tracer.', options: ['صح', 'خطأ'], correct: 1, explanation: 'يمكن حفظ المشاريع بصيغة .pkt لإعادة فتحها لاحقاً.' }
                        ]
                    },
                    {
                        id: 2,
                        title: 'إنشاء أول شبكة',
                        videoUrl: 'https://www.youtube.com/watch?v=B1oxjyNqCEE',
                        duration: '20:15',
                        description: 'بناء أول شبكة بسيطة وربط الأجهزة باستخدام Packet Tracer.',
                        summary: [
                            'إضافة جهازين حاسوب وتوصيلهما بسويتش.',
                            'تحديد نوع الكابل المناسب (Copper Straight-Through).',
                            'تعيين عناوين IP وSubnet Mask يدوياً.',
                            'اختبار الاتصال باستخدام أمر ping.',
                            'حل أخطاء التوصيل الشائعة.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'أي كابل يُستخدم غالباً بين PC وسويتش؟', options: ['Cross-Over', 'Straight-Through', 'Fiber Patch', 'Console'], correct: 1, explanation: 'الكابل الموصل الشائع بين PC وسويتش هو Straight-Through.' },
                            { type: 'tf', question: 'الأمر ping يساعد على التحقق من الوصول بين جهازين.', options: ['صح', 'خطأ'], correct: 0, explanation: 'ping يرسل ICMP Echo للتحقق من الوصول.' },
                            { type: 'mcq', question: 'أين تُضبط عناوين IP في حاسوب افتراضي؟', options: ['Desktop > IP Configuration', 'Config > Interfaces', 'Services > DHCP', 'Physical > Modules'], correct: 0, explanation: 'يتم الضبط من Desktop > IP Configuration.' },
                            { type: 'mcq', question: 'Subnet mask المناسب لشبكة صغيرة /24 هو:', options: ['255.255.255.0', '255.255.0.0', '255.0.0.0', '255.255.255.252'], correct: 0, explanation: 'قناع /24 يساوي 255.255.255.0.' },
                            { type: 'tf', question: 'يجب أن تكون الأجهزة في نفس الشبكة الفرعية للاتصال المباشر بدون راوتر.', options: ['صح', 'خطأ'], correct: 0, explanation: 'للاتصال المباشر دون توجيه يجب أن تكون ضمن نفس الشبكة الفرعية.' }
                        ]
                    },
                    {
                        id: 3,
                        title: 'إعداد السويتشات',
                        videoUrl: 'https://www.youtube.com/watch?v=ysLj1SqZXLs',
                        duration: '18:20',
                        description: 'فهم وظيفة السويتش وكيفية إعداده لربط عدة أجهزة.',
                        summary: [
                            'التفريق بين Access وTrunk Ports.',
                            'إنشاء VLANs وتعيين المنافذ.',
                            'حفظ الإعدادات وتشغيلها تلقائياً.',
                            'التحقق عبر أوامر show vlan وshow mac-address-table.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'VLAN تُستخدم لـ:', options: ['تسريع الإنترنت', 'تقسيم الشبكة منطقيًا', 'تشفير البيانات', 'مراقبة المرور فقط'], correct: 1, explanation: 'VLAN تقسم الشبكة إلى نطاقات بث منطقية.' },
                            { type: 'tf', question: 'منفذ Access يحمل عدة VLANs في آن واحد.', options: ['صح', 'خطأ'], correct: 1, explanation: 'الـAccess يُستخدم لفئة VLAN واحدة، Trunk يحمل عدة VLANs.' },
                            { type: 'mcq', question: 'الأمر لعرض VLANs:', options: ['show ip interface brief', 'show vlan', 'show running-config', 'show spanning-tree'], correct: 1, explanation: 'show vlan يعرض الـVLANs المعرّفة والمنافذ المرتبطة.' },
                            { type: 'mcq', question: 'تعيين منفذ للسويتش إلى VLAN 10:', options: ['switchport mode trunk', 'switchport access vlan 10', 'vlan access 10', 'interface vlan 10'], correct: 1, explanation: 'الأمر الصحيح هو switchport access vlan 10 بعد جعل الوضع Access.' },
                            { type: 'tf', question: 'جدول عناوين MAC يُستخدم لتوجيه الإطارات داخل السويتش.', options: ['صح', 'خطأ'], correct: 0, explanation: 'السويتش يعتمد على جدول MAC لتحديد المنفذ الوجهة.' }
                        ]
                    },
                    {
                        id: 4,
                        title: 'إعداد الراوترات',
                        videoUrl: 'https://www.youtube.com/watch?v=lHfq_Va5Gu4',
                        duration: '22:45',
                        description: 'تكوين الراوترات لربط الشبكات المختلفة وتوجيه المرور.',
                        summary: [
                            'إعداد واجهات الراوتر وتخصيص IP.',
                            'تفعيل التوجيه بين الشبكات الفرعية.',
                            'إنشاء جداول التوجيه الثابتة والديناميكية.',
                            'اختبار الاتصال بين شبكات مختلفة.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'أي بروتوكول يستخدم للتوجيه الديناميكي؟', options: ['ARP', 'DHCP', 'RIP', 'DNS'], correct: 2, explanation: 'RIP هو بروتوكول توجيه ديناميكي.' },
                            { type: 'tf', question: 'يمكن للراوتر الربط بين شبكات فرعية مختلفة.', options: ['صح', 'خطأ'], correct: 0, explanation: 'وظيفة الراوتر الأساسية هي التوجيه بين الشبكات المختلفة.' },
                            { type: 'mcq', question: 'الأمر لعرض جدول التوجيه:', options: ['show ip route', 'show vlan', 'show running-config', 'show version'], correct: 0, explanation: 'show ip route يعرض جدول التوجيه الحالي.' },
                            { type: 'mcq', question: 'Default Gateway هو:', options: ['عنوان السويتش', 'عنوان الراوتر للخروج من الشبكة', 'عنوان DNS', 'عنوان DHCP'], correct: 1, explanation: 'البوابة الافتراضية هي عنوان الراوتر المستخدم للوصول لشبكات أخرى.' },
                            { type: 'tf', question: 'يجب تفعيل المنفذ بأمر no shutdown بعد تكوينه.', options: ['صح', 'خطأ'], correct: 0, explanation: 'المنافذ تكون معطلة افتراضياً وتحتاج لـ no shutdown.' }
                        ]
                    },
                    {
                        id: 5,
                        title: 'استكشاف الأخطاء وإصلاحها',
                        videoUrl: 'https://www.youtube.com/watch?v=gVYdKgULdH0',
                        duration: '25:00',
                        description: 'منهجية حل المشاكل الشائعة في الشبكات.',
                        summary: [
                            'التحقق من الكابلات والاتصال الفيزيائي.',
                            'مراجعة عناوين IP وأقنعة الشبكة.',
                            'استخدام أوامر التشخيص (ping, traceroute).',
                            'تتبع الحزم في وضع Simulation.',
                            'توثيق خطوات الحل وتكرار الاختبار.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'أي أداة تختبر المسار بين المصدر والوجهة؟', options: ['ping', 'traceroute', 'arp', 'telnet'], correct: 1, explanation: 'traceroute يعرض القفزات (hops) بين المصدر والوجهة.' },
                            { type: 'tf', question: 'تعطيل منفذ على السويتش قد يسبب انقطاع الاتصال.', options: ['صح', 'خطأ'], correct: 0, explanation: 'المنفذ المعطّل يحجب المرور في ذلك المسار.' },
                            { type: 'mcq', question: 'أين ترى سبب فشل DHCP في Packet Tracer؟', options: ['Desktop > IP Config', 'Config > DHCP', 'Simulation Events', 'Physical > Power'], correct: 2, explanation: 'في وضع Simulation تُعرض أحداث البروتوكولات ومنها DHCP.' },
                            { type: 'mcq', question: 'أفضل خطوة أولى عند فشل ping؟', options: ['إعادة تشغيل الراوتر فقط', 'التحقق من الكابلات والعناوين', 'مسح جدول MAC', 'تعطيل جميع المنافذ'], correct: 1, explanation: 'ابدأ بالتحقق من الطبقة الفيزيائية والعناوين.' },
                            { type: 'tf', question: 'توثيق خطوات الحل يساعد على تسريع الحلول لاحقاً.', options: ['صح', 'خطأ'], correct: 0, explanation: 'التوثيق يحسّن من سرعة ودقة الحلول المستقبلية.' }
                        ]
                    }
                ]
            }
        };
        
        // Load progress from localStorage
        this.loadAllProgress();
    }

    // Load progress for all courses
    loadAllProgress() {
        Object.keys(this.courses).forEach(courseId => {
            const savedProgress = localStorage.getItem(`course-progress-${courseId}`);
            if (savedProgress) {
                try {
                    const completedLessonIds = JSON.parse(savedProgress);
                    this.courses[courseId].lessons.forEach(lesson => {
                        lesson.completed = completedLessonIds.includes(lesson.id);
                    });
                } catch (error) {
                    console.error(`Failed to load progress for ${courseId}:`, error);
                }
            }
        });
    }

    // Save progress for a specific course
    saveProgress(courseId, lessonId) {
        const course = this.courses[courseId];
        if (!course) return;

        const lesson = course.lessons.find(l => l.id === lessonId);
        if (lesson) {
            lesson.completed = true;
            const completedLessons = course.lessons
                .filter(l => l.completed)
                .map(l => l.id);
            
            localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(completedLessons));
        }
    }

    // Get course by ID
    getCourse(courseId) {
        return this.courses[courseId] || null;
    }

    // Get all courses
    getAllCourses() {
        return this.courses;
    }

    // Get courses by category
    getCoursesByCategory(category) {
        return Object.entries(this.courses)
            .filter(([id, course]) => course.category === category)
            .reduce((acc, [id, course]) => {
                acc[id] = course;
                return acc;
            }, {});
    }

    // Get pass threshold (course-level override or global)
    getPassThreshold(courseId) {
        const course = courseId ? this.courses[courseId] : undefined;
        if (course && typeof course.passThreshold === 'number') {
            return course.passThreshold;
        }
        return this.passThreshold ?? 70;
    }

    // Get course progress percentage
    getProgressPercentage(courseId) {
        const course = this.courses[courseId];
        if (!course) return 0;

        const completedCount = course.lessons.filter(l => l.completed).length;
        return Math.round((completedCount / course.lessons.length) * 100);
    }

    // Mark lesson as completed
    markLessonCompleted(courseId, lessonId) {
        this.saveProgress(courseId, lessonId);
        this.updateProgressDisplay(courseId);
    }

    // Update progress display on page
    updateProgressDisplay(courseId) {
        const progressBars = document.querySelectorAll(`[data-course="${courseId}"] .course-progress__bar`);
        const percentage = this.getProgressPercentage(courseId);
        const step = Math.max(0, Math.min(100, Math.round(percentage / 5) * 5));
        progressBars.forEach(bar => {
            bar.className = bar.className.replace(/progress-w-\d{1,3}/g, '').trim();
            bar.classList.add(`progress-w-${step}`);
            bar.setAttribute('aria-valuenow', String(step));
            bar.setAttribute('title', `التقدم ${step}%`);
            bar.setAttribute('aria-label', `التقدم ${step}%`);
        });
    }

    // Generate quiz for a course
    generateQuiz(courseId, lessonId) {
        const course = this.courses[courseId];
        if (!course) return null;
        const lesson = course.lessons.find(l => l.id === lessonId);
        if (!lesson || !lesson.quiz) return [];
        return lesson.quiz.map((q, idx) => ({
            id: idx,
            type: q.type || 'mcq',
            question: q.question,
            options: q.options,
            correct: q.correct,
            explanation: q.explanation || ''
        }));
    }

    // Check quiz answers
    checkQuizAnswers(courseId, lessonId, answers) {
        const quiz = this.generateQuiz(courseId, lessonId);
        if (!quiz || quiz.length === 0) return { score: 0, total: 0, percentage: 0, passed: true, threshold: this.getPassThreshold(courseId), details: [] };

        let correctCount = 0;
        const details = quiz.map((q, i) => {
            const selected = answers[i];
            const isCorrect = selected === q.correct;
            if (isCorrect) correctCount++;
            return {
                index: i,
                question: q.question,
                options: q.options,
                correct: q.correct,
                selected: selected,
                explanation: q.explanation || ''
            };
        });

        const percentage = Math.round((correctCount / quiz.length) * 100);
        const threshold = this.getPassThreshold(courseId);
        return { score: correctCount, total: quiz.length, percentage, passed: percentage >= threshold, threshold, details };
    }
}

// Initialize course manager
const courseManager = new CourseManager();

// Export for global use
window.courseManager = courseManager;
