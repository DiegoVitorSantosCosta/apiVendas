import CreateFeedService from '@modules/feeds/services/CreateFeedsService';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UpdateUserAvatarService from '../services/UpdateAvatarService';
import UsersRepository from '../typeorm/repositories/UserRepository';

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {

        const updateAvatar = new UpdateUserAvatarService();
        const feedList = new CreateFeedService();
        const feed: any = await feedList.listFeed(request, response);

        const user: any = await updateAvatar.execute({
            userId: request.user.id,
            avatarFilename: request.file?.filename
        });

        user.avatar = "http://localhost:3000/" + user.avatar;
        feedList.update({
            userId: request.user.id,
            avatarFilename: user.avatar

        })

        return response.json(feed);

    }

    // public async create(request: Request, response: Response): Promise<Response> {
    //     const { name, email, password, telefone, nome_usuario } = request.body;

    //     const createUser = new UpdateUserAvatarService();

    //     const user = await createUser.s({
    //         name,
    //         email,
    //         password,
    //         telefone,
    //         nome_usuario
    //     });

    //     return response.json(user);
    // }


}