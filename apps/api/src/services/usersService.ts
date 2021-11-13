import { UserModel } from '../models';
import { User } from '@max-bucket-gallery/api-interfaces';
import { Types } from 'mongoose';

class UsersService {
  userModel = UserModel;

  public async findUserById(id: Types.ObjectId) {
    return this.userModel.findOne({ _id: id });
  }

  public async addUser(user: User) {
    return this.userModel.create(user);
  }
}

export default UsersService;
