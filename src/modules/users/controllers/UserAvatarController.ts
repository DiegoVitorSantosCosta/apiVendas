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
        user.avatar = await "http://localhost:3000/" + user.avatar;

        await feedList.update({
            userId: request.user.id,
            avatarFilename: user.avatar

        });
        return response.json(user);

    }
}