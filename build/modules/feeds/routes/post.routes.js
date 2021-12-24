"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = __importDefault(require("@config/upload"));
const multer_1 = __importDefault(require("multer"));
const FeedsControllers_1 = __importDefault(require("../controllers/FeedsControllers"));
const isAuthenticated_1 = __importDefault(require("@shared/http/midlewares/isAuthenticated"));
const feedController = new FeedsControllers_1.default();
const postRouter = (0, express_1.Router)();
const cadastroFoto = (0, multer_1.default)(upload_1.default);
postRouter.post("/", isAuthenticated_1.default, feedController.create, (req, res) => {
});
postRouter.get("/:id", isAuthenticated_1.default, feedController.index, (req, res) => {
});
postRouter.get("/", isAuthenticated_1.default, feedController.show);
exports.default = postRouter;
