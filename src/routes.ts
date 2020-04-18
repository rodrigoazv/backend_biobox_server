//  imports global
import {Router} from 'express';

import multer from 'multer';

import multerConfig from './config/multer';


//  imports controller 
import userController from './controllers/userController';
import adressController from './controllers/adressController';
import productController from './controllers/productController';
import registerController from './controllers/registerController';

const routes: Router = Router();

routes.use('/', userController.index);
routes.use('/user', registerController.storeUser);
routes.get('/product', productController.index);
routes.post('/product',multer(multerConfig).single('file'), productController.store);
routes.use('/adressregister', adressController.storeAdress);

module.exports = routes;