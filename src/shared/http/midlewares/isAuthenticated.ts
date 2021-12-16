
import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth';
import AppError from "src/shared/erros/AppErros";

export interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
};

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('O token não foi enviado !', 401);
    }

    const [token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as ITokenPayload;

        req.user = { id: sub };

        return next();
    } catch (error) {
        throw new AppError('Token invalido', 401);
    }


}