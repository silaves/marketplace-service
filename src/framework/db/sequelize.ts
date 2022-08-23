import { Sequelize } from "sequelize-typescript";
import {User} from "@app/core/users/entities/user";
import {Category} from "@app/core/categories/entities/category";
import {Product} from "@app/core/products/entities/product";
import {ProductCategory} from "@app/core/products/entities/product-category";
import {Transaction} from "@app/core/transactions/entities/transaction";
import {TransactionProduct} from "@app/core/transactions/entities/transaction-product";

const dialect = process.env.DB_DIALECT;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE_NAME;
const host = process.env.MYSQL_HOST;

export function initializeDB(){
  return new Sequelize({
    dialect: dialect,
    host: host,
    username: username,
    password: password,
    database: database,
    logging: false,
    models: [
      User,
      Category,
      Product,
      ProductCategory,
      Transaction,
      TransactionProduct,
    ],
  } as any);
}


// export default sequelize;


