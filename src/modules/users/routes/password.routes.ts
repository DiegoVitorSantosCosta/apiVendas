import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import SessionsController from '../controllers/SessionsController';
import ForgotPasswordController from '../controllers/ForgotPasswordControllers';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post('/forgot',
    celebrate({

        [Segments.BODY]: {
            email: Joi.string().required().email(),
        }
    }),

    forgotPasswordController.create
);

export default passwordRouter;