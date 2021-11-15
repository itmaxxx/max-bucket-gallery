import { UserModel } from '../models';
import { User } from '@max-bucket-gallery/api-interfaces';
import { Types } from 'mongoose';

export interface IUsersService {
  findUserById(id: Types.ObjectId);
  addUser(user: User);
  findUserByEmail(email: string);
}

class UsersService implements IUsersService {
  userModel = UserModel;

  public async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  public async findUserById(id: Types.ObjectId) {
    return this.userModel.findOne({ _id: id });
  }

  public async addUser(user: User) {
    return this.userModel.create(user);
  }
}

export default UsersService;
