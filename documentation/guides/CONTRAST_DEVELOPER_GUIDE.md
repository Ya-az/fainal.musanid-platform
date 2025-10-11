# مرشد التباين للمطورين - منصة مسانيد التعليمية

## 🎨 استخدام النظام التلقائي للتباين

### 1. للخلفيات البنفسجية الداكنة
```css
.my-element {
    background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%);
    color: var(--dynamic-text-primary); /* نص أبيض تلقائي */
}
```

### 2. للخلفيات البنفسجية الفاتحة
```css
.my-element {
    background: linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%);
    color: var(--dynamic-text-secondary); /* نص أسود تلقائي */
}
```

### 3. للخلفيات البنفسجية المتوسطة
```css
.my-element {
    background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
    color: var(--dynamic-text-accent); /* نص متكيف */
}
```

## ⚠️ ما يجب تجنبه

### ❌ لا تستخدم ألوان نص محددة
```css
/* خطأ - ألوان محددة */
.bad-example {
    background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%);
    color: #fff; /* ❌ لون محدد */
    color: white; /* ❌ لون محدد */
    color: #000; /* ❌ لون محدد */
}
```

### ✅ استخدم النظام التلقائي
```css
/* صحيح - نظام تلقائي */
.good-example {
    background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%);
    color: var(--dynamic-text-primary); /* ✅ نظام تلقائي */
}
```

## 🔧 المتغيرات المتاحة

### متغيرات التباين الأساسية
```css
:root {
    --text-on-primary: #FFFFFF;     /* أبيض للخلفيات الداكنة */
    --text-on-secondary: #000000;   /* أسود للخلفيات الفاتحة */
    --text-on-accent: #000000;      /* أسود للخلفيات المتوسطة */
}
```

### متغيرات التطبيق الديناميكي
```css
:root {
    --dynamic-text-primary: var(--text-on-primary);
    --dynamic-text-secondary: var(--text-on-secondary);
    --dynamic-text-accent: var(--text-on-accent);
}
```

## 🎨 كلاسات مساعدة

### للاستخدام المباشر
```html
<!-- للخلفيات الداكنة -->
<div class="purple-bg-auto-text">نص أبيض تلقائي</div>

<!-- للخلفيات الفاتحة -->
<div class="purple-bg-light-auto-text">نص أسود تلقائي</div>

<!-- للخلفيات المتوسطة -->
<div class="purple-bg-accent-auto-text">نص متكيف تلقائي</div>
```

### كلاسات التباين العامة
```html
<!-- تطبيق مباشر -->
<div class="text-auto-contrast-primary">نص بتباين أساسي</div>
<div class="text-auto-contrast-secondary">نص بتباين ثانوي</div>
<div class="text-auto-contrast-accent">نص بتباين مميز</div>
```

## 🛡️ الحماية التلقائية

النظام يحمي تلقائيًا العناصر التالية:

### 1. الأنماط المضمنة (Inline Styles)
```html
<!-- محمي تلقائيًا -->
<div style="background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)">
    نص محمي تلقائيًا
</div>
```

### 2. العناصر الديناميكية
```javascript
// محمي تلقائيًا حتى لو أُنشئ بـ JavaScript
element.style.background = 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)';
```

### 3. النوافذ المنبثقة والواجهات الجانبية
```html
<!-- محمي تلقائيًا -->
<div class="modal" style="background: #7C3AED">محتوى محمي</div>
<div class="sidebar" style="background: linear-gradient(135deg, #7C3AED, #8B5CF6)">محتوى محمي</div>
```

## 📱 اختبار التباين

### 1. ملف الاختبار
استخدم `docs/test-contrast.html` لاختبار جميع التحسينات.

### 2. فحص مرئي
- تأكد من وضوح النص على جميع الخلفيات البنفسجية
- اختبر في ظروف إضاءة مختلفة
- تحقق من إمكانية الوصول

### 3. أدوات المطورين
```javascript
// فحص التباين في وقت التشغيل
const element = document.querySelector('.my-element');
const computedStyle = getComputedStyle(element);
console.log('Background:', computedStyle.background);
console.log('Color:', computedStyle.color);
```

## 🌟 أمثلة عملية

### بطاقة دورة تدريبية
```html
<div class="course-card">
    <div class="course-card__header" style="background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)">
        <h3>عنوان الدورة</h3> <!-- نص أبيض تلقائيًا -->
        <p>وصف الدورة</p> <!-- نص أبيض تلقائيًا -->
    </div>
</div>
```

### قسم Hero
```html
<section class="hero" style="background: linear-gradient(120deg, #7C3AED 0%, #8B5CF6 45%, #A78BFA 100%)">
    <h1>عنوان رئيسي</h1> <!-- نص أبيض تلقائيًا -->
    <p>نص فرعي</p> <!-- نص أبيض تلقائيًا -->
</section>
```

### زر تفاعلي
```html
<button class="btn btn-primary">
    نص الزر <!-- نص أبيض تلقائيًا -->
</button>
```

## 🔗 موارد إضافية

- [دليل WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [أدوات فحص التباين](https://webaim.org/resources/contrastchecker/)
- [إرشادات إمكانية الوصول](https://www.w3.org/WAI/fundamentals/accessibility-intro/)

---

**ملاحظة**: هذا النظام يضمن الامتثال التلقائي لمعايير WCAG 2.1 ويوفر تجربة مستخدم ممتازة لجميع المستخدمين.