import { EntityRepository, In, Repository } from "typeorm";
import Product from "../entities/product";

export interface IFindProducts {
    id: string;
}
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

    public async findByName(name: string): Promise<Product | undefined> {

        const product = await this.findOne({
            where: {
                name,
            },
        });
        return product;

    }

    public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {  // recebemos uma entidade com um array de ids de produtos
        const productIds = products.map(product => product.id);  // pegamos os ids dos produtos

        const existentProducts = await this.find({
            where: {
                id: In(productIds) // verificamos se os ids existem e são validos
            },
        });

        return existentProducts;

    }
}