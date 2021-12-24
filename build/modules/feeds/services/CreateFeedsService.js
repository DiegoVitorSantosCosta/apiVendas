"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const FeedsRepository_1 = __importDefault(require("../typeorm/repositories/FeedsRepository"));
const UserRepository_1 = __importDefault(require("@modules/users/typeorm/repositories/UserRepository"));
const AppErros_1 = __importDefault(require("@shared/erros/AppErros"));
const ListUserService_1 = __importDefault(require("@modules/users/services/ListUserService"));
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
    execute({ nomeUsuario, idUsuario, descricao, foto, avatar }) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedRepository = yield (0, typeorm_1.getCustomRepository)(FeedsRepository_1.default);
            const user = yield (0, typeorm_1.getCustomRepository)(UserRepository_1.default);
            const userExists = yield user.findById(idUsuario.toString());
            if (!userExists) {
                throw new AppErros_1.default('Usuario não encontrado.');
            }
            const listUser = new ListUserService_1.default();
            console.log(user);
            avatar = yield `http://localhost:3000/${userExists === null || userExists === void 0 ? void 0 : userExists.avatar}`;
            const feed = feedRepository.create({
                nomeUsuario,
                idUsuario,
                descricao,
                foto,
                avatar
            });
            yield feedRepository.save(feed);
            return feed;
        });
    }
    listFeed(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedRepository = yield (0, typeorm_1.getCustomRepository)(FeedsRepository_1.default);
            const usersRepository = yield (0, typeorm_1.getCustomRepository)(UserRepository_1.default);
            const feed = yield feedRepository.findById(request.user.id);
            if (!feed) {
                throw new AppErros_1.default('Feed não encontrado.');
            }
            // const users = await usersRepository.find();
            return response.json(feed);
        });
    }
    listAllFeeds(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedRepository = yield (0, typeorm_1.getCustomRepository)(FeedsRepository_1.default);
            const feed = yield feedRepository.find();
            if (!feed) {
                throw new AppErros_1.default('Feed não encontrado.');
            }
            return response.json({ feed });
        });
    }
    update({ userId, avatarFilename }) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedRepository = (0, typeorm_1.getCustomRepository)(FeedsRepository_1.default);
            const feeds = yield feedRepository.findById(userId);
            if (!feeds) {
                throw new AppErros_1.default('Não existe feeds desse usuario.');
            }
            feeds.forEach((feed) => {
                feed.avatar = avatarFilename;
            });
            yield feedRepository.save(feeds);
            return feeds;
        });
    }
}
exports.default = CreateFeedService;
