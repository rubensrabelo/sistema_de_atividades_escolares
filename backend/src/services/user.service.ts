import bcrypt from "bcryptjs";

import User from "../models/user.model";
import { IUserDocument } from "../models/interfaces/user.interface";
import { UserUpdateDTO } from "../dtos/user/user-update.dto";

export class UserService {
    async getByIdWithPassword(id: string): Promise<IUserDocument | null> {
        return await User.findById(id).select("+password");
    }

    async update(id: string, updateData: UserUpdateDTO): Promise<IUserDocument | null> {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        return await User.findOneAndUpdate(
            { _id: id, active: true },
            { $set: updateData },
            { new: true }
        );
    }

    async delete(id: string): Promise<IUserDocument | null> {
        return await User.findOneAndUpdate(
            { _id: id, active: true },
            { $set: { active: false } },
            { new: true }
        );
    }
}
