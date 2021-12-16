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

// usersRouter.post("/avatar", isAuthenticated, upload.single('avatar'), usersAvatarController.create);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.update

);



// usersRouter.post("/avatar", upload.single('avatar'), async (req, res) => {

//     if (req.file) {
//         console.log(req.file);
//         return res.json({
//             erro: false,
//             mensagem: "Upload realizado com sucesso!",

//         });
//     }

//     return res.status(400).json({
//         erro: true,
//         mensagem: "Erro: Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!"
//     });



// });

export default usersRouter;