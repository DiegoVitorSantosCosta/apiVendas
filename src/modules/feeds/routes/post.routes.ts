import { Router } from "express";
import uploadConfig from '@config/upload';
import multer from "multer";
import FeedsController from '../controllers/FeedsControllers';
import isAuthenticated from '@shared/http/midlewares/isAuthenticated';

const feedController = new FeedsController();
const postRouter = Router();
const cadastroFoto = multer(uploadConfig);


postRouter.post("/",
    isAuthenticated,
    feedController.create)

postRouter.get("/:id",
    isAuthenticated,
    feedController.index)

postRouter.get("/", isAuthenticated, feedController.show)

export default postRouter;