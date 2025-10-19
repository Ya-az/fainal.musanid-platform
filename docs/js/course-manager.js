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
            },
            'linux-os': {
                title: 'أساسيات نظام Linux',
                category: 'systems',
                badge: 'أنظمة',
                passThreshold: 70,
                description: 'تعلم أساسيات نظام Linux والأوامر الطرفية وإدارة الملفات والصلاحيات.',
                duration: '3.5 ساعات',
                level: 'مبتدئ',
                videoCount: 5,
                lessons: [
                    {
                        id: 1,
                        title: 'مقدمة إلى Linux',
                        videoUrl: 'https://www.youtube.com/watch?v=ROjZy1WbCIA',
                        duration: '18:00',
                        description: 'التعرف على نظام Linux وتاريخه ومميزاته.',
                        summary: [
                            'فهم الفرق بين Linux والأنظمة الأخرى.',
                            'التعرف على توزيعات Linux الشهيرة (Ubuntu, CentOS).',
                            'تثبيت Linux على جهاز وهمي.',
                            'التعرف على واجهة سطر الأوامر (Terminal).',
                            'فهم بنية النظام الأساسية.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'Linux هو نظام تشغيل:', options: ['مفتوح المصدر', 'مغلق المصدر', 'تجاري فقط', 'غير مجاني'], correct: 0, explanation: 'Linux هو نظام مفتوح المصدر يمكن أي شخص تعديله.' },
                            { type: 'tf', question: 'Ubuntu هو إحدى توزيعات Linux.', options: ['صح', 'خطأ'], correct: 0, explanation: 'Ubuntu توزيعة شهيرة تعتمد على Debian.' },
                            { type: 'mcq', question: 'Terminal هو:', options: ['متصفح ويب', 'واجهة سطر أوامر', 'برنامج تحرير نصوص', 'مدير ملفات'], correct: 1, explanation: 'Terminal هو واجهة تنفيذ الأوامر النصية.' },
                            { type: 'mcq', question: 'أي من التالي ليس توزيعة Linux؟', options: ['Ubuntu', 'CentOS', 'Windows Server', 'Fedora'], correct: 2, explanation: 'Windows Server نظام مستقل وليس توزيعة Linux.' },
                            { type: 'tf', question: 'يمكن تشغيل Linux على أجهزة افتراضية.', options: ['صح', 'خطأ'], correct: 0, explanation: 'Linux يعمل بكفاءة على أجهزة افتراضية مثل VirtualBox.' }
                        ]
                    },
                    {
                        id: 2,
                        title: 'الأوامر الأساسية',
                        videoUrl: 'https://www.youtube.com/watch?v=IVquJh3DXUA',
                        duration: '22:30',
                        description: 'تعلم أوامر Linux الأساسية للتنقل وإدارة الملفات.',
                        summary: [
                            'استخدام أوامر التنقل (cd, ls, pwd).',
                            'إنشاء وحذف الملفات والمجلدات (mkdir, rm, touch).',
                            'نسخ ونقل الملفات (cp, mv).',
                            'عرض محتوى الملفات (cat, less, head, tail).',
                            'استخدام الخيارات والمعاملات مع الأوامر.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'الأمر لعرض الدليل الحالي:', options: ['pwd', 'cd', 'ls', 'dir'], correct: 0, explanation: 'pwd تعني Print Working Directory.' },
                            { type: 'tf', question: 'الأمر rm يُستخدم لحذف الملفات.', options: ['صح', 'خطأ'], correct: 0, explanation: 'rm هو أمر الحذف في Linux.' },
                            { type: 'mcq', question: 'لإنشاء مجلد جديد:', options: ['touch', 'mkdir', 'create', 'new'], correct: 1, explanation: 'mkdir تعني Make Directory.' },
                            { type: 'mcq', question: 'الأمر لعرض محتوى ملف:', options: ['open', 'cat', 'view', 'read'], correct: 1, explanation: 'cat يعرض محتوى الملف كاملاً.' },
                            { type: 'tf', question: 'cp يُستخدم لنقل الملفات فقط.', options: ['صح', 'خطأ'], correct: 1, explanation: 'cp للنسخ، mv للنقل.' }
                        ]
                    },
                    {
                        id: 3,
                        title: 'الصلاحيات والملكية',
                        videoUrl: 'https://www.youtube.com/watch?v=LnKoncbQBsM',
                        duration: '20:15',
                        description: 'فهم نظام الصلاحيات وكيفية إدارتها.',
                        summary: [
                            'فهم صلاحيات القراءة والكتابة والتنفيذ (rwx).',
                            'تغيير صلاحيات الملفات (chmod).',
                            'تغيير مالك الملف (chown).',
                            'استخدام الصيغة الرقمية والرمزية للصلاحيات.',
                            'فهم صلاحيات المجموعات والآخرين.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'الأمر لتغيير صلاحيات ملف:', options: ['chmod', 'chown', 'chgrp', 'perm'], correct: 0, explanation: 'chmod يغيّر الصلاحيات.' },
                            { type: 'tf', question: 'الصلاحية r تعني القراءة.', options: ['صح', 'خطأ'], correct: 0, explanation: 'r = read, w = write, x = execute.' },
                            { type: 'mcq', question: 'الرقم 7 في صلاحيات يعني:', options: ['قراءة فقط', 'كتابة فقط', 'قراءة+كتابة+تنفيذ', 'لا صلاحيات'], correct: 2, explanation: '7 = 4(r) + 2(w) + 1(x).' },
                            { type: 'mcq', question: 'لتغيير مالك ملف:', options: ['chmod', 'chown', 'owner', 'user'], correct: 1, explanation: 'chown يغيّر المالك.' },
                            { type: 'tf', question: 'الصلاحية 755 تعطي المالك كل الصلاحيات والآخرين قراءة وتنفيذ.', options: ['صح', 'خطأ'], correct: 0, explanation: '755 = rwxr-xr-x.' }
                        ]
                    },
                    {
                        id: 4,
                        title: 'إدارة العمليات',
                        videoUrl: 'https://www.youtube.com/watch?v=PgM3LNT8CBg',
                        duration: '19:45',
                        description: 'مراقبة وإدارة العمليات الجارية في النظام.',
                        summary: [
                            'عرض العمليات الجارية (ps, top, htop).',
                            'إيقاف العمليات (kill, killall).',
                            'تشغيل العمليات في الخلفية (&, bg, fg).',
                            'فهم أولويات العمليات (nice, renice).',
                            'مراقبة استهلاك الموارد.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'الأمر لعرض العمليات الجارية:', options: ['show', 'ps', 'list', 'proc'], correct: 1, explanation: 'ps يعرض لقطة من العمليات.' },
                            { type: 'tf', question: 'top يعرض العمليات بشكل تفاعلي ومباشر.', options: ['صح', 'خطأ'], correct: 0, explanation: 'top يُحدّث العرض تلقائياً.' },
                            { type: 'mcq', question: 'لإيقاف عملية برقم PID:', options: ['stop', 'end', 'kill', 'halt'], correct: 2, explanation: 'kill -9 PID يوقف العملية.' },
                            { type: 'mcq', question: 'لتشغيل أمر في الخلفية:', options: ['bg command', 'command &', 'background command', 'command -b'], correct: 1, explanation: '& في نهاية الأمر يشغّله في الخلفية.' },
                            { type: 'tf', question: 'nice يتحكم بأولوية العملية.', options: ['صح', 'خطأ'], correct: 0, explanation: 'nice يضبط الأولوية عند بدء العملية.' }
                        ]
                    },
                    {
                        id: 5,
                        title: 'إدارة الحزم والتحديثات',
                        videoUrl: 'https://www.youtube.com/watch?v=wBp0Rb-ZJak',
                        duration: '21:30',
                        description: 'تثبيت وتحديث البرامج في Linux.',
                        summary: [
                            'استخدام apt في Ubuntu (apt update, apt install).',
                            'استخدام yum/dnf في CentOS/Fedora.',
                            'البحث عن الحزم وحذفها.',
                            'إدارة المستودعات (repositories).',
                            'فهم التبعيات والتحديثات الأمنية.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'لتحديث قائمة الحزم في Ubuntu:', options: ['apt upgrade', 'apt update', 'apt refresh', 'apt sync'], correct: 1, explanation: 'apt update يُحدّث قائمة الحزم المتوفرة.' },
                            { type: 'tf', question: 'apt install يُستخدم لتثبيت حزم جديدة.', options: ['صح', 'خطأ'], correct: 0, explanation: 'apt install package_name يثبّت الحزمة.' },
                            { type: 'mcq', question: 'في CentOS، مدير الحزم هو:', options: ['apt', 'yum أو dnf', 'pacman', 'zypper'], correct: 1, explanation: 'CentOS/RHEL يستخدمون yum أو dnf.' },
                            { type: 'mcq', question: 'لحذف حزمة في Ubuntu:', options: ['apt delete', 'apt remove', 'apt uninstall', 'apt erase'], correct: 1, explanation: 'apt remove package_name يحذف الحزمة.' },
                            { type: 'tf', question: 'يجب تشغيل apt بصلاحيات المدير (sudo).', options: ['صح', 'خطأ'], correct: 0, explanation: 'تثبيت/حذف الحزم يتطلب sudo أو root.' }
                        ]
                    }
                ]
            },
            'java-programming': {
                title: 'أساسيات البرمجة بلغة Java',
                category: 'programming',
                badge: 'برمجة',
                passThreshold: 75,
                description: 'تعلم أساسيات لغة Java من المتغيرات إلى البرمجة الكائنية.',
                duration: '4 ساعات',
                level: 'مبتدئ',
                videoCount: 5,
                lessons: [
                    {
                        id: 1,
                        title: 'مقدمة في Java',
                        videoUrl: 'https://www.youtube.com/watch?v=eIrMbAQSU34',
                        duration: '20:00',
                        description: 'التعرف على لغة Java وبيئة التطوير.',
                        summary: [
                            'فهم ما هي Java ولماذا تُستخدم.',
                            'تثبيت JDK و IDE (مثل IntelliJ أو Eclipse).',
                            'كتابة وتشغيل أول برنامج Java.',
                            'فهم بنية الكود الأساسية (class, main method).',
                            'التعامل مع الأخطاء البرمجية البسيطة.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'Java هي لغة:', options: ['مفسرة فقط', 'مُجمّعة فقط', 'مُجمّعة ومفسرة', 'لغة سكربت'], correct: 2, explanation: 'Java تُجمّع إلى bytecode ثم تُفسر بواسطة JVM.' },
                            { type: 'tf', question: 'JDK يحتوي على JRE.', options: ['صح', 'خطأ'], correct: 0, explanation: 'JDK يشمل JRE بالإضافة لأدوات التطوير.' },
                            { type: 'mcq', question: 'نقطة البداية في برنامج Java:', options: ['start()', 'main()', 'run()', 'init()'], correct: 1, explanation: 'البرنامج يبدأ من main method.' },
                            { type: 'mcq', question: 'امتداد ملف Java المصدري:', options: ['.java', '.class', '.jar', '.jvm'], correct: 0, explanation: 'الملف المصدري امتداده .java.' },
                            { type: 'tf', question: 'Java حساسة لحالة الأحرف (Case-Sensitive).', options: ['صح', 'خطأ'], correct: 0, explanation: 'Java تميّز بين الأحرف الكبيرة والصغيرة.' }
                        ]
                    },
                    {
                        id: 2,
                        title: 'المتغيرات وأنواع البيانات',
                        videoUrl: 'https://www.youtube.com/watch?v=NG4HNV-L5qA',
                        duration: '18:30',
                        description: 'التعرف على أنواع البيانات والمتغيرات في Java.',
                        summary: [
                            'أنواع البيانات البدائية (int, double, boolean, char).',
                            'إعلان المتغيرات وتعيين القيم.',
                            'الفرق بين البيانات البدائية والكائنات.',
                            'العمليات الحسابية والمنطقية.',
                            'تحويل أنواع البيانات (Type Casting).'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'نوع البيانات لتخزين عدد صحيح:', options: ['float', 'int', 'char', 'String'], correct: 1, explanation: 'int يُستخدم للأعداد الصحيحة.' },
                            { type: 'tf', question: 'boolean يحمل قيمتين فقط: true و false.', options: ['صح', 'خطأ'], correct: 0, explanation: 'boolean ثنائي القيمة.' },
                            { type: 'mcq', question: 'لتخزين نص في Java:', options: ['String', 'char', 'text', 'varchar'], correct: 0, explanation: 'String للنصوص، char لحرف واحد.' },
                            { type: 'mcq', question: 'لتحويل int إلى double:', options: ['(double)x', 'x.toDouble()', 'convert(x)', 'double.parse(x)'], correct: 0, explanation: 'Type casting: (double)x.' },
                            { type: 'tf', question: 'يمكن تغيير قيمة متغير final.', options: ['صح', 'خطأ'], correct: 1, explanation: 'final يجعل المتغير ثابتاً.' }
                        ]
                    },
                    {
                        id: 3,
                        title: 'الشروط والحلقات',
                        videoUrl: 'https://www.youtube.com/watch?v=ldYLYRNaucM',
                        duration: '22:00',
                        description: 'التحكم بسير البرنامج باستخدام if, switch, for, while.',
                        summary: [
                            'استخدام if, else if, else.',
                            'استخدام switch-case.',
                            'الحلقات: for, while, do-while.',
                            'استخدام break و continue.',
                            'الحلقات المتداخلة.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'لتنفيذ كود بشرط معين:', options: ['for', 'if', 'switch', 'while'], correct: 1, explanation: 'if يُستخدم للشروط.' },
                            { type: 'tf', question: 'switch يعمل مع String في Java.', options: ['صح', 'خطأ'], correct: 0, explanation: 'Java 7+ تدعم String في switch.' },
                            { type: 'mcq', question: 'حلقة تتكرر عدد معلوم من المرات:', options: ['while', 'do-while', 'for', 'if'], correct: 2, explanation: 'for مناسبة للتكرار المعلوم.' },
                            { type: 'mcq', question: 'لإيقاف حلقة فوراً:', options: ['stop', 'break', 'exit', 'return'], correct: 1, explanation: 'break تخرج من الحلقة.' },
                            { type: 'tf', question: 'do-while تضمن تنفيذ الكود مرة واحدة على الأقل.', options: ['صح', 'خطأ'], correct: 0, explanation: 'do-while تنفّذ الكود قبل الفحص.' }
                        ]
                    },
                    {
                        id: 4,
                        title: 'الدوال والمصفوفات',
                        videoUrl: 'https://www.youtube.com/watch?v=vvanI8NRlSI',
                        duration: '24:30',
                        description: 'إنشاء الدوال واستخدام المصفوفات.',
                        summary: [
                            'تعريف واستدعاء الدوال (Methods).',
                            'المعاملات (Parameters) والقيم المُرجعة.',
                            'إنشاء واستخدام المصفوفات (Arrays).',
                            'المصفوفات متعددة الأبعاد.',
                            'استخدام for-each loop.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'لتعريف دالة في Java:', options: ['function myFunc()', 'def myFunc()', 'void myFunc()', 'method myFunc()'], correct: 2, explanation: 'نستخدم نوع الإرجاع ثم الاسم.' },
                            { type: 'tf', question: 'يمكن للدالة إرجاع أكثر من قيمة مباشرة.', options: ['صح', 'خطأ'], correct: 1, explanation: 'الدالة ترجع قيمة واحدة (أو كائن/مصفوفة).' },
                            { type: 'mcq', question: 'لإنشاء مصفوفة أعداد صحيحة:', options: ['int[] arr', 'array int arr', 'int arr[]', 'كلاهما الأول والثالث'], correct: 3, explanation: 'int[] arr أو int arr[] كلاهما صحيح.' },
                            { type: 'mcq', question: 'للوصول لأول عنصر في مصفوفة:', options: ['arr[0]', 'arr[1]', 'arr.first()', 'arr.get(0)'], correct: 0, explanation: 'المصفوفات تبدأ بالفهرس 0.' },
                            { type: 'tf', question: 'for-each مناسبة للمرور على جميع عناصر مصفوفة.', options: ['صح', 'خطأ'], correct: 0, explanation: 'for-each تبسّط المرور على العناصر.' }
                        ]
                    },
                    {
                        id: 5,
                        title: 'البرمجة الكائنية (OOP)',
                        videoUrl: 'https://www.youtube.com/watch?v=pTB0EiLXUC8',
                        duration: '26:00',
                        description: 'مبادئ البرمجة الكائنية في Java.',
                        summary: [
                            'إنشاء الأصناف (Classes) والكائنات (Objects).',
                            'الخصائص (Attributes) والدوال (Methods).',
                            'المُنشئات (Constructors).',
                            'الوراثة (Inheritance) والتغليف (Encapsulation).',
                            'استخدام getters و setters.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'لإنشاء كائن من صنف:', options: ['new ClassName()', 'create ClassName()', 'ClassName.new()', 'instance ClassName()'], correct: 0, explanation: 'نستخدم new للإنشاء.' },
                            { type: 'tf', question: 'Constructor له نفس اسم الصنف.', options: ['صح', 'خطأ'], correct: 0, explanation: 'المُنشئ يطابق اسم الصنف تماماً.' },
                            { type: 'mcq', question: 'لجعل خاصية غير قابلة للوصول من خارج الصنف:', options: ['public', 'private', 'protected', 'default'], correct: 1, explanation: 'private تحجب الخاصية خارج الصنف.' },
                            { type: 'mcq', question: 'الوراثة تُستخدم بكلمة:', options: ['inherit', 'extends', 'implements', 'super'], correct: 1, explanation: 'extends للوراثة من صنف.' },
                            { type: 'tf', question: 'Java تدعم الوراثة المتعددة من عدة أصناف.', options: ['صح', 'خطأ'], correct: 1, explanation: 'Java لا تدعم الوراثة المتعددة من الأصناف، لكن تدعمها من الواجهات.' }
                        ]
                    }
                ]
            },
            'cyber-security': {
                title: 'مقدمة في الأمن السيبراني',
                category: 'security',
                badge: 'أمن سيبراني',
                passThreshold: 80,
                description: 'تعلم أساسيات الأمن السيبراني وحماية الأنظمة والبيانات.',
                duration: '3.5 ساعات',
                level: 'متوسط',
                videoCount: 5,
                lessons: [
                    {
                        id: 1,
                        title: 'أساسيات الأمن السيبراني',
                        videoUrl: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
                        duration: '19:00',
                        description: 'مقدمة شاملة للأمن السيبراني ومفاهيمه الأساسية.',
                        summary: [
                            'تعريف الأمن السيبراني وأهميته.',
                            'الثالوث الأمني (CIA): السرية والنزاهة والتوافرية.',
                            'أنواع التهديدات السيبرانية.',
                            'الفرق بين الأمن الوقائي والأمن التفاعلي.',
                            'دورة حياة الهجوم السيبراني.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'CIA في الأمن السيبراني تعني:', options: ['وكالة المخابرات', 'السرية والنزاهة والتوافرية', 'بروتوكول تشفير', 'برنامج حماية'], correct: 1, explanation: 'CIA = Confidentiality, Integrity, Availability.' },
                            { type: 'tf', question: 'التهديدات السيبرانية تشمل البرمجيات الخبيثة والهندسة الاجتماعية.', options: ['صح', 'خطأ'], correct: 0, explanation: 'التهديدات متنوعة: malware, phishing, social engineering.' },
                            { type: 'mcq', question: 'الهدف من التوافرية (Availability):', options: ['حماية السرية', 'ضمان الوصول للنظام عند الحاجة', 'منع التعديل', 'تشفير البيانات'], correct: 1, explanation: 'التوافرية تعني إمكانية الوصول للبيانات/الخدمات.' },
                            { type: 'mcq', question: 'أي مما يلي يُعتبر هجوم اجتماعي؟', options: ['DDoS', 'Phishing', 'SQL Injection', 'Brute Force'], correct: 1, explanation: 'Phishing يستغل العامل البشري.' },
                            { type: 'tf', question: 'الأمن الوقائي يركز على منع الهجمات قبل حدوثها.', options: ['صح', 'خطأ'], correct: 0, explanation: 'الأمن الوقائي يشمل الجدران النارية والتحديثات.' }
                        ]
                    },
                    {
                        id: 2,
                        title: 'التشفير وحماية البيانات',
                        videoUrl: 'https://www.youtube.com/watch?v=jhXCTbFnK8o',
                        duration: '21:30',
                        description: 'فهم أساسيات التشفير وكيفية حماية البيانات.',
                        summary: [
                            'الفرق بين التشفير المتماثل واللامتماثل.',
                            'خوارزميات التشفير الشهيرة (AES, RSA).',
                            'التوقيع الرقمي والشهادات الرقمية.',
                            'بروتوكولات التشفير (HTTPS, SSL/TLS).',
                            'إدارة المفاتيح وأفضل الممارسات.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'التشفير المتماثل يستخدم:', options: ['مفتاحين مختلفين', 'مفتاح واحد مشترك', 'لا يستخدم مفاتيح', 'ثلاثة مفاتيح'], correct: 1, explanation: 'التشفير المتماثل يستخدم نفس المفتاح للتشفير والفك.' },
                            { type: 'tf', question: 'AES هو خوارزمية تشفير متماثل.', options: ['صح', 'خطأ'], correct: 0, explanation: 'AES (Advanced Encryption Standard) تشفير متماثل.' },
                            { type: 'mcq', question: 'RSA يُستخدم في:', options: ['التشفير المتماثل', 'التشفير اللامتماثل', 'Hash فقط', 'الضغط'], correct: 1, explanation: 'RSA تشفير لا متماثل (مفتاح عام وخاص).' },
                            { type: 'mcq', question: 'HTTPS يستخدم:', options: ['HTTP فقط', 'SSL/TLS للتشفير', 'FTP', 'Telnet'], correct: 1, explanation: 'HTTPS = HTTP + SSL/TLS.' },
                            { type: 'tf', question: 'التوقيع الرقمي يضمن عدم التلاعب بالرسالة.', options: ['صح', 'خطأ'], correct: 0, explanation: 'التوقيع الرقمي يؤكد النزاهة والأصالة.' }
                        ]
                    },
                    {
                        id: 3,
                        title: 'أمن الشبكات',
                        videoUrl: 'https://www.youtube.com/watch?v=qiQR5rTSshw',
                        duration: '20:00',
                        description: 'حماية الشبكات من الهجمات والاختراقات.',
                        summary: [
                            'أنواع الجدران النارية (Firewalls).',
                            'أنظمة كشف ومنع التسلل (IDS/IPS).',
                            'الشبكات الخاصة الافتراضية (VPN).',
                            'تقسيم الشبكات (Network Segmentation).',
                            'مراقبة حركة المرور وتحليلها.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'Firewall يُستخدم لـ:', options: ['تسريع الشبكة', 'فحص وتصفية المرور', 'تخزين البيانات', 'تشفير الملفات'], correct: 1, explanation: 'الجدار الناري يفحص ويصفّي حزم المرور.' },
                            { type: 'tf', question: 'IDS يكتشف التهديدات بينما IPS يمنعها.', options: ['صح', 'خطأ'], correct: 0, explanation: 'IDS للكشف، IPS للكشف والمنع.' },
                            { type: 'mcq', question: 'VPN يوفر:', options: ['اتصال مشفر عبر شبكة عامة', 'تسريع الإنترنت', 'تخزين سحابي', 'حماية من الفيروسات'], correct: 0, explanation: 'VPN يُنشئ نفقاً مشفراً.' },
                            { type: 'mcq', question: 'Network Segmentation يهدف إلى:', options: ['دمج الشبكات', 'عزل الشبكات لتقليل الضرر', 'زيادة السرعة', 'حذف البيانات'], correct: 1, explanation: 'التقسيم يحد من انتشار الهجوم.' },
                            { type: 'tf', question: 'Wireshark أداة لتحليل حركة الشبكة.', options: ['صح', 'خطأ'], correct: 0, explanation: 'Wireshark packet analyzer شهير.' }
                        ]
                    },
                    {
                        id: 4,
                        title: 'الهجمات الشائعة وطرق الحماية',
                        videoUrl: 'https://www.youtube.com/watch?v=Dk-ZqQ-bfy4',
                        duration: '23:00',
                        description: 'التعرف على أشهر الهجمات السيبرانية وكيفية الوقاية منها.',
                        summary: [
                            'هجمات حجب الخدمة (DoS/DDoS).',
                            'حقن SQL (SQL Injection).',
                            'البرمجيات الخبيثة (Malware, Ransomware).',
                            'هجمات التصيد (Phishing).',
                            'استراتيجيات الحماية والدفاع.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'DDoS يهدف إلى:', options: ['سرقة البيانات', 'تعطيل الخدمة', 'تشفير الملفات', 'حذف النظام'], correct: 1, explanation: 'DDoS يُغرق الخادم بطلبات لتعطيله.' },
                            { type: 'tf', question: 'SQL Injection يستغل ثغرات في قواعد البيانات.', options: ['صح', 'خطأ'], correct: 0, explanation: 'SQL Injection يحقن أوامر SQL ضارة.' },
                            { type: 'mcq', question: 'Ransomware يقوم بـ:', options: ['حذف الملفات فوراً', 'تشفير الملفات وطلب فدية', 'تسريع النظام', 'تحديث البرامج'], correct: 1, explanation: 'Ransomware يشفّر البيانات ويطلب فدية.' },
                            { type: 'mcq', question: 'أفضل حماية من Phishing:', options: ['عدم فتح الروابط المشبوهة والتحقق من المرسل', 'تعطيل البريد', 'حذف كل الرسائل', 'عدم استخدام الإنترنت'], correct: 0, explanation: 'الوعي والتحقق من المصادر أساسي.' },
                            { type: 'tf', question: 'Antivirus يحمي من جميع أنواع الهجمات.', options: ['صح', 'خطأ'], correct: 1, explanation: 'Antivirus جزء من الحماية، لكن ليس كافياً وحده.' }
                        ]
                    },
                    {
                        id: 5,
                        title: 'إدارة الهويات والوصول',
                        videoUrl: 'https://www.youtube.com/watch?v=Tcvsefz5DmA',
                        duration: '18:30',
                        description: 'التحكم في الوصول وإدارة الهويات بشكل آمن.',
                        summary: [
                            'المصادقة متعددة العوامل (MFA).',
                            'إدارة كلمات المرور بشكل آمن.',
                            'التحكم في الوصول (Access Control).',
                            'مبدأ الصلاحيات الأقل (Least Privilege).',
                            'مراقبة وتدقيق الوصول.'
                        ],
                        completed: false,
                        quiz: [
                            { type: 'mcq', question: 'MFA تعني:', options: ['كلمة مرور واحدة', 'مصادقة متعددة العوامل', 'جدار ناري', 'تشفير'], correct: 1, explanation: 'MFA = Multi-Factor Authentication.' },
                            { type: 'tf', question: 'كلمات المرور القوية يجب أن تحتوي على أحرف ورموز وأرقام.', options: ['صح', 'خطأ'], correct: 0, explanation: 'التنوع يزيد قوة كلمة المرور.' },
                            { type: 'mcq', question: 'Least Privilege يعني:', options: ['إعطاء كل الصلاحيات', 'إعطاء الحد الأدنى من الصلاحيات', 'حذف كل الصلاحيات', 'مشاركة الصلاحيات'], correct: 1, explanation: 'منح أقل صلاحيات ضرورية فقط.' },
                            { type: 'mcq', question: 'أي مما يلي يُعتبر عامل مصادقة؟', options: ['كلمة مرور', 'بصمة', 'رمز SMS', 'جميع ما سبق'], correct: 3, explanation: 'العوامل تشمل: شيء تعرفه، تملكه، أنت عليه.' },
                            { type: 'tf', question: 'يجب تدقيق سجلات الوصول بانتظام.', options: ['صح', 'خطأ'], correct: 0, explanation: 'التدقيق يكشف الأنشطة المشبوهة.' }
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
