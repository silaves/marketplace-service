import { Table, Model, Column, DataType, HasOne } from "sequelize-typescript";
import {Fix} from "@app/common/fix-model-sequelize";
import {Product} from "@app/core/products/entities/product";
import {Transaction} from "@app/core/transactions/entities/transaction";

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  modelName: 'User',
  tableName: "user",
})
@Fix
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
    isAdmin!: boolean;

  @HasOne(() => Product, 'sellerUserId')
    product: Product

  @HasOne(() => Transaction, 'buyerUserId')
    transaction: Transaction
}