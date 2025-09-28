#!/bin/bash
# سكريبت لإزالة جميع الملفات خارج مجلد all-website-files
# ولاستخدام مجلد all-website-files كمجلد المشروع الرئيسي

# حذف الملفات الرئيسية غير المطلوبة
echo -e "\033[33mجاري حذف الملفات غير الضرورية خارج مجلد all-website-files...\033[0m"

# الملفات التي سيتم حذفها
files_to_delete=(
    "about-musanid.html"
    "faq.html"
    "index.html"
    "package.json"
    "tailwind.config.js"
    ".env"
    ".env.example"
    ".eslintrc.json"
    "IMPROVEMENTS.md"
    "README.md"
)

for file in "${files_to_delete[@]}"; do
    if [ -f "$file" ]; then
        rm -f "$file"
        echo -e "\033[32mتم حذف: $file\033[0m"
    else
        echo -e "\033[90mالملف غير موجود: $file\033[0m"
    fi
done

# المجلدات التي سيتم حذفها
folders_to_delete=(
    "client"
    "server"
    "public"
    "src"
    "dashboard"
    "support"
)

for folder in "${folders_to_delete[@]}"; do
    if [ -d "$folder" ]; then
        rm -rf "$folder"
        echo -e "\033[32mتم حذف المجلد: $folder\033[0m"
    else
        echo -e "\033[90mالمجلد غير موجود: $folder\033[0m"
    fi
done

echo ""
echo -e "\033[32mاكتملت عملية التنظيف!\033[0m"
echo -e "\033[36mالمشروع الآن موجود بالكامل في مجلد 'all-website-files'\033[0m"
echo ""
echo -e "\033[33mلتشغيل المشروع:\033[0m"
echo "cd all-website-files"
echo "./start.sh"