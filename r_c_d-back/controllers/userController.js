import userService from '../service/userService.js';

class UserController {
  async registration(req, res) {
    try {
      await res.json(await userService.registration(req.body));
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
