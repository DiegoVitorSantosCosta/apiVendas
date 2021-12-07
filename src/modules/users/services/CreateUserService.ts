
import AppError from '@shared/erros/AppErros';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const emailExists = await usersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used.');
        }

        const hashPassword = await hash(password, 8);
        const user = usersRepository.create({
            name,
            email,
            password: hashPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;