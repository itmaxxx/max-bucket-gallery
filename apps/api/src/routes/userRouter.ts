import { Router } from 'express';
import { isAuthorized } from '../middlewares/isAuthorized';
import { hasSameId } from '../middlewares/hasSameId';
import { RequestWithUser } from '../types';
import UsersController from '../controllers/usersController';

const router = Router();
const usersController = new UsersController();

router.get('/me', isAuthorized, async (req: RequestWithUser, res) => {
  await usersController.getCurrentUser(req, res);
});

router.get('/:userId', isAuthorized, async (req, res) => {
  // await getUserInfo(req, res);
});

router.patch('/:userId', isAuthorized, hasSameId, async (req, res) => {
  // await editUserInfo(req, res);
});

export default router;
