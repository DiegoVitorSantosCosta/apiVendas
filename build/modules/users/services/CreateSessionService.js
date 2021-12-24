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
const AppErros_1 = __importDefault(require("@shared/erros/AppErros"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("@config/auth"));
const typeorm_1 = require("typeorm");
const UserRepository_1 = __importDefault(require("../typeorm/repositories/UserRepository"));
class CreateSessionsService {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.default);
            const user = yield usersRepository.findByEmail(email);
            if (!user) {
                throw new AppErros_1.default('Email ou senha invalidos.', 401);
            }
            const passwordConfirmed = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordConfirmed) {
                throw new AppErros_1.default('Email ou senha invalidos.', 401);
            }
            const token = (0, jsonwebtoken_1.sign)({}, auth_1.default.jwt.secret, {
                expiresIn: auth_1.default.jwt.expiresIn,
                subject: user.id.toString()
            });
            return {
                user,
                token
            };
        });
    }
}
exports.default = CreateSessionsService;
