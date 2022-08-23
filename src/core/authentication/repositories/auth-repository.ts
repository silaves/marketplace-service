import bcrypt from "bcrypt";
import {User} from "@app/core/users/entities/user";
import {NonNullFindOptions} from "sequelize";

export class AuthRepository {

  async createUser (userData: User) {
    userData.password = this.makePassword(userData.password);
    let user = User.build(userData);
    user = await user.save();
    return user;
  }

  async getUserById (userId: string) {
    return await User.findOne({where: {id: userId}} as NonNullFindOptions);
  }

  async existEmail (email: string) {
    const user = await User.findOne({where: {email: email}} as NonNullFindOptions);
    return !!user;
  }

  async existUsername (name: string) {
    const user = await User.findOne({where: {name: name}} as NonNullFindOptions);
    return !!user;
  }

  makePassword (password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  comparePassword (currentPassword: string, password: string) {
    return bcrypt.compareSync(password, currentPassword.replace(/^\$2y/, "$2a"));
  }

  async authenticate (email: string, password: string) {
    const user = await User.findOne({where: {email: email}} as NonNullFindOptions);
    if (!user) {
      return null;
    }

    if (!this.comparePassword(user.password, password)) {
      return null;
    }
    return user;
  }
}
