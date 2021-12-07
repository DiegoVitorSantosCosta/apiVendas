import { Router } from 'express';
import UserController from '../../controllers/UserControler';
import { Segments, Joi, celebrate } from 'celebrate';


const userRoutes = Router();
const userControllers = new UserController();

userRoutes.get('/', userControllers.index);

userRoutes.post('/',
    celebrate({

        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        }
    }),

    userControllers.create
);

export default userRoutes;