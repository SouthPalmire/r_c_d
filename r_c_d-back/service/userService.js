import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import mysql from './db.js';
import mailService from './mailService.js';
import tokenService from './tokenService.js';
import UserDto from '../dtos/userDto.js';
import ApiError from '../exceptions/api-error.js';

class UserService {
  registration(user) {
    return mysql(`SELECT * FROM users WHERE email='${user.email}';`)
      .then(async (data) => {
        if (data.length) {
          throw ApiError.BadRequest('user already exist');
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
          throw ApiError.BadRequest('bad activation link');
        }
        return mysql(`UPDATE users SET activation_status = 'true' WHERE activation_link = '${activationLink}'`);
      });
  }

  login(user) {
    return mysql(`SELECT * FROM users WHERE email = '${user.email}';`)
      .then(async (data) => {
        if (!data.length) {
          throw ApiError.BadRequest('error in login or password');
        }
        const checkedPassword = bcrypt.compareSync(user.password, data[0].password);
        if (!checkedPassword) {
          throw ApiError.BadRequest('error in login or password');
        }
        const userDto = new UserDto(...data);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
          tokens,
          user: userDto,
        };
      });
  }

  logout(refreshToken) {
    const token = tokenService.removeToken(refreshToken);
    return token;
  }

  refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnAuthorizedError();
    }
    const userData = tokenService.validationRefreshToken(refreshToken);
    const tokenFromDB = tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnAuthorizedError();
    }
    const user = mysql(`SELECT * FROM users WHERE id = '${userData.id}';`);
    const userDto = new UserDto(...user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      tokens,
      user: userDto,
    };
  }
}

export default new UserService();
