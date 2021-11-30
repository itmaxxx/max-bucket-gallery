import { Router } from 'express';
import ImagesController from '../controllers/imagesController';
import { isAuthorized } from '../middlewares/isAuthorized';
import { hasPermissionToImage } from '../middlewares/hasPermissionToImage';
import ImagesService from '../services/imagesService';

/**
 * @swagger
 * components:
 *  schemas:
 *    Image:
 *      type: object
 *      required:
 *        - user
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the image
 *        user:
 *          type: string
 *          description: Image owner
 *        imageId:
 *          type: string
 *          description: Image id in image-serving-api
 *        originalImage:
 *          type: string
 *          description: Full url to original image with extension
 *        createdAt:
 *          type: date
 *          description: Date when image was uploaded
 *        deletedAt:
 *          type: date
 *          description: Date when image was deleted
 *      example:
 *        _id: 61a5f769c2e9c29fbb29b778
 *        user: 61a5f769c2e9c29fbb29b779
 *        imageId: 61a5f769c2e9c29fbb29b777
 *        originalImage: http://localhost:3000/uploads/61a5f869c2e9c29fbb29b77c.png
 *        createdAt: 2021-11-30T10:09:48.716Z
 */

/**
 * @swagger
 * tags:
 *  name: Images
 *  description: Images managing api
 */

const router = Router();
const imagesController = new ImagesController();
const imagesService = new ImagesService();

router.post('/', isAuthorized, imagesController.uploadImage);

router.get('/:userId', isAuthorized, imagesController.getUserImages);

router.delete('/:imageId', isAuthorized, hasPermissionToImage(imagesService), imagesController.deleteImageById);

export default router;
