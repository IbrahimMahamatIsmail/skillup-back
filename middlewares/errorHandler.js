module.exports = (err, req, res, next) => {
  console.error('Erreur non gérée :', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Erreur interne du serveur',
    status: err.status || 500
  });
};