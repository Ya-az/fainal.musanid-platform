// إعداد قاعدة البيانات
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// تحميل متغيرات البيئة
dotenv.config();

// اتصال قاعدة البيانات
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/musanid', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`تم الاتصال بقاعدة البيانات: ${conn.connection.host}`);
  } catch (error) {
    console.error(`خطأ في الاتصال بقاعدة البيانات: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;