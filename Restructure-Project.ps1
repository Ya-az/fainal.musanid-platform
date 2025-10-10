# 🚀 سكربت إعادة هيكلة مشروع مساند
# تاريخ: 11 أكتوبر 2025
# ⚠️ تأكد من عمل نسخة احتياطية قبل التنفيذ!

Write-Host "🚀 بدء إعادة هيكلة مشروع مساند..." -ForegroundColor Green

# التحقق من وجود git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git غير مثبت. يرجى تثبيت Git أولاً." -ForegroundColor Red
    exit 1
}

# إنشاء نسخة احتياطية
Write-Host "📦 إنشاء نسخة احتياطية..." -ForegroundColor Yellow
$backupDir = "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force
Copy-Item -Path "." -Destination $backupDir -Recurse -Exclude @(".git", "node_modules", "coverage", "temp")

Write-Host "✅ تم إنشاء نسخة احتياطية في: $backupDir" -ForegroundColor Green

# المرحلة 1: إنشاء البنية الجديدة
Write-Host "📁 إنشاء البنية الجديدة..." -ForegroundColor Cyan

$directories = @(
    "backend",
    "backend/src", 
    "backend/tests",
    "backend/scripts", 
    "backend/dist",
    "frontend",
    "frontend/assets",
    "frontend/assets/css",
    "frontend/assets/js", 
    "frontend/assets/img",
    "frontend/pages",
    "frontend/components",
    "shared",
    "shared/configs",
    "shared/assets", 
    "shared/utils",
    "docs-new",
    "docs-new/api",
    "docs-new/guides",
    "docs-new/reports", 
    "tools",
    "tools/build",
    "tools/deploy",
    "tools/generators",
    "tests-new",
    "tests-new/unit",
    "tests-new/integration", 
    "tests-new/e2e",
    "artifacts",
    "artifacts/coverage",
    "artifacts/logs",
    "artifacts/temp"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    Write-Host "  ✓ $dir" -ForegroundColor Green
}

# المرحلة 2: نقل ملفات الخادم
Write-Host "🔄 نقل ملفات الخادم..." -ForegroundColor Cyan

if (Test-Path "src") {
    Copy-Item -Path "src/*" -Destination "backend/src/" -Recurse -Force
    Write-Host "  ✓ نقل src/ إلى backend/src/" -ForegroundColor Green
}

if (Test-Path "tests") {
    Copy-Item -Path "tests/*" -Destination "backend/tests/" -Recurse -Force  
    Write-Host "  ✓ نقل tests/ إلى backend/tests/" -ForegroundColor Green
}

if (Test-Path "scripts") {
    Copy-Item -Path "scripts/*" -Destination "backend/scripts/" -Recurse -Force
    Write-Host "  ✓ نقل scripts/ إلى backend/scripts/" -ForegroundColor Green
}

# المرحلة 3: نقل الواجهة الأمامية
Write-Host "🎨 نقل ملفات الواجهة الأمامية..." -ForegroundColor Cyan

if (Test-Path "docs") {
    Copy-Item -Path "docs/*" -Destination "frontend/pages/" -Recurse -Force
    Write-Host "  ✓ نقل docs/ إلى frontend/pages/" -ForegroundColor Green
}

if (Test-Path "public") {
    Copy-Item -Path "public/*" -Destination "frontend/" -Recurse -Force
    Write-Host "  ✓ نقل public/ إلى frontend/" -ForegroundColor Green
}

# تنظيم أصول الواجهة الأمامية
if (Test-Path "frontend/css") {
    Move-Item -Path "frontend/css" -Destination "frontend/assets/css" -Force
    Write-Host "  ✓ نقل CSS إلى assets/css/" -ForegroundColor Green
}

if (Test-Path "frontend/js") {
    Move-Item -Path "frontend/js" -Destination "frontend/assets/js" -Force  
    Write-Host "  ✓ نقل JS إلى assets/js/" -ForegroundColor Green
}

if (Test-Path "frontend/img") {
    Move-Item -Path "frontend/img" -Destination "frontend/assets/img" -Force
    Write-Host "  ✓ نقل IMG إلى assets/img/" -ForegroundColor Green
}

# المرحلة 4: نقل التكوينات المشتركة
Write-Host "⚙️ نقل ملفات التكوين..." -ForegroundColor Cyan

$configFiles = @(
    "tailwind.config.js",
    "jest.config.js", 
    ".eslintrc.json",
    ".prettierrc",
    ".editorconfig"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Copy-Item -Path $file -Destination "shared/configs/" -Force
        Write-Host "  ✓ نقل $file إلى shared/configs/" -ForegroundColor Green
    }
}

# نقل package.json للخادم
if (Test-Path "package.json") {
    Copy-Item -Path "package.json" -Destination "backend/" -Force
    Write-Host "  ✓ نقل package.json إلى backend/" -ForegroundColor Green
}

# المرحلة 5: نقل التوثيق
Write-Host "📚 نقل ملفات التوثيق..." -ForegroundColor Cyan

if (Test-Path "documentation") {
    Copy-Item -Path "documentation/*" -Destination "docs-new/" -Recurse -Force
    Write-Host "  ✓ نقل documentation/ إلى docs-new/" -ForegroundColor Green
}

