import express, { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';
import isAuthenticated from '@shared/http/midlewares/isAuthenticated';
import UsersController from '../controllers/UserControler';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post('/', usersController.create);

usersRouter.get('/:id', usersController.show);
usersRouter.put('/:id', usersController.update);

// usersRouter.post("/avatar", isAuthenticated, upload.single('avatar'), usersAvatarController.create);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.update
);





export default usersRouter;