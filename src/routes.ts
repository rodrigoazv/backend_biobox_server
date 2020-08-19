//  imports global
import {Router} from 'express';

import multer from 'multer';

import multerConfig from './config/multer';

import { AuthHandler } from './midlleware/authHandle';
import { verifyHandle } from './midlleware/verifyHandle';
import { AuthAdmin } from './midlleware/authAdmin';

//  imports controller 
import userController from './controllers/userController';
import adressController from './controllers/adressController';
import productController from './controllers/productController';
import registerController from './controllers/registerController';
import loginController from './controllers/loginController';
import demandController from './controllers/demandController';
import categoryController from './controllers/categoryController';
import orderDetailsController from './controllers/orderDetailsController';
import mailListController from './controllers/mailListController';
//ADM
import adminLoginControler from './controllers/loginAdmin';
import adminController from './controllers/registerAdmin';
//ADM
const routes: Router = Router();

const verifyToken = new AuthHandler();
const authToken = new verifyHandle();
const authAdmin = new AuthAdmin();
//routes for marketing
routes.post('/mail/lead', mailListController.mailStore)
routes.get('/mail',authAdmin.verifyToken, mailListController.index);
//routes for demandSend
routes.get('/demand/index/:id',verifyToken.verifyToken ,demandController.indexByid);
//routes for user
routes.post('/login', loginController.loginGen);
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
routes.get('/product/index', productController.indexIdBody);
//routes for sell/
routes.post('/adressregister', adressController.storeAdress);
routes.get('/getcep/:zipcode', adressController.getCep);
//Rota de verificação de token 
routes.get('/auth/1/user',authToken.verifyToken);
//ROTAS PRIVADAS ADMINISTRAÇÃO
routes.post('/product/register',multer(multerConfig).single('file'),authAdmin.verifyToken, productController.store);
routes.patch('/product/update/:id',multer(multerConfig).single('file'),authAdmin.verifyToken, productController.updateImageProduct);
routes.delete('/product/:id', authAdmin.verifyToken, productController.delete)
routes.get('/demand', demandController.index);
routes.get('/', authAdmin.verifyToken, userController.index);
routes.get('/auth/admin',authAdmin.verifyToken);
routes.post('/register/admin', authAdmin.verifyToken, adminController.storeUser);
routes.post('/login/admin', adminLoginControler.loginGen);
/*Rotas Administração
 @GET Admin
 @POST Admin
 @Patch Admin
 @Delete admin
 Necessario uso de autenticação para GET importantes e todos os put and patchs and delets
*/
routes.patch('/demand/update', authAdmin.verifyToken, demandController.updateStatus);
routes.post('/register/category', authAdmin.verifyToken, categoryController.storeCategory);
routes.post('/register/subcategory', authAdmin.verifyToken, categoryController.storeSubCategory);
routes.post('/register/productelement', multer(multerConfig).single('file'), authAdmin.verifyToken, categoryController.storeProductTecElement);
routes.get('/productelements/index', categoryController.indexProductElements)
routes.get('/category/index', categoryController.indexCategory)
routes.get('/subcategory/index', categoryController.indexSubCategory)




module.exports = routes;