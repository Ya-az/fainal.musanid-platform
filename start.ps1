# تشغيل موقع Modern Website

# تثبيت اعتماديات الخادم الخلفي
Set-Location -Path .\backend
Write-Host "تثبيت اعتماديات الخادم الخلفي..."
npm install

# تشغيل الخادم الخلفي في نافذة PowerShell جديدة
Write-Host "تشغيل الخادم الخلفي..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location -Path '$PWD'; npm run dev"

# العودة للمجلد الرئيسي
Set-Location -Path ..

# تثبيت اعتماديات الواجهة الأمامية
Set-Location -Path .\frontend
Write-Host "تثبيت اعتماديات الواجهة الأمامية..."
npm install

# تشغيل الواجهة الأمامية
Write-Host "تشغيل الواجهة الأمامية..."
Write-Host "بمجرد اكتمال التشغيل، يمكنك الوصول إلى الموقع على http://localhost:3000"
npm start