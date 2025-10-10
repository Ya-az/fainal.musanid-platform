// توفير TextEncoder/TextDecoder لبيئة Jest عند الحاجة
const { TextEncoder, TextDecoder } = require('util');
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  });
}

// تأكد من أن supertest يقوم بترميز المسارات ذات المحارف غير اللاتينية تلقائياً أثناء الاختبارات
const Test = require('supertest/lib/test');
const originalServerAddress = Test.prototype.serverAddress;

Test.prototype.serverAddress = function patchedServerAddress(app, path) {
  let resultingPath = path;
  if (typeof resultingPath === 'string') {
    const alreadyEncoded = /%[0-9A-Fa-f]{2}/.test(resultingPath);
    if (!alreadyEncoded) {
      resultingPath = encodeURI(resultingPath);
    }
  }
  return originalServerAddress.call(this, app, resultingPath);
};
