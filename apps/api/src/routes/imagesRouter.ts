import { Router } from 'express';
import { isAuthorized } from '../middlewares/isAuthorized';
import { RequestWithUser, RequestWithUserAndFiles } from '../types';
import { uploadImage } from '../controllers/imagesController';

const router = Router();

router.get('/', isAuthorized, async (req: RequestWithUser, res) => {
  // await getCurrentUser(req, res);
});

router.post('/', isAuthorized, async (req: RequestWithUserAndFiles, res) => {
  await uploadImage(req, res);
});

export default router;
