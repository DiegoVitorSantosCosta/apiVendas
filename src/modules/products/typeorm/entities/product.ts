
import OrderProducts from "@modules/orders/typeorm/entities/OrderProducts";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
class Product {

    @PrimaryGeneratedColumn('increment')
    id: string; // é string porque o id é um um uuid

    @OneToMany(() => OrderProducts, orderProducts => orderProducts.product)
    orderProduct: OrderProducts[];

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Product;