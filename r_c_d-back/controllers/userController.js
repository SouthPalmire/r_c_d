import UserService from '../service/userService.js';

class UserController {
  async registration(req, res) {
    try {
      await res.json(await UserService.register(req.body));
    } catch (e) {
      res.status(401).json(e);
      console.log(e);
    }
  }

  async login(req, res) {
    try {
      await res.json(await UserService.login(req.body));
    } catch (e) {
      res.status(401).json(e);
      console.log(e);
    }
  }
}

export default new UserController();
