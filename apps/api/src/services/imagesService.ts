import { ImageModel } from "../models";
import { Image } from '@max-bucket-gallery/api-interfaces';
import { Types } from "mongoose";

class ImagesService {
  imageModel = ImageModel;

  public async addImage(image: Image) {
    return this.imageModel.create(image);
  }

  public async getUserImages(userId: Types.ObjectId) {
    return this.imageModel.find({ user: userId, deletedAt: null });
  }
}

export default ImagesService;
