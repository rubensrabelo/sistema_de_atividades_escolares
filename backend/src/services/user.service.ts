import bcrypt from "bcryptjs";

import User from "../models/user.model";
import { IUserDocument } from "../models/interfaces/user.interface";
import { UserUpdateDTO } from "../dtos/user/user-update.dto";
import { UserResponseDTO } from "../dtos/user/user-response.dto";
import { UserNotFoundError } from "./exceptions/user-not-found.error";

export class UserService {
    async getByIdWithPassword(id: string): Promise<UserResponseDTO | null> {
        const user: IUserDocument | null = await User.findById(id).select("+password");

        if (!user)
            throw new UserNotFoundError();

        return new UserResponseDTO(
            user._id.toString(),
            user.firstName,
            user.lastName,
            user.email,
            user.role,
            user.active,
            user.createdAt!,
            user.updatedAt!,
            user.password
        );
    }

    async update(id: string, updateData: UserUpdateDTO): Promise<UserResponseDTO | null> {
        if (updateData.password)
            updateData.password = await bcrypt.hash(updateData.password, 10);

        const user: IUserDocument | null = await User.findOneAndUpdate(
            { _id: id, active: true },
            { $set: updateData },
            { new: true }
        );

        if (!user)
            throw new UserNotFoundError();

        return new UserResponseDTO(
            user._id.toString(),
            user.firstName,
            user.lastName,
            user.email,
            user.role,
            user.active,
            user.createdAt!,
            user.updatedAt!,
            user.password
        );
    }

    async delete(id: string): Promise<void> {
        const deletedUser: IUserDocument | null = await User.findOneAndUpdate(
            { _id: id, active: true },
            { $set: { active: false } },
            { new: true }
        );

        if (!deletedUser) 
            throw new UserNotFoundError();
    }
}
