const isAdminMiddleware = (req, res, next) => {
  if (!req.utilisateur || req.utilisateur.role !== 'admin') {
    return res.status(403).json({ message: 'Accès réfusé : administrateur uniquement' });
  }
  next();
};

module.exports = isAdminMiddleware;