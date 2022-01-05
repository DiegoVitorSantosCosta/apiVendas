import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import uploadConfig from '@config/upload';
import User from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UserRepository';
import AppError from '../../../shared/erros/AppErros';
import crypto from 'crypto';

interface IRequest {
    userId: string;
    avatarFilename: any;
}

class UpdateUserAvatarService {
    public async execute({ userId, avatarFilename }: IRequest): Promise<User | undefined> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found.');
        }
        const nomeImagem = `${Date.now()}${crypto.randomBytes(20).toString('hex')}.png`;

        const filePath = path.resolve(__dirname, '..', '..', '..', '..', 'uploads', nomeImagem);

        fs.writeFile(filePath, avatarFilename, 'base64', (err) => {

            if (err) {
                console.log(err);
            }
        });


        if (user.avatar) {
            const diretorio = path.resolve(__dirname, '..', '..', '..', '..', 'uploads', user.avatar);


            const userAvatarFilePath = path.join(diretorio);

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = nomeImagem;


        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;