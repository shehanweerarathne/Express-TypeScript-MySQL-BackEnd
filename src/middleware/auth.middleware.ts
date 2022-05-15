import {Request,Response} from "express";
import {verify} from "jsonwebtoken";
import {environment} from "../environment";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";
export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const jwt = req.headers.authorization.split(' ')[1];
            const payload: any = verify(jwt, environment.SECRET_KEY);
            console.log(payload);
            if (!payload) {
                return res.status(401).send({message: "Unauthenticated"});
            }
            const repository = getManager().getRepository(User);
            req["user"] = await repository.findOne({where: {id: payload.id},relations:['role','role.permissions']});
            next();
        }
        else {
            return res.status(401).send({message:"Unauthenticated"});
        }
    }
    catch (e) {
        return res.status(401).send({message:"Unauthenticated"});
    }
}
