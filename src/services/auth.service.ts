// src/services/auth.service.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { UserService } from './user.service';
import { OAuth2Client } from 'google-auth-library';
import { CreationAttributes } from 'sequelize/types/model';

export class AuthService {
    private userService: UserService;
    private googleClient: OAuth2Client;

    constructor(userService: UserService) {
        this.userService = userService;
        this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

    // Registration (Email/Password)
    async register(userDetails: { name: string; email: string; password: string }) {
        const existingUser = await this.userService.findByEmail(userDetails.email);
        if (existingUser) throw new Error('User already exists.');

        const newUser = await this.userService.createUser(userDetails);

        return this.generateToken(newUser);
    }

    // Login (Email/Password)
    async login(email: string, password: string): Promise<string> {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new Error('User not found.');

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error('Invalid password.');

        return this.generateToken(user);
    }

    // Google OAuth Login
    async googleLogin(token: string): Promise<string> {
        const ticket = await this.googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email_verified) {
            throw new Error('Google account not verified.');
        }

        const { email, name, picture, sub } = payload;
        if (!email || !name || !sub) {
            throw new Error('Invalid Google account data received.');
        }
        let user = await this.userService.findByEmail(email);

        // If user doesn't exist, create one
        if (!user) {
            user = await this.userService.createUser({
                name,
                email,
                googleId: sub, // sub is the Google User ID
                profilePic: picture,
            } as CreationAttributes<User>);
        }

        return this.generateToken(user);
    }

    // Generate JWT
    private generateToken(user: User): string {
        return jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            process.env.JWT_SECRET!,
            { expiresIn: '30d' } // Set JWT expiration as needed
        );
    }
}
