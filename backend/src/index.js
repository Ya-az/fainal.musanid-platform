const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// استيراد التكوينات
const config = require('./config');
const { notFoundMiddleware, errorHandlerMiddleware } = require('./middleware/errorMiddleware');

// استيراد المسارات
const apiRoutes = require('./routes/api');

// إنشاء تطبيق Express
const app = express();

// الوسائط
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// تعريف المسارات
app.use('/api', apiRoutes);

// تقديم الملفات الثابتة في الإنتاج
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
  });
}

// وسائط معالجة الأخطاء
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// تكوين المنفذ والاستماع
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`الخادم يعمل في المنفذ ${PORT} في وضع ${config.server.env}`);
});

// تصدير التطبيق للاختبارات
module.exports = app;