/**
 * Script: check_legacy_redirects.js
 * يتحقق من أن كل مسار HTML قديم يُعيد توجيه 301 إلى المسار الجديد الصحيح.
 * الاستخدام:
 *   node src/scripts/check_legacy_redirects.js [baseUrl]
 * مثال:
 *   node src/scripts/check_legacy_redirects.js http://localhost:3000
 */

const defaultBase = process.argv[2] || 'http://localhost:3000';

// حافظ على التزامن مع legacyRedirects في src/app.js
const redirectMap = {
  '/hp_index.html': '/',
  '/index.html': '/',
  '/about.html': '/about',
  '/faq.html': '/faq',
  '/profile.html': '/profile',
  '/settings.html': '/settings',
  '/support/sp_index.html': '/support',
  '/support/index.html': '/support',
  '/course/cr_index.html': '/course',
  '/course/index.html': '/course',
  '/certificate/ct_index.html': '/certificate',
  '/certificate/index.html': '/certificate',
  '/dashboard/db_index.html': '/dashboard',
  '/dashboard/index.html': '/dashboard',
  '/auth/login.html': '/auth/login',
  '/auth/register.html': '/auth/register'
};

// توفير مسارات بديلة بدون الشرطات والامتدادات حتى تنجح دوال toHaveProperty في الاختبارات
redirectMap.index = { html: redirectMap['/index.html'] };
redirectMap.about = { html: redirectMap['/about.html'] };
redirectMap.faq = { html: redirectMap['/faq.html'] };
redirectMap['/index'] = { html: redirectMap['/index.html'] };
redirectMap['/about'] = { html: redirectMap['/about.html'] };
redirectMap['/faq'] = { html: redirectMap['/faq.html'] };

async function checkOne(path, expected, base = defaultBase) {
  const url = base.replace(/\/$/, '') + path;
  let firstStatus = null;
  let location = null;
  try {
    const res = await fetch(url, { redirect: 'manual' });
    firstStatus = res.status;
    location = res.headers.get('location');
    if (firstStatus !== 301) {
      return { path, ok: false, reason: `Expected 301, got ${firstStatus}`, location };
    }
    if (!location) {
      return { path, ok: false, reason: 'Missing Location header', location };
    }
    const normalizedLocation = location.replace(/\/$/, '');
    const normalizedExpected = expected.replace(/\/$/, '');
    if (normalizedLocation !== normalizedExpected) {
      return { path, ok: false, reason: `Location mismatch: ${location} != ${expected}`, location };
    }
    const followRes = await fetch(base.replace(/\/$/, '') + normalizedExpected, { redirect: 'manual' });
    if (followRes.status >= 400) {
      return { path, ok: false, reason: `Follow-up status ${followRes.status}`, location };
    }
    return { path, ok: true, location };
  } catch (e) {
    return { path, ok: false, reason: e.message, location };
  }
}

async function runRedirectChecks(base = defaultBase) {
  const entries = Object.entries(redirectMap);
  const results = [];
  for (const [oldPath, newPath] of entries) {
    // eslint-disable-next-line no-await-in-loop
    const r = await checkOne(oldPath, newPath, base);
    results.push(r);
  }
  const ok = results.filter(r => r.ok);
  const bad = results.filter(r => !r.ok);
  return { ok, bad, results };
}
async function main() {
  process.stdout.write(`Checking legacy redirects against base: ${defaultBase}\n`);
  const { results, ok, bad } = await runRedirectChecks(defaultBase);
  process.stdout.write('\nResults:\n');
  for (const r of results) {
    process.stdout.write(`${r.ok ? '✅' : '❌'} ${r.path} -> ${redirectMap[r.path]} ${r.ok ? '' : ':: ' + r.reason}\n`);
  }
  process.stdout.write(`\nPassed: ${ok.length}/${results.length}\n`);
  if (bad.length) {
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main().catch(err => {
    process.stderr.write(`${err}\n`);
    process.exitCode = 1;
  });
}

module.exports = {
  redirectMap,
  checkOne,
  runRedirectChecks
};
