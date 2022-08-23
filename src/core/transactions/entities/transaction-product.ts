import { Table, Model, Column, ForeignKey, DataType } from "sequelize-typescript";
import {Fix} from "@app/common/fix-model-sequelize";
import {Product} from "@app/core/products/entities/product";
import {Transaction} from "@app/core/transactions/entities/transaction";

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  modelName: 'TransactionProduct',
  tableName: "transaction_product",
})
@Fix
export class TransactionProduct extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
    quantity!: number;

  @ForeignKey(() => Transaction)
    transactionId: number;

  @ForeignKey(() => Product)
    productId: number;
}