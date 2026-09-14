import express from 'express';
import multer from 'multer';
import RegistrationController from '../controllers/registration.controller.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../uploads/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route to handle registration with file uploads
router.post('/register', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'proofOfAge', maxCount: 1 }
]), RegistrationController.register);

export default router;
