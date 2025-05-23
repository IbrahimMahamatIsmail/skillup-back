const db = require('../data/db');

const formationsMapper = {
  async getAllFormations() {
    const values = [];
    let query = `
      SELECT f.id, f.title, f.description, f.level, f.price, 
      c.name AS categorie 
      FROM formations f
      LEFT JOIN categories c ON f.categorie_id = c.id`;
    
    const result = await db.query(query, values);
    return result.rows;
  },
  async findByTitle(title) {
    const result = await db.query(`
      SELECT f.id, f.title, f.description, f.level, f.price, 
      c.name AS categorie
      FROM formations f
      LEFT JOIN categories c ON f.categorie_id = c.id
      WHERE LOWER(f.title) LIKE LOWER($1)
    `, [`%${title}%`]);
    return result.rows;
  },
  async getFormationById(id) {
    try {
      const result = await db.query(`
        SELECT f.id, f.title, f.description, f.level, f.price, f.date_added, f.date_updated, 
        c.name AS categorie 
        FROM formations f 
        LEFT JOIN categories c ON f.categorie_id = c.id
        WHERE f.id = $1`,
        [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Error getFormationById Mapper :', err);
      throw err;
    }
  },
  async createFormation(formation) {
    const {
      title,
      description,
      level,
      price = true,
      categorie_id
    } = formation;
    const result = await db.query(
      `INSERT INTO formations (title, description, level, price, categorie_id, date_added)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [title, description, level, price, categorie_id]
    );
    return result.rows[0];
  },
  async updateFormation(id, formation) {
    const {
      title,
      description,
      level,
      price,
      categorie_id
    } = formation;
    const result = await db.query(
      `UPDATE formations
       SET title = $1, description = $2, level = $3, price = $4, categorie_id = $5, date_updated = NOW()
       WHERE id = $6
       RETURNING *`,
      [title, description, level, price, categorie_id, id]
    );
    return result.rows[0];
  },
  async deleteFormation(id) {
    const result = await db.query('DELETE FROM formations WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } 
};

module.exports = formationsMapper;