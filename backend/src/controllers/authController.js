const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validationResult } = require('express-validator');

// عرض صفحة تسجيل الدخول
exports.getLogin = (req, res) => {
  res.render('auth/login', {
    title: 'تسجيل الدخول',
    path: '/auth/login'
  });
};

// معالجة طلب تسجيل الدخول
exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // التحقق من البيانات المدخلة
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        errors: errors.array(),
        message: 'خطأ في البيانات المدخلة'
      });
    }
    
    // البحث عن المستخدم
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
    
    // التحقق من كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
    
    // إنشاء توكن المصادقة
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.status(200).json({ 
      token, 
      userId: user._id, 
      name: user.name,
      email: user.email,
      role: user.role
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ في الخادم' });
  }
};

// عرض صفحة التسجيل
exports.getRegister = (req, res) => {
  res.render('auth/register', {
    title: 'إنشاء حساب جديد',
    path: '/auth/register'
  });
};

// معالجة طلب إنشاء حساب
exports.postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // التحقق من البيانات المدخلة
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        errors: errors.array(),
        message: 'خطأ في البيانات المدخلة'
      });
    }
    
    // التحقق من وجود المستخدم
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: 'البريد الإلكتروني مسجل بالفعل' });
    }
    
    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // إنشاء مستخدم جديد
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'student'
    });
    
    await user.save();
    
    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ في الخادم' });
  }
};

// تسجيل الخروج
exports.logout = (req, res) => {
  res.status(200).json({ message: 'تم تسجيل الخروج بنجاح' });
};

// عرض صفحة إعادة تعيين كلمة المرور
exports.getResetPassword = (req, res) => {
  res.render('auth/reset-password', {
    title: 'إعادة تعيين كلمة المرور',
    path: '/auth/reset-password'
  });
};

// معالجة طلب إعادة تعيين كلمة المرور
exports.postResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // إنشاء توكن إعادة تعيين
    const token = crypto.randomBytes(32).toString('hex');
    
    // البحث عن المستخدم
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'لا يوجد حساب مرتبط بهذا البريد الإلكتروني' });
    }
    
    // حفظ توكن إعادة التعيين
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // صالح لمدة ساعة
    await user.save();
    
    // إرسال بريد إلكتروني (سيتم تنفيذه في نظام حقيقي)
    
    res.status(200).json({ message: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ في الخادم' });
  }
};

// عرض صفحة تعيين كلمة مرور جديدة
exports.getNewPassword = async (req, res) => {
  try {
    const token = req.params.token;
    
    // البحث عن المستخدم بواسطة توكن إعادة التعيين
    const user = await User.findOne({ 
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.redirect('/auth/reset-password');
    }
    
    res.render('auth/new-password', {
      title: 'تعيين كلمة مرور جديدة',
      path: '/auth/new-password',
      userId: user._id.toString(),
      token: token
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ في الخادم' });
  }
};

// معالجة طلب تعيين كلمة مرور جديدة
exports.postNewPassword = async (req, res) => {
  try {
    const { password, userId, token } = req.body;
    
    // البحث عن المستخدم
    const user = await User.findOne({ 
      _id: userId,
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'طلب غير صالح' });
    }
    
    // تشفير كلمة المرور الجديدة
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // تحديث بيانات المستخدم
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    
    res.status(200).json({ message: 'تم تغيير كلمة المرور بنجاح' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ في الخادم' });
  }
};