
import AppError from '@shared/erros/AppErros';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

// interface IResponse {
//     user: User; 

// }

class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<any> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email ou senha invalidos.', 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError('Email ou senha invalidos.', 401);
        }


        return user;
    }
}

export default CreateSessionsService;