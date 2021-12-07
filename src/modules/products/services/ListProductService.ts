import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/product";
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
    constructor() { }
    public async execute(): Promise<Product[]> {

        const produtsRepository = getCustomRepository(ProductRepository);

        const products = await produtsRepository.find();  // pega tudo que existe no banco e armaneza na variavél.

        return products;
    }

}

export default ListProductService;