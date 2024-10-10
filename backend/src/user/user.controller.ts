import { UserService } from './user.service';

export class UserController {
  static async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
        const user = await UserService.getUserById(Number(req.params.id));
        return res.json(user);
      } catch (error) {
        return res.status(404).json({ message: error.message });
      }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const message = await UserService.deleteUser(req.params.id);
      res.json({ message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
