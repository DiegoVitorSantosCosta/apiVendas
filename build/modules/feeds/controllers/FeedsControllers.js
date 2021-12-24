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
const CreateFeedsService_1 = __importDefault(require("../services/CreateFeedsService"));
class FeedsController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const listFeed = new CreateFeedsService_1.default();
            const feed = yield listFeed.listFeed(request, response);
            return response.json(feed);
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nomeUsuario, idUsuario, descricao, foto, avatar } = request.body;
            const createFeed = new CreateFeedsService_1.default();
            const feed = yield createFeed.execute({ nomeUsuario, idUsuario, descricao, foto, avatar });
            return response.json(feed);
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const listFeed = new CreateFeedsService_1.default();
            const feed = yield listFeed.listAllFeeds(request, response);
            return response.json({ feed });
        });
    }
}
exports.default = FeedsController;
