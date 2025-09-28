// تكوين قاعدة البيانات
const dbConfig = {
  url: process.env.MONGODB_URI || 'mongodb://localhost:27017/musanid',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};

// تكوين الأمان
const securityConfig = {
  jwtSecret: process.env.JWT_SECRET || 'musanid_secret_key',
  jwtExpiresIn: '1d'
};

// تكوين الخادم
const serverConfig = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development'
};

// تكوين CORS
const corsConfig = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
};

module.exports = {
  db: dbConfig,
  security: securityConfig,
  server: serverConfig,
  cors: corsConfig
};