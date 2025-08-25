import { Response } from "express";

import { UserService } from "../services/user.service";
import { UserUpdateDTO } from "../dtos/user/user-update.dto";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { UserResponseDTO } from "../dtos/user/user-response.dto";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getMe(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId: string | undefined = req.user?.id;
      if (!userId) 
        return res.status(401).json({ message: "Unauthorized." });

      const userDTO: UserResponseDTO | null = await this.userService.getByIdWithPassword(userId);
      if (!userDTO) 
        return res.status(404).json({ message: "User not found." });

      return res.status(200).json(userDTO);
    } catch (error: any) {
      return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId: string | undefined = req.user?.id;
      if (!userId) 
        return res.status(401).json({ message: "Unauthorized." });

      const updateData: UserUpdateDTO = req.body;
      const userDTO: UserResponseDTO | null = await this.userService.update(userId, updateData);

      if (!userDTO) 
        return res.status(404).json({ message: "User not found" });

      return res.status(200).json(userDTO);
    } catch (error: any) {
      return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<Response> {
  try {
    const userId: string | undefined = req.user?.id;
    if (!userId) 
      return res.status(401).json({ message: "Unauthorized." });

    const deletedUser = await this.userService.delete(userId);
    if (!deletedUser) 
      return res.status(404).json({ message: "User not found." });

    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
}

}
