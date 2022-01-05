import { Router } from "express";
import uploadConfig from '@config/upload';
import multer from "multer";
import FeedsController from '../controllers/FeedsControllers';
import isAuthenticated from '@shared/http/midlewares/isAuthenticated';
import fs from 'fs';
import path from 'path';
import { hash } from "bcryptjs";
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'upteste');

const feedController = new FeedsController();
const postRouter = Router();

postRouter.post("/",
    isAuthenticated,
    feedController.create)

postRouter.get("/:id",
    isAuthenticated,
    feedController.index)

postRouter.get("/", isAuthenticated, feedController.show);

postRouter.delete("/:id", isAuthenticated, feedController.delete);

export default postRouter;