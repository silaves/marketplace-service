import { Table, Model, BelongsToMany, BelongsTo } from "sequelize-typescript";
import {Fix} from "@app/common/fix-model-sequelize";
import {Product} from "@app/core/products/entities/product";
import {User} from "@app/core/users/entities/user";
import {TransactionProduct} from "@app/core/transactions/entities/transaction-product";

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  modelName: 'Transaction',
  tableName: "transaction",
})
@Fix
export class Transaction extends Model {
  @BelongsTo(() => User, 'buyerUserId')
    user: User;

  @BelongsToMany(() => Product, () => TransactionProduct)
    products: Product[]
}