import userService from '../service/userService.js';

class UserController {
  async registration(req, res) {
    try {
      const userData = await userService.registration(req.body);
      res.cookie('refreshToken', userData.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(userData);
    } catch (e) {
      res.status(401).json(e);
      console.log(e);
    }
  }

  async activate(req, res) {
    try {
      const { link } = req.params;
      const activationData = await userService.activate(link);
      res.json(activationData);
    } catch (e) {
      res.status(401).json(e);
      console.log(e);
    }
  }

  async login(req, res) {
    try {
      await res.json(await userService.login(req.body));
    } catch (e) {
      res.status(401).json(e);
      console.log(e);
    }
  }

  async logout(req, res) {
    try {
      await res.json(await userService.logout(req.body));
    } catch (e) {
      res.status(401).json(e);
      console.log(e);
    }
  }
}

export default new UserController();
