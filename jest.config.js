module.exports = {
  verbose: true,
  testEnvironment: 'node',
  // التجاهل المؤقت لاختبارات الواجهة حتى يتم تكوين محاكاة قاعدة البيانات بشكل صحيح
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  // تغطية الكود
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/scripts/**/*.js',
    '!**/node_modules/**'
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  // زمن انتهاء المهلة للاختبارات (10 ثوانٍ)
  testTimeout: 10000
};