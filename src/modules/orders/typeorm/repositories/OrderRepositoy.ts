import Customer from '@modules/custumers/typeorm/entities/Custumer';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

interface IProduct {
    product_id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Customer;
    products: IProduct[];
}

@EntityRepository(Order)
class OrdersRepository extends Repository<any> {
    public async findById(id: string): Promise<Order | undefined> {

        const order = this.findOne(id, {
            relations: ['order_products', 'customer'],  // passamos o relation quando queremos trazer dados de tabelas relacionadas.
            // alem de trazer os dados da propia tabela, trazemos os dados das tabelas relacionadas
        });

        return order;
    }

    public async createOrder({ customer, products }: any): Promise<any> {
        const order = this.create({
            customer,
            order_products: products

        });
        console.log(products);



        let a = await this.save(order);

        return order;
    }
}

export default OrdersRepository;