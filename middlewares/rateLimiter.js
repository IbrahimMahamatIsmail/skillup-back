const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limite chaque IP à 15 requêtes par route
  message: 'Trop de tentatives, veuillez réessayer plus tard.'
});

module.exports = rateLimiter;