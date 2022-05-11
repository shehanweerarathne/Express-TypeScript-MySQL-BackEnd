import {Router} from 'express';

// import {AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword} from "./controller/auth.controller";
import {AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword} from "./controller/auth.controller";
import {AuthMiddleware} from "./middleware/middleware";
import {CreateUser, DeleteUser, GetUser, UpdateUser, Users} from "./controller/user.controller";

export const routes = (router: Router) =>{

    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user', AuthMiddleware,AuthenticatedUser);
    router.post('/api/logout',AuthMiddleware, Logout);
    router.post('/api/users/info',AuthMiddleware, UpdateInfo);
    router.post('/api/users/password',AuthMiddleware, UpdatePassword);


    router.get('/api/users', AuthMiddleware,Users);
    router.post('/api/users/create', AuthMiddleware,CreateUser);
    router.get('/api/user/get', AuthMiddleware,GetUser);
    router.post('/api/user/update', AuthMiddleware,UpdateUser);
    router.post('/api/user/delete', AuthMiddleware,DeleteUser);

}
