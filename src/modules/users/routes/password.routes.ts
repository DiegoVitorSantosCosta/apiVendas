import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import SessionsController from '../controllers/SessionsController';
import ForgotPasswordController from '../controllers/ForgotPasswordControllers';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPwd = new ResetPasswordController()
passwordRouter.post('/forgot',
    celebrate({

        [Segments.BODY]: {
            email: Joi.string().required().email(),
        }
    }),

    forgotPasswordController.create
);

passwordRouter.post('/reset',
    celebrate({

        [Segments.BODY]: {
            token: Joi.string().required().uuid(),
            password: Joi.string().required().min(6),
            password_confirmation: Joi.string().required().valid(Joi.ref('password'))
        }
    }),

    resetPwd.create
);

export default passwordRouter;