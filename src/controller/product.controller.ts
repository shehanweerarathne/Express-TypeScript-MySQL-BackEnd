import {Request, Response} from "express";
import {getManager} from "typeorm";
import bcyptjs from "bcryptjs";
import {Product} from "../entity/product.entity";

export const Products = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1')
    const repository = getManager().getRepository(Product);
    const [data,total] = await repository.findAndCount({
        take,
        skip:(page - 1) * take
    });
    res.send({
        data,
        meta:{
            total,
            page,
            last_page: Math.ceil(total/take)
        }
    });
}

export const CreateProduct = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Product);
    const product = await repository.save(req.body);
    res.send(product);
}

export const GetProduct = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Product);
    const product = await repository.findOne({where: {id: parseInt(<string>req.query.id)}}); // we used params instead of body because this is a get request
    res.send(product);
}

export const UpdateProduct = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Product);
    await repository.update(req.body.id,req.body);
    const data = await repository.findOne({ where:
            { id: req.body.id }});
    res.send(data);
}

export const DeleteProduct = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Product);
    await repository.delete(req.body.id);
    res.status(204).send(null);
}
