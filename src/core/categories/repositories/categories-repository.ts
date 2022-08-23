import {NonNullFindOptions, Op} from "sequelize";
import {Category} from "@app/core/categories/entities/category";

export class CategoriesRepository {

  async create (categoryData: Category) {
    let category = Category.build(categoryData);
    category = await category.save();
    return category;
  }

  async update (category: Category, categoryData: Category) {
    category.update(categoryData);
    category = await category.save();
    return category;
  }

  async getCategoryById (categoryId: string) {
    return await Category.findOne({where: {id: categoryId}} as NonNullFindOptions);
  }

  async getAllCategories () {
    return await Category.findAll();
  }

  async deleteCategory (categoryId: string) {
    const category = await Category.findOne({where: {id: categoryId}} as NonNullFindOptions);
    await category.destroy();
    return true;
  }

  async existCategoryName (name: string|null|undefined, excludeNames=[]) {
    if (!name) {
      return false;
    }
    const category = await Category.findOne({
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
    return !!category;
  }
}
