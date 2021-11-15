import { Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import { UserModel } from '../models';
import { RequestWithUser } from '../types';

export const isAuthorized = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).json({ error: 'Not authenticated' });

    const token = req.headers.authorization.split(' ')[1];

    await verifyJwt(token).then(async (result) => {
      if (result?.error)
        return res.status(401).json({ error: 'Bad authorization token' });

      req.user = await UserModel.findById(result.userId);

      return req.user
        ? next()
        : res.status(403).json({ error: 'User not found' });
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err.message || 'Authorization required' });
  }
};
