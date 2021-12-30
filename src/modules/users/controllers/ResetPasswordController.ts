import upload from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import { Request, Response } from 'express';
import path from 'path';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';
import ResetPasswordService from '../services/ResetPasswordService';


export default class ResetPasswordController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { password, token } = request.body;

        const resetPassword = new ResetPasswordService();

        await resetPassword.execute({
            password,
            token
        });
        return response.json({ message: 'Senha alterada com sucesso' });
    }

}