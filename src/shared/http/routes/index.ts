import sessionRoutes from '@modules/users/routes/session.routes';
import { Router } from 'express';
import productsRouter from '../../../modules/products/routes/products.router';
import userRoutes from '../../../modules/users/routes/user.routes';
import postRouter from '../../../modules/feeds/routes/post.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import customersRouter from '@modules/custumers/routes/custumers.routes';
import ordersRouter from '../../../modules/orders/routes/order.routes';

const routes = Router();

routes.use('/feeds', postRouter);
routes.use('/products', productsRouter); // aqui estou dizendo que o endpoint /products vai usar todos metodos de productsRouter
routes.use('/users', userRoutes);
routes.use('/password', passwordRouter)
routes.use('/sessions', sessionRoutes);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes