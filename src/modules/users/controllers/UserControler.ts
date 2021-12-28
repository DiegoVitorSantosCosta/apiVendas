import upload from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import { Request, Response } from 'express';
import path from 'path';
import UpdateUser from '../services/UpdateUserService';
import CreateFeedService from "../../feeds/services/CreateFeedsService";

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listUser = new ListUserService();

        const users: any = await listUser.execute();
        users.map((user: any) => {
            if (user.avatar !== null) {
                user.avatar = `http://localhost:3000/${user.avatar}`;
            }
        })

        return response.json({ users: users });
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const listUser = new ListUserService();
        const user: any = await listUser.findById(id);

        user.avatar = `http://localhost:3000/${user.avatar}`;

        return response.json(user);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password, telefone, nome_usuario } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
            telefone,
            nome_usuario
        });

        return response.json(user);
    }


    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, email, password, telefone, nome_usuario } = request.body;


        const updateUser = new UpdateUser();

        const updateFeed = new CreateFeedService();

        const feed = await updateFeed.updateName(nome_usuario, id);

        console.log(feed);
        const user = await updateUser.update({
            name,
            email,
            password,
            telefone,
            nome_usuario,
            id
        });

        return response.json(user);
    }
}