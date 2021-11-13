import { ImageModel } from "../models";
import { Image } from '@max-bucket-gallery/api-interfaces';

class ImagesService {
  imageModel = ImageModel;

  public async addImage(image: Image) {
    return this.imageModel.create(image);
  }
}

export default ImagesService;
