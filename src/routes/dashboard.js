const path = require('path');
const express = require('express');
const router = express.Router();

function requireAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/auth/login');
}

router.get('/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/dashboard/db_index.html'));
});

module.exports = router;
