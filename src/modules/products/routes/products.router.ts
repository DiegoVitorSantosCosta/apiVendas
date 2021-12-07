import { Router } from 'express';
import ProductsControler from '@modules/controllers/ProductsControler';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();

const productsControler = new ProductsControler();

productsRouter.get('/', productsControler.index);

productsRouter.get('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required().uuid(),
        },
    }),
    productsControler.show

);

productsRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
        },
    }),
    productsControler.create
);

productsRouter.put('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required().uuid(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
        },
    }),
    productsControler.update
);

productsRouter.delete('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required().uuid(),
        },
    }),
    productsControler.delete);


export default productsRouter;