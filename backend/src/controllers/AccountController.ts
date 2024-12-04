import { Request, Response } from 'express';

import { AccountCommandHandlers, CreateAccountCommand } from '@/commands/Account';
import { logger } from '@/logging/Logger';
import { AccountQueryHandlers } from '@/queries/Account';
import { AccontRepo } from '@/repositories/AccountRepo';

export class AccountController {
	private commandHandlers: AccountCommandHandlers;
	private queryHandlers: AccountQueryHandlers;

	constructor() {
		const accountRepo = new AccontRepo();

		this.commandHandlers = new AccountCommandHandlers(accountRepo);
		this.queryHandlers = new AccountQueryHandlers(accountRepo);
	}

	async create(req: Request, res: Response) {
		try {
			const data = req.body;
			const command = new CreateAccountCommand(data);
			const account = await this.commandHandlers.createAccount(command);

			return res.status(201).json(account);
		} catch (error) {
			logger.error('Error creating account', error);

			if (error instanceof Error) {
				return res.status(400).json({ message: error.message });
			}

			return res.status(500).json({ message: 'Internal server error' });
		}
	}
}
