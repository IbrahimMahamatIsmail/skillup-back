const formationsMapper = require('../dataMapper/formationsMapper');
exports.createFormation = async (req, res) => {
  try {
    const formation = await formationsMapper.createFormation(req.body);
    res.status(201).json({ message: 'formation ajouté', formation });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du formation' });
  }
};
exports.updateFormation = async (req, res) => {
  try {
    const updated = await formationsMapper.updateFormation(req.params.id, req.body);
    res.json({ message: 'formation mis à jour', updated });
  } catch (error) {
    console.error('Erreur adminController.updateformation :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.deleteFormation = async (req, res) => {
  try {
    const deleted = await formationsMapper.deleteFormation(req.params.id);
    res.json({ message: 'formation supprimé', deleted });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
