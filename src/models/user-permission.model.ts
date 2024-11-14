import {AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique, HasMany} from "sequelize-typescript";
import {UUID} from "crypto";
import UserRolePermission from "./user-role-permission.model";

@Table({
    tableName: 'permissions',
    timestamps: true, // Automatically adds createdAt and updatedAt
})
export default class Permission extends Model<Permission> {
    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.BIGINT, field: 'permission_id'})
    id!: number;

    @Unique
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: 'permission_uuid',
    })
    permissionUuid!: UUID;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: 'permission_description',
    })
    description!: string;

    // @ts-ignore
    @HasMany(() => UserRolePermission)
    userRolePermission!: UserRolePermission[];
}
