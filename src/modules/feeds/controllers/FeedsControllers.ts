import CreateFeedService from "../services/CreateFeedsService";
import { Request, Response } from 'express';
import ListUserService from "@modules/users/services/ListUserService";

export default class FeedsController {

    public async index(request: Request, response: Response): Promise<Response> {

        const listFeed = new CreateFeedService();

        const feed = await listFeed.listFeed(request, response);

        return response.json(feed);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { nomeUsuario, idUsuario, descricao, foto, avatar } = request.body;



        const createFeed = new CreateFeedService();

        const feed = await createFeed.execute({ nomeUsuario, idUsuario, descricao, foto, avatar })

        return response.json(feed);
    }

    public async show(request: Request, response: Response): Promise<Response> {

        const listFeed = new CreateFeedService();

        const feed = await listFeed.listAllFeeds(request, response);

        return response.json({ feed });
    }

}

