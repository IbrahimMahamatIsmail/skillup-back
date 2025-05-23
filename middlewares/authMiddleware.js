const jwt = require('jsonwebtoken');

const authMiddleware = (messagePersonnalise = null) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn("Aucun token fourni")
      return res.status(401).json({
        message: messagePersonnalise || 'Accès refusé : vous devez obligatoirement être connecté.'
      });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.utilisateur = decoded;
      next();
    } catch (err) {
      console.error("Token invalide ou expiré");
      res.status(403).json({
        message: 'Session expirée ou invalide. Veuillez vous reconnecter.'
      });
    }
  };
};

module.exports = authMiddleware;
