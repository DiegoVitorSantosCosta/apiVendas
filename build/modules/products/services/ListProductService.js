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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ProductsRepository_1 = require("../typeorm/repositories/ProductsRepository");
class ListProductService {
    constructor() { }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const produtsRepository = (0, typeorm_1.getCustomRepository)(ProductsRepository_1.ProductRepository);
            const products = yield produtsRepository.find(); // pega tudo que existe no banco e armaneza na variavél.
            return products;
        });
    }
}
exports.default = ListProductService;
