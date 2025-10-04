// Course data management for Musanid Platform
class CourseManager {
    constructor() {
        this.courses = {
            'cisco-packet-tracer': {
                title: 'أساسيات Cisco Packet Tracer',
                category: 'networking',
                badge: 'شبكات',
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
                            {
                                type: 'mcq',
                                question: 'ما الهدف الأساسي من Cisco Packet Tracer؟',
                                options: ['محاكاة الشبكات', 'اختبار سرعة الإنترنت', 'إدارة كلمات المرور', 'محرر نصوص'],
                                correct: 0,
                                explanation: 'Packet Tracer هو برنامج لمحاكاة الشبكات يساعد على تصميم واختبار الشبكات افتراضيًا.'
                            },
                            {
                                type: 'tf',
                                question: 'يمكن استخدام وضع المحاكاة لمراقبة مرور الحزم خطوة بخطوة.',
                                options: ['صح', 'خطأ'],
                                correct: 0,
                                explanation: 'وضع Simulation يعرض انتقال الحزم عبر الشبكة خطوة بخطوة لتحليل السلوك.'
                            },
                            {
                                type: 'mcq',
                                question: 'أي من التالي ليس جهاز شبكة يمكن إضافته في Packet Tracer؟',
                                options: ['سويتش', 'راوتر', 'حاسوب شخصي', 'طابعة ثلاثية الأبعاد'],
                                correct: 3,
                                explanation: 'الخيارات الثلاثة الأولى مدعومة، بينما الطابعة ثلاثية الأبعاد ليست جهاز شبكة.'
                            },
                            {
                                type: 'mcq',
                                question: 'ما الفرق بين وضع الوقت الحقيقي (Realtime) ووضع المحاكاة (Simulation)؟',
                                options: ['Realtime أسرع بدون تتبع الحزم، Simulation للتتبع', 'لا فرق بينهما', 'Simulation أسرع من Realtime', 'Realtime يعطل الشبكة'],
                                correct: 0,
                                explanation: 'Realtime يحاكي التشغيل الفعلي دون تتبع مفصل، Simulation يتيح تتبع الحزم.'
                            },
                            {
                                type: 'tf',
                                question: 'لا يمكن حفظ ملفات المشاريع بصيغة .pkt في Packet Tracer.',
                                options: ['صح', 'خطأ'],
                                correct: 1,
                                explanation: 'يمكن حفظ المشاريع بصيغة .pkt لإعادة فتحها لاحقاً.'
                            }
                        ]
                    },
                    {
                        id: 2,
                        title: 'إنشاء أول شبكة',
                        videoUrl: 'https://www.youtube.com/watch?v=ty0HMs48U1k',
                        duration: '20:45',
                        description: 'تعلم كيفية ربط جهازين أو أكثر وإعداد عناوين IP الأساسية.',
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
                        videoUrl: 'https://www.youtube.com/watch?v=example3',
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
                        videoUrl: 'https://www.youtube.com/watch?v=example4',
                        duration: '25:15',
                        description: 'تعلم إعداد الراوترات وتوجيه البيانات بين الشبكات المختلفة.',
                        summary: [
                            'تهيئة المنافذ وإسناد عناوين IP.',
                            'تفعيل التوجيه الثابت Static Routing.',
                            'التحقق عبر أوامر show ip route وshow ip interface brief.',
                            'حل مشاكل التوجيه الشائعة.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'الأمر لعرض جدول التوجيه:', options: ['show ip interface brief', 'show running-config', 'show ip route', 'show cdp neighbors'], correct: 2, explanation: 'show ip route يعرض مسارات التوجيه.' },
                            { type: 'tf', question: 'Static route يتوقف على بروتوكول ديناميكي ليعمل.', options: ['صح', 'خطأ'], correct: 1, explanation: 'المسار الثابت لا يعتمد على بروتوكول ديناميكي.' },
                            { type: 'mcq', question: 'تعريف مسار ثابت إلى 192.168.2.0/24 عبر 192.168.1.1:', options: ['ip route 192.168.2.0 255.255.255.0 192.168.1.1', 'route add 192.168.2.0/24 gw 192.168.1.1', 'set route ...', 'ip static 192.168.2.0 192.168.1.1'], correct: 0, explanation: 'بناء الجملة الصحيح كما في IOS: ip route <network> <mask> <next-hop>.' },
                            { type: 'mcq', question: 'أي بروتوكول ديناميكي شائع للتوجيه الداخلي؟', options: ['FTP', 'RIP', 'NTP', 'ARP'], correct: 1, explanation: 'RIP هو بروتوكول توجيه ديناميكي بسيط للشبكات الصغيرة.' },
                            { type: 'tf', question: 'يجب أن تكون الواجهة في حالة up/up كي تمرر الترافيك.', options: ['صح', 'خطأ'], correct: 0, explanation: 'واجهة down أو administratively down تمنع مرور الترافيك.' }
                        ]
                    },
                    {
                        id: 5,
                        title: 'استكشاف الأخطاء',
                        videoUrl: 'https://www.youtube.com/watch?v=example5',
                        duration: '22:30',
                        description: 'اكتشف الأدوات المتاحة لتشخيص مشاكل الشبكة وحلها.',
                        summary: [
                            'تحليل المشكلات الشائعة في الطبقات المختلفة.',
                            'استخدام أوامر ping وtraceroute وshow للتحقق.',
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
                ],
                quiz: []
            },
            'linux-os': {
                title: 'نظام التشغيل لينكس',
                category: 'systems',
                badge: 'أنظمة تشغيل',
                description: 'اتقن استخدام وإدارة نظام لينكس من الأوامر الأساسية إلى إدارة الخوادم والشبكات.',
                duration: '5 ساعات',
                level: 'مبتدئ-متوسط',
                videoCount: 5,
                lessons: [
                    {
                        id: 1,
                        title: 'مقدمة في لينكس',
                        videoUrl: 'https://www.youtube.com/watch?v=linux1',
                        duration: '20:00',
                        description: 'نظرة عامة على نظام لينكس وتوزيعاته المختلفة.',
                        completed: false
                    },
                    {
                        id: 2,
                        title: 'الأوامر الأساسية',
                        videoUrl: 'https://www.youtube.com/watch?v=linux2',
                        duration: '25:30',
                        description: 'تعلم الأوامر الأساسية للتنقل وإدارة الملفات.',
                        completed: false
                    },
                    {
                        id: 3,
                        title: 'إدارة المستخدمين والأذونات',
                        videoUrl: 'https://www.youtube.com/watch?v=linux3',
                        duration: '30:45',
                        description: 'كيفية إنشاء وإدارة المستخدمين وضبط الأذونات.',
                        completed: false
                    },
                    {
                        id: 4,
                        title: 'إدارة العمليات والخدمات',
                        videoUrl: 'https://www.youtube.com/watch?v=linux4',
                        duration: '28:20',
                        description: 'مراقبة وإدارة العمليات والخدمات في النظام.',
                        completed: false
                    },
                    {
                        id: 5,
                        title: 'الشبكات في لينكس',
                        videoUrl: 'https://www.youtube.com/watch?v=linux5',
                        duration: '35:15',
                        description: 'إعداد وإدارة الشبكات في بيئة لينكس.',
                        completed: false
                    }
                ]
            },
            'java-programming': {
                title: 'برمجة Java',
                category: 'programming',
                badge: 'برمجة',
                description: 'تعلم لغة البرمجة Java من البداية، من المتغيرات والدوال إلى البرمجة كائنية التوجه.',
                duration: '6 ساعات',
                level: 'مبتدئ',
                videoCount: 5,
                lessons: [
                    {
                        id: 1,
                        title: 'مقدمة في Java',
                        videoUrl: 'https://www.youtube.com/watch?v=java1',
                        duration: '25:00',
                        description: 'نظرة عامة على لغة Java وإعداد بيئة التطوير.',
                        completed: false
                    },
                    {
                        id: 2,
                        title: 'المتغيرات وأنواع البيانات',
                        videoUrl: 'https://www.youtube.com/watch?v=java2',
                        duration: '30:15',
                        description: 'تعلم كيفية التعامل مع المتغيرات وأنواع البيانات المختلفة.',
                        completed: false
                    },
                    {
                        id: 3,
                        title: 'التحكم في التدفق',
                        videoUrl: 'https://www.youtube.com/watch?v=java3',
                        duration: '35:30',
                        description: 'الجمل الشرطية والحلقات وبنى التحكم.',
                        completed: false
                    },
                    {
                        id: 4,
                        title: 'الدوال والكلاسات',
                        videoUrl: 'https://www.youtube.com/watch?v=java4',
                        duration: '40:45',
                        description: 'إنشاء الدوال والكلاسات في Java.',
                        completed: false
                    },
                    {
                        id: 5,
                        title: 'البرمجة كائنية التوجه',
                        videoUrl: 'https://www.youtube.com/watch?v=java5',
                        duration: '45:20',
                        description: 'مبادئ OOP في Java: الوراثة والتغليف وتعدد الأشكال.',
                        completed: false
                    }
                ]
            },
            'cyber-security': {
                title: 'مبادئ الأمن السيبراني',
                category: 'security',
                badge: 'أمن سيبراني',
                description: 'اكتشف عالم الأمن السيبراني وتعلم حماية الأنظمة والشبكات من التهديدات الإلكترونية.',
                duration: '5 ساعات',
                level: 'مبتدئ-متوسط',
                videoCount: 5,
                lessons: [
                    {
                        id: 1,
                        title: 'مقدمة في الأمن السيبراني',
                        videoUrl: 'https://www.youtube.com/watch?v=security1',
                        duration: '20:30',
                        description: 'نظرة عامة على التهديدات السيبرانية والحاجة للأمن.',
                        completed: false
                    },
                    {
                        id: 2,
                        title: 'التشفير وحماية البيانات',
                        videoUrl: 'https://www.youtube.com/watch?v=security2',
                        duration: '28:45',
                        description: 'أساسيات التشفير وطرق حماية البيانات الحساسة.',
                        completed: false
                    },
                    {
                        id: 3,
                        title: 'أمن الشبكات',
                        videoUrl: 'https://www.youtube.com/watch?v=security3',
                        duration: '32:15',
                        description: 'حماية الشبكات من الهجمات والتسلل.',
                        completed: false
                    },
                    {
                        id: 4,
                        title: 'الهجمات الشائعة وطرق الدفاع',
                        videoUrl: 'https://www.youtube.com/watch?v=security4',
                        duration: '35:20',
                        description: 'التعرف على الهجمات الشائعة وكيفية الحماية منها.',
                        completed: false
                    },
                    {
                        id: 5,
                        title: 'أفضل الممارسات الأمنية',
                        videoUrl: 'https://www.youtube.com/watch?v=security5',
                        duration: '30:10',
                        description: 'تطبيق أفضل الممارسات لضمان الأمن السيبراني.',
                        completed: false
                    }
                ]
            }
        };
        
        this.loadProgressFromStorage();
    }

    // Load progress from localStorage
    loadProgressFromStorage() {
        Object.keys(this.courses).forEach(courseId => {
            const savedProgress = localStorage.getItem(`course-progress-${courseId}`);
            if (savedProgress) {
                const completedLessons = JSON.parse(savedProgress);
                this.courses[courseId].lessons.forEach(lesson => {
                    lesson.completed = completedLessons.includes(lesson.id);
                });
            }
        });
    }

    // Save progress to localStorage
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
        if (!quiz || quiz.length === 0) return { score: 0, total: 0, percentage: 0, passed: true, details: [] };

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
        return { score: correctCount, total: quiz.length, percentage, passed: percentage >= 70, details };
    }
}

// Initialize course manager
const courseManager = new CourseManager();

// Export for global use
window.courseManager = courseManager;