import { Request, Response } from 'express';

import { AccountCommandHandlers, CreateAccountCommand } from '@/commands/Account';
import { logger } from '@/logging/Logger';
import { AccountQueryHandlers } from '@/queries/Account';

export class AccountController {
	private commandHandlers: AccountCommandHandlers;
	private queryHandlers: AccountQueryHandlers;

	constructor() {
		this.commandHandlers = new AccountCommandHandlers();
		this.queryHandlers = new AccountQueryHandlers();
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
