import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UserRepository';
import AppError from '../../../shared/erros/AppErros';
import IUser from '../../../interfaces/user.interface';

class UpdateUser {
    public async update({ name, nome_usuario, password, telefone, email, id }: IUser): Promise<User | undefined> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(id);

        if (!user) {
            throw new AppError('Usuario não existe.');
        }

        // const existeEmail = await usersRepository.findByEmail(email);

        user.name = name;
        user.nome_usuario = nome_usuario;
        user.telefone = telefone;
        user.email = email;

        await usersRepository.save(user);


        return user;
    }
}

export default UpdateUser;