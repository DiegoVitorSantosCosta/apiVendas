"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_routes_1 = __importDefault(require("@modules/users/routes/session.routes"));
const express_1 = require("express");
const products_router_1 = __importDefault(require("../../../modules/products/routes/products.router"));
const user_routes_1 = __importDefault(require("../../../modules/users/routes/user.routes"));
const post_routes_1 = __importDefault(require("../../../modules/feeds/routes/post.routes"));
const routes = (0, express_1.Router)();
routes.use('/feeds', post_routes_1.default);
routes.use('/products', products_router_1.default); // aqui estou dizendo que o endpoint /products vai usar todos metodos de productsRouter
routes.use('/users', user_routes_1.default);
routes.use('/sessions', session_routes_1.default);
exports.default = routes;
