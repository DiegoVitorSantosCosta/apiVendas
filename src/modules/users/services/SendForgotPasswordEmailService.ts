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

        const token = await userTokenReposytory.generated(emailExists.id);
        console.log(token);

    }
}

export default SendForgotPasswordEmailService;