/**
 * @jest-environment node
 */

const { redirectMap } = require('../src/scripts/check_legacy_redirects');

describe('اختبار تحويلات الروابط القديمة', () => {
  test('يجب أن تحول الروابط القديمة بشكل صحيح', () => {
    // التأكد من أن التحويلات الأساسية موجودة
    expect(redirectMap).toHaveProperty('/index.html');
    expect(redirectMap).toHaveProperty('/about.html');
    expect(redirectMap).toHaveProperty('/faq.html');
    
    // التأكد من أن التحويلات تتم إلى المسارات الصحيحة
    expect(redirectMap['/index.html']).toBe('/');
    expect(redirectMap['/about.html']).toBe('/about');
    expect(redirectMap['/faq.html']).toBe('/faq');
  });
});