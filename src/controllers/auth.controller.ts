// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

export default class AuthController {
    private authService: AuthService;

    constructor() {
        const userService = new UserService();
        this.authService = new AuthService(userService);
    }

    // User Registration (Email/Password)
    register = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const token = await this.authService.register({ name, email, password });

            // Return user details (excluding password)
            res.status(201).json({ token });
        } catch (error: any) {
            console.log(`${new Date().toISOString()} - register error: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    // User Login (Email/Password)
    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const token = await this.authService.login(email, password);
            if (!token) {
                res.status(400).json({ message: 'Login failed' });
                return;
            }
            res.status(200).json({ token });
        } catch (error: any) {
            console.log(`${new Date().toISOString()} - login error: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    // Google OAuth Login
    googleLogin = async (req: Request, res: Response) => {
        try {
            const { token } = req.body; // Token provided by Google OAuth
            if (!token) {
                res.status(400).json({ message: 'Missing Google token' });
                return;
            }
            const authToken = await this.authService.googleLogin(token);
            if (!authToken) {
                res.status(400).json({ message: 'Google login failed' });
                return;
            }
            res.status(200).json({ token: authToken });
        } catch (error: any) {
            console.log(`${new Date().toISOString()} - googleLogin error: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }
}
