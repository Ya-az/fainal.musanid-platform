/**
 * Middleware functions for authentication and authorization
 * Created: October 2025
 * Purpose: Centralized auth middleware to eliminate code duplication
 */

/**
 * Middleware to require user authentication
 * Redirects to login page if user is not authenticated
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object  
 * @param {Function} next - Express next function
 */
function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/auth/login');
}

/**
 * Middleware to require specific user role
 * @param {string} role - Required role (admin, user, etc.)
 * @returns {Function} Middleware function
 */
function requireRole(role) {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.redirect('/auth/login');
    }
    
    if (req.session.user.role !== role) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    return next();
  };
}

/**
 * Middleware to check if user is logged in (for optional auth)
 * Sets req.user if authenticated, otherwise continues without redirect
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function optionalAuth(req, res, next) {
  if (req.session && req.session.user) {
    req.user = req.session.user;
  }
  return next();
}

module.exports = {
  requireAuth,
  requireRole,
  optionalAuth
};