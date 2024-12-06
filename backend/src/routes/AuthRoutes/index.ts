import { Router } from 'express';

import { AuthController } from '@/controllers/AuthController';
import { LoginDto, RegisterDto } from '@/dtos/Auth';
import { validateDto } from '@/middlewares/validateDtos';

const router = Router();
const controller = new AuthController();

router.post('/login', validateDto(LoginDto), controller.login.bind(controller));
router.post('/register', validateDto(RegisterDto), controller.register.bind(controller));

export default router;
