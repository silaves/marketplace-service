import { Table, Model, ForeignKey } from "sequelize-typescript";
import {Fix} from "@app/common/fix-model-sequelize";
import {Category} from "@app/core/categories/entities/category";
import {Product} from "@app/core/products/entities/product";

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  modelName: 'ProductCategory',
  tableName: "product_category",
})
@Fix
export class ProductCategory extends Model {
  @ForeignKey(() => Product)
    productId: number

  @ForeignKey(() => Category)
    categoryId: number
}