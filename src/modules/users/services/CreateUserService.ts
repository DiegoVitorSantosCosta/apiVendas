

import { hash } from 'bcryptjs';
import AppError from 'src/shared/erros/AppErros';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
    telefone: string;
    nome_usuario: string;
}

class CreateUserService {
    public async execute({ name, email, password, nome_usuario, telefone }: IRequest): Promise<User> {
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
            telefone,
            nome_usuario
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;