import express from 'express';
import validator from 'express-validator';
import userController from '../controllers/userController.js';

const router = express.Router();
const { body } = validator;

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 25 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);

export default router;
