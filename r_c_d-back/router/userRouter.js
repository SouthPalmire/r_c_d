import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

export default router;
