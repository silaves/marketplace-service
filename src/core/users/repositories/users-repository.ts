import {Op} from "sequelize";
import {User} from "@app/core/users/entities/user";
import {NonNullFindOptions} from "sequelize";
import {parseJwt} from "@app/common/utils";

export class UsersRepository {

  async getUserByJWT (token) {
    const data = parseJwt(token);
    if (!data) {
      return null;
    }
    return await User.findOne({where: {id: data.userId}} as NonNullFindOptions);
  }

  async getUserById (userId: string) {
    return await User.findOne({where: {id: userId}} as NonNullFindOptions);
  }

  async getAllUsers () {
    return await User.findAll();
  }

  async deleteUser (userId: string) {
    const user = await User.findOne({where: {id: userId}} as NonNullFindOptions);
    await user.destroy();
    return true;
  }

  async existEmail (email: string|undefined|null, excludeEmails=[]) {
    if (!email) {
      return false;
    }
    const user = await User.findOne({
      where: {
        [Op.and] : [
          {
            email: email
          },
          {
            email: {[Op.notIn]:excludeEmails}
          }
        ]
      }
    } as NonNullFindOptions);
    return !!user;
  }

  async existUsername (name: string|undefined|null, excludeNames=[]) {
    if (!name) {
      return false;
    }
    const user = await User.findOne({
      where: {
        [Op.and] : [
          {
            name: name
          },
          {
            email: {[Op.notIn]:excludeNames}
          }
        ]
      }
    } as NonNullFindOptions);
    return !!user;
  }
}
