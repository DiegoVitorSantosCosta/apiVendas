"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("@config/upload"));
const UserAvatarController_1 = __importDefault(require("../controllers/UserAvatarController"));
const isAuthenticated_1 = __importDefault(require("@shared/http/midlewares/isAuthenticated"));
const UserControler_1 = __importDefault(require("../controllers/UserControler"));
const usersRouter = (0, express_1.Router)();
const usersController = new UserControler_1.default();
const usersAvatarController = new UserAvatarController_1.default();
const upload = (0, multer_1.default)(upload_1.default);
usersRouter.get('/', isAuthenticated_1.default, usersController.index);
usersRouter.post('/', usersController.create);
usersRouter.get('/:id', usersController.show);
usersRouter.put('/:id', usersController.update);
// usersRouter.post("/avatar", isAuthenticated, upload.single('avatar'), usersAvatarController.create);
usersRouter.patch('/avatar', isAuthenticated_1.default, upload.single('avatar'), usersAvatarController.update);
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
exports.default = usersRouter;
