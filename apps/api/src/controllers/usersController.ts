import { UserModel } from '../models';
import { RequestWithUser } from '../types';
import { Response } from 'express';

class UsersController {
  public getCurrentUser = async (
    req: RequestWithUser,
    res: Response
  ): Promise<Response> => {
    try {
      const userData = await UserModel.findOne({ _id: req.user._id })
        .select('+email')
        .exec();

      if (!userData)
        return res
          .status(403)
          .json({ error: 'Failed to fetch current user data' });

      return res.status(200).json(userData);
    } catch (err) {
      return res.status(400).json({ error: 'Failed to get current user' });
    }
  };
}

export default UsersController;
