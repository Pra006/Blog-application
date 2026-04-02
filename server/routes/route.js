import express from 'express';
import { userSignup, userLogin} from '../controller/user-controller.js';
import { uploadImage ,getImage} from '../controller/image-controller.js';

import upload from '../utils/upload.js';
const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
export default router;