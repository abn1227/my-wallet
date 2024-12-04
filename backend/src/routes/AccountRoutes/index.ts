import { Router } from 'express';

import { AccountController } from '@/controllers/AccountController';
import { CreateAccountDto } from '@/dtos/Account';
import { validateDto } from '@/middlewares/validateDtos';

const router = Router();
const controller = new AccountController();

router.post('/', validateDto(CreateAccountDto), controller.create.bind(controller));

export default router;
