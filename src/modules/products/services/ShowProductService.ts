import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/product";
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '../../../shared/erros/AppErros';

interface IRequest {
    id: string;
}
class ShowProductService {
    constructor() { }
    public async execute({ id }: IRequest): Promise<Product> {

        const produtsRepository = getCustomRepository(ProductRepository);

        const products = await produtsRepository.findOne(id);  // pega tudo que existe no banco e armaneza na variavél.

        if (!products) throw new AppError('Product not found');

        return products;
    }

}

export default ShowProductService;