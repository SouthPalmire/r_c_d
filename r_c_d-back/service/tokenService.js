import jwt from 'jsonwebtoken';
import mysql from './db.js';

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  saveToken(userId, refreshToken) {
    mysql(`SELECT * FROM tokens WHERE user_id='${userId}';`)
      .then((data) => {
        const updateQuery = `UPDATE tokens SET refresh_token = '${refreshToken}' WHERE user_id = '${userId}'`;
        const insertQuery = `INSERT INTO tokens (user_id, refresh_token)
                             VALUES ('${userId}', '${refreshToken}')`;
        if (data.length) {
          return mysql(updateQuery);
        }
        return mysql(insertQuery);
      });
  }
}

export default new TokenService();
