//  imports global
import {Router} from 'express';

import multer from 'multer';

import multerConfig from './config/multer';

import { AuthHandler } from './midlleware/authHandle';

//  imports controller 
import userController from './controllers/userController';
import adressController from './controllers/adressController';
import productController from './controllers/productController';
import registerController from './controllers/registerController';
import loginController from './controllers/loginController';
import demandController from './controllers/demandController';

const routes: Router = Router();

const verifyToken = new AuthHandler();
//routes for demandSend
routes.get('/demand/register',verifyToken.verifyToken ,demandController.registerUserAdress)
//routes for user
routes.post('/login', loginController.loginGen);
routes.get('/', userController.index);
routes.post('/user', registerController.storeUser);
//routes for product
routes.get('/product', productController.index);
routes.post('/product/register',multer(multerConfig).single('file'), productController.store);
//routes for sell/
routes.post('/adressregister', adressController.storeAdress);




module.exports = routes;