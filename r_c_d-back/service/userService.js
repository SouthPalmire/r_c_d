import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import mysql from './db.js';
import mailService from './mailService.js';
import tokenService from './tokenService.js';
import UserDto from '../dtos/userDto.js';

class UserService {
  registration(user) {
    return mysql(`SELECT * FROM users WHERE email='${user.email}';`)
      .then(async (data) => {
        if (data.length) {
          return 'user already exist';
        }

        const activationLink = uuidv4();
        const passwordHash = await bcrypt.hashSync(user.password, 2);

        const queryString = `INSERT INTO users (email, password, activation_status, activation_link)
                             VALUES ('${user.email}', '${passwordHash}', 'false','${activationLink}')`;
        const userBdRows = await mysql(queryString);
        const userDto = new UserDto(user, { ...userBdRows });
        const tokens = tokenService.generateTokens({ ...userDto });

        await mailService.sendActivationMail(user.email, `${process.env.API_URL}/auth/activate/${activationLink}`);
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
          tokens,
          user: userDto,
        };
      });
  }

  activate(activationLink) {
    return mysql(`SELECT * FROM users WHERE activation_link='${activationLink}';`)
      .then((data) => {
        if (!data) {
          return console.log('некорректная ссылка активации');
        }
        return mysql(`UPDATE users SET activation_status = 'true' WHERE activation_link = '${activationLink}'`);
      });
  }

//   login(user) {
//     const queryString = `SELECT *
//                          FROM users
//                          WHERE email = '${user.email}';`;
//     return mysql(queryString);
//   }
//
//   logout(user) {
//     const queryString = `SELECT * FROM users WHERE email='${user.email}';`;
//     return mysql(queryString);
//   }
}

export default new UserService();
