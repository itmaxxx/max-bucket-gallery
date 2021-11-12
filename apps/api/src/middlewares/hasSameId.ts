import { RequestWithUser } from '../types';
import {Response, NextFunction} from 'express';
import { Types } from 'mongoose';

export const hasSameId = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const reqId = new Types.ObjectId(req.params.userId);

  if (reqId.equals(req.user._id)) {
    next();
  } else {
    return res
      .status(403)
      .json({ error: 'Not enough rights to make this action' });
  }
};
