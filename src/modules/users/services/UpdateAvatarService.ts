import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import uploadConfig from '@config/upload';
import User from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UserRepository';
import AppError from '../../../shared/erros/AppErros';


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

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);


            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename


        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;