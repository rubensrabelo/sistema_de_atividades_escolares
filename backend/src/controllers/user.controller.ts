import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserUpdateDTO } from "../dtos/user/user-update.dto";
import { AuthRequest } from "../middlewares/auth.middleware.js";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getMe(req: AuthRequest, res: Response) {
    try {
      const user = await this.userService.getByIdWithPassword(req.user!.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const updateData: UserUpdateDTO = req.body;
      const updatedUser = await this.userService.update(req.params.id, updateData);
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const deletedUser = await this.userService.delete(req.params.id);
      if (!deletedUser) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deactivated successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
