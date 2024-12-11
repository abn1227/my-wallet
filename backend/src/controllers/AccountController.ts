import { Request, Response } from 'express';

import {
	AccountCommandHandlers,
	CreateAccountCommand,
	DeleteAccountCommand,
	UpdateAccountCommand,
} from '@/commands/Account';
import { logger } from '@/logging/Logger';
import { AccountQueryHandlers, ListUserAccountsQuery } from '@/queries/Account';

export class AccountController {
	private commandHandlers: AccountCommandHandlers;
	private queryHandlers: AccountQueryHandlers;

	constructor() {
		this.commandHandlers = new AccountCommandHandlers();
		this.queryHandlers = new AccountQueryHandlers();
	}

	create = async (req: Request, res: Response) => {
		try {
			if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

			const data = req.body;
			data.userId = req.user.id;
			const command = new CreateAccountCommand(data);
			const account = await this.commandHandlers.createAccount(command);

			return res.status(201).json(account);
		} catch (error) {
			logger.error('Error creating account', error);

			if (error instanceof Error) return res.status(400).json({ message: error.message });

			return res.status(500).json({ message: 'Internal server error' });
		}
	};

	listUserAccounts = async (req: Request, res: Response) => {
		try {
			if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

			const query = new ListUserAccountsQuery(req.user.id);
			const accounts = await this.queryHandlers.listUserAccounts(query);

			return res.status(200).json(accounts);
		} catch (error) {
			logger.error('Error listing user accounts', error);

			if (error instanceof Error) return res.status(400).json({ message: error.message });

			return res.status(500).json({ message: 'Internal server error' });
		}
	};

	update = async (req: Request, res: Response) => {
		try {
			if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

			const data = req.body;
			const id = req.params.id;
			data.userId = req.user.id;
			const command = new UpdateAccountCommand(id, data);
			const account = await this.commandHandlers.updateAccount(command);

			return res.status(200).json(account);
		} catch (error) {
			logger.error('Error updating account', error);

			if (error instanceof Error) return res.status(400).json({ message: error.message });

			return res.status(500).json({ message: 'Internal server error' });
		}
	};

	delete = async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
			const command = new DeleteAccountCommand(id);
			const deleted = await this.commandHandlers.deleteAccount(command);

			return res.status(200).json({ deleted });
		} catch (error) {
			logger.error('Error deleting account', error);

			if (error instanceof Error) return res.status(400).json({ message: error.message });

			return res.status(500).json({ message: 'Internal server error' });
		}
	};
}
