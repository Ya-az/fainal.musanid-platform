/**
 * اختبارات لنموذج Lesson
 */

const Lesson = require('../src/models/Lesson');

// محاكاة اتصال قاعدة البيانات
jest.mock('../src/config/database', () => ({
  query: jest.fn(),
  getConnection: jest.fn().mockImplementation(() => Promise.resolve({
    query: jest.fn(),
    release: jest.fn()
  }))
}));

describe('نموذج الدروس', () => {
  beforeEach(() => {
    // إعادة تعيين المحاكاة قبل كل اختبار
    jest.resetAllMocks();
  });

  test('التأكد من وجود طريقة findAll', () => {
    expect(typeof Lesson.findAll).toBe('function');
  });

  test('التأكد من وجود طريقة findBySlug', () => {
    expect(typeof Lesson.findBySlug).toBe('function');
  });

  // اختبار سلوك الأخطاء
  test('يجب أن ترفض الوعد عند حدوث خطأ في قاعدة البيانات', async () => {
    const db = require('../src/config/database');
    db.query.mockRejectedValue(new Error('خطأ في قاعدة البيانات'));

    await expect(Lesson.findAll()).rejects.toThrow('خطأ في قاعدة البيانات');
  });
});

/**
 * اختبارات لنموذج Progress
 */

const Progress = require('../src/models/Progress');

describe('نموذج التقدم', () => {
  test('التأكد من وجود طريقة getUserProgress', () => {
    expect(typeof Progress.getUserProgress).toBe('function');
  });

  test('التأكد من وجود طريقة markCompleted', () => {
    expect(typeof Progress.markCompleted).toBe('function');
  });

  test('التأكد من وجود طريقة markIncomplete', () => {
    expect(typeof Progress.markIncomplete).toBe('function');
  });
});

/**
 * اختبارات لنموذج Favorite
 */

const Favorite = require('../src/models/Favorite');

describe('نموذج المفضلة', () => {
  test('التأكد من وجود طريقة getUserFavorites', () => {
    expect(typeof Favorite.getUserFavorites).toBe('function');
  });

  test('التأكد من وجود طريقة addFavorite', () => {
    expect(typeof Favorite.addFavorite).toBe('function');
  });

  test('التأكد من وجود طريقة removeFavorite', () => {
    expect(typeof Favorite.removeFavorite).toBe('function');
  });
});