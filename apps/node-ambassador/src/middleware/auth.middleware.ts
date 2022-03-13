import axios from 'axios';
import { Request, Response } from 'express';

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const jwt = req.cookies['jwt'];

    const { data } = await axios.get(
      'http://host.docker.internal:8001/api/user',
      {
        headers: {
          Cookie: `jwt=${jwt}`,
        },
      }
    );

    req['user'] = data;

    next();
  } catch (e) {
    return res.status(401).send({
      message: 'unauthenticated',
    });
  }
};
