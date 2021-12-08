import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import { Request, Response, NextFunction } from 'express';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsControler {

    public async index(req: Request, res: Response, next: NextFunction) {
        const listProducts = new ListProductService();

        const products = await listProducts.execute();

        return res.json(products);

    }

    public async show(req: Request, res: Response, next: NextFunction) {

        const { id } = req.params;

        const showProduct = new ShowProductService();

        const product = await showProduct.execute({ id });

        return res.json(product);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const { name, description, price, quantity } = req.body;

        const createProduct = new CreateProductService();

        const product = await createProduct.execute({
            name,
            quantity,
            price,
        });

        return res.json(product);
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { name, price, quantity } = req.body;

        const updateProduct = new UpdateProductService();

        const product = await updateProduct.execute({
            id,
            name,
            quantity,
            price,
        });

        return res.json(product);
    }


    public async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const deleteProduct = new DeleteProductService();

        await deleteProduct.execute({ id });

        return res.json(204).json({ delete: true });
    }
}