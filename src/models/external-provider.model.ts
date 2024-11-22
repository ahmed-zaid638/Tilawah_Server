import { Model, Table, Column, PrimaryKey, DataType } from 'sequelize-typescript';

@Table({ tableName: 'external_providers', timestamps: false })
export class ExternalProvider extends Model<ExternalProvider> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, autoIncrement: true })
    externalProviderId!: number;

    @Column({ type: DataType.UUID, unique: true, allowNull: false })
    externalProviderUuid!: string;

    @Column({ type: DataType.STRING(50), allowNull: false })
    providerName!: string;

    @Column({ type: DataType.STRING(200), allowNull: false })
    wsEndPoint!: string;
}
