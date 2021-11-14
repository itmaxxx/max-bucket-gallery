import { Router, Response, Request } from 'express';
import { hasRequiredFields } from '../middlewares/hasRequiredFields';
import passport from 'passport';
import AuthController from '../controllers/authController';

const router = Router();
const authController = new AuthController();

router.post(
  '/sign-in',
  hasRequiredFields(['email', 'password']),
  async (req: Request, res: Response) => {
    // await signIn(req, res);
  }
);

router.post(
  '/sign-up',
  hasRequiredFields(['fullName', 'email', 'password']),
  async (req: Request, res: Response) => {
    // await signUp(req, res);
  }
);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.NX_FRONTEND_URL + '/auth/failure',
  }),
  authController.googleCallback
);

export default router;
