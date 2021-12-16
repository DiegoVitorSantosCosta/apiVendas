import path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import { Request } from 'express';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
    directory: uploadFolder,
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, uploadFolder);
        },

        filename(req, file, callback) {

            const fileHash = crypto.randomBytes(10).toString('hex');

            console.log("file", file)
            console.log(req.body
            )

            const filename = `${fileHash}-${file.originalname}`;



            callback(null, filename);
        },

    }),

    fileFilter: (req: Request, file: any, cb: any) => {

        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);

        if (extensaoImg) {
            return cb(null, true);
        }

        return cb(null, true);
    }

}


