import {Request,Response} from "express";
import {RegisterValidation} from "../validation/register.validation";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";
import bcyptjs from "bcryptjs"
import {sign, verify} from "jsonwebtoken";
import {environment} from "../environment";
import {Order} from "../entity/order.entity";

export const Register = async (req: Request, res: Response) => {
    const body = req.body;
    const {error} = RegisterValidation.validate(body);
    if (error){
        return res.status(400).send(error.details);
    }
    if (body.password !== body.password_confirm){
        return res.status(400).send({message:"Passwords do not match"});
    }

    const repository = getManager().getRepository(User);

    try {
        const {password,...user} = await repository.save({
            first_name:body.first_name,
            last_name:body.last_name,
            email:body.email,
            password: await bcyptjs.hash(body.password,10),
            role: {
                id:3
            }
        });
        res.send(user);
    }catch (e) {
        return res.status(403).send({
            Error:e
        })
    }

}

export const Login = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);
    const user = await repository.findOne(
        { where:
                { email: req.body.email }
        }
    );

    if (!user){
        return res.status(404).send({message: 'Invalid Credentials'})
    }
    if(!await bcyptjs.compare(req.body.password,user.password)){
        return res.status(400).send({message: 'Invalid Credentials'})
    }

    try {
        const payload = {
            id:user.id
        }

        const token = sign(payload,environment.SECRET_KEY);



        res.cookie('jwt',token, {
            httpOnly: true,
            maxAge: 24*60*60*1000
        })

        const {password,...data} = user;
        res.send({
            token: token
        });
        console.log(token)
    }catch (e) {
        return res.status(400).send({message: 'Invalid Credentials'})
    }
}
export const AuthenticatedUser = async (req: Request, res: Response) => {
    const {password,...user} = req['user'];
    res.send(user);
}

export const UpdateInfo = async (req: Request, res: Response) => {
    const user = req['user'];
    const repository = getManager().getRepository(User);
    await repository.update(user.id,req.body);
    const {password,...data} = await repository.findOne({ where:
            { id: user.id }});
    res.send(data);
}

export const Logout = async (req: Request, res: Response) => {

}

export const UpdatePassword = async (req: Request, res: Response) => {
    const user = req['user'];
    if (req.body.password !== req.body.password_confirm){
        return res.status(400).send({message:"Passwords do not match"});
    }
    const repository = getManager().getRepository(User);
    await repository.update(user.id,{
        password: await bcyptjs.hash(req.body.password,10)
    });

    const {password,...data} = user;
    res.send(data);
}

// export const AuthenticatedUser = async (req: Request, res: Response) => {
//
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//
//         const jwt =  req.headers.authorization.split(' ')[1];
//         // console.log(jwt)
//         //  res.send({
//         //      Bearer:jwt
//         //  });
//     } else if (req.query && req.query.token) {
//         // const jwt = req.query.token;
//         // console.log(jwt)
//         // res.send({
//         //     message:"Unknown token"
//         // });
//     }else {
//         res.send({
//             message:"unauthorized"
//         });
//     }
// }
