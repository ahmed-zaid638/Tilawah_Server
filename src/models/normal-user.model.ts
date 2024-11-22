import { Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';
import { UserLoginData } from './user-login-data.model';

@Table({ tableName: 'user_account', timestamps: false })
export class NormalUser extends User {
    @ForeignKey(() => UserLoginData)
    userId!: number;

    @BelongsTo(() => UserLoginData)
    loginData!: UserLoginData;
}
