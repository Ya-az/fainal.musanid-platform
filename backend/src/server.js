const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/database');

// تحميل متغيرات البيئة
dotenv.config();

// اتصال قاعدة البيانات
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// تضمين المسارات (Routes)
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const dashboardRoutes = require('./routes/dashboard');
const certificateRoutes = require('./routes/certificate');
const supportRoutes = require('./routes/support');
const settingsRoutes = require('./routes/settings');
const apiRoutes = require('./routes/api');

// استخدام المسارات
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/course', courseRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/certificate', certificateRoutes);
app.use('/support', supportRoutes);
app.use('/settings', settingsRoutes);
app.use('/api', apiRoutes);

// خدمة الملفات الثابتة
app.use(express.static(path.join(__dirname, '../public')));

// معالج الأخطاء
app.use((req, res, next) => {
  const error = new Error('الصفحة غير موجودة');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// تشغيل الخادم
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});

module.exports = app;