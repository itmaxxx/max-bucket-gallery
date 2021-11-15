import { ImageModel } from '../models';
import { Image } from '@max-bucket-gallery/api-interfaces';
import { Types } from 'mongoose';

export interface IImagesService {
  findImageById(imageId: Types.ObjectId);
  deleteImageById(imageId: Types.ObjectId);
  addImage(image: Image);
  getUserImages(userId: Types.ObjectId);
}

class ImagesService implements IImagesService {
  imageModel = ImageModel;

  public async findImageById(imageId: Types.ObjectId) {
    return this.imageModel.findOne({ _id: imageId });
  }

  public async deleteImageById(imageId: Types.ObjectId) {
    return this.imageModel.updateOne(
      { _id: imageId },
      { deletedAt: new Date() },
      { new: true }
    );
  }

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
