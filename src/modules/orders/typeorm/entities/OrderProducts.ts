import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import Order from './Order';
import Product from '../../../products/typeorm/entities/product';


@Entity('orders_products')
class OrderProducts {

    @PrimaryGeneratedColumn('increment')
    id: string;

    @ManyToOne(() => Order, order => order.id)
    @JoinColumn({ name: 'customer_id' })
    order: Order;

    @ManyToOne(() => Product, product => product.orderProduct)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    productId: string;

    @Column()
    orderId: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
export default OrderProducts;

