import express from 'express';
import { login } from '../../controllers/AuthController';
import { validateUserLogin } from '../../middlewares/validations/user';

const router = express.Router();
router.post('/login', validateUserLogin, login);
export default router;
