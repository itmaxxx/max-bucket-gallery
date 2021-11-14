import { ImageModel } from '../models';
import { Image } from '@max-bucket-gallery/api-interfaces';
import { Types } from 'mongoose';

class ImagesService {
  imageModel = ImageModel;

  public async addImage(image: Image) {
    return this.imageModel.create(image);
  }

  public async getUserImages(userId: Types.ObjectId) {
    return this.imageModel
      .find({ user: userId, deletedAt: null })
      .sort({ createdAt: -1 })
      .populate({
        path: 'user',
        select: '_id fullName profilePicture',
      })
      .exec();
  }
}

export default ImagesService;
