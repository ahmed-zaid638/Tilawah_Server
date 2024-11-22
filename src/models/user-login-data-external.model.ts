import { Model, Table, Column, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from './user.model';
import { ExternalProvider } from './external-provider.model';

@Table({ tableName: 'user_login_data_external', timestamps: false })
export class UserLoginDataExternal extends Model<UserLoginDataExternal> {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;

    @ForeignKey(() => ExternalProvider)
    @Column({ type: DataType.INTEGER, allowNull: false })
    externalProviderId!: number;

    @Column({ type: DataType.STRING(100), allowNull: false })
    externalProviderToken!: string;
}
