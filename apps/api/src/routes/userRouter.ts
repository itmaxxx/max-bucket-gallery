import { Router } from 'express';
import { isAuthorized } from '../middlewares/isAuthorized';
import { hasSameId } from '../middlewares/hasSameId';

const router = Router();

router.get('/me', isAuthorized, async (req, res) => {
  // await getCurrentUser(req, res);
});

router.get('/:userId', isAuthorized, async (req, res) => {
  // await getUserInfo(req, res);
});

router.patch('/:userId', isAuthorized, hasSameId, async (req, res) => {
  // await editUserInfo(req, res);
});

export default router;
