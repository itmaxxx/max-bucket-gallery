import { RequestWithUser } from '../types';
import { NextFunction, Response } from 'express';
import { IImagesService } from '../services/imagesService';
import { Types } from 'mongoose';

export const hasPermissionToImage = (imagesService: IImagesService) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      if (!req.user)
        return res.status(401).json({ error: 'Not authenticated' });

      const image = await imagesService.findImageById(
        new Types.ObjectId(req.params.imageId)
      );

      if (image.user.toString() === req.user._id.toString()) {
        return next();
      }

      return res.status(403).json({ error: 'You don\'t have permission to requested image' });

    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
  };
};
