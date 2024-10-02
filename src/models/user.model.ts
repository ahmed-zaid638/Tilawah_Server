// src/models/user.model.ts
import { Table, Column, Model, DataType, BeforeCreate, BeforeUpdate, PrimaryKey, AutoIncrement, Unique, } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

@Table({
    tableName: 'users',
    timestamps: true, // Automatically adds createdAt and updatedAt
})
export default class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.TEXT,
        defaultValue: null,
        field: 'profile_pic',
    })
    profilePic!: string | null;

    @Column({
        type: DataType.STRING,
        defaultValue: null,
        field: 'google_id',
    })
    googleId!: string | null;

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(instance: User) {
        if (instance.changed('password')) {
            const hashedPassword = await bcrypt.hash(instance.password, 12);
            instance.password = hashedPassword;
        }
    }
}
