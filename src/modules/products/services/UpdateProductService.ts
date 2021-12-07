import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/product";
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '../../../shared/erros/AppErros';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}
class UpdateProductService {
    constructor() { }
    public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {

        const produtsRepository = getCustomRepository(ProductRepository);

        const products = await produtsRepository.findOne(id);  // pega tudo que existe no banco e armaneza na variavél.

        if (!products) throw new AppError('Product not found');

        const productExists = await produtsRepository.findByName(name);

        if (productExists && name !== products.name) throw new AppError('There is already one product with this name');

        products.name = name;
        products.price = price;
        products.quantity = quantity;

        await produtsRepository.save(products);

        return products;
    }

}

export default UpdateProductService;