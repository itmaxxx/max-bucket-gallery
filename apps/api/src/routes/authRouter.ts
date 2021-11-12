import { Router } from 'express';
import { hasRequiredFields } from '../middlewares/hasRequiredFields';
import { Message, User } from '@max-bucket-gallery/api-interfaces';
import { RequestWithUser } from '../types';
import { createJwt } from '../utils/jwt';
import passport from 'passport';
import { computeSHA256 } from '../utils/computeSHA256';
import { UserModel } from '../models';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const router = Router();

router.post('/signIn',
  hasRequiredFields(['email', 'password']),
  async (req, res) => {
  // await signIn(req, res);
});

router.post('/signUp',
  hasRequiredFields(['fullName', 'email', 'password']),
  async (req, res) => {
  // await signUp(req, res);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user: User = new User();
        user.googleId = profile.id;
        user.fullName = profile.displayName;
        user.email = profile.emails[0].value;
        user.profilePicture = profile.photos[0].value;
        user.secretKey = computeSHA256(profile.id + Math.random().toString());
        user.publicKey = computeSHA256(profile.emails[0].value + Math.random().toString());

        const exists = await UserModel.findOne({ googleId: user.googleId });

        if (exists) {
          return done(null, exists, 'Logged in');
        } else {
          const newUser = await UserModel.create(user);
          return done(null, newUser, 'Logged in, new user created');
        }
      } catch (err) {
        return done(err, null, 'Failed to log in');
      }
    }
  )
);

passport.serializeUser((user: User, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user: User) => {
    done(err, user);
  });
});

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }),
  (req, res) => {
    const msg: Message = { message: 'Trying to authenticate' };

    return res.send(msg);
  }
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: RequestWithUser, res) => {
    const jwt = createJwt(req.user._id);

    return res.redirect(process.env.NX_FRONTEND_URL + `/auth/success?token=${jwt}`);
  }
);

export default router;
