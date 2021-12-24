"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("@config/auth"));
const AppErros_1 = __importDefault(require("src/shared/erros/AppErros"));
;
function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppErros_1.default('O token não foi enviado !', 401);
    }
    const [token] = authHeader.split(' ');
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, auth_1.default.jwt.secret);
        const { sub } = decoded;
        req.user = { id: sub };
        return next();
    }
    catch (error) {
        throw new AppErros_1.default('Token invalido', 401);
    }
}
exports.default = isAuthenticated;
