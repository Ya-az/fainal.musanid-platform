const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// دعم العمل خلف Proxy في بيئة الإنتاج (لتفعيل الكوكي الآمن)
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}
app.use(session({
    secret: process.env.SESSION_SECRET || 'musanid-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/course', require('./routes/course'));
app.use('/certificate', require('./routes/certificate'));
app.use('/support', require('./routes/support'));

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('حدث خطأ في الخادم!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
