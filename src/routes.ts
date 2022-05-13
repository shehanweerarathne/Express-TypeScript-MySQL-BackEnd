import {Router} from 'express';

// import {AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword} from "./controller/auth.controller";
import {AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword} from "./controller/auth.controller";
import {AuthMiddleware} from "./middleware/middleware";
import {CreateUser, DeleteUser, GetUser, UpdateUser, UpdateUserRole, Users} from "./controller/user.controller";
import {Permissions} from "./controller/permission.controller";
import {CreateRole, DeleteRole, GetRole, Roles, UpdateRole} from "./controller/role.controller";
import {CreateProduct, DeleteProduct, GetProduct, Products, UpdateProduct} from "./controller/product.controller";

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
    router.post('/api/user/updateRole', AuthMiddleware,UpdateUserRole);

    router.get('/api/permissions', AuthMiddleware,Permissions);

    router.get('/api/roles', AuthMiddleware,Roles);
    router.post('/api/roles/create', AuthMiddleware,CreateRole);
    router.get('/api/roles/get', AuthMiddleware,GetRole);
    router.post('/api/roles/update', AuthMiddleware,UpdateRole);
    router.post('/api/roles/delete', AuthMiddleware,DeleteRole);

    router.get('/api/products', AuthMiddleware,Products);
    router.post('/api/products/create', AuthMiddleware,CreateProduct);
    router.get('/api/products/get', AuthMiddleware,GetProduct);
    router.post('/api/products/update', AuthMiddleware,UpdateProduct);
    router.post('/api/products/delete', AuthMiddleware,DeleteProduct);
}
