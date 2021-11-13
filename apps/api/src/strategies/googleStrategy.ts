import { User } from '@max-bucket-gallery/api-interfaces';
import { UserModel } from '../models';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';

const setUpGoogleStrategy = () => {
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
}

export default setUpGoogleStrategy;
