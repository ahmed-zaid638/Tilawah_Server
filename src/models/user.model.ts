import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Role from './user-role.model';

export type UserType = 'login_user' | 'social_login_user';

@Table({ tableName: 'user_account', timestamps: false })
export class User extends Model<User> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, autoIncrement: true, field: 'user_id' })
    id!: number;

    @Column({ type: DataType.UUID, unique: true, allowNull: false, field: 'user_uuid' })
    uuid!: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    firstName!: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    lastName!: string;

    @Column({ type: DataType.CHAR(1), allowNull: false })
    gender!: string;

    @Column({ type: DataType.DATE, allowNull: false })
    dateOfBirth!: Date;

    @Column({ type: DataType.STRING(20), allowNull: false, field: 'user_type' })
    type!: UserType;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER, allowNull: false })
    roleId!: number;

    @BelongsTo(() => Role)
    role!: Role;
}
