import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class User {
  @prop({
    default: () => {
      return new Types.ObjectId();
    },
  })
  public _id?: Types.ObjectId;

  @prop({ type: String, select: false })
  public googleId?: string;

  @prop({
    required: true,
    maxlength: 128,
    minlength: 3,
  })
  public fullName!: string;

  @prop({
    required: true,
    maxlength: 128,
    minlength: 4,
  })
  public email!: string;

  @prop({ type: String, select: false })
  public hashedPassword?: string;

  @prop({
    maxlength: 256,
    default: null,
  })
  public profilePicture?: string;

  @prop({ type: Date, default: Date.now, select: false })
  public createdAt?: Date;

  @prop({ type: Date, default: null, select: false })
  public deletedAt?: Date;
}
