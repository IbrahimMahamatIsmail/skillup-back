const formationsMapper = require('../dataMapper/formationsMapper');

// Added a new formation
exports.createFormation = async (req, res) => {
  try {    
    const newFormation = await formationsMapper.createFormation(req.body);
    res.status(201).json({ message: 'Formation added', newFormation });
  } catch (err) {
    res.status(500).json({ error: 'Error during added a formation controller' });
  }
};
// Updated a formation
exports.updateFormation = async (req, res) => {
  try {    
    const formation = await formationsMapper.getFormationById(req.params.id);
    if (!formation) return res.status(404).json({ error: 'Formation not found controller'});
    const updatedFormation = await formationsMapper.updateFormation(req.params.id, req.body);
    res.status(200).json({ message: 'Formation updated successifly !', updatedFormation });
  } catch (err) {
    res.status(500).json({ error: 'Error during to updated a formation since the controller' });
  }
};

// Delete a formation
exports.deleteFormation = async (req, res) => {
  try {    
    const formation = await formationsMapper.getFormationById(req.params.id);
    if (!formation) return res.status(404).json({ error: 'Formation not found'});
    const deletedFormation = await formationsMapper.deleteFormation(req.params.id);
    res.status(200).json({ message: 'Formation deleted', deletedFormation});
  } catch (err) {
    res.status(500).json({ error: 'Error during to deleted a formation controller'});
  }
};

// Get all the formations
exports.getAllFormations = async (req, res) => {
  try {
    const formations = await formationsMapper.getAllFormations();
    res.json({formations});
  } catch (err) {
    console.error('Error during getAllFormations controller:', err);
    res.status(500).json({ error: 'Error server during retrieving formations controller' });
  }
};
// Search a formations by title
exports.searchFormationByTitle = async (req, res) => {
  const title = req.query.title;
  try {
    const result = await formationsMapper.findByTitle(title);
    if (result.length === 0) return res.status(404).json({ message: 'No found formation with this title'});
    res.json({ formations: result});
  } catch (err) {
    console.error('Error search a formation by title controller:', err);
    res.status(500).json({ message: 'Error during search a formation by title controller'})
  }
};
// Get a formation by ID
exports.getFormationById = async (req, res) => {
  try {
    const formationById = await formationsMapper.getFormationById(req.params.id);
    if (!formationById) return res.status(404).json({ error: 'Formation not found since controller' });
    res.status(200).json(formationById);
  } catch (err) {
    res.status(500).json({ error: 'Error server controller formation' });
  }
};