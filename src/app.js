const express = require('express');
const path = require('path');
const session = require('express-session');
const compression = require('compression');
const morgan = require('morgan');
const MySQLStoreFactory = require('express-mysql-session');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
require('dotenv').config();

const app = express();

// View engine (EJS) setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(morgan('combined'));
// أمن أساسي
app.use(helmet());
// تفعيل CSP (لا سكربتات inline حالياً)
app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "default-src": ["'self'"],
    // بعد نقل السكربتات إلى ملفات خارجية، نحذف 'unsafe-inline'
    "script-src": ["'self'"],
    "style-src": ["'self'", 'https:'],
    "img-src": ["'self'", 'data:', 'https:'],
        "object-src": ["'none'"],
        "base-uri": ["'self'"],
        "frame-ancestors": ["'self'"],
        "form-action": ["'self'"],
    }
}));
app.use(cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
    credentials: true
}));
// تحديد معدّل الطلبات لمسارات المصادقة
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/auth', authLimiter);
// معدل خاص لتحديث التقدم (أخف لكن يحمي من الإساءة)
const progressLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 60, // 60 طلب بالدقيقة للمستخدم (كافٍ للتفاعل)
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/progress', progressLimiter);
// دعم العمل خلف Proxy في بيئة الإنتاج (لتفعيل الكوكي الآمن)
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}
// MySQL session store
const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'musanid_db',
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

app.use(session({
    secret: process.env.SESSION_SECRET || 'musanid-secret-key',
    name: 'musanid.sid',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}));

// CSRF protection using double-submit cookie pattern
const csrfProtection = csurf({ cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' } });
app.use(csrfProtection);

// Make common template locals available
app.use((req, res, next) => {
    try {
        res.locals.csrfToken = req.csrfToken();
    } catch (e) {
        res.locals.csrfToken = null;
    }
    res.locals.user = req.session ? req.session.user : null;
    res.locals.currentPath = req.path;
    res.locals.appName = 'مساند';
    next();
});

app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: res.locals.csrfToken });
});

// (تمت إزالة إعادة التوجيه القديمة بعد الانتقال إلى القوالب)

// Legacy static HTML redirects (clean hybrid approach)
// أي روابط قديمة محفوظة ستُعاد توجيهها دائماً إلى الصفحات الديناميكية الجديدة
const legacyRedirects = {
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
    '/dashboard/db_index.html': '/dashboard'
    ,'/dashboard/index.html': '/dashboard'
    ,'/auth/login.html': '/auth/login'
    ,'/auth/register.html': '/auth/register'
};
app.use((req, res, next) => {
    const to = legacyRedirects[req.path.toLowerCase()];
    if (to) {
        return res.redirect(301, to);
    }
    next();
});

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/course', require('./routes/course'));
app.use('/certificate', require('./routes/certificate'));
app.use('/support', require('./routes/support'));
app.use('/settings', require('./routes/settings'));
app.use('/favorites', require('./routes/favorites'));
app.use('/api', require('./routes/api'));

// 404 Not Found
app.use((req, res) => {
    res.status(404).render('errors/404', { title: 'غير موجود' });
});

// Error handling (500)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('errors/500', { title: 'خطأ' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
