import { Table, Model, Column, DataType, BelongsTo, BelongsToMany } from "sequelize-typescript";
import {Fix} from "@app/common/fix-model-sequelize";
import {User} from "@app/core/users/entities/user";
import {Category} from "@app/core/categories/entities/category";
import {ProductCategory} from "@app/core/products/entities/product-category";
import {Transaction} from "@app/core/transactions/entities/transaction";
import {TransactionProduct} from "@app/core/transactions/entities/transaction-product";

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  modelName: 'Product',
  tableName: "product",
})
@Fix
export class Product extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
    description!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
    quantity!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
    status!: boolean;

  @BelongsTo(() => User, 'sellerUserId')
    user: User;

  @BelongsToMany(() => Category, () => ProductCategory)
    categories: Category[]

  @BelongsToMany(() => Transaction, () => TransactionProduct)
    transactions: Transaction[]
}