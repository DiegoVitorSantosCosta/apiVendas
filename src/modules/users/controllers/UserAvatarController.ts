import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateAvatarService';

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateAvatar = new UpdateUserAvatarService();


        const user: any = await updateAvatar.execute({
            userId: request.user.id,
            avatarFilename: request.file?.filename
        });

        user.avatar = "http://localhost:3000/" + user.avatar;
        return response.json(user);

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