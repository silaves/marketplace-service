import {Table, Model, Column, DataType, BelongsToMany} from "sequelize-typescript";
import {Fix} from "@app/common/fix-model-sequelize";
import {ProductCategory} from "@app/core/products/entities/product-category";
import {Product} from "@app/core/products/entities/product";

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
  modelName: 'Category',
  tableName: "category",
})
@Fix
export class Category extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
    name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
    description!: string;

  @BelongsToMany(() => Product, () => ProductCategory)
    products: Product[]
}