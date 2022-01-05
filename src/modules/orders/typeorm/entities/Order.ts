import Customer from '../../../custumers/typeorm/entities/Custumer';
import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import OrderProducts from './OrderProducts';


@Entity('orders')
class Order {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    // @OneToMany(() => OrderProducts, orderProducts => orderProducts.order, {
    //     cascade: true,  //  isso salva todos os dados do produto, todos os orders products relacionado ao order serão salvos automaticamente
    // })  // muitos pedidos para um cliente, na arrow function, o é o tipo da classe
    // orderProducts: OrderProducts[];  // nome da classe que será referenciada

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order;