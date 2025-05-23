const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/admin/isAdminMiddleware');
const sanitizeHTML = require('../middlewares/sanitizeHTML');
const adminLimiter = require('../middlewares/admin/adminLimiter');
const champsAdmin = [
  'title',
  'description',
  'level',
  'price',
  'categorie_id'
];

router.use(authMiddleware(), isAdminMiddleware);
// Route pour créer une nouvelle formation
router.post('/create-formation', adminLimiter, sanitizeHTML([champsAdmin]), adminController.createFormation);
// Route pour mettre à jour une formation
router.put('/update-formation/:id', adminLimiter, sanitizeHTML([champsAdmin]), adminController.updateFormation);
// Route pour supprimer une formation
router.delete('/delete-formation/:id', adminLimiter, adminController.deleteFormation);

module.exports = router;

