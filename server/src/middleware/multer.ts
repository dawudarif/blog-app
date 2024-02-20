import multer from 'multer';
import path from 'path'
import crypto from 'crypto'

const randomText = crypto.randomBytes(32).toString('hex');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, randomText + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });
