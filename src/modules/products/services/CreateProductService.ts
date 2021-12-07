import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/product";
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '../../../shared/erros/AppErros';

interface IRequist {
    name: string;
    price: number;
    quantity: number;
}
class CreateProdutsService {
    constructor() { }

    public async execute({ name, price, quantity }: IRequist): Promise<Product> {

        const produtsRepository = getCustomRepository(ProductRepository);
        const productExists = await produtsRepository.findByName(name);

        if (productExists) {
            throw new AppError('Product already exists');
        }

        const product = produtsRepository.create({
            name,
            price,
            quantity
        });
        await produtsRepository.save(product);
        return product;
    }

}

export default CreateProdutsService;