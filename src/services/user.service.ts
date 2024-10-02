// src/services/user.service.ts
import db from '../models';
import User from '../models/user.model';
import { CreationAttributes } from 'sequelize/types/model';

export class UserService {
    // Create a new user
    async createUser(userDetails: { name: string, email: string, password: string, googleId?: string | null, profilePic?: string | null }) {
        const { name, email, password, googleId, profilePic } = userDetails;

        // Check if the user already exists
        const existingUser = await this.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Create a new user
        const newUser = await db.models.User.create({
            name,
            email,
            password,
            googleId,
            profilePic,
        } as CreationAttributes<User>);

        return newUser as User;
    }

    // Find user by email
    async findByEmail(email: string) {
        return await db.models.User.findOne({ where: { email } }) as User | null;
    }

    // Find a user by Google ID
    async findByGoogleId(googleId: string) {
        return db.models.User.findOne({ where: { googleId } });
    }

    // Find user by ID
    async findById(id: number) {
        return await db.models.User.findByPk(id) as User | null;
    }

    // Update user profile
    async updateUser(id: number, updateData: Partial<{ name: string, email: string, password: string, profilePic?: string }>) {
        const user = await this.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        return await user.update(updateData);
    }
}