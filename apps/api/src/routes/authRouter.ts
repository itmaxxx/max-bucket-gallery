import { Router, Response, Request } from 'express';
import { hasRequiredFields } from '../middlewares/hasRequiredFields';
import { RequestWithUser } from '../types';
import { createJwt } from '../utils/jwt';
import passport from 'passport';

const router = Router();

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
  (req: RequestWithUser, res: Response) => {
    const jwt = createJwt(req.user._id);

    return res.redirect(
      process.env.NX_FRONTEND_URL + `/auth/success?token=${jwt}`
    );
  }
);

export default router;
