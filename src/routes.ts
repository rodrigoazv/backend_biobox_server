//  imports global
import {Router} from 'express';


//  imports controller 
import userRoutes from './controllers/userController';
import registerRoutes from './controllers/registerController';
import productRoutes from './controllers/productController';

const routes: Router = Router();

routes.use('/', userRoutes);
routes.use('/user', registerRoutes);
routes.use('/product', productRoutes);

module.exports = routes;