import { User } from '@max-bucket-gallery/api-interfaces';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: User;
}
