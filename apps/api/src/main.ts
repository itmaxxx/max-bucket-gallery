import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Message, User } from '@max-bucket-gallery/api-interfaces';
import { UserModel } from './models';
import { createJwt } from './utils/jwt';
import { RequestWithUser } from './types';
import { computeSHA256 } from './utils/computeSHA256';

dotenv.config();
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } =
  process.env;

const app = express();
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);
app.use(passport.initialize());

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

app.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }),
  (req, res) => {
    const msg: Message = { message: 'Trying to authenticate' };

    return res.send(msg);
  }
);

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: RequestWithUser, res) => {
    const jwt = createJwt(req.user._id);

    return res.redirect(`http://localhost:4200/success?token=${jwt}`);
  }
);

try {
  const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
  console.log(url);
  mongoose.connect(url).then(async () => {
    console.log('MongoDB is connected');
  });
} catch (err) {
  console.error(err);
}

app.get('/api', (req, res) => {
  res.send({ message: 'Hello' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
