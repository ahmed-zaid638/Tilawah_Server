import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';
import { EmailValidationStatus } from './email-validation-status.model';

@Table({ tableName: 'user_login_data', timestamps: false })
export class UserLoginData extends Model<UserLoginData> {
    @PrimaryKey
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId!: number;

    @Column({ type: DataType.STRING(20), allowNull: false })
    loginName!: string;

    @Column({ type: DataType.STRING(250), allowNull: false })
    passwordHash!: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    emailAddress!: string;

    @Column({ type: DataType.STRING(100) })
    confirmationToken?: string;

    @Column({ type: DataType.DATE })
    tokenGenerationTime?: Date;

    @ForeignKey(() => EmailValidationStatus)
    @Column({ type: DataType.INTEGER, allowNull: false })
    emailValidationStatusId!: number;

    @BelongsTo(() => EmailValidationStatus)
    emailValidationStatus!: EmailValidationStatus;
}
