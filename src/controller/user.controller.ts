import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";
import bcyptjs from "bcryptjs";



export const Users = async (req: Request, res: Response) => {
    const take = 7;


    const page = parseInt(req.query.page as string || '1');
    const repository = getManager().getRepository(User);

    try {
        const [data,total] = await repository.findAndCount({
            relations:['role'],
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
    }catch (e){
        return res.status(403).send({
            Error:e
        })
    }

}

export const CreateUser = async (req: Request, res: Response) => {
    const {roleId,...body} = req.body;
    const hashedPassword = await bcyptjs.hash('1204',10);
    const repository = getManager().getRepository(User);
    try {
        const {password,...user} = await repository.save({
            ...body,
            password: hashedPassword,
            role: {
                id:roleId
            }
        });
        console.log(body);
        res.send(user);
    }catch (e) {
        console.log(e);
        return res.status(403).send({
            Error:e
        });
    }

}
export const GetUser = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);

    const {password,...user} = await repository.findOne({where: {id: parseInt(<string>req.query.id)},
        relations:['role']}); // we used params instead of body because this is a get request
    res.send(user);
}

export const UpdateUser = async (req: Request, res: Response) => {
    const user = req.body;
    const repository = getManager().getRepository(User);
    await repository.update(user.id,req.body);
    const {password,...data} = await repository.findOne({ where:
            { id: user.id }});
    res.send(data);
}

export const UpdateUserRole = async (req: Request, res: Response) => {
    const {roleId,...body} = req.body
    console.log(body);
    const repository = getManager().getRepository(User);
    await repository.update(req.body.id,{...body,role:{
        id:roleId
        }})
    const {password,...data} = await repository.findOne({ where: { id: req.body.id },relations:['role']});
    res.send(data);
}

export const DeleteUser = async (req: Request, res: Response) => {
    const {roleId,...user} = req.body;
    const repository = getManager().getRepository(User);
    await repository.delete(user.id);
    res.status(204).send(null);
}
