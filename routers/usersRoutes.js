const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const sanitizeHTML = require('../middlewares/sanitizeHTML');
const rateLimiter = require('../middlewares/rateLimiter');

// Gestion de la route de création du compte
router.post('/register', rateLimiter, sanitizeHTML(['name', 'email']), usersController.createUserAccount);
// Gestion de la route de connexion
router.post('/login', rateLimiter, usersController.loginUser);

module.exports = router;
