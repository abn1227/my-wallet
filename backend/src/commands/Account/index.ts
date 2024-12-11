import { CreateAccountDto, UpdateAccountDto } from '@/dtos/Account';
import { logger } from '@/logging/Logger';
import { IAccount } from '@/models/Account';
import { AccontRepo } from '@/repositories/AccountRepo';

export class CreateAccountCommand {
	constructor(public readonly data: CreateAccountDto) {}
}

export class UpdateAccountCommand {
	constructor(
		public readonly id: string,
		public readonly data: UpdateAccountDto,
	) {}
}

export class DeleteAccountCommand {
	constructor(public readonly id: string) {}
}

export class AccountCommandHandlers {
	private accountRepo: AccontRepo;

	constructor() {
		this.accountRepo = new AccontRepo();
	}

	async createAccount(command: CreateAccountCommand): Promise<IAccount> {
		const { name, color, icon, balance, currency, userId } = command.data;
		const account = await this.accountRepo.create({
			name,
			color,
			icon,
			balance,
			currency,
			userId,
		});

		return account;
	}

	async updateAccount(command: UpdateAccountCommand): Promise<IAccount> {
		const { id, data } = command;
		const account = await this.accountRepo.findById(id);

		if (!account) {
			throw new Error(`Account with id ${id} not found`);
		}

		if (data.name) {
			account.name = data.name;
		}

		if (data.color) {
			account.color = data.color;
		}

		if (data.icon) {
			account.icon = data.icon;
		}

		if (data.balance) {
			account.balance = data.balance;
		}

		await this.accountRepo.update(id, account);

		return account;
	}

	async deleteAccount(command: DeleteAccountCommand): Promise<boolean> {
		const { id } = command;
		const account = await this.accountRepo.findById(id);

		if (!account) {
			logger.error(`Account with id ${id} not found`);
			throw new Error(`Account with id ${id} not found`);
		}

		return this.accountRepo.delete(id);
	}
}
