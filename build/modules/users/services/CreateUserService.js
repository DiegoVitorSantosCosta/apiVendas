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
const bcryptjs_1 = require("bcryptjs");
const AppErros_1 = __importDefault(require("src/shared/erros/AppErros"));
const typeorm_1 = require("typeorm");
const UserRepository_1 = __importDefault(require("../typeorm/repositories/UserRepository"));
class CreateUserService {
    execute({ name, email, password, nome_usuario, telefone }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.default);
            const emailExists = yield usersRepository.findByEmail(email);
            if (emailExists) {
                throw new AppErros_1.default('Email address already used.');
            }
            const hashPassword = yield (0, bcryptjs_1.hash)(password, 8);
            const user = usersRepository.create({
                name,
                email,
                password: hashPassword,
                telefone,
                nome_usuario
            });
            yield usersRepository.save(user);
            return user;
        });
    }
}
exports.default = CreateUserService;
