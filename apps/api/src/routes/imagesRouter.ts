import { Router, Response } from 'express';
import ImagesController from '../controllers/imagesController';
import { isAuthorized } from '../middlewares/isAuthorized';
import { RequestWithUserAndFiles } from '../types';

const router = Router();
const imagesController = new ImagesController();

router.post(
  '/',
  isAuthorized,
  async (req: RequestWithUserAndFiles, res: Response) => {
    await imagesController.uploadImage(req, res);
  }
);

export default router;
