import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// محاولة إصلاح مشكلة الشاشة البيضاء
console.log('تحميل منصة مساند التعليمية...');

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  // تأكد من وجود عنصر الجذر
  if (!document.getElementById('root')) {
    console.error('لم يتم العثور على عنصر بمعرف "root"');
    document.body.innerHTML = '<div style="text-align:center;padding:50px;direction:rtl"><h1>حدث خطأ</h1><p>لم يتم العثور على عنصر الجذر. يرجى مراجعة ملف index.html</p></div>';
  } else {
    // عرض التطبيق
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('تم تحميل التطبيق بنجاح!');
    
    // إخفاء شاشة التحميل
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      setTimeout(() => {
        loadingElement.style.display = 'none';
      }, 1000);
    }
  }
} catch (error) {
  console.error('حدث خطأ أثناء تحميل التطبيق:', error);
  
  // عرض رسالة خطأ للمستخدم
  document.body.innerHTML = `
    <div style="text-align:center;padding:50px;direction:rtl">
      <h1>عفواً، حدث خطأ</h1>
      <p>لم نتمكن من تحميل التطبيق. يرجى المحاولة مرة أخرى أو الاتصال بالدعم الفني.</p>
      <p>تفاصيل الخطأ: ${error.message}</p>
    </div>
  `;
}