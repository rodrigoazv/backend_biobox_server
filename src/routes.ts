//  imports global
import {Router} from 'express';

import multer from 'multer';

import multerConfig from './config/multer';

import { AuthHandler } from './midlleware/authHandle';
import { verifyHandle } from './midlleware/verifyHandle';

//  imports controller 
import userController from './controllers/userController';
import adressController from './controllers/adressController';
import productController from './controllers/productController';
import registerController from './controllers/registerController';
import loginController from './controllers/loginController';
import demandController from './controllers/demandController';
import validateController from './controllers/validateController';
import orderDetailsController from './controllers/orderDetailsController';

const routes: Router = Router();

const verifyToken = new AuthHandler();
const authToken = new verifyHandle();
//routes for demandSend
routes.get('/demand/register',verifyToken.verifyToken ,demandController.registerUserAdress);
routes.get('/demand', demandController.index);
//routes for user
routes.post('/login', loginController.loginGen);
routes.get('/', userController.index);
routes.post('/userfull', verifyToken.verifyToken, userController.storeAdressAndUser);
routes.post('/user', registerController.storeUser);
routes.get('/useri/:id', userController.getUserEmail);
routes.post('/forgot_pass', userController.forgotPassword);
routes.post('/change_pass', userController.recoveryPassword);
//order ADD VERIFY TOKEN
routes.post('/sendo',verifyToken.verifyToken, orderDetailsController.sendOrder);
routes.post('/sendnoadress',verifyToken.verifyToken, orderDetailsController.sendOrderNoAdress )
//routes for product
routes.get('/product', productController.index);
routes.get('/product/:id', productController.indexId);
routes.post('/product/register',multer(multerConfig).single('file'), verifyToken.verifyToken, productController.store);
//routes for sell/
routes.post('/adressregister', adressController.storeAdress);
routes.get('/getcep/:zipcode', adressController.getCep);

//Rota de verificação de token 
routes.get('/auth/1/user',authToken.verifyToken);





module.exports = routes;