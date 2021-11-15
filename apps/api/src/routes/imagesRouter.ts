import { Router } from 'express';
import ImagesController from '../controllers/imagesController';
import { isAuthorized } from '../middlewares/isAuthorized';
import { hasPermissionToImage } from '../middlewares/hasPermissionToImage';
import ImagesService from '../services/imagesService';

const router = Router();
const imagesController = new ImagesController();
const imagesService = new ImagesService();

router.post('/', isAuthorized, imagesController.uploadImage);

router.get('/:userId', isAuthorized, imagesController.getUserImages);

router.delete('/:imageId', isAuthorized, hasPermissionToImage(imagesService), imagesController.deleteImageById);

export default router;
