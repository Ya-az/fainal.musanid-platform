const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// أمن أساسي
app.use(helmet());
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
// دعم العمل خلف Proxy في بيئة الإنتاج (لتفعيل الكوكي الآمن)
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}
app.use(session({
    secret: process.env.SESSION_SECRET || 'musanid-secret-key',
    name: 'musanid.sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}));

// Legacy index.html redirects to clean routes
[
    ['/index.html', '/'],
    ['/support/index', '/support'],
    ['/support/index.html', '/support'],
    ['/dashboard/index', '/dashboard'],
    ['/dashboard/index.html', '/dashboard'],
    ['/course/index', '/course'],
    ['/course/index.html', '/course'],
    ['/certificate/index', '/certificate'],
    ['/certificate/index.html', '/certificate'],
    ['/settings.html', '/settings'],
].forEach(([from, to]) => {
    app.get(from, (req, res) => res.redirect(301, to));
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

// 404 Not Found
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

// Error handling (500)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, '../public/500.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
