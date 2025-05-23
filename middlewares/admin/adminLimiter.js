const rateLimit = require('express-rate-limit');

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: `Trop d'actions de requêtes admin. Veuillez réessayer plus tard.`
});

module.exports = adminLimiter;