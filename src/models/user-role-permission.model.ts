import {Column, DataType, ForeignKey, Model, NotNull, Table, BelongsTo} from "sequelize-typescript";
import Role from "./user-role.model";
import Permission from "./user-permission.model";

@Table({
    tableName: 'granted_permissions',
    timestamps: true, // Automatically adds createdAt and updatedAt
})
export default class UserRolePermission extends Model<UserRolePermission> {
    @ForeignKey(() => Role)
    @Column({
        type: DataType.BIGINT,
        field: 'role_id',
        allowNull: false
    })
    roleId!: number;

    @ForeignKey(() => Permission)
    @Column({
        type: DataType.BIGINT,
        field: 'permission_id',
        allowNull: false
    })
    permissionId!: number;
    @BelongsTo(() => Role)
    role!: Role;

    @BelongsTo(() => Permission)
    permission!: Permission;
}
