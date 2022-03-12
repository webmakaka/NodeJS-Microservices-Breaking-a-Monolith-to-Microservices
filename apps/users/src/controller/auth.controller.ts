import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';

export const Register = async (req: Request, res: Response) => {
  const { password, password_confirm, ...body } = req.body;

  if (password !== password_confirm) {
    return res.status(400).send({
      message: "Password's do not match!",
    });
  }

  const user = await getRepository(User).save({
    ...body,
    password: await bcryptjs.hash(password, 10),
  });

  delete user.password;

  res.send(user);
};
