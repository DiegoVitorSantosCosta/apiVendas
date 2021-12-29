import upload from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import { Request, Response } from 'express';
import path from 'path';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';


export default class ForgotPasswordController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

        await sendForgotPasswordEmail.execute({
            email
        });
        return response.json({ message: 'Email enviado com sucesso' });
    }

}