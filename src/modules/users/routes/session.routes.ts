import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import SessionsController from '../controllers/SessionsController';

const sessionRoutes = Router();
const sessionsController = new SessionsController();

sessionRoutes.post('/',
    celebrate({

        [Segments.BODY]: {
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        }
    }),

    sessionsController.create
);

export default sessionRoutes;