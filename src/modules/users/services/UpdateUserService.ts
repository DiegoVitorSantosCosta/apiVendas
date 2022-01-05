import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UserRepository';
import AppError from '../../../shared/erros/AppErros';
import IUser from '../../../interfaces/user.interface';
import { compare, hash } from 'bcryptjs';

class UpdateUser {
    public async update({ name, nome_usuario, password, old_password, telefone, email, id }: IUser): Promise<User | undefined> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user: any = await usersRepository.findById(id);

        if (!user) {
            throw new AppError('Usuario não existe.');
        }

        const existeEmail: any = await usersRepository.findByEmail(email);

        if (existeEmail && existeEmail.id != id) {
            throw new AppError('Email já cadastrado.');
        }

        if (password && !old_password) {
            throw new AppError('Informe a senha antiga.');
        }

        if (password && old_password) {
            const checarSenha = await compare(old_password, user.password);

            if (!checarSenha) {
                throw new AppError('Senha antiga não confere.');
            }

            user.password = await hash(password, 8);
        }

        user.name = name;
        user.nome_usuario = nome_usuario;
        user.telefone = telefone;
        user.email = email;

        await usersRepository.save(user);


        return user;
    }
}

export default UpdateUser;