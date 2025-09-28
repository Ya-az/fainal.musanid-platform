# حل مشكلة الشاشة البيضاء في موقع مساند التعليمي

# تنظيف التثبيت السابق (إذا وجد)
Write-Host "جاري تنظيف التثبيت السابق..." -ForegroundColor Yellow

# حذف ملفات node_modules لضمان نظافة التثبيت
if (Test-Path -Path ".\frontend\node_modules") {
    Write-Host "حذف node_modules من المجلد frontend..." -ForegroundColor Yellow
    Remove-Item -Path ".\frontend\node_modules" -Recurse -Force
}

if (Test-Path -Path ".\backend\node_modules") {
    Write-Host "حذف node_modules من المجلد backend..." -ForegroundColor Yellow
    Remove-Item -Path ".\backend\node_modules" -Recurse -Force
}

# إنشاء ملفات التكوين اللازمة في frontend
Write-Host "إنشاء ملفات التكوين في frontend..." -ForegroundColor Green

# إنشاء ملف .env في frontend
$frontendEnvContent = @"
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_DEBUG=true
"@
Set-Content -Path ".\frontend\.env" -Value $frontendEnvContent

# تثبيت اعتماديات الخادم الخلفي
Set-Location -Path .\backend
Write-Host "تثبيت اعتماديات الخادم الخلفي..." -ForegroundColor Green
npm install --no-fund

# تشغيل الخادم الخلفي في نافذة PowerShell جديدة
Write-Host "تشغيل الخادم الخلفي..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location -Path '$PWD'; npm run dev"

# العودة للمجلد الرئيسي
Set-Location -Path ..

# تثبيت اعتماديات الواجهة الأمامية
Set-Location -Path .\frontend
Write-Host "تثبيت اعتماديات الواجهة الأمامية..." -ForegroundColor Green
npm install --no-fund

# تشغيل الواجهة الأمامية
Write-Host "تشغيل الواجهة الأمامية..." -ForegroundColor Green
Write-Host "بمجرد اكتمال التشغيل، يمكنك الوصول إلى الموقع على http://localhost:3000" -ForegroundColor Cyan

Write-Host "للتأكد من أن الخادم يعمل بشكل صحيح، يمكنك الوصول إلى صفحة الاختبار على http://localhost:3000/test.html" -ForegroundColor Magenta

npm start