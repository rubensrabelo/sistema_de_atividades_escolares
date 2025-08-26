import { Response } from "express";

import { UserService } from "../services/user.service";
import { UserUpdateDTO } from "../dtos/user/user-update.dto";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { UserResponseDTO } from "../dtos/user/user-response.dto";
import { UserUnauthorizedError } from "../services/exceptions/user-unauthorized.error";
import { UserNotFoundError } from "../services/exceptions/user-not-found.error";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getMe(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId: string | undefined = req.user?.id;
      if (!userId) 
        throw new UserUnauthorizedError();

      const userDTO: UserResponseDTO | null = await this.userService.getByIdWithPassword(userId);
      return res.status(200).json(userDTO);
    } catch (error: any) {
      if (error instanceof UserNotFoundError || error instanceof UserUnauthorizedError)
        return res.status(error.statusCode).json({ message: error.message });

      return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId: string | undefined = req.user?.id;
      if (!userId) 
        throw new UserUnauthorizedError();

      const updateData: UserUpdateDTO = req.body;
      const userDTO: UserResponseDTO | null = await this.userService.update(userId, updateData);

      return res.status(200).json(userDTO);
    } catch (error: any) {
      if (error instanceof UserNotFoundError || error instanceof UserUnauthorizedError)
        return res.status(error.statusCode).json({ message: error.message });
      return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<Response> {
  try {
    const userId: string | undefined = req.user?.id;
    if (!userId) 
      throw new UserUnauthorizedError();

    await this.userService.delete(userId);
    
    return res.status(204).send();
  } catch (error: any) {
    if (error instanceof UserNotFoundError || error instanceof UserUnauthorizedError)
        return res.status(error.statusCode).json({ message: error.message });

    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
}

}
