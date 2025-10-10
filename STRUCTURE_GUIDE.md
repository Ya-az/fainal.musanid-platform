# 📐 دليل البنية الجديدة - منصة مساند التعليمية

## 🗂️ شرح تفصيلي للمجلدات

### 📂 `backend/` - تطبيق الخادم Node.js
```
backend/
├── src/                 # مصدر التطبيق
│   ├── app.js          # ملف التطبيق الرئيسي
│   ├── config/         # إعدادات قاعدة البيانات
│   ├── middleware/     # طبقات الوسطاء
│   ├── models/         # نماذج البيانات
│   ├── routes/         # مسارات API
│   └── views/          # قوالب EJS
├── tests/              # اختبارات الخادم
├── scripts/            # سكربتات الصيانة
├── dist/               # الملفات المبنية
└── package.json        # اعتماديات الخادم
```

### 📂 `frontend/` - الواجهة الأمامية  
```
frontend/
├── assets/             # الأصول الثابتة
│   ├── css/           # ملفات التنسيق
│   ├── js/            # ملفات JavaScript
│   └── img/           # الصور والأيقونات
├── pages/             # صفحات HTML
├── components/        # مكونات قابلة للإعادة الاستخدام
├── manifest.json      # ملف تطبيق الويب التقدمي
└── package.json       # اعتماديات الواجهة الأمامية
```

### 📂 `shared/` - الموارد المشتركة
```
shared/
├── configs/           # ملفات التكوين
│   ├── tailwind.config.js
│   ├── jest.config.js
│   └── .eslintrc.json
├── assets/            # أصول مشتركة
└── utils/             # وظائف مساعدة مشتركة
```

### 📂 `docs/` - التوثيق
```
docs/
├── api/               # توثيق API
├── guides/            # أدلة المطور
│   ├── CONTRIBUTING.md
│   └── DEPLOYMENT.md
└── reports/           # تقارير المشروع
    ├── CODE_AUDIT_REPORT.md
    └── PERFORMANCE_REPORT.md
```

### 📂 `tools/` - أدوات التطوير
```
tools/
├── build/             # سكربتات البناء
├── deploy/            # سكربتات النشر
└── generators/        # مولدات الكود
```

### 📂 `tests/` - اختبارات شاملة
```
tests/
├── unit/              # اختبارات الوحدة
├── integration/       # اختبارات التكامل
└── e2e/               # اختبارات النهاية للنهاية
```

### 📂 `artifacts/` - المخرجات المؤقتة
```
artifacts/
├── coverage/          # تقارير تغطية الكود
├── logs/              # ملفات السجل
└── temp/              # ملفات مؤقتة
```

## 🔄 أوامر النقل المقترحة

### أوامر Windows PowerShell:
```powershell
# تشغيل سكربت إعادة الهيكلة
.\Restructure-Project.ps1

# أو نقل يدوي:
# نقل الخادم
Move-Item src backend/src
Move-Item tests backend/tests

# نقل الواجهة الأمامية  
Move-Item docs frontend/pages
Move-Item public/* frontend/

# نقل التوثيق
Move-Item documentation/* docs/
```

### أوامر Linux/Mac:
```bash
# إنشاء البنية
mkdir -p backend/{src,tests,scripts,dist}
mkdir -p frontend/{assets/{css,js,img},pages,components}
mkdir -p shared/{configs,assets,utils}
mkdir -p docs/{api,guides,reports}
mkdir -p tools/{build,deploy,generators}
mkdir -p tests/{unit,integration,e2e}
mkdir -p artifacts/{coverage,logs,temp}

# نقل الملفات
mv src/* backend/src/
mv tests/* backend/tests/
mv docs/* frontend/pages/
mv public/* frontend/
```

## ⚙️ تحديث ملفات التكوين

### `backend/package.json` (محدث):
```json
{
  "name": "musanid-backend",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest tests/",
    "build:css": "tailwindcss -i ../shared/assets/css/input.css -o ../frontend/assets/css/styles.css"
  }
}
```

### `frontend/package.json` (جديد):
```json
{
  "name": "musanid-frontend", 
  "scripts": {
    "dev": "live-server pages/",
    "build": "npm run build:css",
    "build:css": "tailwindcss -i assets/css/input.css -o assets/css/styles.css --minify"
  }
}
```

## 🔧 إعدادات IDE

### VS Code settings.json:
```json
{
  "search.exclude": {
    "**/node_modules": true,
    "**/artifacts": true,
    "**/backup_*": true
  },
  "files.associations": {
    "*.ejs": "html"
  }
}
```

## 🚨 تحذيرات مهمة

1. **📋 اعمل نسخة احتياطية كاملة قبل البدء**
2. **🔍 اختبر التطبيق بعد كل خطوة نقل**  
3. **📝 حدث مراجع الملفات في الكود**
4. **🔄 حدث GitHub Actions workflows**
5. **🗑️ لا تحذف المجلدات القديمة إلا بعد التأكد**

## ✅ قائمة التحقق

- [ ] تشغيل سكربت إعادة الهيكلة
- [ ] اختبار الخادم في المسار الجديد  
- [ ] اختبار الواجهة الأمامية
- [ ] تحديث مراجع import/require
- [ ] تحديث GitHub Actions
- [ ] تحديث التوثيق
- [ ] إزالة المجلدات القديمة
- [ ] دفع التغييرات لـ Git

---
*دليل إعادة الهيكلة - 11 أكتوبر 2025*