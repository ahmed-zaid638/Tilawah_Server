import { Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';
import { UserLoginDataExternal } from './user-login-data-external.model';

@Table({ tableName: 'user_account', timestamps: false })
export class ExternalUser extends User {
    @ForeignKey(() => UserLoginDataExternal)
    userId!: number;

    @BelongsTo(() => UserLoginDataExternal)
    externalLoginData!: UserLoginDataExternal;
}
