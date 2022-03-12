import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createConnection } from 'typeorm';
import { routes } from './routes';

dotenv.config();

createConnection().then(async () => {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: ['*'],
    })
  );

  routes(app);

  app.listen(8000, () => {
    console.log('listening to port 8000');
  });
});
