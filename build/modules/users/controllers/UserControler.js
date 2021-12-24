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
const CreateUserService_1 = __importDefault(require("@modules/users/services/CreateUserService"));
const ListUserService_1 = __importDefault(require("@modules/users/services/ListUserService"));
const UpdateUserService_1 = __importDefault(require("../services/UpdateUserService"));
class UsersController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const listUser = new ListUserService_1.default();
            const users = yield listUser.execute();
            users.map((user) => {
                if (user.avatar !== null) {
                    user.avatar = `http://localhost:3000/${user.avatar}`;
                }
            });
            return response.json({ users: users });
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const listUser = new ListUserService_1.default();
            const user = yield listUser.findById(id);
            user.avatar = `http://localhost:3000/${user.avatar}`;
            return response.json(user);
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, telefone, nome_usuario } = request.body;
            const createUser = new CreateUserService_1.default();
            const user = yield createUser.execute({
                name,
                email,
                password,
                telefone,
                nome_usuario
            });
            return response.json(user);
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { name, email, password, telefone, nome_usuario } = request.body;
            const updateUser = new UpdateUserService_1.default();
            const user = yield updateUser.update({
                name,
                email,
                password,
                telefone,
                nome_usuario,
                id
            });
            return response.json(user);
        });
    }
}
exports.default = UsersController;
