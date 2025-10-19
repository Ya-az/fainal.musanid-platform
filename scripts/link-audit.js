const fs = require('node:fs');
const path = require('node:path');

const repoRoot = process.cwd();
const includeDirs = [
    path.join(repoRoot, 'docs'),
    path.join(repoRoot, 'public'),
];

const ignoreDirs = new Set([
    'node_modules',
    '.git',
    'coverage',
    'scripts',
    'tests',
    'temp'
]);

const htmlFiles = [];

function walk(dir) {
    let entries;
    try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (error) {
        console.error(`⚠️  تعذر قراءة المجلد: ${dir}\n${error.message}`);
        return;
    }

    entries.forEach(entry => {
        if (ignoreDirs.has(entry.name)) {
            return;
        }

        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            walk(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
            htmlFiles.push(fullPath);
        }
    });
}

includeDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        walk(dir);
    }
});

const results = {
    missing: new Map(),
    byType: {
        css: new Set(),
        js: new Set(),
        images: new Set(),
        fonts: new Set(),
        html: new Set(),
        other: new Set(),
    }
};

const missingRefs = [];

function classifyValue(value) {
    const clean = value.split(/[?#]/)[0];
    const ext = path.extname(clean).toLowerCase();

    if (ext === '.css') return 'css';
    if (ext === '.js') return 'js';
    if (['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico', '.avif'].includes(ext)) return 'images';
    if (['.woff', '.woff2', '.ttf', '.otf', '.eot'].includes(ext)) return 'fonts';
    if (ext === '.html' || ext === '.htm') return 'html';
    return 'other';
}

const externalPattern = /^(https?:)?\/\//i;
const skipPattern = /^(https?:|mailto:|tel:|javascript:|data:)/i;

htmlFiles.forEach(filePath => {
    const relativeFile = path.relative(repoRoot, filePath);
    const fileDir = path.dirname(filePath);
    let content = '';

    try {
        content = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`⚠️  تعذر قراءة الملف: ${relativeFile}\n${error.message}`);
        return;
    }

    const matches = [...content.matchAll(/\b(?:src|href)=\"([^\"]+)\"/gi)];

    matches.forEach(match => {
        const rawValue = match[1].trim();

        if (!rawValue || skipPattern.test(rawValue) || rawValue.startsWith('#') || rawValue.includes('{{')) {
            return;
        }

        const cleanedValue = rawValue.split(/[#?]/)[0];
        const refType = classifyValue(cleanedValue);
        const store = results.byType[refType] || results.byType.other;
        store.add(`${relativeFile} -> ${rawValue}`);

        let resolvedPath;

        if (externalPattern.test(rawValue)) {
            return;
        }

        if (cleanedValue.startsWith('/')) {
            resolvedPath = path.join(repoRoot, cleanedValue.replace(/^\/+/, ''));
        } else {
            resolvedPath = path.resolve(fileDir, cleanedValue);
        }

        if (!fs.existsSync(resolvedPath)) {
            const missingKey = `${relativeFile} -> ${rawValue}`;

            if (!results.missing.has(missingKey)) {
                results.missing.set(missingKey, {
                    file: relativeFile,
                    reference: rawValue,
                    type: refType,
                });

                missingRefs.push({
                    file: relativeFile,
                    reference: rawValue,
                    type: refType,
                });
            }
        }
    });
});

console.log('🔍 فحص ربط الملفات (File Linking Audit)');
console.log('---------------------------------------');
console.log(`📄 تم فحص ${htmlFiles.length} ملفات HTML`);

console.log('\n📦 ملخص الروابط حسب النوع:');
Object.entries(results.byType).forEach(([type, set]) => {
    console.log(`  • ${type.padEnd(7)}: ${set.size} مرجع`);
});

if (!missingRefs.length) {
    console.log('\n✅ لم يتم العثور على مراجع مفقودة. جميع المسارات المحلية صحيحة.');
} else {
    console.log(`\n⚠️ تم العثور على ${missingRefs.length} مراجع غير موجودة:`);
    missingRefs.forEach(item => {
        console.log(`  - [${item.type}] ${item.file} -> ${item.reference}`);
    });
}
