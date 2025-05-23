const formationsRouter = require('./formationsRoutes');
const express = require('express');
const router = express.Router();

// Les routes de l'API
router.use('/admin', require('./adminRoutes'));
router.use('/formations', formationsRouter);
router.use('/users', require('./usersRoutes'));
// Définition de la route d'erreur 404 pour les routes non définies
router.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable non définie ' });
});

module.exports = router;