import userModel from '../schemas/user.schema';
import { userType } from '../types/user.type';

class userService {
    async create(user: userType) {
        try {
            const createduUser = await userModel.create(user);
            return createduUser;
        } catch {
            throw new Error('Error');
        }
    }

    async findById(id: string) {
        try {
            const findedUser = await userModel.findById(id);
            return findedUser;
        } catch {
            throw new Error('Error');
        }
    }

    async findAll() {
        try {
            const findedUsers = await userModel.find();
            return findedUsers;
        } catch {
            throw new Error('Error');
        }
    }

    async update(id: string, user: userType) {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(id, {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                weight: user.weight
            }, { new: true });

            return updatedUser;
        } catch {
            throw new Error('Error');
        }
    }

    async delete(id: string) {
        try {
            await userModel.findByIdAndDelete(id)
            return "user deleted"
        } catch (error) {
            throw new Error('Error')
        }
    }
}

export default new userService();
