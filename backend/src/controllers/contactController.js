// متحكم لرسائل الاتصال
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // تحقق من صحة البيانات
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'يرجى توفير جميع الحقول المطلوبة' 
      });
    }
    
    // في الإنتاج، سنخزن هذه البيانات في قاعدة البيانات
    // للتبسيط، نقوم فقط بإرسال استجابة نجاح
    
    console.log('تم استلام نموذج اتصال:', { name, email, subject, message });
    
    return res.status(200).json({ 
      success: true, 
      message: 'تم إرسال رسالتك بنجاح. سنتواصل معك قريبًا.' 
    });
    
  } catch (error) {
    console.error('خطأ في submitContactForm:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.' 
    });
  }
};

// متحكم للاشتراك في النشرة الإخبارية
exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    
    // تحقق من صحة البريد الإلكتروني
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'يرجى توفير بريد إلكتروني صالح' 
      });
    }
    
    console.log('اشتراك جديد في النشرة الإخبارية:', email);
    
    return res.status(200).json({ 
      success: true, 
      message: 'تم الاشتراك في النشرة الإخبارية بنجاح' 
    });
    
  } catch (error) {
    console.error('خطأ في subscribeNewsletter:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.' 
    });
  }
};