import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

export const createJwt = (
  userId: Types.ObjectId,
  expires = 3 * 30 * 24 * 60 * 60 * 1000
): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: expires,
  });
};

export const verifyJwt = async (
  token: string
): Promise<{ error?: string; userId?: string }> => {
  if (!token) return { error: 'Invalid token' };
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      err ? reject({ error: 'Failed to verify jwt' }) : resolve(decodedToken);
    });
  });
};
