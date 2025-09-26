const express = require('express');
const router = express.Router();
const { getAllLessons } = require('../models/Lesson');
const { getUserFavoritesMap } = require('../models/Favorite');

// Middleware to require authentication
function requireAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/auth/login?redirect=/favorites');
}

// Route to display favorites page
router.get('/', requireAuth, async (req, res) => {
  try {
    // Get all lessons and user's favorites
    const allLessons = await getAllLessons();
    const favoritesMap = await getUserFavoritesMap(req.session.user.id);
    
    // Filter lessons to only include favorited ones
    const favorites = allLessons.filter(lesson => favoritesMap.has(lesson.id));
    
    res.render('favorites/index', {
      user: req.session.user,
      favorites,
      activeSection: 'favorites'
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).render('errors/500');
  }
});

module.exports = router;