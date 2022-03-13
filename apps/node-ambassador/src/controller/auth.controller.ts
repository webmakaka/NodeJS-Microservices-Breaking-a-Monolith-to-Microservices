import axios from 'axios';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Order } from '../entity/order.entity';

export const Register = async (req: Request, res: Response) => {
  const body = req.body;

  const response = await axios.post(
    'http://host.docker.internal:8001/api/register',
    {
      ...body,
      is_ambassador: req.path === '/api/ambassador/register',
    }
  );

  res.send(response.data);
};

export const Login = async (req: Request, res: Response) => {
  const body = req.body;

  const { data } = await axios.post(
    'http://host.docker.internal:8001/api/login',
    {
      ...body,
      scope: req.path === '/api/admin/login' ? 'admin' : 'ambassador',
    }
  );

  res.cookie('jwt', data['jwt'], {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, //1 day
  });

  res.send({
    message: 'success',
  });
};

export const AuthenticatedUser = async (req: Request, res: Response) => {
  const user = req['user'];

  if (req.path === '/api/admin/user') {
    return res.send(user);
  }

  const orders = await getRepository(Order).find({
    where: {
      user_id: user['id'],
      complete: true,
    },
    relations: ['order_items'],
  });

  user['revenue'] = orders.reduce((s, o) => s + o.ambassador_revenue, 0);

  res.send(user);
};

export const Logout = async (req: Request, res: Response) => {
  const jwt = req.cookies['jwt'];

  await axios.post(
    'http://host.docker.internal:8001/api/logout',
    {},
    {
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    }
  );

  res.cookie('jwt', '', { maxAge: 0 });

  res.send({
    message: 'success',
  });
};

export const UpdateInfo = async (req: Request, res: Response) => {
  const jwt = req.cookies['jwt'];
  const { data } = await axios.put(
    'http://host.docker.internal:8001/api/users/info',
    req.body,
    {
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    }
  );

  res.send(data);
};

export const UpdatePassword = async (req: Request, res: Response) => {
  const jwt = req.cookies['jwt'];
  const { data } = await axios.put(
    'http://host.docker.internal:8001/api/users/password',
    req.body,
    {
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    }
  );

  res.send(data);
};
