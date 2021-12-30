import AppError from 'src/shared/erros/AppErros';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import { isAfter, addHours } from "date-fns";
import { hash } from 'bcryptjs';
interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {

    public async execute({ password, token }: IRequest): Promise<void> {

        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenReposytory = getCustomRepository(UserTokenRepository);

        const userToken: any = await userTokenReposytory.findByToken(token);

        const user = await usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('Token não existe.');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2); // 2 horas é o tempo de expiração do token, caso o token seja expirado, ele não é mais valido

        if (isAfter(Date.now(), compareDate)) {  // verifica se a data atual é maior que a data de expiração do token
            throw new AppError('Token expirado.');
        }

        user.password = await hash(password, 8);

        await usersRepository.save(user);
    }
}

export default ResetPasswordService;