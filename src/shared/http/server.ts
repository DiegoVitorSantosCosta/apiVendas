import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import cors from 'cors';
import routes from './routes';
import AppError from '../erros/AppErros';
import "@shared/typeorm";
import { errors } from "celebrate";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());


// isso é um middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof AppError) {

    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Erro no servidor interno'
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}! 🏆`);
});
