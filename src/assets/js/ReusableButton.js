// ReusableButton.js
// مكون زر قابل لإعادة الاستخدام في أي صفحة

/**
 * إنشاء زر قابل لإعادة الاستخدام
 * @param {Object} options - خيارات الزر
 * @param {string} options.text - نص الزر
 * @param {string} [options.type] - نوع الزر (button, submit, reset)
 * @param {string[]} [options.classes] - كلاسات إضافية
 * @param {string} [options.icon] - HTML أيقونة (اختياري)
 * @param {function} [options.onClick] - حدث الضغط
 * @returns {HTMLButtonElement}
 */
function createButton({ text, type = 'button', classes = [], icon = '', onClick = null }) {
    const btn = document.createElement('button');
    btn.type = type;
    btn.className = ['btn', ...classes].join(' ');
    btn.innerHTML = icon ? `${icon}<span>${text}</span>` : text;
    if (typeof onClick === 'function') {
        btn.addEventListener('click', onClick);
    }
    return btn;
}

// مثال استخدام:
// const myBtn = createButton({
//   text: 'حفظ',
//   classes: ['btn-primary', 'w-full'],
//   icon: '<svg ...></svg>',
//   onClick: () => alert('تم الحفظ!')
// });
// document.body.appendChild(myBtn);

// تصدير الدالة للاستخدام في ملفات أخرى
window.createButton = createButton;
