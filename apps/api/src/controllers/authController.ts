import { RequestWithUser } from '../types';
import { Response } from 'express';
import { createJwt } from '../utils/jwt';

class AuthController {
  public googleCallback = async (req: RequestWithUser, res: Response) => {
    const jwt = createJwt(req.user._id);

    return res.redirect(
      process.env.NX_FRONTEND_URL + `/auth/success?token=${jwt}`
    );
  };
}

export default AuthController;
