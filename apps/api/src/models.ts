import { getModelForClass } from '@typegoose/typegoose';
import { User, Image } from '@max-bucket-gallery/api-interfaces';

export const UserModel = getModelForClass(User);
export const ImageModel = getModelForClass(Image);
