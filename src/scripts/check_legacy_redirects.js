/**
 * Script: check_legacy_redirects.js
 * يتحقق من أن كل مسار HTML قديم يُعيد توجيه 301 إلى المسار الجديد الصحيح.
 * الاستخدام:
 *   node src/scripts/check_legacy_redirects.js [baseUrl]
 * مثال:
 *   node src/scripts/check_legacy_redirects.js http://localhost:3000
 */

const base = process.argv[2] || 'http://localhost:3000';

// حافظ على التزامن مع legacyRedirects في src/app.js
const mapping = {
  '/hp_index.html': '/',
  '/index.html': '/',
  '/about.html': '/about',
  '/faq.html': '/faq',
  '/profile.html': '/profile',
  '/settings.html': '/settings',
  '/support/sp_index.html': '/support',
  '/support/index.html': '/support',
  '/course/cr_index.html': '/course',
  '/certificate/ct_index.html': '/certificate',
  '/dashboard/db_index.html': '/dashboard'
};

async function checkOne(path, expected) {
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

async function main() {
  console.log(`Checking legacy redirects against base: ${base}`);
  const entries = Object.entries(mapping);
  const results = [];
  for (const [oldPath, newPath] of entries) {
    // eslint-disable-next-line no-await-in-loop
    const r = await checkOne(oldPath, newPath);
    results.push(r);
  }
  const ok = results.filter(r => r.ok);
  const bad = results.filter(r => !r.ok);
  console.log('\nResults:');
  for (const r of results) {
    console.log(`${r.ok ? '✅' : '❌'} ${r.path} -> ${mapping[r.path]} ${r.ok ? '' : ':: ' + r.reason}`);
  }
  console.log(`\nPassed: ${ok.length}/${results.length}`);
  if (bad.length) {
    process.exitCode = 1;
  }
}

main();
