//  imports global
import {Router} from 'express';


//  imports controller 
import userRoutes from './controllers/userController';
import registerRoutes from './controllers/registerController';

const routes: Router = Router();

routes.use('/', userRoutes);
routes.use('/user', registerRoutes);

module.exports = routes;