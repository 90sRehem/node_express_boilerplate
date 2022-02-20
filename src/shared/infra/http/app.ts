import cors from 'cors';
import express, { Request, Response } from 'express';
import 'express-async-errors';

import { AppError } from '@utils/AppError';

import { router } from './routes';

export const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(router);

app.get('/', (_, response) => {
  response.send('Server Ok!');
});

app.use((err: Error, _request: Request, response: Response) => {
  if (err instanceof AppError) {
    console.error(err);

    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});
