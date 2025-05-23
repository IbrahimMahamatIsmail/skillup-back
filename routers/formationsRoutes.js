const express = require('express');
const router = express.Router();
const formationsController = require('../controllers/formationsController');
const isAdminMiddleware = require('../middlewares/admin/isAdminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const sanitizeHTML = require('../middlewares/sanitizeHTML');
const sanitizeQuery = require('../middlewares/sanitizeQuery');
const adminLimiter = require('../middlewares/admin/adminLimiter');
const champsAdmin = [
  'title',
  'description',
  'level',
  'price',
  'categorie_id'
];

// Routes pour afficher tous les formations
router.get('/', formationsController.getAllFormations);
// Routes pour rechercher une formation par titre
router.get('/search', sanitizeQuery(['title']), formationsController.searchFormationByTitle);
// Routes pour afficher une formation par son ID
router.get('/:id', formationsController.getFormationById);
// Routes pour ajouter une nouvelle formation
router.post('/', authMiddleware(), isAdminMiddleware, adminLimiter, sanitizeHTML(champsAdmin),  formationsController.createFormation);
// Routes pour mettre à jour une formation
router.put('/:id', authMiddleware(), isAdminMiddleware, adminLimiter, sanitizeHTML(champsAdmin),  formationsController.updateFormation);
// Routes pour supprimer une formation
router.delete('/:id', authMiddleware(), isAdminMiddleware, adminLimiter, sanitizeHTML(champsAdmin),   formationsController.deleteFormation);

module.exports = router;
