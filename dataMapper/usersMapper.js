const db = require('../data/db');

const usersMapper = {
  async getByName (name) {
    const { rows } =await db.query(`
    SELECT u.id, u.name, u.email, u.password, u.role_id, r.name AS role
    FROM users u
    JOIN roles r ON u.role_id = r.id
    WHERE LOWER(u.name) = LOWER($1)
    `, [name]);
    return rows[0];
  },
  async getByEmail(email) {
    const { rows } = await db.query(`
      SELECT u.id, u.name, u.email, u.password, u.role_id, u.last_login, r.name AS role
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.email = $1
    `, [email]);
    return rows[0];
  },
  async getAdmin() {
    const { rows } = await db.query(`
      SELECT u.id, u.name, u.email, r.name AS role
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE r.name = 'admin'
      LIMIT 1
    `);
    return rows[0];
  },
  async create({ name, email, password, role_id}) { 
    const { rows } = await db.query(
      `INSERT INTO users (name, email, password, role_id)
      VALUES ($1, $2, $3, $4) RETURNING id, name, email`,
      [name, email, password, role_id]
    );
    return rows[0];
  }
};

module.exports = usersMapper;

