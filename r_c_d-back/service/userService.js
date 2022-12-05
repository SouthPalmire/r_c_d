import query from './db.js';

class UserService {
  async register(user) {
    const queryString = `INSERT INTO users 
                       (email, password, activation_status, activation_link) 
                       VALUES 
                       ('${user.email}', '${user.password}', '${user.activationStatus}', '${user.activationLink}')`;
    return await query(queryString);
  }

  async login(user) {
    const queryString = `SELECT * FROM users WHERE email='${user.email}';`;
    return await query(queryString);
  }
}

export default new UserService();
