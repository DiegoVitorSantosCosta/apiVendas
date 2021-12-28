import Post from "../typeorm/entities/Post";
import { EntityRepository } from "typeorm";
import { Repository } from "typeorm";
import { getCustomRepository } from "typeorm";
import User from '../../users/typeorm/entities/Users';
import PostRepository from "../typeorm/repositories/FeedsRepository";
import UsersRepository from "@modules/users/typeorm/repositories/UserRepository";
import AppError from "@shared/erros/AppErros";
import { Request, Response } from "express";
import ListUserService from "@modules/users/services/ListUserService";

// export interface IFeeds {
//     id: number;
//     nomeUsuario: string;
//     idUsuario: number;
//     descricao: string;
//     foto: string;
//     created_at?: Date;
//     updated_at?: Date;

// }

class CreateFeedService {
    public async execute({ nomeUsuario, idUsuario, descricao, foto, avatar }: any): Promise<Post> {
        const feedRepository = await getCustomRepository(PostRepository);
        const user = await getCustomRepository(UsersRepository);
        const userExists = await user.findById(idUsuario.toString())

        if (!userExists) {
            throw new AppError('Usuario não encontrado.');
        }

        const listUser = new ListUserService();

        console.log(user);
        avatar = await `http://localhost:3000/${userExists?.avatar}`;

        const feed = feedRepository.create({
            nomeUsuario,
            idUsuario,
            descricao,
            foto,
            avatar
        });

        await feedRepository.save(feed);

        return feed;
    }

    public async listFeed(request: Request, response: Response): Promise<Response> {
        const feedRepository = await getCustomRepository(PostRepository);

        const usersRepository = await getCustomRepository(UsersRepository);

        const feed = await feedRepository.findById(request.user.id);

        if (!feed) {
            throw new AppError('Feed não encontrado.');
        }
        // const users = await usersRepository.find();

        return response.json(feed);
    }

    public async listAllFeeds(request: Request, response: Response): Promise<Response> {
        const feedRepository = await getCustomRepository(PostRepository);
        const feed = await feedRepository.find();

        if (!feed) {
            throw new AppError('Feed não encontrado.');
        }

        return response.json({ feed });
    }

    public async update({ userId, avatarFilename }: any): Promise<User | undefined> {
        const feedRepository = getCustomRepository(PostRepository);

        const feeds: any = await feedRepository.findById(userId);

        if (!feeds) {
            throw new AppError('Não existe feeds desse usuario.');
        }

        feeds.forEach((feed: any) => {
            feed.avatar = avatarFilename;
        });

        await feedRepository.save(feeds);

        return feeds;
    }

    public async updateName(nomeUsuario: string, userId: string): Promise<User | undefined> {
        const feedRepository = getCustomRepository(PostRepository);

        const feeds: any = await feedRepository.findById(userId);

        if (!feeds) {
            throw new AppError('Não existe feeds desse usuario.');
        }

        feeds.forEach((feed: any) => {
            feed.nomeUsuario = nomeUsuario;
        });

        await feedRepository.save(feeds);

        return feeds;
    }
}

export default CreateFeedService;