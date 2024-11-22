// src/models/user.model.ts
import { Table, Column, Model, DataType, BeforeCreate, BeforeUpdate, PrimaryKey, AutoIncrement, Unique, HasMany } from 'sequelize-typescript';
import { UUID } from 'crypto';
import UserRolePermission from "./user-role-permission.model";

@Table({
    tableName: 'user_roles',
    timestamps: true, // Automatically adds createdAt and updatedAt
})
export default class Role extends Model<Role> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT, field: 'role_id' })
    id!: number;

    @Unique
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: 'role_uuid',
    })
    roleUuid!: UUID;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: 'role_description',
    })
    description!: string;


    // @ts-ignore
    @HasMany(() => UserRolePermission)
    userRolePermission!: UserRolePermission[];
}