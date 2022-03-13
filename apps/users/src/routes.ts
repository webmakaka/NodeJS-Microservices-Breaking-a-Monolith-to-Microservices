import { Router } from 'express';
import {
  AuthenticatedUser,
  Login,
  Register,
} from './controller/auth.controller';
import { AuthMiddleware } from './middleware/auth.middleware';

export const routes = (router: Router) => {
  router.post('/api/register', Register);
  router.post('/api/login', Login);
  router.get('/api/user', AuthMiddleware, AuthenticatedUser);
};
