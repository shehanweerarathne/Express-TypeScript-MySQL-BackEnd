import {Request, Response} from "express";
import {getManager} from "typeorm";

import {Role} from "../entity/role.entity";
import bcyptjs from "bcryptjs";
import {User} from "../entity/user.entity";

export const Roles = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Role);
    res.send(await repository.find());
}

export const CreateRole = async (req: Request, res: Response) => {
    const {name,permissions} = req.body;
    const repository = getManager().getRepository(Role);
    const role = await repository.save({
        name,
        permissions: permissions.map(id =>({id}))
    });
    res.send(role)
}

export const GetRole = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Role);

    const role = await repository.findOne({where: {id: parseInt(<string>req.query.id)}}); // we used params instead of body because this is a get request
    res.send(role);
}

export const UpdateRole = async (req: Request, res: Response) => {
    const {id,name,permissions} = req.body;
    const repository = getManager().getRepository(Role);
    const role = await repository.save({
        id:parseInt(id),
        name,
        permissions: permissions.map(id =>({id}))
    });
    res.send(role)
}

export const DeleteRole = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Role);

    await repository.delete(req.body.id)
    res.status(204).send(null);
}
