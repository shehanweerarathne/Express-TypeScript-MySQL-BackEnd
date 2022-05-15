import {Request, Response} from "express";
import {User} from "../entity/user.entity";


export const PermissionMiddleware = (access: string) => {
    return (req: Request, res: Response, next: Function) => {
        const user: User = req['user']
        const permission = user.role.permissions;
        if (req.method === 'GET') {
            if (!permission.some(p => (p.name === `view_${access}`) || (p.name === `edit_${access}`))) {
                return res.status(401).send({
                    message: 'No Permission'
                });
            }
        } else {
            if (!permission.some(p => p.name === `edit_${access}`)) {
                return res.status(401).send({
                    message: 'No Permission'
                });
            }
        }
        next();
    }
}

// export const PermissionMiddleware = async (access: string) => {
//     return (req: Request, res: Response, next: Function) => {
//         const user: User = req['user'];
//         const permission = user.role.permissions;
//         if (req.method === 'GET') {
//             if (!permission.some(p => (p.name === `view_${access}`) || (p.name === `edit_${access}`))) {
//                 return res.status(401).send({
//                     message: 'No Permission'
//                 });
//             }
//         } else {
//             if(!permission.some(p=>p.name === `edit_${access}`)){
//                 return res.status(401).send({
//                     message: 'No Permission'
//                 });
//             }
//         }
//         next();
//     }
// }
