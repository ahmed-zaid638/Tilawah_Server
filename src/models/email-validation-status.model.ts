import { Model, Table, Column, PrimaryKey, DataType } from 'sequelize-typescript';

@Table({ tableName: 'email_validation_status', timestamps: false })
export class EmailValidationStatus extends Model<EmailValidationStatus> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, autoIncrement: true })
    emailValidationStatusId!: number;

    @Column({ type: DataType.STRING(20), allowNull: false })
    statusDescription!: string;
}
