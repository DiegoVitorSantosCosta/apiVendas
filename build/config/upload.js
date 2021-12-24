"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const uploadFolder = path_1.default.resolve(__dirname, '..', '..', 'uploads');
exports.default = {
    directory: uploadFolder,
    storage: multer_1.default.diskStorage({
        destination: (req, res, cb) => {
            cb(null, uploadFolder);
        },
        filename(req, file, callback) {
            const fileHash = crypto_1.default.randomBytes(10).toString('hex');
            console.log("file", file);
            console.log(req.body);
            const filename = `${fileHash}-${file.originalname}`;
            callback(null, filename);
        },
    }),
    fileFilter: (req, file, cb) => {
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);
        if (extensaoImg) {
            return cb(null, true);
        }
        return cb(null, true);
    }
};
