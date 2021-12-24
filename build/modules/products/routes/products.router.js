"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsControler_1 = __importDefault(require("@modules/products/controllers/ProductsControler"));
const celebrate_1 = require("celebrate");
const productsRouter = (0, express_1.Router)();
const productsControler = new ProductsControler_1.default();
productsRouter.get('/', productsControler.index);
productsRouter.get('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required().uuid(),
    },
}), productsControler.show);
productsRouter.post('/', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        price: celebrate_1.Joi.number().required(),
        quantity: celebrate_1.Joi.number().required(),
    },
}), productsControler.create);
productsRouter.put('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required().uuid(),
    },
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        price: celebrate_1.Joi.number().required(),
        quantity: celebrate_1.Joi.number().required(),
    },
}), productsControler.update);
productsRouter.delete('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required().uuid(),
    },
}), productsControler.delete);
exports.default = productsRouter;
