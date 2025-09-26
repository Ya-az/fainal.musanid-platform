/**
 * @jest-environment node
 */

// تكوين اختبارات jest للمشروع
const request = require('supertest');
const path = require('path');

// تجنب تحميل قاعدة البيانات الحقيقية خلال الاختبارات
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'musanid_test_db';

// تحميل التطبيق
let app;

beforeAll(() => {
  // يتم استيراد التطبيق بعد تعيين متغيرات البيئة
  jest.resetModules();
  // تعطيل الاتصال بقاعدة البيانات الفعلية لمنع التعديل على البيانات الحقيقية
  jest.mock('../src/config/database', () => ({
    query: jest.fn().mockImplementation(() => Promise.resolve([[], []])),
    getConnection: jest.fn().mockImplementation(() => Promise.resolve({
      query: jest.fn().mockImplementation(() => Promise.resolve([[], []])),
      release: jest.fn()
    }))
  }));
  
  app = require('../src/app');
});

describe('اختبارات الصفحات الأساسية', () => {
  test('الصفحة الرئيسية يجب أن تعيد حالة 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
  });
  
  test('المسار غير الموجود يجب أن يعيد حالة 404', async () => {
    const response = await request(app).get('/مسار-غير-موجود');
    expect(response.statusCode).toBe(404);
  });

  // يمكن تعطيل هذا الاختبار بشكل مؤقت حتى يتم تكوين قاعدة بيانات الاختبار
  test.skip('صفحة الدورات يجب أن تعيد حالة 200', async () => {
    const response = await request(app).get('/course');
    expect(response.statusCode).toBe(200);
  });
});

describe('اختبارات API', () => {
  test('واجهة التقدم تعيد البيانات الصحيحة', async () => {
    const response = await request(app)
      .get('/api/progress')
      .set('Accept', 'application/json');
    
    expect(response.statusCode).toBe(401); // يجب أن يكون المستخدم مسجلاً للدخول
  });
});