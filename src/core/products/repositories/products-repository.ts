import {NonNullFindOptions, Op} from "sequelize";
import {Product} from "@app/core/products/entities/product";
import {Category} from "@app/core/categories/entities/category";
import {ProductCategory} from "@app/core/products/entities/product-category";
import {User} from "@app/core/users/entities/user";

export class ProductsRepository {

  async create (productData: Product) {
    let product = Product.build(productData);
    product.status = product.quantity > 0;
    product = await product.save();
    return product;
  }

  async associateCategoryToProduct (category: Category, product: Product) {
    await ProductCategory.destroy({
      where: {
        productId: product.id
      }, force: true
    });

    const productCategory = await ProductCategory.create({
      productId: product.id,
      categoryId: category.id
    });
    return productCategory;
  }

  async update (product: Product, productData: any) {
    product.status = product.quantity > 0;
    product.update(productData);
    product = await product.save();
    return product;
  }

  async getProductById (productId: string) {
    return await Product.findOne({where: {id: productId}} as NonNullFindOptions);
  }

  async getProductByIdFromUser (productId: string, user: User) {
    return await Product.findOne({
      where: {
        id: productId,
        sellerUserId: user.id
      }
    } as NonNullFindOptions);
  }

  async getAllProducts () {
    return await Product.findAll();
  }

  async getAllProductsByUser (user: User) {
    return await Product.findAll({
      where: {
        sellerUserId: user.id
      }
    });
  }

  async deleteProduct (productId: string) {
    const product = await Product.findOne({where: {id: productId}} as NonNullFindOptions);
    await product.destroy();
    return true;
  }

  async existProductName (name: string|null|undefined, excludeNames=[]) {
    if (!name) {
      return false;
    }
    const product = await Product.findOne({
      where: {
        [Op.and] : [
          {
            name: name
          },
          {
            name: {[Op.notIn]:excludeNames}
          }
        ]
      }
    } as NonNullFindOptions);

    return !!product;
  }
}
