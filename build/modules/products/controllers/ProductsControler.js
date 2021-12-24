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
const CreateProductService_1 = __importDefault(require("@modules/products/services/CreateProductService"));
const DeleteProductService_1 = __importDefault(require("@modules/products/services/DeleteProductService"));
const ListProductService_1 = __importDefault(require("../services/ListProductService"));
const ShowProductService_1 = __importDefault(require("../services/ShowProductService"));
const UpdateProductService_1 = __importDefault(require("../services/UpdateProductService"));
class ProductsControler {
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const listProducts = new ListProductService_1.default();
            const products = yield listProducts.execute();
            return res.json(products);
        });
    }
    show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const showProduct = new ShowProductService_1.default();
            const product = yield showProduct.execute({ id });
            return res.json(product);
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price, quantity } = req.body;
            const createProduct = new CreateProductService_1.default();
            const product = yield createProduct.execute({
                name,
                quantity,
                price,
            });
            return res.json(product);
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, price, quantity } = req.body;
            const updateProduct = new UpdateProductService_1.default();
            const product = yield updateProduct.execute({
                id,
                name,
                quantity,
                price,
            });
            return res.json(product);
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteProduct = new DeleteProductService_1.default();
            yield deleteProduct.execute({ id });
            return res.json(204).json({ delete: true });
        });
    }
}
exports.default = ProductsControler;
