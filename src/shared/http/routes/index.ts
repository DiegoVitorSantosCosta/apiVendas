import { Router } from 'express';
import productsRouter from '../../../modules/products/routes/products.router';
import userRoutes from '../../../modules/users/routes/user.routes';

const routes = Router();

routes.use('/products', productsRouter); // aqui estou dizendo que o endpoint /products vai usar todos metodos de productsRouter
routes.use('/users', userRoutes);

export default routes