# نقل تقارير Markdown
$reportFiles = Get-ChildItem -Path "." -Filter "*.md" | Where-Object { $_.Name -ne "README.md" }
foreach ($file in $reportFiles) {
    Copy-Item -Path $file.FullName -Destination "docs-new/reports/" -Force
    Write-Host "  ✓ نقل $($file.Name) إلى docs-new/reports/" -ForegroundColor Green
}

# المرحلة 6: نقل المخرجات المؤقتة  
Write-Host "📊 نقل المخرجات المؤقتة..." -ForegroundColor Cyan

if (Test-Path "coverage") {
    Copy-Item -Path "coverage/*" -Destination "artifacts/coverage/" -Recurse -Force
    Write-Host "  ✓ نقل coverage/ إلى artifacts/coverage/" -ForegroundColor Green
}

if (Test-Path "temp") {
    Copy-Item -Path "temp/*" -Destination "artifacts/temp/" -Recurse -Force
    Write-Host "  ✓ نقل temp/ إلى artifacts/temp/" -ForegroundColor Green
}

# المرحلة 7: إنشاء ملفات جديدة
Write-Host "📝 إنشاء ملفات التكوين الجديدة..." -ForegroundColor Cyan

# إنشاء .gitignore محدث
$gitignoreContent = @"
# الاعتماديات
node_modules/
*/node_modules/

# المخرجات المؤقتة
artifacts/
backend/dist/
frontend/dist/

# متغيرات البيئة
.env
.env.local
.env.production

# ملفات النظام
.DS_Store
Thumbs.db
*.log

# ملفات المحرر
.vscode/
.idea/
*.swp
*.swo

# تقارير التغطية
coverage/
*.lcov

# نسخ احتياطية
backup_*/
"@

Set-Content -Path ".gitignore" -Value $gitignoreContent -Encoding UTF8
Write-Host "  ✓ تحديث .gitignore" -ForegroundColor Green

# إنشاء README.md جديد للمشروع
$readmeContent = @"
# 🎓 منصة مساند التعليمية

منصة تعليمية حديثة لتعلم التقنيات والبرمجة باللغة العربية.

## 📁 هيكل المشروع

```
├── 📂 backend/         # تطبيق Node.js الخلفي
├── 📂 frontend/        # الواجهة الأمامية  
├── 📂 shared/          # ملفات مشتركة
├── 📂 docs/           # التوثيق
├── 📂 tools/          # أدوات التطوير
├── 📂 tests/          # الاختبارات
└── 📂 artifacts/      # المخرجات المؤقتة
```

## 🚀 التشغيل السريع

### الخادم الخلفي
```bash
cd backend
npm install
npm start
```

### الواجهة الأمامية  
```bash
cd frontend
# فتح pages/index.html في المتصفح
```

## 🛠️ أوامر التطوير

| الأمر | الوصف |
|-------|--------|
| `npm run dev` | تشغيل وضع التطوير |
| `npm run build` | بناء المشروع للإنتاج |
| `npm run test` | تشغيل الاختبارات |
| `npm run lint` | فحص جودة الكود |

## 📚 التوثيق

- [دليل API](docs/api/)
- [أدلة المطور](docs/guides/)  
- [التقارير](docs/reports/)

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى قراءة [دليل المساهمة](docs/guides/CONTRIBUTING.md).

## 📄 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE).

---
*تم تحديث الهيكل: 11 أكتوبر 2025*
"@

Set-Content -Path "README.md" -Value $readmeContent -Encoding UTF8
Write-Host "  ✓ إنشاء README.md جديد" -ForegroundColor Green

# إنشاء package.json للواجهة الأمامية
$frontendPackageJson = @"
{
  "name": "musanid-frontend",
  "version": "1.0.0",
  "description": "الواجهة الأمامية لمنصة مساند التعليمية",
  "scripts": {
    "dev": "live-server pages/",
    "build": "npm run build:css",
    "build:css": "tailwindcss -i assets/css/input.css -o assets/css/styles.css --minify"
  },
  "devDependencies": {
    "live-server": "^1.2.2",
    "tailwindcss": "^3.4.0"
  }
}
"@

Set-Content -Path "frontend/package.json" -Value $frontendPackageJson -Encoding UTF8
Write-Host "  ✓ إنشاء frontend/package.json" -ForegroundColor Green

Write-Host "`n🎉 تمت إعادة الهيكلة بنجاح!" -ForegroundColor Green
Write-Host "📋 الخطوات التالية:" -ForegroundColor Yellow
Write-Host "  1. تحقق من البنية الجديدة" -ForegroundColor White
Write-Host "  2. اختبر التطبيق في البيئة الجديدة" -ForegroundColor White  
Write-Host "  3. حدث مراجع الملفات إذا لزم الأمر" -ForegroundColor White
Write-Host "  4. احذف المجلدات القديمة بعد التأكد من العمل" -ForegroundColor White
Write-Host "  5. ادفع التغييرات إلى Git" -ForegroundColor White

Write-Host "`n💾 النسخة الاحتياطية محفوظة في: $backupDir" -ForegroundColor Cyan