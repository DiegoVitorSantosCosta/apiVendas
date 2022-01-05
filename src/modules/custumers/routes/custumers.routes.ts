import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../controllers/CustumersController';
import isAuthenticated from '@shared/http/midlewares/isAuthenticated';

const customersRouter = Router();
const customersController = new CustomersController();

// customersRouter.use(isAuthenticated);

customersRouter.get('/', isAuthenticated, customersController.index);

customersRouter.get(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        },
    }),
    customersController.show,
);

customersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
    }),
    customersController.create,
);

customersRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        },
    }),
    customersController.update,
);

customersRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        },
    }),
    customersController.delete,
);

export default customersRouter;