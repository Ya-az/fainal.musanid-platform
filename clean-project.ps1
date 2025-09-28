# سكريبت لإزالة جميع الملفات خارج مجلد all-website-files
# ولاستخدام مجلد all-website-files كمجلد المشروع الرئيسي

# حذف الملفات الرئيسية غير المطلوبة
Write-Host "جاري حذف الملفات غير الضرورية خارج مجلد all-website-files..." -ForegroundColor Yellow

# الملفات التي سيتم حذفها
$filesToDelete = @(
    "about-musanid.html",
    "faq.html",
    "index.html",
    "package.json",
    "tailwind.config.js",
    ".env",
    ".env.example",
    ".eslintrc.json",
    "IMPROVEMENTS.md",
    "README.md"
)

foreach ($file in $filesToDelete) {
    $filePath = "c:\Users\Admin\musanidproject\$file"
    if (Test-Path -Path $filePath) {
        Remove-Item -Path $filePath -Force
        Write-Host "تم حذف: $file" -ForegroundColor Green
    } else {
        Write-Host "الملف غير موجود: $file" -ForegroundColor Gray
    }
}

# المجلدات التي سيتم حذفها
$foldersToDelete = @(
    "client",
    "server",
    "public",
    "src",
    "dashboard",
    "support",
    "modern-website",
    "tests"
)

foreach ($folder in $foldersToDelete) {
    $folderPath = "c:\Users\Admin\musanidproject\$folder"
    if (Test-Path -Path $folderPath) {
        Remove-Item -Path $folderPath -Recurse -Force
        Write-Host "تم حذف المجلد: $folder" -ForegroundColor Green
    } else {
        Write-Host "المجلد غير موجود: $folder" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "اكتملت عملية التنظيف!" -ForegroundColor Green
Write-Host "المشروع الآن موجود بالكامل في مجلد 'all-website-files'" -ForegroundColor Cyan
Write-Host ""
Write-Host "لتشغيل المشروع:" -ForegroundColor Yellow
Write-Host "cd all-website-files" -ForegroundColor White
Write-Host ".\start.ps1" -ForegroundColor White