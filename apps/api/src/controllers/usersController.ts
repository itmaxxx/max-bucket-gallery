import { RequestWithUser, RequestWithUserAndFiles } from '../types';
import { Response } from 'express';
import UsersService from '../services/usersService';
import ImagesService from '../services/imagesService';

class UsersController {
  usersService = new UsersService();
  imagesService = new ImagesService();

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

  public getUserImages = async (
    req: RequestWithUserAndFiles,
    res: Response
  ) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: 'Please, specify user id' });
      }

      const userImages = await this.imagesService.getUserImages(req.user._id);

      return res.json({
        data: userImages,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: 'Failed to get user images' });
    }
  };
}

export default UsersController;
