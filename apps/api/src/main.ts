import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import imagesRouter from './routes/imagesRouter';
import formidableMiddleware from 'express-formidable';
import setUpGoogleStrategy from './strategies/googleStrategy';

dotenv.config();
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } =
  process.env;

try {
  const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
  mongoose.connect(url).then(async () => {
    console.log('MongoDB is connected');
  });
} catch (err) {
  console.error(err);
}

const app = express();
app.use(
  cors({
    origin: process.env.NX_FRONTEND_URL,
    credentials: true,
  })
);
app.use(passport.initialize());
setUpGoogleStrategy();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/images', formidableMiddleware());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/images', imagesRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
