const path = require('path');
const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');

function requireAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/auth/login');
}

router.get('/', requireAuth, (req, res) => {
  res.render('certificate/index', { title: 'الشهادات' });
});

router.get('/download', requireAuth, (req, res) => {
  const user = req.session.user || {};
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="certificate.pdf"');
  doc.pipe(res);
  doc.fontSize(26).text('شهادة إتمام', { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).text(`نُمنح هذه الشهادة إلى: ${user.firstName || ''} ${user.lastName || ''}`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text('لإكماله متطلبات الدورة بنجاح على منصة مساند.', { align: 'center' });
  doc.moveDown(2);
  doc.text('التاريخ: ' + new Date().toLocaleDateString('ar-SA'), { align: 'center' });
  doc.end();
});

module.exports = router;
