import { getCustomRepository } from "typeorm";
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '../../../shared/erros/AppErros';

interface IRequest {
    id: string;
}
class DeleteProductService {
    constructor() { }
    public async execute({ id }: IRequest): Promise<void> {

        const produtsRepository = getCustomRepository(ProductRepository);

        const products = await produtsRepository.findOne(id);  // pega tudo que existe no banco e armaneza na variavél.

        if (!products) throw new AppError('Product not found');

        await produtsRepository.remove(products);

    }

}

export default DeleteProductService;