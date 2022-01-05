import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrderRepositoy';
import { ProductRepository } from '../../products/typeorm/repositories/ProductsRepository';
import CustomersRepository from '../../custumers/repositoryes/CustomersRepository';
import AppError from '../../../shared/erros/AppErros';

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
}

class CreateOrderService {
    public async execute({ customer_id, products }: IRequest): Promise<Order> {

        const ordersRepository = getCustomRepository(OrdersRepository);
        const customersRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductRepository);

        const customerExists = await customersRepository.findById(customer_id);



        if (!customerExists) {
            throw new AppError('Could not find any customer with the given id.');
        }


        const existsProducts = await productsRepository.findAllByIds(products);


        if (!existsProducts.length) {
            throw new AppError('Could not find any products with the given ids.');
        }

        const existeIdDoProduto = existsProducts.map(product => product.id);


        const checarProdutosInesistentes = products.filter(
            product => !existeIdDoProduto.includes(product.id),
        );


        if (checarProdutosInesistentes.length) {
            throw new AppError(
                `Could not find product ${checarProdutosInesistentes[0].id}.`,
            );
        }


        // VERIFICAR QUANTIDADE DE PRODUTOS

        const quantityAvailable = products.filter(
            product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity,
        );




        if (quantityAvailable.length) {
            throw new AppError(
                `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
            );
        }



        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter((p: any) => p.id === product.id)[0].price,
        }));



        // console.log('produtos', serializedProducts);
        // console.log('clientes', customerExists);
        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializedProducts,
        });



        const { orderProducts } = order;

        const updatedProductQuantity = orderProducts.map((product: any) => ({
            id: product.productId,
            quantity:
                existsProducts.filter((p: any) => p.id === product.productId)[0].quantity - product.quantity,
        }));


        await productsRepository.save(updatedProductQuantity);

        return order;
    }
}

export default CreateOrderService;
