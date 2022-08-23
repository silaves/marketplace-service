import {NonNullFindOptions} from "sequelize";
import {Transaction} from "@app/core/transactions/entities/transaction";
import {Product} from "@app/core/products/entities/product";
import {User} from "@app/core/users/entities/user";
import {TransactionProduct} from "@app/core/transactions/entities/transaction-product";

export class TransactionsRepository {

  async create (user: User, details: Array<any>) {
    const transaction = await Transaction.create({
      buyerUserId: user.id,
    });
    for (const item of details) {
      const product = await Product.findOne({where: {id: item.productId}} as NonNullFindOptions);
      await TransactionProduct.create({
        productId: product.id,
        quantity: item.quantity,
        transactionId: transaction.id
      });
      product.quantity = product.quantity - item.quantity;
      product.status = product.quantity > 0;
      await product.save()
    }
    return transaction;
  }

  async verifyTransaction (details: Array<any>) {
    const mergeDetails = [...new Set(details.map(d => d.productId))].map(productId => {
      return {
        productId,
        quantity: details.filter(d => d.productId === productId).map(d => d.quantity).reduce((a, b) => a + b, 0)
      };
    });

    for (const item of mergeDetails) {
      if (item.quantity <= 0) {
        return false;
      }

      const product = await Product.findOne({where: {id: item.productId}} as NonNullFindOptions);
      if (!product) {
        return false;
      }

      if ((product.quantity - item.quantity) < 0) {
        return false;
      }
    }
    return true;
  }

  async getTransactionById (transactionId: string) {
    return await Transaction.findOne({where: {id: transactionId}, include: Product} as NonNullFindOptions);
  }

  async getAllTransactions () {
    return await Transaction.findAll({ include: Product });
  }

  async getAllMySales (user: User) {
    const products = await Product.findAll({
      where: {
        sellerUserId: user.id
      },
    });

    const productsId = products.map(item => item.id);
    return await TransactionProduct.findAll({
      where: {
        productId: productsId
      }
    });
  }

  async getAllMyTransactions (user: User) {
    return await Transaction.findAll({
      where: {
        buyerUserId: user.id
      },
      include: Product
    });
  }

  async deleteTransaction (transactionId: string) {
    const transaction = await Transaction.findOne({where: {id: transactionId}} as NonNullFindOptions);
    const detailTransaction = await TransactionProduct.findAll({
      where: {
        transactionId: transaction.id
      }
    });

    detailTransaction.map(async item => {
      const product = await Product.findOne({where: {id: item.productId}} as NonNullFindOptions);
      product.quantity = product.quantity + item.quantity;
      product.status = product.quantity > 0;
      await product.save();
      await item.destroy();
    });

    await transaction.destroy();
    return true;
  }
}
