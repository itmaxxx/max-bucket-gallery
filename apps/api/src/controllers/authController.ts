import { RequestWithUser } from '../types';
import { Response } from 'express';
import { createJwt } from '../utils/jwt';
import UsersService from '../services/usersService';
import { User } from '@max-bucket-gallery/api-interfaces';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';

class AuthController {
  usersService = new UsersService();

  public googleCallback = async (req: RequestWithUser, res: Response) => {
    try {
      const jwt = createJwt(req.user._id);

      return res.redirect(
        process.env.NX_FRONTEND_URL + `/auth/success?token=${jwt}`
      );
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: 'Failed to handle google callback' });
    }
  };

  public signUp = async (req: RequestWithUser, res: Response) => {
    try {
      const { fullName, email, password } = req.body;

      const userWithEmail = await this.usersService.findUserByEmail(email);

      if (userWithEmail) {
        return res.status(400).json({ message: 'Email is taken' });
      }

      const userId = new Types.ObjectId();
      const passwordSalt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(password, passwordSalt);

      const user: User = {
        _id: userId,
        fullName,
        email,
        password: encryptedPassword,
      };

      await this.usersService.addUser(user);

      const jwt = createJwt(userId);

      return res
        .status(200)
        .json({ message: 'You have been successfully registered', jwt });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Failed to sign up' });
    }
  };

  public signIn = async (req: RequestWithUser, res: Response) => {
    try {
      const { email, password } = req.body;

      const userWithEmail = await this.usersService.findUserByEmailWithPassword(email);

      if (!userWithEmail) {
        return res.status(400).json({ message: 'Email not found' });
      }

      console.log(userWithEmail);

      if (!userWithEmail.password) {
        return res.status(400).json({ message: 'Failed to login. User registered using app' });
      }

      const passwordSalt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(password, passwordSalt);

      const passwordMatch = bcrypt.compare(
        userWithEmail.password,
        encryptedPassword
      );

      if (!passwordMatch) {
        throw new Error("Password doesn't match");
      }

      const jwt = createJwt(userWithEmail._id);

      return res
        .status(200)
        .json({ message: 'You have been successfully logged in', jwt });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Failed to sign in' });
    }
  };
}

export default AuthController;
