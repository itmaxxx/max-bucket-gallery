import { Router } from 'express';
import ImagesController from '../controllers/imagesController';
import { isAuthorized } from '../middlewares/isAuthorized';

const router = Router();
const imagesController = new ImagesController();

router.post('/', isAuthorized, imagesController.uploadImage);

router.get('/:userId', isAuthorized, imagesController.getUserImages);

export default router;
