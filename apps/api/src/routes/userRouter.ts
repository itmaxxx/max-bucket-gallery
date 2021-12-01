import { Router } from 'express';
import { isAuthorized } from '../middlewares/isAuthorized';
import UsersController from '../controllers/usersController';

const router = Router();
const usersController = new UsersController();

router.get('/me', isAuthorized, usersController.getCurrentUser);

router.get('/:userId/images', isAuthorized, usersController.getUserImages);

export default router;
