import { prop, Ref } from '@typegoose/typegoose';
import { User } from './User';
import { Types } from 'mongoose';

export class Image {
  @prop({
    default: () => {
      return new Types.ObjectId();
    },
  })
  public _id?: Types.ObjectId;

  @prop({ ref: () => User })
  public user: Ref<User>;

  @prop({ type: String })
  public imageId?: string;

  @prop({ type: String })
  public originalImage?: string;

  @prop({ type: Date, default: Date.now })
  public createdAt?: Date;

  @prop({ type: Date, default: null, select: false })
  public deletedAt?: Date;
}
