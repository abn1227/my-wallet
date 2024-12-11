import { Router } from 'express';

import { AuthController } from '@/controllers/AuthController';
import { LoginDto, RegisterDto } from '@/dtos/Auth';
import { validateDto } from '@/middlewares/validateDtos';

const router = Router();
const controller = new AuthController();

router.post('/login', validateDto(LoginDto), controller.login);
router.post('/register', validateDto(RegisterDto), controller.register);

export default router;
