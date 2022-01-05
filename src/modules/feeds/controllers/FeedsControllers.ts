import CreateFeedService from "../services/CreateFeedsService";
import { Request, Response } from 'express';
import ListUserService from "@modules/users/services/ListUserService";
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export default class FeedsController {

    public async index(request: Request, response: Response): Promise<Response> {

        const listFeed = new CreateFeedService();

        const feed: any = await listFeed.listFeed(request, response);

        return response.json(feed);
    }


    public async create(request: Request, response: Response): Promise<Response> {
        var { nomeUsuario, idUsuario, descricao, foto, avatar } = request.body;

        if (foto) {
            const nomeImagem = `${Date.now()}${crypto.randomBytes(20).toString('hex')}.png`;
            const filePath = path.resolve(__dirname, '..', '..', '..', '..', 'imagensDosFeeds', nomeImagem);

            fs.writeFile(filePath, request.body.foto, 'base64', (err) => {

                if (err) {
                    console.log(err);
                }
            });

            foto = nomeImagem;
        }
        // avatar = "http://localhost:3000/semfoto.png"

        const createFeed = new CreateFeedService();

        const feed = await createFeed.execute({ nomeUsuario, idUsuario, descricao, foto, avatar })

        return response.json(feed);
    }

    public async show(request: Request, response: Response): Promise<Response> {

        const listFeed = new CreateFeedService();

        const feed: any = await listFeed.listAllFeeds(request, response);


        return response.json({ feed });
    }


    public async delete(request: Request, response: Response): Promise<Response> {

        const idFeed = request.body.idFeed;

        const listFeed = new CreateFeedService();

        const feed = await listFeed.delete(request.user.id, idFeed);

        return response.json(true);
    }

}

