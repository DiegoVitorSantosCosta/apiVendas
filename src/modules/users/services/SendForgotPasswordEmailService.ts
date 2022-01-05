import EtherealMail from '@config/mail/EtherealMail';
import AppError from 'src/shared/erros/AppErros';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import path from 'path';

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {

    public async execute({ email }: IRequest): Promise<void> {

        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenReposytory = getCustomRepository(UserTokenRepository);

        const usuario: any = await usersRepository.findByEmail(email);

        if (!usuario) {
            throw new AppError('Usuario não encontrado.', 404);
        }

        const { token }: any = await userTokenReposytory.generated(usuario.id);  // pega o token gerado que é um uuid 

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');  // pega o template do email

        await EtherealMail.sendMail({
            to: {
                name: usuario.name,
                email: usuario.email
            },
            subject: 'Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: usuario.name,
                    link: `http://localhost:8100/login/reset_password?token=${token}`
                }
            }
        });

    }
}

export default SendForgotPasswordEmailService;