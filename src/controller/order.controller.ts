import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Product} from "../entity/product.entity";
import {Order} from "../entity/order.entity";

export const Orders = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1')
    const repository = getManager().getRepository(Order);
    const [data,total] = await repository.findAndCount({
        take,
        skip:(page - 1) * take,
        relations:['order_items']
    });
    res.send({
        data:data.map((order:Order)=>({
            id:order.id,
            name:order.name,
            email:order.email,
            total:order.total,
            created_at:order.created_at,
            order_items:order.order_items
        })),
        meta:{
            total,
            page,
            last_page: Math.ceil(total/take)
        }
    });
}
export const Export = async (req: Request, res: Response) => {}
