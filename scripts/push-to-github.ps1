# سكربت دفع التغييرات إلى GitHub
Write-Host "دفع التغييرات إلى GitHub..." -ForegroundColor Green

# التحقق من الحالة الحالية
Write-Host "فحص حالة Git..." -ForegroundColor Yellow
git status

# دفع التغييرات
Write-Host "دفع التغييرات إلى المستودع البعيد..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "تم دفع التغييرات بنجاح!" -ForegroundColor Green
    Write-Host "يمكنك الآن العمل من أي جهاز آخر عبر استنساخ المستودع:" -ForegroundColor Cyan
    Write-Host "git clone https://github.com/ipaddana10-debug/musanid-platform.git" -ForegroundColor White
} else {
    Write-Host "حدث خطأ أثناء دفع التغييرات. يرجى المحاولة يدوياً." -ForegroundColor Red
}

# عرض آخر 3 commits
Write-Host "`nآخر التغييرات:" -ForegroundColor Cyan
git log --oneline -3

Write-Host "`nاضغط أي مفتاح للمتابعة..." -ForegroundColor Gray
Read-Host