import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order.entity";

@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    product_title:string;

    @Column()
    price:number;

    @Column()
    quantity:number;

    @ManyToOne(()=>Order)
    @JoinColumn()
    order: Order;
}
