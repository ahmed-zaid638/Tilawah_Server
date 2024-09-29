// src/services/userService.ts

import pool from "../config/db";
import { User } from "../models/userModel";

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }
}
