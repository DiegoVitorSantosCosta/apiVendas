import AppError from "@shared/erros/AppErros";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth';

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;


    if (!authHeader) {
        throw new AppError('JWT ta faltando !', 401);
    }

    const [token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        return next();
    } catch (error) {
        throw new AppError('Token invalido', 401);
    }


}