const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connecté avec succès !'))
  .catch(err => console.error('Erreur connexion MongoDB :', err));

module.exports = mongoose;

