import { Router } from 'express';

import { AccountController } from '@/controllers/AccountController';
import { CreateAccountDto } from '@/dtos/Account';
import { AuthValidation } from '@/middlewares/authValidation';
import { validateDto } from '@/middlewares/validateDtos';

const router = Router();
const controller = new AccountController();
const authValidation = new AuthValidation();

router.post('/', authValidation.authenticate, validateDto(CreateAccountDto), controller.create);

router.get('/', authValidation.authenticate, controller.listUserAccounts);

export default router;
