import EtherealMail from '@config/mail/EtherealMail';
import AppError from 'src/shared/erros/AppErros';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {

    public async execute({ email }: IRequest): Promise<void> {

        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenReposytory = getCustomRepository(UserTokenRepository);

        const emailExists: any = await usersRepository.findByEmail(email);

        if (!emailExists) {
            throw new AppError('User not found.', 404);
        }

        const { token }: any = await userTokenReposytory.generated(emailExists.id);

        await EtherealMail.sendMail({
            to: {
                name: emailExists.name,
                email: emailExists.email
            },
            subject: 'Recuperação de senha',
            templateData: {
                template: `Olá {{ name }} : {{ token }}`,
                variables: {
                    name: emailExists.name,
                    token
                }
            }
        });

    }
}

export default SendForgotPasswordEmailService;