import { RequestWithUser } from '../types';
import { Response } from 'express';
import UsersService from '../services/usersService';

class UsersController {
  usersService = new UsersService();

  public getCurrentUser = async (
    req: RequestWithUser,
    res: Response
  ): Promise<Response> => {
    try {
      const userData = await this.usersService.findUserById(req.user._id);

      if (!userData)
        return res.status(403).json({ error: 'Failed to get user' });

      return res.status(200).json(userData);
    } catch (err) {
      return res.status(400).json({ error: 'Failed to get user' });
    }
  };
}

export default UsersController;
