#!/bin/bash
# حل مشكلة الشاشة البيضاء في موقع مساند التعليمي

# تنظيف التثبيت السابق (إذا وجد)
echo "جاري تنظيف التثبيت السابق..."

# حذف ملفات node_modules لضمان نظافة التثبيت
if [ -d "./frontend/node_modules" ]; then
    echo "حذف node_modules من المجلد frontend..."
    rm -rf ./frontend/node_modules
fi

if [ -d "./backend/node_modules" ]; then
    echo "حذف node_modules من المجلد backend..."
    rm -rf ./backend/node_modules
fi

# إنشاء ملفات التكوين اللازمة في frontend
echo "إنشاء ملفات التكوين في frontend..."

# إنشاء ملف .env في frontend
cat > ./frontend/.env << EOL
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_DEBUG=true
EOL

# تثبيت اعتماديات الخادم الخلفي
cd backend
echo "تثبيت اعتماديات الخادم الخلفي..."
npm install --no-fund

# تشغيل الخادم الخلفي في نافذة طرفية جديدة
echo "تشغيل الخادم الخلفي..."
gnome-terminal -- bash -c "cd $PWD && npm run dev" || xterm -e "cd $PWD && npm run dev" || open -a Terminal "cd $PWD && npm run dev" &

# العودة للمجلد الرئيسي
cd ..

# تثبيت اعتماديات الواجهة الأمامية
cd frontend
echo "تثبيت اعتماديات الواجهة الأمامية..."
npm install --no-fund

# تشغيل الواجهة الأمامية
echo "تشغيل الواجهة الأمامية..."
echo "بمجرد اكتمال التشغيل، يمكنك الوصول إلى الموقع على http://localhost:3000"
echo "للتأكد من أن الخادم يعمل بشكل صحيح، يمكنك الوصول إلى صفحة الاختبار على http://localhost:3000/test.html"

npm start